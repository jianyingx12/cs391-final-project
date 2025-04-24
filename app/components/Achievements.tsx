interface Achievement {
    title: string;
    condition: boolean;
}

interface AchievementsProps {
    count: number;
    autoClickers: number;
}

export default function Achievements({ count, autoClickers }: AchievementsProps) {
    const achievements: Achievement[] = [
        { title: "🎉 Getting Started (10 Clicks)", condition: count >= 10 },
        { title: "⚡ Click Machine (50 Clicks)", condition: count >= 50 },
        { title: "🤖 Automation Nation (5 Auto Clickers)", condition: autoClickers >= 5 },
    ];

    return (
        <div className="bg-white shadow-md rounded-lg p-4 mt-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-2">🏆 Achievements</h2>
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
