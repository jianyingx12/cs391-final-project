/**
 * Author: John (Jack) Kinney
 * Purpose: display list of shop upgrades based on player stats
 * - Highlights upgrades: shows available upgrades normally,
 * - and disable those that cannot afford, or are already active (ex. golden touch status is active)
 */

import ShopItem from "./ShopItem";

export type Upgrade = {
    name: string;
    description: string;
    cost: number;
};

type ShopProps = {
    count: number; // player's current amount of clicks/currency
    upgrades: Upgrade[]; // the list of available upgrades that can be purchased
    onBuy: (index: number) => void; // used when purchasing upgrade
    goldenActive: boolean; // whether golden touch upgrade is already active
};

// displays upgrades in styled container, mapping over each upgrade
export default function Shop({ count, upgrades, onBuy, goldenActive}: ShopProps) {
    return (
        <div className="bg-white/10 
          backdrop-blur-sm
          border border-white/40 
          rounded-2xl 
          p-5 
          
          w-full 
          h-full
          shadow-3xl items-stretch">
            <h2 className="text-2xl font-bold mb-4 text-white">🛍️ Shop</h2>
            {upgrades.map((item, i) => (
                <ShopItem
                    key={i}
                    name={item.name}
                    description={item.description}
                    cost={item.cost}
                    onBuy={() => onBuy(i)}
                    disabled={count < item.cost || (i === 2 && goldenActive)} // disable ability to get Golden Touch if already active
                />
            ))}
        </div>
    );
}
