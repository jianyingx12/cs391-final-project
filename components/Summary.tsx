type SessionSummaryProps = {
    totalClicks: number;
    totalSpent: number;
    timePlayed: number;
    onClose: () => void;
  };
  
function format(ms: number) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}m ${seconds}s`;
}
  
export default function Summary({totalClicks, totalSpent, timePlayed, onClose }: SessionSummaryProps) {
  return (
    <main className="fixed top-0 left-0 w-screen h-screen bg-black flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg w-80 text-center">
        <h2 className="text-2xl font-bold mb-4 text-black">Summary</h2>
        <p className="text-lg text-black">Total Button Clicks: {totalClicks}</p>
        <p className="text-lg text-black">Total Spent: {totalSpent}</p>
        <p className="text-lg text-black">Time Played: {format(timePlayed)}</p>
        <button
          onClick={onClose}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </main>
  );
}
  