type SessionSummaryProps = {
    totalClicks: number;
    totalSpent: number;
    timePlayed: number;
    autoClickers: number;
    critChance: number;
    critMultiplier: number;
    onClose: () => void;
};

function format(ms: number) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}m ${seconds}s`;
}

export default function Summary({
                                    totalClicks,
                                    totalSpent,
                                    timePlayed,
                                    autoClickers,
                                    critChance,
                                    critMultiplier,
                                    onClose,
                                }: SessionSummaryProps) {
    return (
        <div className="bg-white/70 backdrop-blur-md p-8 rounded-2xl w-96 text-center shadow-2xl transform transition-all duration-500 ease-in-out animate-fade-in-up">
            <h2 className="text-3xl font-extrabold mb-6 text-black">Game Stats</h2>

            <div className="space-y-2 text-lg text-black">
                <div>
                    <span className="font-semibold">Total Clicks:</span> {totalClicks}
                </div>
                <div>
                    <span className="font-semibold">Total Spent:</span> {totalSpent}
                </div>
                <div>
                    <span className="font-semibold">Time Played:</span> {format(timePlayed)}
                </div>
            </div>

            <hr className="my-6 border-gray-300" />

            <div className="space-y-2 text-lg text-black">
                <div>
                    <span className="font-semibold">Auto Clickers:</span> {autoClickers}
                </div>
                <div>
                    <span className="font-semibold">Critical Chance:</span> {(critChance * 100).toFixed(1)}%
                </div>
                <div>
                    <span className="font-semibold">Critical Multiplier:</span> {critMultiplier}x
                </div>
            </div>

            <button
                onClick={onClose}
                className="mt-8 w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition duration-300"
            >
                Close
            </button>
        </div>
    );
}
