/**
 * Author: Kevin Tan
 * Purpose: Display a component that the user can click on to stop and start audio
 * - Highlights: A slider bar that is able to change the level of sound.
 * - The audio section goes away if your screen size is too small as to not block the clicker.
 */

import { useRef, useState } from "react";

export default function AudioControls() {
    // useRef creates a persistent reference that survives re-renders
    const audioRef = useRef<HTMLAudioElement | null>(null); // HTMLAudioElement refers to the <audio> DOM element
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);

    // Pause and play the audio
    const toggleAudio = () => {
        const audio = audioRef.current; // .current gives direct access to the actual audio element
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.volume = volume; // .volume sets the playback volume of the audio element
            audio.play().catch(() => {});
        }
        setIsPlaying(!isPlaying);
    };

    // Change the volume of the audio
    const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Called when the HTML input element is changed
        const newVol = parseFloat(e.target.value);
        setVolume(newVol);
        if (audioRef.current) {
            audioRef.current.volume = newVol; // Update the audio volume in real time
        }
    };

    return (
        <>
            <audio ref={audioRef} src="/bg-music.mp3" loop preload="auto" />
            {/* preload="auto" tells the browser to load the whole audio file when the page loads */}

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

                {/* Current volume percentage */}
                <div className="text-xs text-gray-300">
                    Volume: {Math.round(volume * 100)}%
                </div>
            </div>
        </>
    );
}
