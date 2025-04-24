import { motion } from "framer-motion";

interface ClickerProps {
    count: number;
    clickValue: number;
    autoClickers: number;
    goldenActive: boolean;
    onClick: () => void;
}

export default function Clicker({
                                    count,
                                    clickValue,
                                    autoClickers,
                                    goldenActive,
                                    onClick,
                                }: ClickerProps) {
    const autoClicksPerSecond = autoClickers * (goldenActive ? 3 : 1);

    return (
        <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold">Clicker Count: {count}</h1>
            <p className="text-lg text-gray-700">
                Auto Clicks/sec: <span className="font-semibold">{autoClicksPerSecond}</span>
            </p>
            <motion.button
                whileTap={{ scale: 1.1 }}
                onClick={onClick}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg text-xl hover:bg-blue-600 transition"
            >
                Click Me! (+{clickValue * (goldenActive ? 3 : 1)})
            </motion.button>
        </div>
    );
}


