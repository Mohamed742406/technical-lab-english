import { Gauge } from "lucide-react";

interface SpeedControlProps {
  speed: number;
  onSpeedChange: (speed: number) => void;
}

const speeds = [
  { value: 0.5, label: "بطيء جداً" },
  { value: 0.7, label: "بطيء" },
  { value: 1.0, label: "عادي" },
  { value: 1.3, label: "سريع" },
];

const SpeedControl = ({ speed, onSpeedChange }: SpeedControlProps) => {
  return (
    <div className="flex items-center gap-1.5">
      <Gauge size={14} className="text-muted-foreground" />
      {speeds.map((s) => (
        <button
          key={s.value}
          onClick={() => onSpeedChange(s.value)}
          className={`px-2 py-1 rounded-md text-xs font-semibold transition-all ${
            speed === s.value
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-muted-foreground hover:text-foreground"
          }`}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
};

export default SpeedControl;
