"use client";

import { useState } from "react";
import {
  extractAttributes,
  findMatchingVariant,
} from "@/utils/variation.utils";

export default function VariationSelector({ variations }) {
  const attributes = extractAttributes(variations);

  const [selected, setSelected] = useState({});
  const matchedVariant = findMatchingVariant(variations, selected);

  return (
    <div className="mt-6">
      {Object.keys(attributes).map((attr) => (
        <div key={attr} className="mb-4">
          <label className="block font-medium capitalize">
            {attr}
          </label>
          <select
            className="border p-2 w-full"
            onChange={(e) =>
              setSelected({ ...selected, [attr]: e.target.value })
            }
          >
            <option value="">Select {attr}</option>
            {attributes[attr].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
      ))}

      {matchedVariant && (
        <div className="mt-4 p-4 border rounded">
          <p className="font-bold">
            Price: {matchedVariant.price}
          </p>
        </div>
      )}
    </div>
  );
}


// --------------------------------------

// "use client";

// import { useState, useEffect } from "react";
// import {
//   extractAttributeGroups,
//   findMatchingVariation,
//   formatAttributeName,
// } from "@/utils/variation.utils";
// import { WHATSAPP_NUMBER } from "@/constants/config";

// export default function VariationSelector({ variations, productName }) {
//   const attributeGroups = extractAttributeGroups(variations);
//   const [selectedAttributes, setSelectedAttributes] = useState({});
//   const [currentVariation, setCurrentVariation] = useState(null);

//   // Initialize with first variation's attributes (only for groups that vary)
//   useEffect(() => {
//     if (variations.length > 0 && attributeGroups.length > 0) {
//       const firstVariation = variations[0];
//       const initial = {};

//       attributeGroups.forEach((group) => {
//         const attr = firstVariation.attributes.nodes.find(
//           (a) => a.name.replace(/^pa_/, "") === group.name
//         );
//         if (attr) {
//           initial[group.name] = attr.value;
//         }
//       });

//       setSelectedAttributes(initial);
//       const match = findMatchingVariation(variations, initial);
//       setCurrentVariation(match || firstVariation);
//     }
//   }, [variations, attributeGroups]);

//   // Update current variation when selections change
//   useEffect(() => {
//     const match = findMatchingVariation(variations, selectedAttributes);
//     setCurrentVariation(match);
//   }, [selectedAttributes, variations]);

//   const handleAttributeChange = (attributeName, value) => {
//     setSelectedAttributes((prev) => ({ ...prev, [attributeName]: value }));
//   };

//   const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
//     `I'm interested in ${productName} - ${Object.entries(selectedAttributes)
//       .map(([k, v]) => `${formatAttributeName(k)}: ${v}`)
//       .join(", ")}`
//   )}`;

//   if (!variations.length || attributeGroups.length === 0) return null;

//   return (
//     <div className="mt-8">
//       <h3 className="text-lg font-semibold mb-4">Variations</h3>

//       {attributeGroups.map((group) => (
//         <div key={group.name} className="mb-6">
//           <div className="flex items-baseline flex-wrap gap-2">
//             <span className="text-sm font-medium text-gray-700 w-24 capitalize">
//               {formatAttributeName(group.name)}:
//             </span>
//             <div className="flex flex-wrap gap-3">
//               {group.options.map((option) => {
//                 const isSelected = selectedAttributes[group.name] === option;
//                 return (
//                   <button
//                     key={option}
//                     onClick={() => handleAttributeChange(group.name, option)}
//                     className={`px-4 py-2 rounded-full border text-sm flex items-center gap-1 transition
//                       ${
//                         isSelected
//                           ? "bg-blue-600 text-white border-blue-600"
//                           : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
//                       }`}
//                   >
//                     <span>{option}</span>
//                     <span className="text-xs">
//                       {isSelected ? "⬇️" : "⬆️"}
//                     </span>
//                   </button>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       ))}

//       <div className="mt-8 p-6 bg-gray-50 rounded-lg">
//         <div className="flex items-center justify-between flex-wrap gap-4">
//           <div>
//             <span className="text-sm text-gray-500">Price</span>
//             <p className="text-3xl font-bold text-gray-900">
//               {currentVariation?.price || "₨ --"}
//             </p>
//           </div>
//           <div className="flex gap-4">
//             <a
//               href={currentVariation ? whatsappLink : "#"}
//               target="_blank"
//               rel="noopener noreferrer"
//               className={`px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition ${
//                 !currentVariation && "opacity-50 pointer-events-none"
//               }`}
//             >
//               Ask Price on WhatsApp
//             </a>
//             <button className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition">
//               Check Availability
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }