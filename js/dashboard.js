// Função para carregar conteúdo dinâmico no card de pedidos
function loadOrdersContent() {
  const ordersCard = document.getElementById('ordersCard');
  const dynamicContent = '<p>Conteúdo dinâmico do Card de Pedidos...</p>'; // Adicione seu conteúdo dinâmico aqui
  ordersCard.innerHTML = dynamicContent;
}

// Event listener para o carregamento de conteúdo dinâmico no card de pedidos
document.addEventListener('DOMContentLoaded', function() {
  loadOrdersContent();
});
var dropdown = document.getElementsByClassName("dropdown-btn");
var i;
var sidebar = document.getElementsByClassName("sidebar");

for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var dropdownContent = this.nextElementSibling;
    if (dropdownContent.style.display === "block") {
      dropdownContent.style.display = "none";
    } else {
      dropdownContent.style.display = "block";
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const sidebar = document.querySelector('.sidebar');
  const sidebarToggle = document.querySelector('.sidebar-toggle');
  const closeButton = document.querySelector('.close-button');

  // Função para alternar a barra lateral
  function toggleSidebar() {
    sidebar.classList.toggle('active');
  }

  // Função para fechar a barra lateral
function closeSidebar() {
  if (sidebar.classList.contains('active')) {
    sidebar.classList.remove('active');
  }
}

  // Adiciona event listener para o botão de alternância
  sidebarToggle.addEventListener('click', toggleSidebar);

  // Adiciona event listener para o botão de fechar
  closeButton.addEventListener('click', closeSidebar);

});