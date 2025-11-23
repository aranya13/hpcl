import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import FilterBar from "@/components/FilterBar";
import MetricCard from "@/components/MetricCard";
import PortTable from "@/components/PortTable";
import { useFilters } from "@/hooks/useFilters";
import { useToast } from "@/hooks/use-toast";
import { PortData } from "@/lib/mockData";

const Index = () => {
  const { filters, filteredPorts, filteredMetrics, updateFilter, resetFilters } = useFilters();
  const { toast } = useToast();
  const [hoveredPort, setHoveredPort] = useState<PortData | null>(null);
  const [selectedPort, setSelectedPort] = useState<PortData | null>(null);

  // Port coordinates (adjust x, y percentages based on your image.jpg)
  // These coordinates match the actual port names from mockData.ts
  const portCoordinates: { [key: string]: { x: number; y: number } } = {
    "Mumbai - JNPT": { x: 36, y: 59 },
    "Kandla": { x: 30, y: 46 },
    "Kolkata-Haldia": { x: 62, y: 47 },
    "Paradip": { x: 59, y: 51 },
    "Visakhapatnam": { x: 53, y: 64 },
    "Chennai": { x: 48.5, y: 78.8 },
    "Ennore": { x: 48.4, y: 76.9 },
    "Tuticorin": { x: 45  , y: 90 },
    "Cochin": { x: 42, y: 87 },
    "New Mangalore": { x: 39, y: 78 },
    "Mormugao": { x: 37, y: 68 },
    "Port Blair": { x: 66, y: 84 },
  };

  const handleReset = () => {
    resetFilters();
    toast({
      title: "Filters Reset",
      description: "All filters have been reset to default values",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 p-6">
        {/* Header */}
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Port-wise Export & Import Dashboard
          </h1>
          <p className="text-muted-foreground">
            Real-time 360° view of India's trade landscape
          </p>
        </div>

        {/* Filters */}
        <FilterBar 
          filters={filters}
          onFilterChange={updateFilter}
          onReset={handleReset}
        />

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Total Trade Volume"
            value={filteredMetrics.totalVolume}
            change={filteredMetrics.volumeChange}
          />
          <MetricCard
            title="Total Trade Value"
            value={filteredMetrics.totalValue}
            change={filteredMetrics.valueChange}
          />
          <MetricCard
            title="Avg Landed Cost"
            value={filteredMetrics.avgCost}
            change={filteredMetrics.costChange}
          />
          <MetricCard
            title="Top Active Port"
            value={filteredMetrics.topPort}
          />
        </div>

        {/* Main Content Grid - Map is now larger */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 h-full min-h-[700px]"> 
          {/* Port Table - Takes less space now */}
          <div className="lg:col-span-1 h-full"> 
            <PortTable ports={filteredPorts} title={filters.selectedState ? `${filters.selectedState} Ports` : "All Ports"} />
          </div>

          {/* Map Visualization - Takes more space (4 columns instead of 2) */}
          <div className="lg:col-span-4 h-full">
            <div className="bg-card rounded-lg shadow-lg border border-border p-4 animate-fade-in h-full flex flex-col min-h-[650px]"> 
              {/* Map Title/Header */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-foreground">India Port Map</h3>
                <p className="text-sm text-muted-foreground">Click on port markers to view details</p>
              </div>
              
              {/* Map Image Container - Large and responsive */}
              <div className="relative w-full bg-muted/30 rounded-lg overflow-hidden flex-1 min-h-[600px]"> 
                {/* India Map Image */}
                <img src="/image.jpg" alt="India Map" className="absolute inset-0 w-full h-full object-contain" />
                
                {/* Port Markers */}
                {filteredPorts.map((port, index) => {
                  const coords = portCoordinates[port.name];
                  if (!coords) return null;
                  const isSelected = selectedPort?.name === port.name;
                  const isHovered = hoveredPort?.name === port.name;
                  
                  return (
                    <div
                      key={`${port.name}-${index}`}
                      onMouseEnter={() => setHoveredPort(port)}
                      onMouseLeave={() => setHoveredPort(null)}
                      onClick={() => {
                        setSelectedPort(isSelected ? null : port);
                        toast({
                          title: port.name,
                          description: `${port.product} | ${port.tradedValue} | ${port.volume} vol`,
                        });
                      }}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                      style={{ 
                        left: `${coords.x}%`, 
                        top: `${coords.y}%`,
                        zIndex: isSelected ? 100 : isHovered ? 50 : 10
                      }}
                    >
                      {/* Port Dot */}
                      <div className="relative">
                        <div 
                          className={`w-5 h-5 rounded-full border-2 border-white shadow-lg transition-all ${
                            isSelected 
                              ? "bg-blue-600 scale-150" 
                              : isHovered 
                              ? "bg-red-600 scale-125" 
                              : "bg-red-500"
                          } ${!isSelected ? "animate-pulse" : ""}`} 
                        />
                        {/* Hover/Selected Tooltip */}
                        {(isHovered || isSelected) && (
                          <div className={`absolute left-7 top-0 bg-popover text-popover-foreground px-3 py-2 rounded-lg shadow-xl whitespace-nowrap text-sm z-50 border ${
                            isSelected ? "bg-primary/10 border-primary" : ""
                          }`}>
                            <p className="font-semibold">{port.name}</p>
                            <p className="text-muted-foreground text-xs">Product: {port.product}</p>
                            <p className="text-primary text-xs mt-1">Value: {port.tradedValue}</p>
                            <p className="text-muted-foreground text-xs">Volume: {port.volume}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
                
                {/* Selected Port Info Overlay */}
                {selectedPort && (
                  <div className="absolute bottom-4 left-4 bg-popover/95 backdrop-blur-sm text-popover-foreground px-4 py-3 rounded-lg shadow-xl border z-50 max-w-xs animate-fade-in">
                    <h4 className="font-semibold text-foreground mb-2">Selected Port</h4>
                    <div className="space-y-1 text-sm">
                      <p><span className="font-medium">Name:</span> {selectedPort.name}</p>
                      <p><span className="font-medium">Product:</span> {selectedPort.product}</p>
                      <p><span className="font-medium">Value:</span> {selectedPort.tradedValue}</p>
                      <p><span className="font-medium">Volume:</span> {selectedPort.volume}</p>
                      <p><span className="font-medium">Location:</span> {selectedPort.lat}°N, {selectedPort.lng}°E</p>
                    </div>
                    <button
                      onClick={() => setSelectedPort(null)}
                      className="mt-2 text-xs text-primary hover:underline"
                    >
                      Clear Selection
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        {filteredPorts.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-lg">No ports found with current filter criteria</p>
            <p className="text-sm mt-2">Try adjusting your filters or reset to default</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Index;