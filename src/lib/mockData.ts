// Mock data for the dashboard
export interface PortData {
  name: string;
  tradedValue: string;
  volume: string;
  product: string;
  lat: number;
  lng: number;
}

export interface TradeMetrics {
  totalVolume: string;
  totalValue: string;
  avgCost: string;
  topPort: string;
  volumeChange: number;
  valueChange: number;
  costChange: number;
}

export const ports: PortData[] = [
  { name: "Mumbai - JNPT", tradedValue: "50K MT", volume: "1.2M", product: "HSD", lat: 18.95, lng: 72.95 },
  { name: "Naptha", tradedValue: "22K MT", volume: "850K", product: "Naptha", lat: 19.1, lng: 72.88 },
  { name: "Bitumen", tradedValue: "17K MT", volume: "620K", product: "Bitumen", lat: 19.05, lng: 72.9 },
  { name: "Kandla", tradedValue: "35K MT", volume: "920K", product: "Mixed", lat: 23.03, lng: 70.22 },
  { name: "Kolkata-Haldia", tradedValue: "28K MT", volume: "780K", product: "Mixed", lat: 22.02, lng: 88.08 },
  { name: "Paradip", tradedValue: "31K MT", volume: "840K", product: "Mixed", lat: 20.26, lng: 86.61 },
  { name: "Visakhapatnam", tradedValue: "42K MT", volume: "1.1M", product: "Mixed", lat: 17.68, lng: 83.21 },
  { name: "Chennai", tradedValue: "38K MT", volume: "950K", product: "Mixed", lat: 13.08, lng: 80.27 },
  { name: "Ennore", tradedValue: "26K MT", volume: "710K", product: "Mixed", lat: 13.22, lng: 80.31 },
  { name: "Tuticorin", tradedValue: "19K MT", volume: "580K", product: "Mixed", lat: 8.76, lng: 78.13 },
  { name: "Cochin", tradedValue: "33K MT", volume: "880K", product: "Mixed", lat: 9.96, lng: 76.26 },
  { name: "New Mangalore", tradedValue: "29K MT", volume: "790K", product: "Mixed", lat: 12.91, lng: 74.83 },
  { name: "Mormugao", tradedValue: "24K MT", volume: "670K", product: "Mixed", lat: 15.41, lng: 73.81 },
  { name: "Port Blair", tradedValue: "8K MT", volume: "210K", product: "Mixed", lat: 11.66, lng: 92.75 },
];

export const tradeMetrics: TradeMetrics = {
  totalVolume: "XXYYZZ units",
  totalValue: "PPQQRR Currency",
  avgCost: "XYZ",
  topPort: "Mumbai, HSD",
  volumeChange: 5.2,
  valueChange: 3.8,
  costChange: -1.5,
};

export const trendData = [
  { month: "Jan", HSD: 45000, Naptha: 22000, Bitumen: 18000 },
  { month: "Feb", HSD: 48000, Naptha: 24000, Bitumen: 17000 },
  { month: "Mar", HSD: 52000, Naptha: 23000, Bitumen: 19000 },
  { month: "Apr", HSD: 49000, Naptha: 25000, Bitumen: 18500 },
  { month: "May", HSD: 51000, Naptha: 26000, Bitumen: 17500 },
  { month: "Jun", HSD: 50000, Naptha: 22000, Bitumen: 17000 },
];

export const productCategories = [
  "All",
  "HSD (High Speed Diesel)",
  "Naptha",
  "Bitumen",
  "Mineral Turpentine Oil",
  "VLSFO",
  "Gypsum",
  "Benzene",
  "Toluene",
];

// Save data to localStorage
export const saveToLocalStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Load data from localStorage
export const loadFromLocalStorage = (key: string) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

// Initialize mock data in localStorage
export const initializeMockData = () => {
  if (!loadFromLocalStorage("ports")) {
    saveToLocalStorage("ports", ports);
  }
  if (!loadFromLocalStorage("tradeMetrics")) {
    saveToLocalStorage("tradeMetrics", tradeMetrics);
  }
  if (!loadFromLocalStorage("trendData")) {
    saveToLocalStorage("trendData", trendData);
  }
};
