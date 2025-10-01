import { Ionicons } from '@expo/vector-icons';

export interface MenuItem {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  path: string;
  description?: string;
}

export const menuItems: MenuItem[] = [
  { 
    id: "dashboard", 
    label: "Dashboard", 
    icon: "home", 
    path: "/(tabs)/dashboard",
    description: "Overview and quick stats"
  },
  {
    id: "manage",
    label: "Manage Tours",
    icon: "map",
    path: "/(tabs)/manage",
    description: "Manage tourist registrations"
  },
  {
    id: "register",
    label: "Register Tourist",
    icon: "person-add",
    path: "/(tabs)/register",
    description: "Register new tourists"
  },
  { 
    id: "map", 
    label: "Geo Map", 
    icon: "location", 
    path: "/(tabs)/map",
    description: "View tourist locations"
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: "bar-chart",
    path: "/(tabs)/analytics",
    description: "View statistics and reports"
  },
  {
    id: "incidents",
    label: "Incidents",
    icon: "warning",
    path: "/(tabs)/incidents",
    description: "Manage safety incidents"
  },
  {
    id: "nftWallet",
    label: "NFT Wallet",
    icon: "wallet",
    path: "/(tabs)/nft-wallet",
    description: "Manage NFT tourist IDs"
  },
  {
    id: "systemHealth",
    label: "System Health",
    icon: "pulse",
    path: "/(tabs)/system-health",
    description: "Monitor system status"
  },
];

export const quickActions = [
  {
    id: "quick-register",
    label: "Quick Register",
    icon: "add-circle" as keyof typeof Ionicons.glyphMap,
    color: "#10b981",
    path: "/(tabs)/register"
  },
  {
    id: "scan-qr",
    label: "Scan QR",
    icon: "qr-code" as keyof typeof Ionicons.glyphMap,
    color: "#3b82f6",
    path: "/(tabs)/scan"
  },
  {
    id: "emergency",
    label: "Emergency",
    icon: "alert-circle" as keyof typeof Ionicons.glyphMap,
    color: "#ef4444",
    path: "/(tabs)/emergency"
  },
  {
    id: "reports",
    label: "Reports",
    icon: "document-text" as keyof typeof Ionicons.glyphMap,
    color: "#8b5cf6",
    path: "/(tabs)/reports"
  },
];