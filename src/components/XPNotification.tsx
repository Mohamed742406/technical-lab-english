import { useState, useEffect } from "react";
import { Achievement } from "@/lib/gamification";

interface XPNotificationProps {
  xp: number;
  achievements: Achievement[];
  leveledUp: boolean;
  onDone: () => void;
}

const XPNotification = ({ xp, achievements, leveledUp, onDone }: XPNotificationProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onDone, 300);
    }, 3000);
    return () => clearTimeout(timer);
  }, [onDone]);

  if (!visible && !achievements.length) return null;

  return (
    <div className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}>
      {/* XP toast */}
      <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full font-bold text-sm shadow-lg animate-bounce">
        +{xp} XP ⭐
      </div>

      {/* Level up */}
      {leveledUp && (
        <div className="bg-accent text-accent-foreground px-5 py-2.5 rounded-xl font-bold text-base shadow-lg">
          🎉 ارتقيت مستوى!
        </div>
      )}

      {/* New achievements */}
      {achievements.map(ach => (
        <div key={ach.id} className="bg-card border border-accent/50 px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2">
          <span className="text-2xl">{ach.icon}</span>
          <div>
            <p className="font-bold text-accent text-sm">🏆 شارة جديدة!</p>
            <p className="text-xs text-foreground">{ach.title} — {ach.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default XPNotification;
