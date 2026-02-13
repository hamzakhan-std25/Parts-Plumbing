export function extractAttributes(variations) {
  const attributes = {};

  variations.forEach((variation) => {
    variation.attributes.nodes.forEach((attr) => {
      const key = attr.name.replace("pa_", "");

      if (!attributes[key]) {
        attributes[key] = new Set();
      }

      attributes[key].add(attr.value);
    });
  });

  Object.keys(attributes).forEach((key) => {
    attributes[key] = Array.from(attributes[key]);
  });

  return attributes;
}

export function findMatchingVariant(variations, selected) {
  return variations.find((variation) =>
    variation.attributes.nodes.every(
      (attr) =>
        selected[attr.name.replace("pa_", "")] === attr.value
    )
  );
}



// ------------------------------------

// /**
//  * Strips 'pa_' prefix from attribute names
//  */
// export function cleanAttributeName(name) {
//   return name.replace(/^pa_/, "");
// }

// /**
//  * Formats attribute name for display (e.g., "connection-type" → "Connection Type")
//  */
// export function formatAttributeName(name) {
//   return name
//     .split("-")
//     .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(" ");
// }

// /**
//  * Extracts attribute groups that have more than one option (actual variations)
//  */
// export function extractAttributeGroups(variations) {
//   const groups = {};

//   variations.forEach((variation) => {
//     variation.attributes.nodes.forEach((attr) => {
//       const cleanName = cleanAttributeName(attr.name);
//       if (!groups[cleanName]) {
//         groups[cleanName] = new Set();
//       }
//       groups[cleanName].add(attr.value);
//     });
//   });

//   // Only return attributes with multiple options
//   return Object.entries(groups)
//     .filter(([_, optionsSet]) => optionsSet.size > 1)
//     .map(([name, optionsSet]) => ({
//       name,
//       options: Array.from(optionsSet),
//     }));
// }

// /**
//  * Finds the variation that matches selected attributes
//  */
// export function findMatchingVariation(variations, selectedAttributes) {
//   return variations.find((variation) => {
//     return variation.attributes.nodes.every((attr) => {
//       const cleanName = cleanAttributeName(attr.name);
//       return selectedAttributes[cleanName] === attr.value;
//     });
//   });
// }

// /**
//  * Gets available options for an attribute given current selections
//  * (used to disable unavailable combinations)
//  */
// export function getAvailableOptions(variations, attributeName, selectedAttributes) {
//   const available = new Set();

//   variations.forEach((variation) => {
//     const matches = Object.entries(selectedAttributes).every(([key, value]) => {
//       if (key === attributeName) return true;
//       const attrNode = variation.attributes.nodes.find(
//         (a) => cleanAttributeName(a.name) === key
//       );
//       return attrNode && attrNode.value === value;
//     });

//     if (matches) {
//       const attrNode = variation.attributes.nodes.find(
//         (a) => cleanAttributeName(a.name) === attributeName
//       );
//       if (attrNode) available.add(attrNode.value);
//     }
//   });

//   return Array.from(available);
// }

