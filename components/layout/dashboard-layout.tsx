import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../navigation/header';
import { CustomDrawer } from '../navigation/custom-drawer';
import { colors } from '@/lib/auth-constants';

interface DashboardLayoutProps {
  title: string;
  children: React.ReactNode;
  rightAction?: {
    icon: keyof typeof Ionicons.glyphMap;
    onPress: () => void;
  };
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  title, 
  children, 
  rightAction 
}) => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const openDrawer = () => setDrawerVisible(true);
  const closeDrawer = () => setDrawerVisible(false);

  return (
    <View style={styles.container}>
      <Header 
        title={title} 
        onMenuPress={openDrawer}
        rightAction={rightAction}
      />
      
      <View style={styles.content}>
        {children}
      </View>

      <CustomDrawer 
        visible={drawerVisible} 
        onClose={closeDrawer} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.dark,
  },
  content: {
    flex: 1,
  },
});