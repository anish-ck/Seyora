import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { colors } from '@/lib/auth-constants';
import { menuItems } from '@/lib/navigation-constants';

export default function ExploreScreen() {
  const router = useRouter();

  const additionalFeatures = [
    {
      id: 'analytics',
      title: 'Analytics',
      description: 'View detailed statistics and reports',
      icon: 'bar-chart',
      color: colors.primary.cyan,
      comingSoon: false,
    },
    {
      id: 'map',
      title: 'Geo Map',
      description: 'Track tourist locations in real-time',
      icon: 'location',
      color: colors.primary.purple,
      comingSoon: true,
    },
    {
      id: 'incidents',
      title: 'Incidents',
      description: 'Manage safety incidents and alerts',
      icon: 'warning',
      color: '#f59e0b',
      comingSoon: true,
    },
    {
      id: 'nft-wallet',
      title: 'NFT Wallet',
      description: 'Manage NFT tourist identities',
      icon: 'wallet',
      color: colors.primary.pink,
      comingSoon: true,
    },
    {
      id: 'system-health',
      title: 'System Health',
      description: 'Monitor system performance',
      icon: 'pulse',
      color: '#10b981',
      comingSoon: true,
    },
    {
      id: 'settings',
      title: 'Settings',
      description: 'App preferences and configuration',
      icon: 'settings',
      color: colors.text.slate400,
      comingSoon: true,
    },
  ];

  const quickTools = [
    {
      id: 'scan-qr',
      title: 'Scan QR Code',
      description: 'Verify tourist identity',
      icon: 'qr-code',
      color: colors.primary.cyan,
    },
    {
      id: 'emergency',
      title: 'Emergency Alert',
      description: 'Send emergency notifications',
      icon: 'alert-circle',
      color: '#ef4444',
    },
    {
      id: 'export-data',
      title: 'Export Data',
      description: 'Download reports and data',
      icon: 'download',
      color: colors.primary.purple,
    },
    {
      id: 'backup',
      title: 'Backup & Sync',
      description: 'Sync data across devices',
      icon: 'cloud-upload',
      color: '#10b981',
    },
  ];

  const handleFeaturePress = (feature: any) => {
    if (feature.comingSoon) {
      Alert.alert(
        'Coming Soon',
        `${feature.title} feature is currently under development and will be available in a future update.`,
        [{ text: 'OK' }]
      );
    } else {
      // Navigate to feature or show functionality
      console.log(`Navigate to ${feature.id}`);
    }
  };

  return (
    <DashboardLayout 
      title="More Features"
      rightAction={{
        icon: 'information-circle',
        onPress: () => Alert.alert('Info', 'Explore all available features and tools.')
      }}
    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Quick Tools Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Tools</Text>
          <View style={styles.toolsGrid}>
            {quickTools.map((tool) => (
              <TouchableOpacity
                key={tool.id}
                style={styles.toolCard}
                onPress={() => handleFeaturePress(tool)}
              >
                <LinearGradient
                  colors={[colors.background.slate900, colors.background.slate800]}
                  style={styles.toolGradient}
                >
                  <View style={[styles.toolIcon, { backgroundColor: tool.color + '20' }]}>
                    <Ionicons name={tool.icon as any} size={24} color={tool.color} />
                  </View>
                  <Text style={styles.toolTitle}>{tool.title}</Text>
                  <Text style={styles.toolDescription}>{tool.description}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* All Features Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All Features</Text>
          <View style={styles.featuresContainer}>
            {additionalFeatures.map((feature) => (
              <TouchableOpacity
                key={feature.id}
                style={styles.featureCard}
                onPress={() => handleFeaturePress(feature)}
              >
                <LinearGradient
                  colors={[colors.background.slate900, colors.background.slate800]}
                  style={styles.featureGradient}
                >
                  <View style={styles.featureHeader}>
                    <View style={[styles.featureIcon, { backgroundColor: feature.color + '20' }]}>
                      <Ionicons name={feature.icon as any} size={20} color={feature.color} />
                    </View>
                    {feature.comingSoon && (
                      <View style={styles.comingSoonBadge}>
                        <Text style={styles.comingSoonText}>Soon</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>{feature.description}</Text>
                  <View style={styles.featureFooter}>
                    <Ionicons 
                      name="chevron-forward" 
                      size={16} 
                      color={colors.text.slate400} 
                    />
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* App Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Information</Text>
          <LinearGradient
            colors={[colors.background.slate900, colors.background.slate800]}
            style={styles.infoCard}
          >
            <View style={styles.infoHeader}>
              <View style={styles.appIcon}>
                <Ionicons name="globe" size={24} color={colors.primary.purple} />
              </View>
              <View style={styles.appInfo}>
                <Text style={styles.appName}>Truvenia Mobile</Text>
                <Text style={styles.appVersion}>Version 1.0.0</Text>
              </View>
            </View>
            
            <View style={styles.infoStats}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>8</Text>
                <Text style={styles.statLabel}>Features</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>100%</Text>
                <Text style={styles.statLabel}>Secure</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statValue}>24/7</Text>
                <Text style={styles.statLabel}>Support</Text>
              </View>
            </View>
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
  toolsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  toolCard: {
    width: '48%',
  },
  toolGradient: {
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border.purple500 + '20',
  },
  toolIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  toolTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.white,
    textAlign: 'center',
    marginBottom: 4,
  },
  toolDescription: {
    fontSize: 12,
    color: colors.text.slate400,
    textAlign: 'center',
  },
  featuresContainer: {
    gap: 12,
  },
  featureCard: {
    width: '100%',
  },
  featureGradient: {
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border.purple500 + '20',
  },
  featureHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  comingSoonBadge: {
    backgroundColor: colors.primary.purple + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  comingSoonText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.primary.purple,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.white,
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: colors.text.slate400,
    marginBottom: 12,
  },
  featureFooter: {
    alignItems: 'flex-end',
  },
  infoCard: {
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border.purple500 + '20',
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  appIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary.purple + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  appInfo: {
    flex: 1,
  },
  appName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.white,
  },
  appVersion: {
    fontSize: 14,
    color: colors.text.slate400,
    marginTop: 2,
  },
  infoStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.white,
  },
  statLabel: {
    fontSize: 12,
    color: colors.text.slate400,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: colors.border.purple500 + '20',
  },
});