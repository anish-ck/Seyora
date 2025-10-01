import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { colors } from '@/lib/auth-constants';
import { quickActions } from '@/lib/navigation-constants';
import { useAuth } from '@/lib/auth-context';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2;

export default function DashboardScreen() {
  const { user } = useAuth();
  const router = useRouter();

  const stats = [
    { label: 'Active Tourists', value: '1,234', icon: 'people', color: colors.primary.cyan },
    { label: 'Total Registrations', value: '5,678', icon: 'person-add', color: colors.primary.purple },
    { label: 'Safety Incidents', value: '12', icon: 'warning', color: '#f59e0b' },
    { label: 'NFTs Issued', value: '4,321', icon: 'wallet', color: colors.primary.pink },
  ];

  const recentActivity = [
    { id: 1, type: 'registration', message: 'New tourist registered: John Doe', time: '2 min ago', icon: 'person-add' },
    { id: 2, type: 'incident', message: 'Safety incident reported in Zone A', time: '15 min ago', icon: 'warning' },
    { id: 3, type: 'nft', message: 'NFT issued to Maria Garcia', time: '1 hour ago', icon: 'wallet' },
    { id: 4, type: 'verification', message: 'Tourist verified at checkpoint', time: '2 hours ago', icon: 'checkmark-circle' },
  ];

  return (
    <DashboardLayout 
      title="Dashboard"
      rightAction={{
        icon: 'notifications',
        onPress: () => console.log('Notifications pressed')
      }}
    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>
            Good morning, {user?.name?.split(' ')[0] || 'User'}! 👋
          </Text>
          <Text style={styles.welcomeSubtext}>
            Here's what's happening with your tourist safety system today.
          </Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={styles.quickActionCard}
                onPress={() => router.push(action.path as any)}
              >
                <View style={[styles.quickActionIcon, { backgroundColor: action.color + '20' }]}>
                  <Ionicons name={action.icon} size={24} color={action.color} />
                </View>
                <Text style={styles.quickActionLabel}>{action.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Statistics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Statistics</Text>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <LinearGradient
                key={index}
                colors={[colors.background.slate900, colors.background.slate800]}
                style={styles.statCard}
              >
                <View style={styles.statHeader}>
                  <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
                    <Ionicons name={stat.icon as any} size={20} color={stat.color} />
                  </View>
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </LinearGradient>
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <View style={styles.activityContainer}>
            {recentActivity.map((activity) => (
              <View key={activity.id} style={styles.activityItem}>
                <View style={styles.activityIcon}>
                  <Ionicons 
                    name={activity.icon as any} 
                    size={16} 
                    color={colors.primary.purple} 
                  />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityMessage}>{activity.message}</Text>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* System Status */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>System Status</Text>
          <LinearGradient
            colors={[colors.background.slate900, colors.background.slate800]}
            style={styles.statusCard}
          >
            <View style={styles.statusHeader}>
              <View style={styles.statusIndicator}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>All Systems Operational</Text>
              </View>
              <TouchableOpacity>
                <Ionicons name="chevron-forward" size={20} color={colors.text.slate400} />
              </TouchableOpacity>
            </View>
            <Text style={styles.statusDescription}>
              All services are running normally. Last updated 2 minutes ago.
            </Text>
          </LinearGradient>
        </View>
      </ScrollView>
    </DashboardLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.dark,
  },
  welcomeSection: {
    padding: 20,
    paddingBottom: 16,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.white,
    marginBottom: 8,
  },
  welcomeSubtext: {
    fontSize: 16,
    color: colors.text.slate400,
    lineHeight: 22,
  },
  section: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.white,
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickActionCard: {
    width: cardWidth,
    backgroundColor: colors.background.slate900,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border.purple500 + '20',
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickActionLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text.white,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    width: cardWidth,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border.purple500 + '20',
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.white,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.text.slate400,
  },
  activityContainer: {
    backgroundColor: colors.background.slate900,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border.purple500 + '20',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.purple500 + '10',
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary.purple + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityMessage: {
    fontSize: 14,
    color: colors.text.white,
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: colors.text.slate400,
  },
  statusCard: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border.purple500 + '20',
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10b981',
    marginRight: 8,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text.white,
  },
  statusDescription: {
    fontSize: 14,
    color: colors.text.slate400,
  },
});