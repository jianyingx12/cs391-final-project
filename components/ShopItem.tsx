type ShopItemProps = {
    name: string;
    description: string;
    cost: number;
    onBuy: () => void;
    disabled: boolean;
};

export default function ShopItem({
                                     name,
                                     description,
                                     cost,
                                     onBuy,
                                     disabled,
                                 }: ShopItemProps) {
    return (
        <div className="flex justify-between items-center mb-4 p-3 bg-gray-50 rounded-lg shadow-sm">
            <div>
                <div className="font-semibold text-gray-800">{name}</div>
                <div className="text-sm text-gray-500">{description}</div>
            </div>
            <button
                onClick={onBuy}
                disabled={disabled}
                className={`px-4 py-2 rounded-lg font-medium transition duration-200 shadow ${
                    disabled
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-green-500 text-white hover:bg-green-600 active:scale-95"
                }`}
            >
                Buy ({cost})
            </button>
        </div>
    );
}
