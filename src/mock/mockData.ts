import { Label } from "recharts";

// Mock data for demonstration
export const kpiData = {
  activeTourists: { value: 2847, change: +12.5, trend: "up" },
  totalTourists: { value: 15632, change: +8.3, trend: "up" },
  nftVerifications: { value: 4523, change: +15.7, trend: "up" },
  aiAlerts: { value: 89, change: -5.2, trend: "down" },
  revenue: { value: 234567, change: +18.9, trend: "up" },
  coverage: { value: 47, change: +3, trend: "up" },
};

// Chart data
export const growthData = [
  { month: "Jan", tourists: 1200, revenue: 45000, nfts: 890 },
  { month: "Feb", tourists: 1450, revenue: 52000, nfts: 1200 },
  { month: "Mar", tourists: 1380, revenue: 50000, nfts: 1150 }, // down
  { month: "Apr", tourists: 1920, revenue: 73000, nfts: 2100 }, // up
  { month: "May", tourists: 1740, revenue: 68000, nfts: 1800 }, // down
  { month: "Jun", tourists: 2340, revenue: 89000, nfts: 2890 }, // up
  { month: "Jul", tourists: 2200, revenue: 85000, nfts: 2600 }, // down
  { month: "Oct", tourists: 2500, revenue: 97000, nfts: 3100 }, // up
];


export const chartConfig = {
  tourists: { label: "Tourists", color: "hsl(var(--web3-purple))" },
};

export const TouristDataBalancedIndia = [
  { state: "Maharashtra", tourists: 1200 },
  { state: "Rajasthan", tourists: 950 },
  { state: "Kerala", tourists: 700 },
  { state: "Goa", tourists: 600 },
  { state: "Others", tourists: 1200 },
];
export const TouristDataBalanced = [
  { country: "USA", tourists: 1200 },
  { country: "India", tourists: 950 },
  { country: "China", tourists: 700 },
  { country: "Germany", tourists: 600 },
  { country: "Others", tourists: 1200 },
];
const sorted = TouristDataBalanced.sort((a, b) => b.tourists - a.tourists);
const top4 = sorted.slice(0, 4);
const others = sorted.slice(4).reduce((acc, cuur) => acc + cuur.tourists, 0);

export const actualContryData = [
  ...top4,
  { country: "Others", tourists: others },
];

export const touristConfigData = {
  tourists: { label: "Tourists", color: "red" },
  country: { label: "Country", color: "green" },
};

const sortedStae = TouristDataBalancedIndia.sort(
  (a, b) => b.tourists - a.tourists
);
const top4Stae = sortedStae.slice(0, 4);
const othersStates = sortedStae
  .slice(4)
  .reduce((acc, cuur) => acc + cuur.tourists, 0);

export const actualStateData = [
  ...top4Stae,
  { state: "Others", tourists: othersStates },
];
export const StaetConfigData = {
  tourists: { label: "Tourists", color: "red" },
  state: { label: "State", color: "green" },
};
