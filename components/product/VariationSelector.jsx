// "use client";

// import { useEffect, useMemo, useState } from "react";
// import {
//   extractAttributes,
//   findMatchingVariant,
//   formatAttributeName,
// } from "@/utils/variation.utils";
// import { generateWhatsAppLink } from "@/utils/generateWhatsAppLink";

// export default function   VariationSelector({ variations, productName = "Product" }) {
//   const attributes = extractAttributes(variations);
//   const attributeKeys = Object.keys(attributes);

//   const [selected, setSelected] = useState({});

//   useEffect(() => {
//     const initial = {};
//     attributeKeys.forEach((key) => {
//       initial[key] = attributes[key]?.[0] || "";
//     });
//     setSelected(initial);
//   }, [variations]);

//   const matchedVariant = useMemo(
//     () => findMatchingVariant(variations, selected) || variations?.[0] || null,
//     [variations, selected]
//   );

//   const handleSelect = (attr, value) => {
//     setSelected((prev) => ({ ...prev, [attr]: value }));
//   };

//   const rawPrice = matchedVariant?.price || "";
//   const cleanPrice = String(rawPrice).replace(/<[^>]*>/g, "").trim();
//   const displayPrice = cleanPrice
//     ? cleanPrice.startsWith("₨")
//       ? cleanPrice
//       : `₨ ${cleanPrice}`
//     : "₨ --";

//   const whatsappHref = matchedVariant
//     ? generateWhatsAppLink({
//         productName,
//         selectedAttributes: selected,
//         price: displayPrice,
//       })
//     : "#";

//   return (
//     <div className="mt-8">
//       <h3 className="text-lg font-semibold text-gray-900 mb-4">Variations</h3>

//       {attributeKeys.map((attr) => (
//         <div key={attr} className="mb-5 flex flex-col sm:flex-row sm:items-start gap-3">
//           <span className="sm:w-40 text-sm font-semibold text-gray-700">
//             {formatAttributeName(attr)}:
//           </span>

//           <div className="flex flex-wrap gap-2">
//             {attributes[attr].map((value) => {
//               const isSelected = selected[attr] === value;

//               return (
//                 <button
//                   key={value}
//                   type="button"
//                   onClick={() => handleSelect(attr, value)}
//                   className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm transition ${
//                     isSelected
//                       ? "bg-blue-600 text-white border-blue-600"
//                       : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
//                   }`}
//                 >
//                   <span>{value}</span>
//                   <span>{isSelected ? "⬇️" : "⬆️"}</span>
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       ))}

//       <div className="mt-8 rounded-xl border border-gray-200 p-5">
//         <p className="text-sm text-gray-500 mb-1">Price</p>
//         <p className="text-4xl font-extrabold text-gray-900">{displayPrice}</p>

//         <div className="mt-5 flex flex-col sm:flex-row gap-3">
//           <a
//             href={whatsappHref}
//             target="_blank"
//             rel="noopener noreferrer"
//             className={`inline-flex justify-center items-center px-5 py-3 rounded-lg font-semibold text-white bg-green-600 hover:bg-green-700 transition ${
//               !matchedVariant ? "opacity-50 pointer-events-none" : ""
//             }`}
//           >
//             Ask Price on WhatsApp
//           </a>

//           <button
//             type="button"
//             className="inline-flex justify-center items-center px-5 py-3 rounded-lg font-semibold text-blue-600 border border-blue-600 hover:bg-blue-50 transition"
//           >
//             Check Availability
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


// --------------------------------------

"use client";

import { useState, useEffect, useMemo } from "react";
import {
  extractAttributeGroups,
  findMatchingVariation,
  formatAttributeName,
} from "@/utils/variation.utils";
import { WHATSAPP_NUMBER } from "@/constants/config";

export default function VariationSelector({ variations, productName }) {
  const [selectedAttributes, setSelectedAttributes] = useState({});
  const [currentVariation, setCurrentVariation] = useState(null);

  // ✅ Use useMemo to keep the reference stable
  const attributeGroups = useMemo(() =>
    extractAttributeGroups(variations),
    [variations]
  );


  // ✅ Simplified, stable initialization
  useEffect(() => {
    if (variations.length > 0 && attributeGroups.length > 0) {
      const firstVariation = variations[0];
      const initial = {};

      attributeGroups.forEach((group) => {
        const attr = firstVariation.attributes.nodes.find(
          (a) => a.name.replace(/^pa_/, "") === group.name
        );
        if (attr) {
          initial[group.name] = attr.value;
        }
      });

      setSelectedAttributes(initial);
      // No need to set currentVariation here, 
      // the second useEffect below handles it based on selectedAttributes
    }
  }, [variations, attributeGroups]);

  // This effect is fine as long as variations is stable (passed from a Server Component)
  useEffect(() => {
    const match = findMatchingVariation(variations, selectedAttributes);
    setCurrentVariation(match);
  }, [selectedAttributes, variations]);


  const handleAttributeChange = (attributeName, value) => {
    setSelectedAttributes((prev) => ({ ...prev, [attributeName]: value }));
  };

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `I'm interested in ${productName} - ${Object.entries(selectedAttributes)
      .map(([k, v]) => `${formatAttributeName(k)}: ${v}`)
      .join(", ")}`
  )}`;

  if (!variations.length || attributeGroups.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">Variations</h3>

      {attributeGroups.map((group) => (
        <div key={group.name} className="mb-6">
          <div className="flex items-baseline flex-wrap gap-2">
            <span className="text-sm font-medium text-gray-700 w-24 capitalize">
              {formatAttributeName(group.name)}:
            </span>
            <div className="flex flex-wrap gap-3">
              {group.options.map((option) => {
                const isSelected = selectedAttributes[group.name] === option;
                return (
                  <button
                    key={option}
                    onClick={() => handleAttributeChange(group.name, option)}
                    className={`px-4 py-2 rounded-full border text-sm flex items-center gap-1 transition
                      ${isSelected
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                      }`}
                  >
                    <span>{option}</span>
                    <span className="text-xs">
                      {isSelected ? "⬇️" : "⬆️"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ))}

      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <span className="text-sm text-gray-500">Price</span>
            <p className="text-3xl font-bold text-gray-900">
              {currentVariation?.price || "₨ --"}
            </p>
          </div>
          <div className="flex gap-4">
            <a
              href={currentVariation ? whatsappLink : "#"}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition ${!currentVariation && "opacity-50 pointer-events-none"
                }`}
            >
              Ask Price on WhatsApp
            </a>
            <button className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition">
              Check Availability
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}