import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Map, BarChart3, TrendingUp, Lightbulb, Layout } from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();

  const navItems = [
    { to: "/", icon: Layout, label: "Dashboard" },
    { to: "/port-map", icon: Map, label: "Port Map" },
    { to: "/matrix", icon: BarChart3, label: "P&C Matrix" },
    { to: "/insights", icon: Lightbulb, label: "Insights" },
    { to: "/trends", icon: TrendingUp, label: "Trends" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-primary/5 via-accent/5 to-transparent rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-secondary/5 via-chart-accent/5 to-transparent rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
      </div>

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-20 bg-sidebar border-r border-sidebar-border z-50 flex flex-col items-center py-6 gap-4">
        <div className="text-sidebar-foreground font-bold text-xl mb-6">
          HPCL
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "group relative flex flex-col items-center gap-1 p-3 rounded-lg transition-all hover:bg-sidebar-accent",
                isActive && "bg-sidebar-accent"
              )}
            >
              <Icon className={cn(
                "w-6 h-6 transition-colors",
                isActive ? "text-sidebar-accent-foreground" : "text-sidebar-foreground group-hover:text-sidebar-accent-foreground"
              )} />
              <span className={cn(
                "text-[10px] text-center transition-colors",
                isActive ? "text-sidebar-accent-foreground font-medium" : "text-sidebar-foreground/70 group-hover:text-sidebar-accent-foreground"
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </aside>

      {/* Main Content */}
      <main className="ml-20 min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
