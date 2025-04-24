import ShopItem from "./ShopItem";

export interface Upgrade {
    name: string;
    description: string;
    cost: number;
}

interface ShopProps {
    count: number;
    upgrades: Upgrade[];
    onBuy: (index: number) => void;
}

export default function Shop({ count, upgrades, onBuy }: ShopProps) {
    return (
        <div className="bg-white shadow-lg rounded-lg p-5 mt-10 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">🛍️ Shop</h2>
            {upgrades.map((item, i) => (
                <ShopItem
                    key={i}
                    name={item.name}
                    description={item.description}
                    cost={item.cost}
                    onBuy={() => onBuy(i)}
                    disabled={count < item.cost}
                />
            ))}
        </div>
    );
}


