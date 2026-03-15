import { motion } from "framer-motion";

export default function ProgressCircle({ progress = 70, size = 130 }) {
  const radius = size / 2 - 10;
  const circumference = 2 * Math.PI * radius;
  const strokeOffset = circumference - (circumference * progress) / 100;

  return (
    <div className="relative flex items-center justify-center">
      <svg width={size} height={size}>
        {/* Фоновая линия */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#2d2d2d"
          strokeWidth="10"
          fill="none"
        />

        {/* Анимированная линия */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#gradient)"
          strokeWidth="10"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeOffset}
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: strokeOffset }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      </svg>

      {/* Градиент */}
      <svg width="0" height="0">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
      </svg>

      {/* Число внутри круга */}
      <span className="absolute text-2xl font-bold">{progress}%</span>
    </div>
  );
}
