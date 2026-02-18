const PHONE = "03359183182";

export function generateWhatsAppLink(product, variant) {
  const attributesText = variant.attributes.nodes
    .map(
      (attr) =>
        `${attr.name.replace("pa_", "")}: ${attr.value}`
    )
    .join("\n");

  const message = `
Hi, I'm interested in:

Product: ${product.name}
Price: ${variant.price}

${attributesText}
`;

  return `https://wa.me/${PHONE}?text=${encodeURIComponent(
    message
  )}`;
}
