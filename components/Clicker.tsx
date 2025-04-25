type ClickerProps = {
    count: number;
    totalCount: number;
    clickValue: number;
    autoClickers: number;
    goldenActive: boolean;
    onClick: () => void;
};

export default function Clicker({
                                    count,
                                    totalCount,
                                    clickValue,
                                    autoClickers,
                                    goldenActive,
                                    onClick,
                                }: ClickerProps) {
    const autoClicksPerSecond = autoClickers * (goldenActive ? 3 : 1);

    return (
        <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white">Clicker Count: {count}</h1>
            <p className="text-lg text-white">
                Total Earned: <span className="font-semibold">{totalCount}</span>
            </p>
            <p className="text-lg text-white">
                Auto Clicks/sec: <span className="font-semibold">{autoClicksPerSecond}</span>
            </p>
            <button
                onClick={onClick}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg text-xl hover:bg-blue-600 active:scale-105 transition"
            >
                Click Me! (+{clickValue * (goldenActive ? 3 : 1)})
            </button>
        </div>
    );
}
