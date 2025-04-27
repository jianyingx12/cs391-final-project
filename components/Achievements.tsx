type Achievement = {
    title: string;
    condition: boolean;
};

type AchievementsProps = {
    totalCount: number;
    autoClickers: number;
    critCount: number;
    totalSpent: number;
};

export default function Achievements({ totalCount, autoClickers, critCount, totalSpent }: AchievementsProps) {
    const achievements: Achievement[] = [
        { title: "🎉 Getting Started (10 Clicks)", condition: totalCount >= 10 },
        { title: "⚡ Click Machine (50 Clicks)", condition: totalCount >= 50 },
        { title: "🌟 Crit Master (10 Criticals)", condition: critCount >= 10 },
        { title: "💵 Big Spender (Spend 1,000 Clicks)", condition: totalSpent >= 1000 },
        { title: "🤖 Automation Nation (5 Auto Clickers)", condition: autoClickers >= 5 },
    ];

    return (
        <div className="bg-white shadow-md rounded-lg p-4 mt-6 w-full max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-2 text-black">🏆 Achievements</h2>
            <ul className="list-disc list-inside space-y-1">
                {achievements.map((ach, index) => (
                    <li key={index} className={ach.condition ? "text-green-600 font-semibold" : "text-gray-400"}>
                        {ach.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}
