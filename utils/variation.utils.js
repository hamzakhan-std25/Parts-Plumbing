// export function normalizeAttributeName(name = "") {
//   return String(name).replace(/^pa_/, "");
// }

// export function formatAttributeName(name = "") {
//   return normalizeAttributeName(name)
//     .replace(/[-_]+/g, " ")
//     .replace(/\b\w/g, (char) => char.toUpperCase());
// }

// export function extractAttributes(variations) {
//   const attributes = {};

//   if (!Array.isArray(variations)) return attributes;

//   variations.forEach((variation) => {
//     variation?.attributes?.nodes?.forEach((attr) => {
//       const key = normalizeAttributeName(attr.name);

//       if (!attributes[key]) {
//         attributes[key] = new Set();
//       }

//       attributes[key].add(attr.value);
//     });
//   });

//   Object.keys(attributes).forEach((key) => {
//     attributes[key] = Array.from(attributes[key]);
//   });

//   return attributes;
// }

// export function findMatchingVariant(variations, selected) {
//   if (!Array.isArray(variations)) return undefined;

//   return variations.find((variation) => {
//     const attrs = variation?.attributes?.nodes || [];

//     return attrs.every((attr) => {
//       const key = normalizeAttributeName(attr.name);

//       // If a key is not selected yet, don't block matching.
//       if (!selected?.[key]) return true;

//       return selected[key] === attr.value;
//     });
//   });
// }



// ------------------------------------


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

  // console.log("DEBUG : variations :", variations, " seletced : ", selected)
  
  return variations.find((variation) =>
    variation.attributes.nodes.every((attr) => {
      const key = attr.name.replace("pa_", "");
      return selected[key] === attr.value;
    })
  );
}
