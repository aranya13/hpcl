import { useState } from "react";
import { ports } from "@/lib/mockData";
import { Card } from "@/components/ui/card";

interface IndiaMapProps {
  onStateClick?: (state: string) => void;
}

const IndiaMap = ({ onStateClick }: IndiaMapProps) => {
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [selectedState, setSelectedState] = useState<string | null>(null);

  const handleStateClick = (state: string) => {
    setSelectedState(state);
    onStateClick?.(state);
  };

  // Indian states with their SVG paths (simplified but accurate positioning)
  const states = [
    { name: "Jammu & Kashmir", path: "M 200 50 L 240 40 L 280 50 L 290 70 L 280 90 L 240 85 L 210 75 Z", ports: [] },
    { name: "Himachal Pradesh", path: "M 240 85 L 280 90 L 290 105 L 270 115 L 250 110 L 235 100 Z", ports: [] },
    { name: "Punjab", path: "M 210 75 L 240 85 L 235 100 L 220 110 L 200 105 L 195 85 Z", ports: [] },
    { name: "Uttarakhand", path: "M 270 115 L 290 105 L 310 115 L 305 130 L 285 135 L 270 125 Z", ports: [] },
    { name: "Haryana", path: "M 220 110 L 235 100 L 250 110 L 255 125 L 240 130 L 225 125 Z", ports: [] },
    { name: "Delhi", path: "M 240 130 L 245 125 L 250 130 L 245 135 Z", ports: [] },
    { name: "Rajasthan", path: "M 195 85 L 200 105 L 220 110 L 225 125 L 240 130 L 235 180 L 210 190 L 180 170 L 170 130 L 180 100 Z", ports: [] },
    { name: "Uttar Pradesh", path: "M 240 130 L 255 125 L 270 125 L 285 135 L 310 140 L 330 155 L 325 175 L 310 185 L 285 180 L 260 175 L 240 165 L 235 145 Z", ports: [] },
    { name: "Bihar", path: "M 310 185 L 325 175 L 350 180 L 365 190 L 360 205 L 340 210 L 320 205 L 310 195 Z", ports: [] },
    { name: "Jharkhand", path: "M 320 205 L 340 210 L 345 225 L 335 240 L 315 235 L 310 220 Z", ports: [] },
    { name: "West Bengal", path: "M 360 205 L 365 190 L 385 195 L 395 210 L 390 230 L 375 240 L 360 235 L 355 220 Z", ports: ["Kolkata-Haldia"] },
    { name: "Sikkim", path: "M 385 195 L 390 190 L 395 195 L 390 200 Z", ports: [] },
    { name: "Arunachal Pradesh", path: "M 395 195 L 420 185 L 445 190 L 450 205 L 435 215 L 410 210 L 395 205 Z", ports: [] },
    { name: "Nagaland", path: "M 435 215 L 445 210 L 455 220 L 450 230 L 440 225 Z", ports: [] },
    { name: "Manipur", path: "M 440 225 L 450 230 L 448 240 L 440 238 L 435 232 Z", ports: [] },
    { name: "Mizoram", path: "M 435 232 L 440 238 L 438 248 L 430 245 L 428 238 Z", ports: [] },
    { name: "Tripura", path: "M 390 230 L 395 235 L 393 245 L 385 243 L 383 236 Z", ports: [] },
    { name: "Meghalaya", path: "M 395 210 L 410 210 L 415 220 L 408 228 L 395 225 L 390 218 Z", ports: [] },
    { name: "Assam", path: "M 395 205 L 410 210 L 435 215 L 440 225 L 430 235 L 410 238 L 395 235 L 390 225 L 390 218 Z", ports: [] },
    { name: "Gujarat", path: "M 170 130 L 180 170 L 175 200 L 165 230 L 155 240 L 140 235 L 130 215 L 125 185 L 135 160 L 150 140 Z", ports: ["Kandla"] },
    { name: "Madhya Pradesh", path: "M 210 190 L 235 180 L 260 175 L 285 180 L 290 200 L 280 230 L 260 245 L 235 240 L 215 230 L 200 215 Z", ports: [] },
    { name: "Chhattisgarh", path: "M 285 180 L 310 185 L 320 205 L 315 235 L 300 245 L 280 240 L 280 230 L 290 200 Z", ports: [] },
    { name: "Odisha", path: "M 315 235 L 335 240 L 345 255 L 350 275 L 340 290 L 320 285 L 305 270 L 300 250 Z", ports: ["Paradip"] },
    { name: "Maharashtra", path: "M 155 240 L 165 230 L 175 200 L 200 215 L 215 230 L 235 240 L 240 260 L 235 285 L 210 300 L 180 295 L 160 280 L 150 260 Z", ports: ["Mumbai - JNPT", "Naptha", "Bitumen"] },
    { name: "Goa", path: "M 150 260 L 160 280 L 155 290 L 145 285 L 143 273 Z", ports: ["Mormugao"] },
    { name: "Karnataka", path: "M 160 280 L 180 295 L 185 320 L 175 350 L 160 360 L 145 355 L 140 330 L 145 305 L 155 290 Z", ports: ["New Mangalore"] },
    { name: "Andhra Pradesh", path: "M 240 260 L 260 245 L 280 240 L 300 250 L 320 285 L 315 310 L 295 330 L 270 325 L 250 310 L 240 285 Z", ports: ["Visakhapatnam"] },
    { name: "Telangana", path: "M 240 260 L 235 285 L 240 300 L 260 305 L 270 290 L 260 275 L 250 265 Z", ports: [] },
    { name: "Tamil Nadu", path: "M 250 310 L 270 325 L 275 345 L 270 370 L 250 385 L 230 380 L 215 365 L 210 340 L 220 320 Z", ports: ["Chennai", "Ennore", "Tuticorin"] },
    { name: "Kerala", path: "M 160 360 L 175 350 L 185 365 L 185 390 L 175 410 L 160 415 L 150 400 L 145 380 L 150 365 Z", ports: ["Cochin"] },
    { name: "Puducherry", path: "M 265 360 L 270 355 L 275 360 L 270 365 Z", ports: [] },
    { name: "Andaman & Nicobar", path: "M 420 340 L 430 330 L 440 340 L 445 360 L 435 380 L 425 385 L 415 375 L 412 355 Z", ports: ["Port Blair"] },
    { name: "Lakshadweep", path: "M 95 330 L 102 325 L 108 330 L 105 338 L 98 340 Z", ports: [] },
  ];

  // Get ports by state
  const getPortsInState = (stateName: string) => {
    const state = states.find(s => s.name === stateName);
    return state?.ports || [];
  };

  return (
    <div className="relative w-full h-full">
      <svg viewBox="0 0 550 450" className="w-full h-full">
        {/* Ocean background */}
        <rect x="0" y="0" width="550" height="450" fill="hsl(var(--chart-primary) / 0.05)" />
        
        {/* States */}
        {states.map((state) => (
          <g key={state.name}>
            <path
              d={state.path}
              fill={selectedState === state.name ? "hsl(var(--chart-accent))" : "hsl(var(--secondary))"}
              stroke="hsl(var(--primary))"
              strokeWidth="1.5"
              className="transition-all cursor-pointer hover:opacity-80"
              opacity={hoveredState === state.name || selectedState === state.name ? "0.9" : "0.6"}
              onMouseEnter={() => setHoveredState(state.name)}
              onMouseLeave={() => setHoveredState(null)}
              onClick={() => handleStateClick(state.name)}
            />
          </g>
        ))}

        {/* Port markers */}
        {ports.map((port, index) => {
          // Map ports to coordinates based on their location
          const portCoordinates: { [key: string]: { x: number; y: number } } = {
            "Mumbai - JNPT": { x: 190, y: 270 },
            "Naptha": { x: 195, y: 275 },
            "Bitumen": { x: 185, y: 275 },
            "Kandla": { x: 145, y: 185 },
            "Kolkata-Haldia": { x: 380, y: 220 },
            "Paradip": { x: 330, y: 270 },
            "Visakhapatnam": { x: 300, y: 300 },
            "Chennai": { x: 255, y: 355 },
            "Ennore": { x: 260, y: 348 },
            "Tuticorin": { x: 240, y: 380 },
            "Cochin": { x: 168, y: 390 },
            "New Mangalore": { x: 155, y: 340 },
            "Mormugao": { x: 148, y: 280 },
            "Port Blair": { x: 428, y: 365 },
          };

          const coords = portCoordinates[port.name];
          if (!coords) return null;

          return (
            <g key={index}>
              {/* Port marker */}
              <circle
                cx={coords.x}
                cy={coords.y}
                r="5"
                fill="hsl(var(--chart-accent))"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                className="hover:opacity-80 transition-opacity cursor-pointer animate-pulse"
              />
              
              {/* Port label */}
              <text
                x={coords.x + 10}
                y={coords.y + 4}
                fontSize="9"
                fill="hsl(var(--foreground))"
                className="pointer-events-none font-semibold"
              >
                {port.name.split("-")[0].split(" ")[0]}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Hover/Selected State Info */}
      {(hoveredState || selectedState) && (
        <Card className="absolute top-4 right-4 p-4 bg-card/95 backdrop-blur-sm border-border shadow-lg animate-fade-in">
          <h4 className="font-semibold text-foreground mb-2">
            {hoveredState || selectedState}
          </h4>
          {getPortsInState(hoveredState || selectedState || "").length > 0 ? (
            <div>
              <p className="text-xs text-muted-foreground mb-1">Active Ports:</p>
              <ul className="text-xs space-y-1">
                {getPortsInState(hoveredState || selectedState || "").map((port, idx) => (
                  <li key={idx} className="text-primary font-medium">• {port}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-xs text-muted-foreground">No active ports</p>
          )}
        </Card>
      )}

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm rounded-lg p-3 border border-border">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-4 h-4 bg-secondary/60 border-2 border-primary" />
            <span className="text-foreground">States</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-4 h-4 rounded-full bg-chart-accent border-2 border-primary animate-pulse" />
            <span className="text-foreground">Active Ports</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-4 h-4 bg-chart-accent border-2 border-primary" />
            <span className="text-foreground">Selected State</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndiaMap;
