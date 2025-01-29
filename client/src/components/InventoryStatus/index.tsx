import InventoryStatusPie from "./InventoryStatusPie"
import Label from "./Label"

const InventoryStatus = () => {
    return (
        <div className="shadow-md rounded-lg border p-5">
            <p className="font-bold text-lg">Inventory Status</p>
            <div className="flex justify-center">
                <InventoryStatusPie />
                <div className="grid grid-cols-2 grid-rows-3 px-6 mx-6">
                    <Label label="In Stock" value="50%" bulletColor="#4CAF50" />
                    <Label label="High Stock" value="30%" bulletColor="#2E7D32" />
                    <Label label="Issued" value="25%" bulletColor="#2196F3" />
                    <Label label="Mid Stocks" value="15%" bulletColor="#FFC107" />
                    <Label label="Archived" value="10%" bulletColor="#9E9E9E" />
                    <Label label="In Stock" value="5%" bulletColor="#F44336" />
                </div>
            </div>
        </div>
    )
}

export default InventoryStatus