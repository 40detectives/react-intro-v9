const intl = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
});

export default function formatCurrency(price) {
  return intl.format(price);
}
