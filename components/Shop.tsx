import ShopItem from "./ShopItem";

export type Upgrade = {
    name: string;
    description: string;
    cost: number;
};

type ShopProps = {
    count: number;
    upgrades: Upgrade[];
    onBuy: (index: number) => void;
    goldenActive: boolean;
};

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
