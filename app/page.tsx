"use client";

import { useEffect, useRef, useState } from "react";
import Clicker from "@/components/Clicker";
import Shop from "@/components/Shop";
import Achievements from "@/components/Achievements";
import AudioControls from "@/components/AudioControls";
import { Upgrade } from "@/components/Shop";
import Summary from "@/components/Summary";

export default function Game() {
  const [count, setCount] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [clickValue, setClickValue] = useState<number>(1);
  const [autoClickers, setAutoClickers] = useState<number>(0);
  const [goldenActive, setGoldenActive] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [critMessage, setCritMessage] = useState<string | null>(null);
  const [critChance, setCritChance] = useState<number>(0.1);
  const [critExplosionActive, setCritExplosionActive] = useState(false);
  const [critCount, setCritCount] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sessionStartTime = useRef<number>(Date.now());

  const handleClick = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
      audioRef.current?.play();
    }

    const multiplier = goldenActive ? 3 : 1;
    const isCritical = critExplosionActive || (Math.random() < critChance);
    const critBonus = isCritical ? 2 : 1;
    const increment = clickValue * multiplier * critBonus;
    setCount((prev) => prev + increment);
    setTotalCount((prev) => prev + increment);
    setClickCount((prev) => prev + 1);

    if (isCritical) {
      triggerCritical(`CRITICAL +${increment}`);
      setCritCount((prev) => prev + 1);
    }
  };

  const triggerCritical = (msg: string) => {
    setCritMessage(msg);
    setTimeout(() => setCritMessage(null), 800);
  };

  const [upgrades, setUpgrades] = useState<Upgrade[]>([
    { name: "Auto Clicker", description: "+1/sec", cost: 50 },
    { name: "Click Value Up", description: "+1 per click", cost: 100 },
    { name: "Lucky Boost", description: "+5% Critical Chance", cost: 200 },
    { name: "Golden Touch", description: "Triple all earnings (15s)", cost: 500 },
    { name: "Crit Explosion", description: "All clicks critical (10s)", cost: 400 },
  ]);

  const handleBuy = (index: number) => {
    const upgrade = upgrades[index];
    if (index === 2 && goldenActive) return;
    if (count < upgrade.cost) return;

    setCount((prev) => prev - upgrade.cost);

    setTotalSpent((prev) => prev + upgrades[index].cost);

    switch (index) {
      case 0: // Auto Clicker
        setAutoClickers((prev) => prev + 1);
        break;
      case 1: // Update Click Value
        setClickValue((prev) => prev + 1);
        break;
      case 2: // Lucky Boost
        setCritChance((prev) => Math.min(prev + 0.05, 1));
        break;
      case 3: // Golden Touch
        setGoldenActive(true);
        setTimeout(() => setGoldenActive(false), 15000);
        break;

      case 4: // Crit Buff
        setCritExplosionActive(true);
        setTimeout(() => setCritExplosionActive(false), 10000);
        break;
    }

    // Dynamically adjust scaling factors based on current state
    const newUpgrades = upgrades.map((u, i) => {
      if (i !== index) return u;

      let scaleFactor = 1.8; // default for Auto Clicker
      if (i === 1) scaleFactor = 2.8;
      if (i === 2) scaleFactor = 3.5;

      // increase Auto Clicker scaling after 10 owned
      if (i === 0 && autoClickers + 1 >= 10) scaleFactor += 0.2;

      return {
        ...u,
        cost: Math.floor(u.cost * scaleFactor),
      };
    });

    setUpgrades(newUpgrades);
  };

  useEffect(() => {
    if (autoClickers === 0) return;

    const interval = setInterval(() => {
      const multiplier = goldenActive ? 3 : 1;
      const increment = autoClickers * clickValue * multiplier; // Auto clickers scale by click value
      setCount((prev) => prev + increment);
      setTotalCount((prev) => prev + increment);
    }, 1000);

    return () => clearInterval(interval);
  }, [autoClickers, goldenActive, clickValue]);


  return (
      <main className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
        {/* Golden touch overlay */}
        {goldenActive && (
            <div className="absolute inset-0 z-10 bg-yellow-400 opacity-30 animate-pulse pointer-events-none" />
        )}

        {/* Crit explosion overlay */}
        {critExplosionActive && (
            <div className="absolute inset-0 z-10 bg-red-600 opacity-50 animate-pulse pointer-events-none" />
        )}

        <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/backgroundvid.mp4" type="video/mp4" />
        </video>

        <AudioControls />
        <button
            onClick={() => setShowSummary(true)}
            className="fixed bottom-5 right-5 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          View Stats
        </button>

        {showSummary && (
            <Summary
                totalClicks={clickCount}
                totalSpent={totalSpent}
                timePlayed={Date.now() - sessionStartTime.current}
                onClose={() => setShowSummary(false)}
            />
        )}

        <div className="relative z-10 p-6 w-full max-w-3xl">
          {critMessage && (
              <div className="absolute top-45 text-3xl font-bold text-yellow-400 animate-bounce">
                {critMessage}
              </div>
          )}
          <Clicker
              count={count}
              totalCount={totalCount}
              clickValue={clickValue}
              autoClickers={autoClickers}
              goldenActive={goldenActive}
              onClick={handleClick}
          />
          <Shop count={count} upgrades={upgrades} onBuy={handleBuy} goldenActive={goldenActive} />
          <Achievements
              totalCount={totalCount}
              autoClickers={autoClickers}
              critCount={critCount}
              totalSpent={totalSpent}
          />
        </div>
      </main>
  );
}
