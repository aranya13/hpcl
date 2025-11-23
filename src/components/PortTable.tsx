import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PortData } from "@/lib/mockData";

interface PortTableProps {
  ports: PortData[];
  title?: string;
}

const PortTable = ({ ports, title = "Mumbai Port" }: PortTableProps) => {
  const [showAll, setShowAll] = useState(false);
  const displayPorts = showAll ? ports : ports.slice(0, 3);

  return (
    <div className="bg-card rounded-lg shadow-lg overflow-hidden border border-border animate-fade-in">
      <div className="bg-primary px-4 py-3">
        <h3 className="text-primary-foreground font-semibold">{title}</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-primary/90">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-primary-foreground">
                Port/Product
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-primary-foreground">
                Traded Value
              </th>
            </tr>
          </thead>
          <tbody>
            {displayPorts.map((port, index) => (
              <tr
                key={index}
                className="border-b border-border hover:bg-muted/50 transition-colors"
              >
                <td className="px-4 py-3 text-sm text-card-foreground">
                  {port.name}
                </td>
                <td className="px-4 py-3 text-sm text-card-foreground">
                  {port.tradedValue} | {port.product}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {ports.length > 3 && (
        <div className="px-4 py-3 bg-muted/30">
          <Button
            variant="ghost"
            onClick={() => setShowAll(!showAll)}
            className="w-full text-primary hover:text-primary hover:bg-primary/10"
          >
            {showAll ? "Show less" : "Show more"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default PortTable;
