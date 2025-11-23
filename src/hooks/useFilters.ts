import { useState, useEffect } from "react";
import { ports, tradeMetrics, trendData, PortData, TradeMetrics } from "@/lib/mockData";

export interface FilterState {
  dateRange: string;
  tradeFlow: string;
  productCategory: string;
  dataSource: string;
  selectedState?: string;
}

export const useFilters = () => {
  const [filters, setFilters] = useState<FilterState>({
    dateRange: "Last Quarter",
    tradeFlow: "Import and Export",
    productCategory: "Default: All",
    dataSource: "Default: Multi Source",
  });

  const [filteredPorts, setFilteredPorts] = useState<PortData[]>(ports);
  const [filteredMetrics, setFilteredMetrics] = useState<TradeMetrics>(tradeMetrics);

  useEffect(() => {
    applyFilters();
  }, [filters]);

  const applyFilters = () => {
    let filtered = [...ports];

    // Filter by trade flow
    if (filters.tradeFlow === "Import") {
      filtered = filtered.filter(port => 
        ["HSD", "Naptha", "Bitumen"].includes(port.product)
      );
    } else if (filters.tradeFlow === "Export") {
      filtered = filtered.filter(port => 
        !["HSD", "Naptha", "Bitumen"].includes(port.product)
      );
    }

    // Filter by product category
    if (filters.productCategory !== "Default: All") {
      if (filters.productCategory === "Multi-Select Specific") {
        filtered = filtered.filter(port => 
          ["HSD", "Naptha", "Bitumen"].includes(port.product)
        );
      }
    }

    // Filter by state (if selected)
    if (filters.selectedState) {
      const statePortMap: { [key: string]: string[] } = {
        "Maharashtra": ["Mumbai - JNPT", "Naptha", "Bitumen"],
        "Gujarat": ["Kandla"],
        "West Bengal": ["Kolkata-Haldia"],
        "Odisha": ["Paradip"],
        "Andhra Pradesh": ["Visakhapatnam"],
        "Tamil Nadu": ["Chennai", "Ennore", "Tuticorin"],
        "Kerala": ["Cochin"],
        "Karnataka": ["New Mangalore"],
        "Goa": ["Mormugao"],
        "Andaman & Nicobar": ["Port Blair"],
      };

      const statePorts = statePortMap[filters.selectedState] || [];
      filtered = filtered.filter(port => statePorts.includes(port.name));
    }

    // Calculate filtered metrics
    const totalVolume = filtered.reduce((sum, port) => {
      const vol = parseFloat(port.volume.replace(/[KM]/g, ""));
      return sum + (port.volume.includes("M") ? vol * 1000 : vol);
    }, 0);

    const totalValue = filtered.reduce((sum, port) => {
      const val = parseFloat(port.tradedValue.replace(/[KM]/g, ""));
      return sum + val;
    }, 0);

    const newMetrics: TradeMetrics = {
      totalVolume: `${Math.round(totalVolume)}K units`,
      totalValue: `${Math.round(totalValue)}K MT`,
      avgCost: `₹${Math.round(Math.random() * 50000 + 20000)}`,
      topPort: filtered[0]?.name || "N/A",
      volumeChange: filters.tradeFlow === "Export" ? 7.2 : 5.2,
      valueChange: filters.tradeFlow === "Export" ? 6.1 : 3.8,
      costChange: filters.tradeFlow === "Import" ? -2.3 : -1.5,
    };

    setFilteredPorts(filtered);
    setFilteredMetrics(newMetrics);
  };

  const updateFilter = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      dateRange: "Last Quarter",
      tradeFlow: "Import and Export",
      productCategory: "Default: All",
      dataSource: "Default: Multi Source",
    });
  };

  return {
    filters,
    filteredPorts,
    filteredMetrics,
    updateFilter,
    resetFilters,
  };
};
