import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { colors } from '@/lib/auth-constants';

interface Tourist {
  id: string;
  name: string;
  email: string;
  country: string;
  status: 'active' | 'pending' | 'expired';
  registrationDate: string;
  nftId?: string;
}

export default function ManageToursScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'active' | 'pending' | 'expired'>('all');

  const mockTourists: Tourist[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@email.com',
      country: 'USA',
      status: 'active',
      registrationDate: '2024-01-15',
      nftId: 'NFT-001'
    },
    {
      id: '2',
      name: 'Maria Garcia',
      email: 'maria.garcia@email.com',
      country: 'Spain',
      status: 'pending',
      registrationDate: '2024-01-16',
    },
    {
      id: '3',
      name: 'Chen Wei',
      email: 'chen.wei@email.com',
      country: 'China',
      status: 'active',
      registrationDate: '2024-01-14',
      nftId: 'NFT-002'
    },
    {
      id: '4',
      name: 'Ahmed Hassan',
      email: 'ahmed.hassan@email.com',
      country: 'Egypt',
      status: 'expired',
      registrationDate: '2024-01-10',
    },
  ];

  const filteredTourists = mockTourists.filter(tourist => {
    const matchesSearch = tourist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tourist.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || tourist.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: Tourist['status']) => {
    switch (status) {
      case 'active': return '#10b981';
      case 'pending': return '#f59e0b';
      case 'expired': return '#ef4444';
      default: return colors.text.slate400;
    }
  };

  const getStatusIcon = (status: Tourist['status']) => {
    switch (status) {
      case 'active': return 'checkmark-circle';
      case 'pending': return 'time';
      case 'expired': return 'close-circle';
      default: return 'help-circle';
    }
  };

  const handleTouristAction = (tourist: Tourist, action: string) => {
    Alert.alert(
      'Action',
      `${action} for ${tourist.name}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Confirm', onPress: () => console.log(`${action} ${tourist.name}`) }
      ]
    );
  };

  const filters = [
    { key: 'all', label: 'All', count: mockTourists.length },
    { key: 'active', label: 'Active', count: mockTourists.filter(t => t.status === 'active').length },
    { key: 'pending', label: 'Pending', count: mockTourists.filter(t => t.status === 'pending').length },
    { key: 'expired', label: 'Expired', count: mockTourists.filter(t => t.status === 'expired').length },
  ];

  return (
    <DashboardLayout 
      title="Manage Tours"
      rightAction={{
        icon: 'add',
        onPress: () => console.log('Add new tourist')
      }}
    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color={colors.text.slate400} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search tourists..."
              placeholderTextColor={colors.text.slate400}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close" size={20} color={colors.text.slate400} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Filter Tabs */}
        <View style={styles.filterSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.filterContainer}>
              {filters.map((filter) => (
                <TouchableOpacity
                  key={filter.key}
                  style={[
                    styles.filterTab,
                    selectedFilter === filter.key && styles.activeFilterTab
                  ]}
                  onPress={() => setSelectedFilter(filter.key as any)}
                >
                  <Text style={[
                    styles.filterLabel,
                    selectedFilter === filter.key && styles.activeFilterLabel
                  ]}>
                    {filter.label}
                  </Text>
                  <View style={[
                    styles.filterBadge,
                    selectedFilter === filter.key && styles.activeFilterBadge
                  ]}>
                    <Text style={[
                      styles.filterCount,
                      selectedFilter === filter.key && styles.activeFilterCount
                    ]}>
                      {filter.count}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Tourist List */}
        <View style={styles.listSection}>
          {filteredTourists.map((tourist) => (
            <LinearGradient
              key={tourist.id}
              colors={[colors.background.slate900, colors.background.slate800]}
              style={styles.touristCard}
            >
              <View style={styles.touristHeader}>
                <View style={styles.touristInfo}>
                  <View style={styles.avatarContainer}>
                    <Ionicons name="person" size={20} color={colors.text.white} />
                  </View>
                  <View style={styles.touristDetails}>
                    <Text style={styles.touristName}>{tourist.name}</Text>
                    <Text style={styles.touristEmail}>{tourist.email}</Text>
                    <Text style={styles.touristCountry}>📍 {tourist.country}</Text>
                  </View>
                </View>
                
                <View style={styles.statusContainer}>
                  <View style={[styles.statusBadge, { backgroundColor: getStatusColor(tourist.status) + '20' }]}>
                    <Ionicons 
                      name={getStatusIcon(tourist.status) as any} 
                      size={12} 
                      color={getStatusColor(tourist.status)} 
                    />
                    <Text style={[styles.statusText, { color: getStatusColor(tourist.status) }]}>
                      {tourist.status.charAt(0).toUpperCase() + tourist.status.slice(1)}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.touristMeta}>
                <View style={styles.metaItem}>
                  <Ionicons name="calendar" size={14} color={colors.text.slate400} />
                  <Text style={styles.metaText}>Registered: {tourist.registrationDate}</Text>
                </View>
                {tourist.nftId && (
                  <View style={styles.metaItem}>
                    <Ionicons name="wallet" size={14} color={colors.primary.purple} />
                    <Text style={styles.metaText}>NFT: {tourist.nftId}</Text>
                  </View>
                )}
              </View>

              <View style={styles.actionButtons}>
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => handleTouristAction(tourist, 'View Details')}
                >
                  <Ionicons name="eye" size={16} color={colors.primary.cyan} />
                  <Text style={styles.actionButtonText}>View</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => handleTouristAction(tourist, 'Edit')}
                >
                  <Ionicons name="create" size={16} color={colors.primary.purple} />
                  <Text style={styles.actionButtonText}>Edit</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.actionButton}
                  onPress={() => handleTouristAction(tourist, 'Delete')}
                >
                  <Ionicons name="trash" size={16} color="#ef4444" />
                  <Text style={[styles.actionButtonText, { color: '#ef4444' }]}>Delete</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          ))}
        </View>

        {filteredTourists.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="people" size={48} color={colors.text.slate400} />
            <Text style={styles.emptyTitle}>No tourists found</Text>
            <Text style={styles.emptySubtitle}>
              {searchQuery ? 'Try adjusting your search terms' : 'No tourists match the selected filter'}
            </Text>
          </View>
        )}
      </ScrollView>
    </DashboardLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.dark,
  },
  searchSection: {
    padding: 20,
    paddingBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.slate900,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text.white,
  },
  filterSection: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  filterTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.background.slate900,
    gap: 8,
  },
  activeFilterTab: {
    backgroundColor: colors.primary.purple,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.white,
  },
  activeFilterLabel: {
    color: colors.text.white,
  },
  filterBadge: {
    backgroundColor: colors.text.slate400 + '20',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  activeFilterBadge: {
    backgroundColor: colors.text.white + '20',
  },
  filterCount: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text.slate400,
  },
  activeFilterCount: {
    color: colors.text.white,
  },
  listSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  touristCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border.purple500 + '20',
  },
  touristHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  touristInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary.purple + '40',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  touristDetails: {
    flex: 1,
  },
  touristName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.white,
    marginBottom: 4,
  },
  touristEmail: {
    fontSize: 14,
    color: colors.text.slate400,
    marginBottom: 2,
  },
  touristCountry: {
    fontSize: 12,
    color: colors.text.slate400,
  },
  statusContainer: {
    alignItems: 'flex-end',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  touristMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: colors.text.slate400,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border.purple500 + '20',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: colors.background.slate800,
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.text.white,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.white,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: colors.text.slate400,
    textAlign: 'center',
  },
});