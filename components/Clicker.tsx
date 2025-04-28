/**
 * Author: Jianying Liu
 * Purpose: Clicker comp for the game
 * - display the user's click count, total clicks earned, and also the auto clicks/sec
 * - a click button with animation that uses framer motion
 * - change how the button looks depending on different modes (golden touch and crit explosion)
 */

import { motion } from "framer-motion";

type ClickerProps = {
    count: number; // current number of clicks
    totalCount: number; // total clicks earned throughout playthrough
    clickValue: number; // value of one click
    autoClickers: number; // number of auto clickers purchased
    goldenActive: boolean; // golden touch is active or not
    critExplosionActive: boolean; // crit explosion active or not
    onClick: () => void;
};

export default function Clicker({
                                    count,
                                    totalCount,
                                    clickValue,
                                    autoClickers,
                                    goldenActive,
                                    critExplosionActive, 
                                    onClick,
                                }: ClickerProps) {

    // Calculate auto clicks per second, including clickValue and goldenActive multiplier
    const autoClicksPerSecond = autoClickers * clickValue * (goldenActive ? 3 : 1);

    return (
        <div className="text-center"> {/* container for all clicker info */}
            <h1 className="text-4xl font-bold text-white">Clicker Count: {count}</h1>
            <p className="text-lg text-white">
                Total Earned: <span className="font-semibold">{totalCount}</span>
            </p>
            <p className="text-lg text-white">
                Auto Clicks/sec: <span className="font-semibold">{autoClicksPerSecond}</span>
            </p>

            {/* Button with framer motion animations */}
            <motion.button
                onClick={onClick}
                whileTap={{ scale: 0.9, rotate: -5 }} // animation when tapping
                whileHover={{
                    scale: 1.08, // scale up when hovering
                }}
                transition={{ type: "spring", stiffness: 500, damping: 100 }} // spring movement
                className={`px-8 py-4 rounded-2xl text-2xl font-bold shadow-xl transition-all 
                ${goldenActive ? "bg-yellow-400 text-white hover:bg-yellow-300" // color change on mode
                    : critExplosionActive ? "bg-red-600 text-white hover:bg-red-700" 
                    : "bg-blue-600 text-white hover:bg-blue-700"}`} 
            >
                <span className="drop-shadow-sm">
                    ✨ Click Me! (+{clickValue * (goldenActive ? 3 : 1)}) ✨
                </span>
                {/* pulse ring for button */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1], // grow and shrink
                        opacity: [0.6, 0, 0.6], // fade
                    }}
                    transition={{
                        repeat: Infinity, // loop
                        duration: 1.5, // 1 pulse 
                        ease: "easeInOut", 
                    }}
                    className="rounded-2xl border-4 border-blue-400 opacity-50"
                />
            </motion.button>
        </div>
    );
}
