"use client";

import { useRouter } from "next/navigation";

export default function FilterSidebar() {
  const router = useRouter();

  const handleFilter = (material) => {
    router.push(`/products?material=${material}`);
  };

  return (
    <div className="border p-4">
      <h3 className="font-bold mb-2">Filter by Material</h3>
      <button
        onClick={() => handleFilter("brass")}
        className="block mb-2 text-left"
      >
        Brass
      </button>
    </div>
  );
}




// ------------------------------------------


// export default function FilterSidebar() {
//   return (
//     <aside className="bg-white p-4 rounded-lg border">
//       <h3 className="font-semibold mb-4">Filters</h3>
//       <p className="text-gray-500 text-sm">
//         Filter by category, brand, size, material...
//       </p>
//     </aside>
//   );
// }
