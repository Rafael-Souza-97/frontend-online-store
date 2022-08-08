export function setProductToLocalStorage(product) {
  localStorage.setItem('products', product);
}

export function getProductToLocalStorage() {
  return localStorage.getItem('products');
}
