/**
 * Author: Isa Alsafwah
 * Purpose: display list of achievements based on player stats
 * highlighted green if achieved, gray if not
 */

// type with the title of achievement and whether its met
type Achievement = {
    title: string;
    condition: boolean;
};


type AchievementsProps = {
    totalCount: number; // number of manual clicks made
    autoClickers: number; // number of autoclicks made
    critCount: number; // number of critical counts
    totalSpent: number; // number of clicks spent
};

export default function Achievements({ totalCount, autoClickers, critCount, totalSpent }: AchievementsProps) {
    // list of achievements with their conditions   
    const achievements: Achievement[] = [
        { title: "🎉 Getting Started (10 Clicks)", condition: totalCount >= 10 },
        { title: "⚡ Click Machine (50 Clicks)", condition: totalCount >= 50 },
        { title: "🌟 Crit Master (100 Criticals)", condition: critCount >= 100 },
        { title: "💵 Big Spender (Spend 10,000 Clicks)", condition: totalSpent >= 10000 },
        { title: "🤖 Automation Nation (5 Auto Clickers)", condition: autoClickers >= 5 },
        { title: "🤑 Millionaire (Spend 1,000,000 Clicks)", condition: totalSpent >= 1000000 },
    ];

    return (
        <div className="shadow-md rounded-lg p-4 w-full  h-full
        bg-white/10 backdrop-blur-md 
        border border-white/40">
            <h2 className="text-xl font-bold mb-2 text-white">🏆 Achievements</h2>
            <ul className="list-disc list-inside space-y-1">
                {achievements.map((ach, index) => (
                    // render in green if achievement is met, gray if not
                    <li key={index} className={ach.condition ? "text-green-400 font-semibold" : "text-gray-400"}>
                        {ach.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}
