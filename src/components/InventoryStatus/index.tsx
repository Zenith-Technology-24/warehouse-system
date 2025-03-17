import InventoryStatusPie from "./InventoryStatusPie"
import Label from "./Label"

const InventoryStatus = () => {
    return (
        <div className="shadow-lg border border-gray-100 rounded-lg p-5">
            <p className="font-normal text-lg">Inventory Status</p>
            <div className="flex justify-center">
                <InventoryStatusPie />
                <div className="grid grid-cols-3 px-6 mx-6">
                    <Label label="High Stock" value="30%" bulletColor="#2E7D32" />
                    <Label label="Mid Stock" value="15%" bulletColor="#FFC107" />
                    <Label label="Low Stock" value="5%" bulletColor="#F44336" />
                </div>
            </div>
        </div>
    )
}

export default InventoryStatus