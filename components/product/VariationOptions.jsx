import { extractAttributes } from "@/utils/variation.utils";

export default function VariationOptions({
  variations,
  selected,
  setSelected,
}) {
  const attributes = extractAttributes(variations);

  return (
    <div className="mt-6 space-y-4">

      {Object.entries(attributes).map(([key, values]) => (
        <div key={key}>
          <h3 className="text-sm text-gray-400 capitalize mb-2">
            {key.replace("-", " ")}
          </h3>

          <div className="flex flex-wrap gap-3">
            {values.map((value) => {
              const isActive = selected[key] === value;

              return (
                <button
                  key={value}
                  onClick={() =>
                    setSelected({ ...selected, [key]: value })
                  }
                  className={`px-4 py-2 rounded-full text-sm border transition
                    ${
                      isActive
                        ? "bg-blue-500 border-blue-500"
                        : "border-gray-600 hover:border-blue-400"
                    }`}
                >
                  {value.replace("-", " ")}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
