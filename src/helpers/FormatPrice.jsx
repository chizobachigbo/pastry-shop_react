const FormatPrice = ({ price }) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 2,
  }).format(price);
};

export default FormatPrice;
