import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Lightbulb, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";

const Insights = () => {
  const insights = [
    {
      type: "opportunity",
      icon: TrendingUp,
      title: "Underutilized Route Identified",
      description: "Kandla-HSD route shows 30% lower congestion than Mumbai with similar cost structure. Consider increasing volume allocation.",
      impact: "High",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      type: "alert",
      icon: AlertCircle,
      title: "Rising Landed Cost - Bitumen",
      description: "Average landed cost for Bitumen increased by 12% this quarter. Freight charges from New Mangalore port contributing significantly.",
      impact: "Medium",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
    },
    {
      type: "success",
      icon: CheckCircle,
      title: "Cost Optimization Success",
      description: "Naptha sourcing through Paradip reduced overall costs by 8.5% compared to previous quarter. Strategy working effectively.",
      impact: "High",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      type: "recommendation",
      icon: Lightbulb,
      title: "Strategic Port Diversification",
      description: "Current 65% dependence on Mumbai ports. Recommend gradual shift to Visakhapatnam and Chennai for better risk distribution.",
      impact: "Medium",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="animate-fade-in">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Actionable Insights
          </h1>
          <p className="text-muted-foreground">
            AI-powered recommendations for strategic decision making
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {insights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <Card
                key={index}
                className="p-6 hover:shadow-lg transition-all animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex gap-4">
                  <div className={`p-3 rounded-lg ${insight.bgColor} flex-shrink-0`}>
                    <Icon className={`w-6 h-6 ${insight.color}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-foreground">
                        {insight.title}
                      </h3>
                      <span className={`text-xs font-medium px-3 py-1 rounded-full ${insight.bgColor} ${insight.color}`}>
                        {insight.impact} Impact
                      </span>
                    </div>
                    <p className="text-muted-foreground">
                      {insight.description}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <Card className="p-6 animate-fade-in">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Insights Generated</h3>
            <p className="text-3xl font-bold text-foreground">24</p>
            <p className="text-xs text-muted-foreground mt-1">This quarter</p>
          </Card>
          <Card className="p-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Actions Implemented</h3>
            <p className="text-3xl font-bold text-foreground">18</p>
            <p className="text-xs text-green-600 mt-1">75% implementation rate</p>
          </Card>
          <Card className="p-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Cost Savings</h3>
            <p className="text-3xl font-bold text-foreground">₹4.2M</p>
            <p className="text-xs text-green-600 mt-1">From insight-driven decisions</p>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Insights;
