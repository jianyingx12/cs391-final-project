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
        <div className="bg-white p-8 rounded-lg w-80 text-center shadow-lg
      transform transition-all duration-500 ease-in-out
      scale-90 opacity-0 animate-fade-in-up">
            <h2 className="text-2xl font-bold mb-4 text-black">Summary</h2>
            <p className="text-lg text-black">Total Button Clicks: {totalClicks}</p>
            <p className="text-lg text-black">Total Spent: {totalSpent}</p>
            <p className="text-lg text-black">Time Played: {format(timePlayed)}</p>
            <hr className="my-4" />
            <p className="text-lg text-black">Auto Clickers: {autoClickers}</p>
            <p className="text-lg text-black">Critical Chance: {(critChance * 100).toFixed(1)}%</p>
            <p className="text-lg text-black">Critical Multiplier: {critMultiplier}x</p>
            <button
                onClick={onClose}
                className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Close
            </button>
        </div>
    );
}
