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

    // Armazene os itens no localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Atualize a visualização do carrinho apenas se o cart-view não estiver sendo exibido
    if (!document.getElementById('cartView').classList.contains('show')) {
      updateCartView();
    }
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

  storedCartItems.forEach((item, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `${item.name} - $${item.price.toFixed(2)} <button onclick="removeCartItem(${index})">Excluir</button>`;
    cartItemsList.appendChild(listItem);
  });

  const totalAmount = storedCartItems.reduce((total, item) => total + item.price, 0);
  totalAmountElement.innerText = totalAmount.toFixed(2);
}

function removeCartItem(index) {
  // Remova o item do carrinho pelo índice
  const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  storedCartItems.splice(index, 1);

  // Atualize o carrinho no localStorage
  localStorage.setItem('cartItems', JSON.stringify(storedCartItems));

  // Atualize a visualização do carrinho
  updateCartView();
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
  window.location.href = './pages/cart.html';
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

function openProductModal(name, description, price, imageSrc) {

  // Preenche as informações do produto no modal
  document.getElementById('productName').innerText = name;
  document.getElementById('productDescription').innerText = description;
  document.getElementById('productPrice').innerText = 'Preço: $' + price.toFixed(2);

  const modalImage = document.getElementById('modalImage');
  modalImage.src = imageSrc;
  modalImage.alt = name;
  // Exibe o modal
  document.getElementById('productModal').style.display = 'block';
}

function closeProductModal() {
  // Oculta o modal ao clicar no botão de fechar (×) ou fora do modal
  document.getElementById('productModal').style.display = 'none';
}

// Fecha o modal ao clicar fora dele
window.onclick = function (event) {
  var modal = document.getElementById('productModal');
  var closeBtn = document.getElementsByClassName('close')[0];

  // Verifica se o clique ocorreu no botão de fechar ou fora do modal
  if (event.target === modal || event.target === closeBtn) {
    closeProductModal();
  }
}
// Função para ir para a página de compras
function goToShoppingPage() {
  window.location.href = '../../index.html'; // Substitua pelo caminho real da sua página de compras
}
// Função para verificar o status de login
function checkLoginStatus() {
  // Verifique se o usuário está "logado" usando localStorage
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  // Redirecione com base no status de login
  if (isLoggedIn) {
    window.location.href = './pages/profile.html'; // Redireciona para a página de perfil
  } else {
    window.location.href = './pages/singUp.html'; // Redireciona para a página de criação de conta
  }
}
// Função para redirecionar para a página de login
function redirectToLogin() {
  window.location.href = 'login.html'; // Substitua 'login.html' pela sua página de login
}

// Função para simular login
function login() {
  // Simula um processo de login e define o status de login no localStorage
  localStorage.setItem('isLoggedIn', 'true');
  checkLoginStatus(); // Redireciona após o login
}

// Função para simular logout
function logout() {
  // Simula um processo de logout e remove o status de login do localStorage
  localStorage.setItem('isLoggedIn', 'false');
  checkLoginStatus(); // Redireciona após o logout
}

// Função para criar uma conta
function createAccount() {
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const userData = {
    username: username,
    email: email,
    password: password
  };

  // Armazena os dados do usuário no localStorage
  localStorage.setItem('userData', JSON.stringify(userData));

  // Adicione lógica real para criar uma conta, como enviar dados para um servidor
  alert('Conta criada com sucesso!');
  window.location.href = 'profile.html';
}

// Função para fazer login
function login() {
  const storedUserData = JSON.parse(localStorage.getItem('userData'));

  if (!storedUserData) {
    alert('Usuário não encontrado. Crie uma conta primeiro.');
    return;
  }

  const enteredUsername = document.getElementById('username').value;
  const enteredPassword = document.getElementById('password').value;

  if (
    enteredUsername === storedUserData.username &&
    enteredPassword === storedUserData.password
  ) {
    alert(`Bem-vindo, ${enteredUsername}!`);
    window.location.href = 'profile.html';
  } else {
    alert('Usuário ou senha incorretos.');
  }
}
document.addEventListener('DOMContentLoaded', function () {
  // Função para verificar se o usuário está logado e exibir informações na página de perfil
  function checkLoginStatus() {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));

    if (storedUserData) {
      // Se o usuário estiver logado, exiba as informações na página de perfil
      const profileInfoElement = document.querySelector('.profile-info');

      profileInfoElement.innerHTML = `
        <h1>Perfil do Usuário</h1>
        <p>Nome: ${storedUserData.username}</p>
        <p>Email: ${storedUserData.email}</p>
        <!-- Adicione mais informações do perfil conforme necessário -->
      `;
    }
  }

  // Chame a função ao carregar a página de perfil
  checkLoginStatus();
});
// Função para atualizar o estado das opções de tirante
function updateHandleOptions() {
  const withHandleCheckbox = document.getElementById("withHandle");
  const withoutHandleCheckbox = document.getElementById("withoutHandle");

  if (withHandleCheckbox.checked) {
    // Se "Com Tirante" for selecionado, desmarcar "Sem Tirante"
    withoutHandleCheckbox.checked = false;
    // Exibir opções de largura do tirante
    document.getElementById("handleWidthOptions").style.display = "block";
  } else if (withoutHandleCheckbox.checked) {
    // Se "Sem Tirante" for selecionado, desmarcar "Com Tirante"
    withHandleCheckbox.checked = false;
    // Ocultar opções de largura do tirante
    document.getElementById("handleWidthOptions").style.display = "none";
  } else {
    // Nenhum selecionado, ocultar opções de largura do tirante
    document.getElementById("handleWidthOptions").style.display = "none";
  }
}

// Adicione a chamada da função updateHandleOptions nos eventos de clique dos checkboxes
document.getElementById("withHandle").addEventListener("click", updateHandleOptions);
document.getElementById("withoutHandle").addEventListener("click", updateHandleOptions);

// Função para lidar com a opção de estampa
function handleStampOption(selectedOption) {
  const oneStampCheckbox = document.getElementById('oneStamp');
  const twoStampsCheckbox = document.getElementById('twoStamps');

  if (selectedOption === 1) {
    // Se escolher uma estampa, desmarca a opção de duas estampas
    twoStampsCheckbox.checked = false;
  } else if (selectedOption === 2) {
    // Se escolher duas estampas, desmarca a opção de uma estampa
    oneStampCheckbox.checked = false;
  }
}
// Função para cadastrar um novo produto
function addNewProduct(name, description, price, image) {
  const newProduct = {
    id: products.length + 1,
    name: name,
    description: description,
    price: price,
    image: image
  };

  // Adiciona o novo produto ao array de produtos
  products.push(newProduct);

  // Chama a função para renderizar a lista de produtos
  renderProductList();
}
//Função para lidar com o envio do formulário de cadastro de produtos
function submitProductForm(event) {
  event.preventDefault(); // Impede o envio padrão do formulário

  // Obtém os valores dos campos do formulário
  const productName = document.getElementById('productName').value;
  const productDescription = document.getElementById('productDescription').value;
  const productPrice = parseFloat(document.getElementById('productPrice').value);
  const productImageInput = document.getElementById('productImage');
  
  // Verifica se um arquivo de imagem foi selecionado
  if (productImageInput.files.length === 0) {
    alert('Por favor, selecione uma imagem para o produto.');
    return;
  }

  // Obtém o objeto de arquivo da imagem
  const productImageFile = productImageInput.files[0];

  // Crie um objeto URL para a imagem carregada
  const imageUrl = URL.createObjectURL(productImageFile);

  // Adiciona o novo produto
  addNewProduct(productName, productDescription, productPrice, imageUrl);

  // Limpa os campos do formulário
  document.getElementById('productName').value = '';
  document.getElementById('productDescription').value = '';
  document.getElementById('productPrice').value = '';
  document.getElementById('productImage').value = '';
}


// Array para armazenar os produtos cadastrados
l
// Função para renderizar a lista de produtos na página
function renderProductList() {
  const productContainer = document.querySelector('.product-list');

  // Limpa o conteúdo atual
  productContainer.innerHTML = '';

  // Adiciona cada produto à lista
  products.forEach(product => {
    const productItem = document.createElement('div');
    productItem.classList.add('product');
    productItem.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <p>${product.description}</p>
      <p>Preço: $${product.price.toFixed(2)}</p>
      <button onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
    `;

    productContainer.appendChild(productItem);
  });
}
// Chama a função para renderizar a lista de produtos quando a página é carregada
document.addEventListener('DOMContentLoaded', renderProductList);