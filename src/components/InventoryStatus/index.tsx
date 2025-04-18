import InventoryStatusPie from "./InventoryStatusPie";
import Label from "./Label";

interface InventoryStatusProps {
  data: {
    counts: {
      highStock: number;
      midStock: number;
      lowStock: number;
      outOfStock: number;
      total: number;
    };
    percentages: {
      highStock: string;
      midStock: string;
      lowStock: string;
      outOfStock: string;
    };
  };
}

const InventoryStatus: React.FC<InventoryStatusProps> = ({ data }) => {
  // Default values for when data is undefined or incomplete
  const counts = data?.counts || {
    highStock: 0,
    midStock: 0,
    lowStock: 0,
    outOfStock: 0,
    total: 0
  };
  
  const percentages = data?.percentages || {
    highStock: "0%",
    midStock: "0%",
    lowStock: "0%",
    outOfStock: "0%"
  };

  return (
    <div className="shadow-lg border border-gray-100 rounded-lg p-5">
      <p className="font-normal text-lg">Inventory Status</p>
      <div className="flex justify-center">
        <InventoryStatusPie counts={counts}/>
        <div className="grid grid-cols-3 px-6 mx-6">
          <Label
            label="High Stock"
            value={percentages.highStock}
            bulletColor="#2E7D32"
          />
          <Label label="Mid Stock" value={percentages.midStock} bulletColor="#FFC107" />
          <Label label="Low Stock" value={percentages.lowStock} bulletColor="#F44336" />
        </div>
      </div>
    </div>
  );
};

export default InventoryStatus;