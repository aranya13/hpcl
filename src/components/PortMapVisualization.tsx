import IndiaMap from "./IndiaMap";

interface PortMapVisualizationProps {
  onStateClick?: (state: string) => void;
}

const PortMapVisualization = ({ onStateClick }: PortMapVisualizationProps) => {
  return (
    <div className="bg-card rounded-lg shadow-lg border border-border h-[500px] animate-fade-in">
      <IndiaMap onStateClick={onStateClick} />
    </div>
  );
};

export default PortMapVisualization;
