import { motion } from "framer-motion";

type ClickerProps = {
    count: number;
    totalCount: number;
    clickValue: number;
    autoClickers: number;
    goldenActive: boolean;
    critExplosionActive: boolean; // Add this prop
    onClick: () => void;
};

export default function Clicker({
                                    count,
                                    totalCount,
                                    clickValue,
                                    autoClickers,
                                    goldenActive,
                                    critExplosionActive, // Destructure this prop
                                    onClick,
                                }: ClickerProps) {
    // Calculate auto clicks per second, including clickValue and goldenActive multiplier
    const autoClicksPerSecond = autoClickers * clickValue * (goldenActive ? 3 : 1);

    return (
        <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">Clicker Count: {count}</h1>
            <p className="text-lg text-white">
                Total Earned: <span className="font-semibold">{totalCount}</span>
            </p>
            <p className="text-lg text-white">
                Auto Clicks/sec: <span className="font-semibold">{autoClicksPerSecond}</span>
            </p>

            <motion.button
                onClick={onClick}
                whileTap={{ scale: 0.9, rotate: -5 }}
                whileHover={{
                    scale: 1.08,
                    textShadow: "0px 0px 8px rgba(255,255,255,0.9)",
                    boxShadow: "0px 0px 16px rgba(59,130,246,0.7)",
                }}
                transition={{ type: "spring", stiffness: 500, damping: 12 }}
                className={`relative px-8 py-4 rounded-2xl text-2xl font-bold shadow-xl transition-all 
        ${goldenActive ? "bg-yellow-400 text-white hover:bg-yellow-300" : critExplosionActive ? "bg-red-600 text-white hover:bg-red-700" : "bg-blue-600 text-white hover:bg-blue-700"}`}
            >
                <span className="drop-shadow-sm">
                    ✨ Click Me! (+{clickValue * (goldenActive ? 3 : 1)}) ✨
                </span>
                {/* Glowing pulse ring */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.6, 0, 0.6],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 1.5,
                        ease: "easeInOut",
                    }}
                    className="absolute inset-0 rounded-2xl border-4 border-blue-400 opacity-50 pointer-events-none"
                />
            </motion.button>
        </div>
    );
}
