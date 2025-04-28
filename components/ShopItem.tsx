/**
 * Author: John (Jack) Kinney
 * Purpose: display individual shop item
 * - shows item details.
 * - allows buying (if not disabled)
 * - distinguishes visually if an item is available / vs unavailable
 */

type ShopItemProps = {
    name: string; // upgrade name
    description: string; // upgrade description
    cost: number; // upgrade cost
    onBuy: () => void; // used when purchasing upgrade
    disabled: boolean; // whether the upgrade's purchase button should be active/inactive
};

// renders an individual item in the shop
export default function ShopItem({
                                     name,
                                     description,
                                     cost,
                                     onBuy,
                                     disabled,
                                 }: ShopItemProps) {
    const handleBuy = () => {
        //does buy logic and plays sound
        if (disabled) return;

        const buySound = new Audio("/buy.mp3");
        buySound.currentTime = 0;
        buySound.play();

        onBuy(); //do the rest of the buy logic
    };

    return (
        <div className="
        flex justify-between items-center
        mb-4 p-3 rounded-lg shadow-lg

        bg-white/10 backdrop-blur-md
        border border-white/20
        ">
            <div>
                <div className="font-semibold text-white-800">{name}</div>
                <div className="text-sm text-gray-400">{description}</div>
            </div>
            <button
                onClick={handleBuy}
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
