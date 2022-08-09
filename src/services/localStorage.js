export function setProductToLocalStorage(product) {
  localStorage.setItem('products', product);
}

export function getProductToLocalStorage() {
  return localStorage.getItem('products');
}

export function setEvaluationToLocalStorage(evaluation) {
  localStorage.setItem('evaluations', evaluation);
}
export function getEvaluationToLocalStorage() {
  return localStorage.getItem('evaluations');
}
