import InventoryStatusPie from "./InventoryStatusPie";
import Label from "./Label";
// repeat offender
const COLORS = { highStock: "#4CAF50", midStock: "#5799F8", lowStock: "#F44336", outOfStock: "#E7E9EC", total: "#ff1fff" };

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
    total: 0,
  };

  const percentages = data?.percentages || {
    highStock: "0%",
    midStock: "0%",
    lowStock: "0%",
    outOfStock: "0%",
  };

  return (
    <div className="shadow-lg border border-gray-100 rounded-lg p-5">
      <p className="font-normal text-lg">Inventory Status</p>
      <div className="flex justify-center">
        <InventoryStatusPie counts={counts} />
        <div className="grid grid-cols-3 px-6 mx-6">
          {Object.entries(counts)
            .filter(([key, value]) => value > 0 && key !== "total")
            .map(([key, value], index) => {
              const labelMap: Record<string, string> = {
                highStock: "High Stock",
                midStock: "Mid Stock",
                lowStock: "Low Stock",
                outOfStock: "Out of Stock",
              };

              return (
                <Label
                  key={key}
                  label={labelMap[key]}
                  value={percentages[key as keyof typeof percentages]}
                  bulletColor={COLORS[key]}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default InventoryStatus;
