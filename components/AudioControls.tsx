import { useRef, useState } from "react";

export default function AudioControls() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);

    const toggleAudio = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.volume = volume;
            audio.play().catch(() => {});
        }
        setIsPlaying(!isPlaying);
    };

    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVol = parseFloat(e.target.value);
        setVolume(newVol);
        if (audioRef.current) {
            audioRef.current.volume = newVol;
        }
    };

    return (
        <>
            <audio ref={audioRef} src="/bg-music.mp3" loop preload="auto" />

            <div className="fixed top-5 right-5 bg-white/10 backdrop-blur-md 
        border border-white/20 p-4 rounded-lg shadow-md flex flex-col items-center gap-2 z-50">
                <button
                    onClick={toggleAudio}
                    className="text-blue-700 font-semibold text-sm px-3 py-1 bg-blue-100 hover:bg-blue-200 rounded"
                >
                    {isPlaying ? "Pause Music ⏸️" : "Play Music ▶️"}
                </button>

                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={changeVolume}
                    className="w-24 accent-blue-500"
                />

                <div className="text-xs text-gray-300">
                    Volume: {Math.round(volume * 100)}%
                </div>
            </div>
        </>
    );
}
