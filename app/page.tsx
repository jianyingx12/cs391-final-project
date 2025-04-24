"use client";

import { useEffect, useRef, useState } from "react";
import Clicker from "./components/Clicker";
import Shop from "./components/Shop";
import Achievements from "./components/Achievements";
import AudioControls from "./components/AudioControls";
import { Upgrade } from "./components/Shop";

export default function Game() {
  const [count, setCount] = useState<number>(0);
  const [clickValue, setClickValue] = useState<number>(1);
  const [autoClickers, setAutoClickers] = useState<number>(0);
  const [goldenActive, setGoldenActive] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const upgrades: Upgrade[] = [
    { name: "Auto Clicker", description: "+1/sec", cost: 10 },
    { name: "Double Click", description: "+2 per click", cost: 25 },
    { name: "Golden Touch", description: "Triple all earnings (10s)", cost: 50 },
  ];

  const handleClick = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
      audioRef.current?.play();
    }

    const multiplier = goldenActive ? 3 : 1;
    setCount((prev) => prev + clickValue * multiplier);
  };

  const handleBuy = (index: number) => {
    const upgrade = upgrades[index];
    if (count < upgrade.cost) return;

    setCount((prev) => prev - upgrade.cost);

    switch (index) {
      case 0:
        setAutoClickers((prev) => prev + 1);
        break;
      case 1:
        setClickValue(2);
        break;
      case 2:
        setGoldenActive(true);
        setTimeout(() => setGoldenActive(false), 10000);
        break;
    }
  };

  useEffect(() => {
    if (autoClickers === 0) return;

    const interval = setInterval(() => {
      const multiplier = goldenActive ? 3 : 1;
      setCount((prev) => prev + autoClickers * multiplier);
    }, 1000);

    return () => clearInterval(interval);
  }, [autoClickers, goldenActive]);

  return (
      <main className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
        <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/background1.mp4" type="video/mp4" />
        </video>

        {/* Dark Overlay */}
        {/*<div className="absolute inset-0 bg-black bg-opacity-50 z-0" />*/}

        {/* 🔊 Audio Element */}
        <AudioControls />

        <div className="relative z-10 p-6 w-full max-w-3xl">
          <Clicker
              count={count}
              clickValue={clickValue}
              autoClickers={autoClickers}
              goldenActive={goldenActive}
              onClick={handleClick}
          />
          <Shop count={count} upgrades={upgrades} onBuy={handleBuy} />
          <Achievements count={count} autoClickers={autoClickers} />
        </div>
      </main>
  );
}

