import { Calendar, ArrowUpDown, Package, Database, ChevronDown, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FilterState } from "@/hooks/useFilters";

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  onReset?: () => void;
}

const FilterBar = ({ filters, onFilterChange, onReset }: FilterBarProps) => {
  const handleFilterChange = (type: keyof FilterState, value: string) => {
    onFilterChange(type, value);
  };

  return (
    <div className="bg-header/10 backdrop-blur-sm border-b border-border/50 py-4 px-6 animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">
          {filters.selectedState && (
            <span className="text-primary font-medium">
              Filtered by State: {filters.selectedState}
            </span>
          )}
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={onReset}
          className="gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Reset Filters
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Date Range */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-foreground font-medium text-sm">
            <Calendar className="w-4 h-4" />
            <span>Date Range</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between bg-secondary hover:bg-secondary/80 border-secondary-foreground/20">
                {filters.dateRange}
                <ChevronDown className="w-4 h-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem onClick={() => handleFilterChange("dateRange", "Last Quarter")}>
                Last Quarter
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilterChange("dateRange", "FY 2024-2025")}>
                FY 2024-2025
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilterChange("dateRange", "Custom Range")}>
                Custom Range
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Trade Flow */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-foreground font-medium text-sm">
            <ArrowUpDown className="w-4 h-4" />
            <span>Trade Flow</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between bg-secondary hover:bg-secondary/80 border-secondary-foreground/20">
                {filters.tradeFlow}
                <ChevronDown className="w-4 h-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem onClick={() => handleFilterChange("tradeFlow", "Import")}>
                Import
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilterChange("tradeFlow", "Export")}>
                Export
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilterChange("tradeFlow", "Import and Export")}>
                Import and Export
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Product Category */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-foreground font-medium text-sm">
            <Package className="w-4 h-4" />
            <span>Product Category</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between bg-secondary hover:bg-secondary/80 border-secondary-foreground/20">
                {filters.productCategory}
                <ChevronDown className="w-4 h-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem onClick={() => handleFilterChange("productCategory", "Default: All")}>
                Default: All
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilterChange("productCategory", "Multi-Select Specific")}>
                Multi-Select Specific
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilterChange("productCategory", "Special Categorized")}>
                Special Categorized
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Data Source */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-foreground font-medium text-sm">
            <Database className="w-4 h-4" />
            <span>Data Source</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full justify-between bg-secondary hover:bg-secondary/80 border-secondary-foreground/20">
                {filters.dataSource}
                <ChevronDown className="w-4 h-4 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem onClick={() => handleFilterChange("dataSource", "Default: Multi Source")}>
                Default: Multi Source
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilterChange("dataSource", "Select Specific Source")}>
                Select Specific Source
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleFilterChange("dataSource", "Refresh")}>
                Refresh
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
