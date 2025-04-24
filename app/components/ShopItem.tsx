interface ShopItemProps {
    name: string;
    description: string;
    cost: number;
    onBuy: () => void;
    disabled: boolean;
}

export default function ShopItem({
                                     name,
                                     description,
                                     cost,
                                     onBuy,
                                     disabled,
                                 }: ShopItemProps) {
    return (
        <div className="flex justify-between items-center mb-3">
            <div>
                <div className="font-semibold">{name}</div>
                <div className="text-sm text-gray-500">{description}</div>
            </div>
            <button
                onClick={onBuy}
                disabled={disabled}
                className={`px-3 py-1 rounded text-white ${
                    disabled ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
                }`}
            >
                Buy ({cost})
            </button>
        </div>
    );
}

