/**
 * Purpose: main game component + some logic related to clicker idling game
 * - Handles core state: points, upgrades, crits, auto clickers, effects
 * - Responds to user interaction: plays sounds, triggers effects, updates counters
 * - Renders UI: clicker, shop, achievements, summary, and some animated effects
 */

"use client";

import { useEffect, useRef, useState } from "react";
import Clicker from "@/components/Clicker";
import Shop from "@/components/Shop";
import Achievements from "@/components/Achievements";
import AudioControls from "@/components/AudioControls";
import { Upgrade } from "@/components/Shop";
import Summary from "@/components/Summary";

export default function Game() {
  const [count, setCount] = useState<number>(0); // Current points/clicks
  const [totalCount, setTotalCount] = useState<number>(0); // Total clicks
  const [clickValue, setClickValue] = useState<number>(1); // Clicks per click
  const [autoClickers, setAutoClickers] = useState<number>(0); // Auto clickers count
  const [goldenActive, setGoldenActive] = useState<boolean>(false); // Triple earnings state
  const [hasInteracted, setHasInteracted] = useState<boolean>(false); // Player interaction
  const [critMessage, setCritMessage] = useState<string | null>(null); // Critical hit text
  const [critChance, setCritChance] = useState<number>(0.1); // Critical hit chance
  const [critExplosionActive, setCritExplosionActive] = useState(false); // All clicks crit
  const [critCount, setCritCount] = useState(0); // Critical click counter
  const [totalSpent, setTotalSpent] = useState(0); // Total amount of clicks spent on upgrades
  const [showSummary, setShowSummary] = useState(false); // Summary visibility
  const [clickCount, setClickCount] = useState(0); // Number of times clicked
  const [critMultiplier, setCritMultiplier] = useState<number>(2); // Multiplier for criticals

  // For audio and timing
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sessionStartTime = useRef<number>(Date.now());

  // For handling a single manual click
  const handleClick = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
      audioRef.current?.play();
    }

    // handling bonus cases
    const multiplier = goldenActive ? 3 : 1;
    const isCritical = critExplosionActive || (Math.random() < critChance);
    const critBonus = isCritical ? critMultiplier : 1;
    const increment = clickValue * multiplier * critBonus;

    // Update counters
    setCount((prev) => prev + increment);
    setTotalCount((prev) => prev + increment);
    setClickCount((prev) => prev + 1);

    // Play crit sound
    if (isCritical) {
      const critSound = new Audio("/crit.mp3");
      critSound.currentTime = 0;
      critSound.play();

      triggerCritical(`CRITICAL +${increment}`);
      setCritCount((prev) => prev + 1);
    } else {
      const clickSound = new Audio("/click.wav");
      clickSound.currentTime = 0;
      clickSound.play();
    }
  };

  // Displays critical hit message when critical occurs
  const triggerCritical = (msg: string) => {
    setCritMessage(msg);
    setTimeout(() => setCritMessage(null), 800);
  };

  // Upgrades available for purchase in shop
  const [upgrades, setUpgrades] = useState<Upgrade[]>([
    { name: "Auto Clicker", description: "+1/sec", cost: 50 },
    { name: "Click Value Up", description: "+1 per click", cost: 100 },
    { name: "Lucky Boost", description: "+5% Critical Chance", cost: 200 },
    { name: "Golden Touch", description: "Triple all earnings (15s)", cost: 500 },
    { name: "Crit Explosion", description: "All clicks critical (10s)", cost: 400 },
    { name: "Critical Power", description: "+1x Critical Multiplier", cost: 300 },
  ]);

  // Handling logic for purchasing an upgrade
  const handleBuy = (index: number) => {
    const upgrade = upgrades[index];

    // Prevent purchasing Crit Explosion if already active
    if (index === 4 && critExplosionActive) return;

    // Prevent purchasing Golden Touch if already active
    if (index === 3 && goldenActive) return;

    // Not enough points to actual purchase upgrade
    if (count < upgrade.cost) return;

    // Update current clicks, deduct and track total spent accordingly
    setCount((prev) => prev - upgrade.cost);
    setTotalSpent((prev) => prev + upgrade.cost);

    // Here we handle actually applying the upgrade's effect
    switch (index) {
      case 0: // Auto Clicker
        setAutoClickers((prev) => prev + 1);
        break;
      case 1: // Click Value Up
        setClickValue((prev) => prev + 1);
        break;
      case 2: // Lucky Boost
        setCritChance((prev) => Math.min(prev + 0.05, 1));
        break;
      case 3: // Golden Touch
        setGoldenActive(true);
        setTimeout(() => setGoldenActive(false), 15000);
        break;
      case 4: // Crit Explosion
        setCritExplosionActive(true);
        setTimeout(() => setCritExplosionActive(false), 10000);
        break;
      case 5: // Critical Power
        setCritMultiplier((prev) => prev + 1);
        break;
    }

    // Dynamically adjust scaling factors based on current state
    const newUpgrades = upgrades.map((u, i) => {
      if (i !== index) return u;

      let scaleFactor = 1.8; // default for Auto Clicker
      if (i === 1) scaleFactor = 2.8;
      if (i === 2) scaleFactor = 3.3;
      if (i === 5) scaleFactor = 3.2; // Critical Power specific scaling

      // increase Auto Clicker scaling after 10 owned
      if (i === 0 && autoClickers + 1 >= 10) scaleFactor += 0.2;

      return {
        ...u,
        cost: Math.floor(u.cost * scaleFactor),
      };
    });

    setUpgrades(newUpgrades);
  };

  // Clicker logic (currently running every second)
  useEffect(() => {
    if (autoClickers === 0) return;

    const interval = setInterval(() => {
      const multiplier = goldenActive ? 3 : 1;
      const increment = autoClickers * clickValue * multiplier;
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

        {/* Background video */}
        <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/backgroundvid.mp4" type="video/mp4" />
        </video>

        {/* Music controls */}
        <div className="hidden md:block">
          <AudioControls />
        </div>

        {/* Summary of stats */}
        {showSummary && (
            <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30 transition-opacity duration-500 ease-in-out opacity-100">
              <Summary
                  totalClicks={clickCount}
                  totalSpent={totalSpent}
                  timePlayed={Date.now() - sessionStartTime.current}
                  autoClickers={autoClickers}
                  critChance={critChance}
                  critMultiplier={critMultiplier}
                  onClose={() => setShowSummary(false)}
              />
            </div>
        )}

        {/* Main game / clicker portion */}
        <div className="relative z-10 p-6 w-full max-w-3xl flex flex-col items-center gap-4">
          <Clicker
              count={count}
              totalCount={totalCount}
              clickValue={clickValue}
              autoClickers={autoClickers}
              goldenActive={goldenActive}
              critExplosionActive={critExplosionActive}
              onClick={handleClick}
          />
          {/* Critical hit text */}
          <div className="w-full flex justify-center">
            {critMessage && (
                <div className="text-xl font-bold text-yellow-400 relative mt-2 md:absolute md:top-44 md:left-20 md:mt-0 md:text-xl animate-bounce">
                  {critMessage}
                </div>
            )}
          </div>
          {/* Shop and Achievements Section */}
          <div className="flex flex-col md:flex-row w-full gap-6 items-stretch">
            <Shop count={count} upgrades={upgrades} onBuy={handleBuy} goldenActive={goldenActive} />
            <Achievements
                totalCount={totalCount}
                autoClickers={autoClickers}
                critCount={critCount}
                totalSpent={totalSpent}
            />
          </div>

          {/* Summary of Stats Button */}
          <button
              onClick={() => setShowSummary(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-full md:w-auto mt-4 relative md:fixed md:bottom-5 md:right-5"
          >
            View Stats
          </button>
        </div>
      </main>
  );
}
