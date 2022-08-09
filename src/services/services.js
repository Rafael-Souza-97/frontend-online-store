export default function filterProducts(param) {
  const reduceCartProducts = param.reduce((acc, curr) => {
    const hasRepeat = acc.includes(curr.title);
    if (!hasRepeat) {
      const getTitle = curr.title;
      acc.push(getTitle);
      return acc;
    } return acc;
  }, []);
  const filteredProducts = [];
  reduceCartProducts.forEach((title) => {
    filteredProducts.push(param.find((el) => el.title === title));
  });
  return filteredProducts;
}
