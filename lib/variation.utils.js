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
    variation.attributes.nodes.every((attr) => {
      const key = attr.name.replace("pa_", "");
      return selected[key] === attr.value;
    })
  );
}
