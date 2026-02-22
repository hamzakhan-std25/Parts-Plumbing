const PHONE = "923359183182";

export function generateWhatsAppLink(product, variant) {
  const attributesText = variant.attributes.nodes
    .map(
      (attr) =>
        `${attr.name.replace("pa_", "")}: ${attr.value}`
    )
    .join("\n");

  const message = `Hi, I'm interested in:

*Product:* ${product.name}
*Price:* ${ parseInt(variant.price.replace(/[^0-9]/g, ''), 10)}


${attributesText}`;

  return `https://wa.me/${PHONE}?text=${encodeURIComponent(
    message
  )}`;
}
