export async function getCategories() {
  const fetchData = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const data = await fetchData.json();

  return data;
}

export async function getProductsFromCategoryAndQuery(CATEGORY_ID, QUERY) {
  const fetchData = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${CATEGORY_ID}&q=${QUERY}`);
  const data = await fetchData.json();

  return data;
}

export async function getProductsFromQuery(QUERY) {
  const fetchData = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}`);
  const data = await fetchData.json();

  return data;
}

export async function getProductsFromCategory(CATEGORY_ID) {
  const fetchData = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${CATEGORY_ID}`);
  const data = await fetchData.json();

  return data;
}

export async function getProductFromId(id) {
  const fetchData = await fetch(`https://api.mercadolibre.com/items/${id}`);
  const data = await fetchData.json();

  return data;
}
