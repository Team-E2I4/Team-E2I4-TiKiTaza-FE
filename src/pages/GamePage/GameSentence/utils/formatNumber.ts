const formatNumber = (num: number, decimal: number = 1) => {
  if (Number.isInteger(num)) {
    return num;
  }
  return +num.toFixed(decimal);
};

export default formatNumber;
