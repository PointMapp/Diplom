import { motion } from "framer-motion";

export default function Sparkle({ x, y }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.6 }}
      className="pointer-events-none absolute"
      style={{
        top: y,
        left: x,
      }}
    >
      <div className="text-yellow-300 text-2xl drop-shadow-lg">✨</div>
    </motion.div>
  );
}
