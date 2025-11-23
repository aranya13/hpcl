import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { ports, productCategories } from "@/lib/mockData";

const Matrix = () => {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Product & Cost Matrix
          </h1>
          <p className="text-muted-foreground">
            Commercial evaluation with integrated cost metrics
          </p>
        </div>

        <Card className="p-6 animate-fade-in overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-3 font-semibold text-foreground">Product</th>
                <th className="text-left p-3 font-semibold text-foreground">Port</th>
                <th className="text-right p-3 font-semibold text-foreground">Volume (MT)</th>
                <th className="text-right p-3 font-semibold text-foreground">Value</th>
                <th className="text-right p-3 font-semibold text-foreground">Avg Cost/MT</th>
                <th className="text-right p-3 font-semibold text-foreground">Freight Cost</th>
                <th className="text-right p-3 font-semibold text-foreground">Duties</th>
              </tr>
            </thead>
            <tbody>
              {ports.slice(0, 10).map((port, index) => (
                <tr key={index} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                  <td className="p-3 text-foreground">{port.product}</td>
                  <td className="p-3 text-foreground">{port.name}</td>
                  <td className="p-3 text-right text-foreground">{port.tradedValue}</td>
                  <td className="p-3 text-right text-primary font-medium">{port.volume}</td>
                  <td className="p-3 text-right text-foreground">₹{(Math.random() * 50000 + 20000).toFixed(0)}</td>
                  <td className="p-3 text-right text-muted-foreground">₹{(Math.random() * 5000 + 1000).toFixed(0)}</td>
                  <td className="p-3 text-right text-muted-foreground">{(Math.random() * 15 + 5).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* Cost Analysis Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 animate-fade-in">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Freight Cost</h3>
            <p className="text-2xl font-bold text-foreground">₹2.8M</p>
            <p className="text-xs text-green-600 mt-1">↓ 3.2% vs last quarter</p>
          </Card>
          <Card className="p-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Average Duties</h3>
            <p className="text-2xl font-bold text-foreground">8.4%</p>
            <p className="text-xs text-red-600 mt-1">↑ 1.1% vs last quarter</p>
          </Card>
          <Card className="p-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Best Value Port</h3>
            <p className="text-2xl font-bold text-foreground">Paradip</p>
            <p className="text-xs text-muted-foreground mt-1">Lowest cost per MT</p>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Matrix;
