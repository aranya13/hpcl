import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  change?: number;
  className?: string;
}

const MetricCard = ({ title, value, change, className }: MetricCardProps) => {
  return (
    <div className={cn(
      "bg-accent/90 backdrop-blur-sm rounded-lg p-6 border border-accent-foreground/10 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 animate-fade-in",
      className
    )}>
      <h3 className="text-sm font-medium text-accent-foreground/70 mb-2">
        {title}
      </h3>
      <div className="flex items-end justify-between">
        <p className="text-2xl font-bold text-accent-foreground">
          {value}
        </p>
        {change !== undefined && (
          <div className={cn(
            "flex items-center gap-1 text-sm font-medium",
            change > 0 ? "text-green-600" : "text-red-600"
          )}>
            {change > 0 ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            <span>{Math.abs(change)}%</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;
