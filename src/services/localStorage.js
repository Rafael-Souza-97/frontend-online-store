export function setProductToLocalStorage(product) {
  localStorage.setItem('products', product);
}

export function getProductToLocalStorage() {
  if (!JSON.parse(localStorage.getItem('products'))) {
    localStorage.setItem('products', JSON.stringify([]));
  }
  return localStorage.getItem('products');
}

export function setEvaluationToLocalStorage(id, evaluation) {
  localStorage.setItem(id, evaluation);
}

export function getEvaluationToLocalStorage(id) {
  if (!JSON.parse(localStorage.getItem(id))) {
    localStorage.setItem(id, JSON.stringify([]));
  }
  return localStorage.getItem(id);
}
