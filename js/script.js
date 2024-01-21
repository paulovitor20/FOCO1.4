let cartItems = [];
const products = [
  { id: 1, name: 'Produto 1', price: 19.99 },
  { id: 2, name: 'Produto 2', price: 29.99 },
  // Adicione mais produtos conforme necessário
];

function addToCart(productId) {
  const product = products.find(item => item.id === productId);

  if (product) {
    const newItem = {
      id: product.id,
      name: product.name,
      price: product.price,
    };

    cartItems.push(newItem);
    updateCartCount();
    updateCartView();

    // Armazene os itens no localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }
  event.stopPropagation();
}

function updateCartCount() {
  const cartCountElement = document.getElementById('cartCount');
  cartCountElement.innerText = cartItems.length;
}

function updateCartView() {
  const cartItemsList = document.getElementById('cartItemsList');
  const totalAmountElement = document.getElementById('totalAmount');

  cartItemsList.innerHTML = '';
  totalAmountElement.innerText = '0.00';

  // Recupere os itens do carrinho do localStorage
  const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  storedCartItems.forEach(item => {
    const listItem = document.createElement('li');
    listItem.textContent = `${item.name} - $${item.price.toFixed(2)}`;
    cartItemsList.appendChild(listItem);
  });

  const totalAmount = storedCartItems.reduce((total, item) => total + item.price, 0);
  totalAmountElement.innerText = totalAmount.toFixed(2);
}

function checkout() {
  // Atualize esta função para limpar o localStorage após a compra
  const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  
  if (storedCartItems.length > 0) {
    console.log('Compra finalizada. Itens no carrinho:', storedCartItems);
    
    // Adicione lógica real para finalizar a compra aqui
    
    // Limpe os itens do carrinho no localStorage após a compra
    localStorage.removeItem('cartItems');
    
    updateCartView(); // Atualize a visualização do carrinho
  } else {
    console.log('Carrinho vazio. Adicione itens antes de finalizar a compra.');
  }
}
// função para abrir o carrinho em uma nova página
function openCartPage() {
  window.location.href = 'cart.html';
}
function continueShopping() {
  // Obtém os itens do carrinho do armazenamento local
  const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  // Atualiza a visualização do carrinho
  updateCartView();
}

// Chame a função continueShopping quando a página for carregada para garantir que os itens sejam carregados
document.addEventListener('DOMContentLoaded', function () {
  continueShopping();
});

function openProductModal(name, description, price) {
  // Preenche as informações do produto no modal
  document.getElementById('productName').innerText = name;
  document.getElementById('productDescription').innerText = description;
  document.getElementById('productPrice').innerText = 'Preço: $' + price.toFixed(2);

  // Exibe o modal
  document.getElementById('productModal').style.display = 'block';
}

function closeProductModal() {
  // Oculta o modal ao clicar no botão de fechar (×) ou fora do modal
  document.getElementById('productModal').style.display = 'none';
}

// Fecha o modal ao clicar fora dele
window.onclick = function(event) {
  var modal = document.getElementById('productModal');
  var closeBtn = document.getElementsByClassName('close')[0];

  // Verifica se o clique ocorreu no botão de fechar ou fora do modal
  if (event.target === modal || event.target === closeBtn) {
    closeProductModal();
  }
}