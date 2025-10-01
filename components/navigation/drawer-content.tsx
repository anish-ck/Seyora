import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth, useUser } from '@clerk/clerk-expo';

import { menuItems } from '@/lib/navigation-constants';
import { colors } from '@/lib/auth-constants';

interface DrawerContentProps {
  onClose: () => void;
}

export const DrawerContent: React.FC<DrawerContentProps> = ({ onClose }) => {
  const { signOut } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (path: string) => {
    router.push(path as any);
    onClose();
  };

  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut();
              router.replace('/(auth)/login');
            } catch (error) {
              console.error('Sign out error:', error);
              Alert.alert('Error', 'Failed to sign out. Please try again.');
            }
          },
        },
      ]
    );
  };

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[colors.background.darker, colors.background.dark]}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.closeButtonContainer}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={colors.text.white} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.logoContainer}>
            <Ionicons name="globe" size={32} color={colors.primary.purple} />
            <Text style={styles.logoText}>Truvenia</Text>
          </View>

          {/* User Info */}
          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={24} color={colors.text.white} />
            </View>
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{user?.fullName || user?.firstName || 'User'}</Text>
              <Text style={styles.userEmail}>{user?.primaryEmailAddress?.emailAddress}</Text>
            </View>
          </View>
        </View>

        {/* Navigation Menu */}
        <ScrollView style={styles.menuContainer} showsVerticalScrollIndicator={false}>
          <Text style={styles.sectionTitle}>Navigation</Text>
          
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.menuItem,
                isActive(item.path) && styles.activeMenuItem
              ]}
              onPress={() => handleNavigation(item.path)}
            >
              <View style={[
                styles.menuIconContainer,
                isActive(item.path) && styles.activeMenuIcon
              ]}>
                <Ionicons 
                  name={item.icon} 
                  size={20} 
                  color={isActive(item.path) ? colors.text.white : colors.text.slate400} 
                />
              </View>
              <View style={styles.menuTextContainer}>
                <Text style={[
                  styles.menuLabel,
                  isActive(item.path) && styles.activeMenuLabel
                ]}>
                  {item.label}
                </Text>
                {item.description && (
                  <Text style={styles.menuDescription}>{item.description}</Text>
                )}
              </View>
              {isActive(item.path) && (
                <View style={styles.activeIndicator} />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
            <Ionicons name="log-out" size={20} color={colors.text.white} />
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
          
          <View style={styles.versionInfo}>
            <Text style={styles.versionText}>Truvenia Mobile v1.0.0</Text>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.purple500 + '20',
  },
  closeButtonContainer: {
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  closeButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: colors.text.white + '10',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 24,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.white,
    letterSpacing: 1,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary.purple + '40',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.white,
  },
  userEmail: {
    fontSize: 14,
    color: colors.text.slate400,
    marginTop: 2,
  },
  menuContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text.slate400,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 4,
    position: 'relative',
  },
  activeMenuItem: {
    backgroundColor: colors.primary.purple + '20',
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  activeMenuIcon: {
    backgroundColor: colors.primary.purple,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text.white,
  },
  activeMenuLabel: {
    color: colors.text.white,
    fontWeight: '600',
  },
  menuDescription: {
    fontSize: 12,
    color: colors.text.slate400,
    marginTop: 2,
  },
  activeIndicator: {
    width: 3,
    height: 20,
    backgroundColor: colors.primary.purple,
    borderRadius: 2,
    position: 'absolute',
    right: 0,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border.purple500 + '20',
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: colors.text.white + '10',
    marginBottom: 16,
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text.white,
  },
  versionInfo: {
    alignItems: 'center',
  },
  versionText: {
    fontSize: 12,
    color: colors.text.slate500,
  },
});