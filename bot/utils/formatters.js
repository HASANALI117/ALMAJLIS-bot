export const formatDate = (unixTimestamp) => {
  if (!unixTimestamp) return "Unknown";

  const date = new Date(unixTimestamp * 1000);
  return date.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

export const formatPrice = (price, isOnSale = false, discount = 0) => {
  const numPrice = parseFloat(price);

  if (discount >= 100 || numPrice === 0) {
    return "Free";
  }

  return isOnSale ? `${numPrice.toFixed(2)}` : `${numPrice.toFixed(2)}`;
};

export const formatDealDescription = (originalPrice, salePrice, savings) => {
  const original = parseFloat(originalPrice);
  const sale = parseFloat(salePrice);
  const discount = Math.round(parseFloat(savings));

  return `~~$${original.toFixed(2)}~~ **$${formatPrice(
    sale,
    true,
    discount
  )}** (${discount}% OFF)`;
};
