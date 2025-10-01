import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '@clerk/clerk-expo';

import { colors } from '@/lib/auth-constants';

interface HeaderProps {
  title: string;
  onMenuPress: () => void;
  rightAction?: {
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
  };
}

export const Header: React.FC<HeaderProps> = ({ title, onMenuPress, rightAction }) => {
  const { user } = useUser();

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={colors.background.darker} />
      <LinearGradient
        colors={[colors.background.darker, colors.background.dark]}
        style={styles.gradient}
      >
        <SafeAreaView edges={['top']}>
          <View style={styles.container}>
            <View style={styles.leftSection}>
              <TouchableOpacity onPress={onMenuPress} style={styles.menuButton}>
                <Ionicons name="menu" size={24} color={colors.text.white} />
              </TouchableOpacity>
              
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>Welcome back, {user?.firstName || user?.fullName?.split(' ')[0] || 'User'}</Text>
              </View>
            </View>

            <View style={styles.rightSection}>
              {rightAction && (
                <TouchableOpacity onPress={rightAction.onPress} style={styles.actionButton}>
                  <Ionicons name={rightAction.icon} size={24} color={colors.text.white} />
                </TouchableOpacity>
              )}
              
              <TouchableOpacity style={styles.profileButton}>
                <View style={styles.profileAvatar}>
                  <Ionicons name="person" size={16} color={colors.text.white} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  gradient: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.text.white + '10',
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.white,
  },
  subtitle: {
    fontSize: 12,
    color: colors.text.slate400,
    marginTop: 2,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  actionButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: colors.text.white + '10',
  },
  profileButton: {
    padding: 4,
  },
  profileAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary.purple,
    justifyContent: 'center',
    alignItems: 'center',
  },
});