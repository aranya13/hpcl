import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { trendData } from "@/lib/mockData";

const Trends = () => {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Trend Forecasting
          </h1>
          <p className="text-muted-foreground">
            Historical trends and predictive analytics for strategic planning
          </p>
        </div>

        {/* Line Chart */}
        <Card className="p-6 animate-fade-in">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Trade Volume Trends (Last 6 Months)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--foreground))" />
              <YAxis stroke="hsl(var(--foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.5rem",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="HSD"
                stroke="hsl(var(--chart-primary))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--chart-primary))" }}
              />
              <Line
                type="monotone"
                dataKey="Naptha"
                stroke="hsl(var(--chart-secondary))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--chart-secondary))" }}
              />
              <Line
                type="monotone"
                dataKey="Bitumen"
                stroke="hsl(var(--chart-accent))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--chart-accent))" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Bar Chart */}
        <Card className="p-6 animate-fade-in">
          <h3 className="text-lg font-semibold text-foreground mb-4">
            Product Comparison
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--foreground))" />
              <YAxis stroke="hsl(var(--foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "0.5rem",
                }}
              />
              <Legend />
              <Bar dataKey="HSD" fill="hsl(var(--chart-primary))" />
              <Bar dataKey="Naptha" fill="hsl(var(--chart-secondary))" />
              <Bar dataKey="Bitumen" fill="hsl(var(--chart-accent))" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Forecast Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-6 animate-fade-in">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">HSD Forecast</h3>
            <p className="text-2xl font-bold text-foreground">52K MT</p>
            <p className="text-xs text-green-600 mt-1">↑ 4% expected growth</p>
          </Card>
          <Card className="p-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Naptha Forecast</h3>
            <p className="text-2xl font-bold text-foreground">24K MT</p>
            <p className="text-xs text-green-600 mt-1">↑ 2% expected growth</p>
          </Card>
          <Card className="p-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Bitumen Forecast</h3>
            <p className="text-2xl font-bold text-foreground">16.5K MT</p>
            <p className="text-xs text-red-600 mt-1">↓ 3% expected decline</p>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Trends;
