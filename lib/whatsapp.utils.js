const PHONE = "923118688410";

export function generateWhatsAppLink(product, variant) {
  const attributesText = variant.attributes.nodes
    .map(
      (attr) =>
        `${attr.name.replace("pa_", "")}: ${attr.value}`
    )
    .join("\n");

  const message = `Hi, I'm interested in:

*Product:* ${product.name}
*Price:* ${variant.price}

\n\n

${attributesText}`;

  return `https://wa.me/${PHONE}?text=${encodeURIComponent(
    message
  )}`;
}
