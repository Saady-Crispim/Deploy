// utility.js
const catalago = [
  {
    id: "1",
    nome: "Bolo de paçoca ",
    tamanho: "180g",
    preco: 10.0,
    nomeimg: "product-1.jpg",
    doce: false,
  },
  {
    id: "2",
    nome: "Enroladinho de Salsicha",
    tamanho: "1 UND",
    preco: 6.0,
    nomeimg: "product-2.jpg",
    salgado: true,
  },
  {
    id: "3",
    nome: "Bolo de Prestigio",
    tamanho: "180g",
    preco: 10.0,
    nomeimg: "product-3.jpg",
    salgado: false,
  },
  {
    id: "4",
    nome: "Bolo de ninho",
    tamanho: "180g",
    preco: 10.0,
    nomeimg: "product-4.jpg",
    salgado: false,
  },
  {
    id: "5",
    nome: "Bolo de chocolate",
    tamanho: "180g",
    preco: 10.0,
    nomeimg: "product-5.jpg",
    salgado: false,
  },
  {
    id: "6",
    nome: "Mousse de maracujá",
    tamanho: "180g",
    preco: 10.0,
    nomeimg: "product-6.jpg",
    salgado: false,
  },
  {
    id: "7",
    nome: "Esfiha",
    tamanho: "1 UND",
    preco: 6.0,
    nomeimg: "product-7.jpg",
    salgado: true,
  },
  {
    id: "8",
    nome: "Mousse de limão",
    tamanho: "180g",
    preco: 10.0,
    nomeimg: "product-8.jpg",
    salgado: false,
  },
  {
    id: "9",
    nome: "Alpino",
    tamanho: "180g",
    preco: 12.0,
    nomeimg: "product-9.jpg",
    salgado: false,
  },
  {
    id: "10",
    nome: "Bolo de red velvet",
    tamanho: "180g",
    preco: 12.0,
    nomeimg: "product-10.jpg",
    salgado: false,
  },
  {
    id: "11",
    nome: "Leite ninho com geleia de abacaxi",
    tamanho: "180g",
    preco: 12.0,
    nomeimg: "product-11.jpg",
    salgado: false,
  },
  {
    id: "12",
    nome: "Sensação",
    tamanho: "180g",
    preco: 12.0,
    nomeimg: "",
    salgado: false,
  },
  {
    id: "13",
    nome: "Laka",
    tamanho: "180g",
    preco: 12.0,
    nomeimg: "",
    salgado: false,
  },
  {
    id: "14",
    nome: "Suffler",
    tamanho: "180g",
    preco: 12.0,
    nomeimg: "",
    salgado: false,
  },
];

function salvarLocalstorage(chave, informacao) {
  localStorage.setItem(chave, JSON.stringify(informacao));
}
function LerLocalstorage(chave) {
  return JSON.parse(localStorage.getItem(chave));
}

function apagarlocalsotrage(chave) {
  localStorage.removeItem(chave);
}

// menucart.js

const idsprodcartqtde = LerLocalstorage("cart") ?? {};

function abrircarrinho() {
  document.getElementById("carrinho").classList.add("right-0");
  document.getElementById("carrinho").classList.remove("right-[-360px]");
}

function fecharcarrinho() {
  document.getElementById("carrinho").classList.remove("right-0");
  document.getElementById("carrinho").classList.add("right-[-360px]");
}

function irparacheckout() {
  if (Object.keys(idsprodcartqtde).length === 0) {
    return;
  }
  window.location.href = window.location.origin + "/checkout.html";
}

function inicializarcarrinho() {
  const botaofecharcarrinho = document.getElementById("fechar-carrinho");
  const botaoabrircarrinho = document.getElementById("abrir-carrinho");

  botaofecharcarrinho.addEventListener("click", fecharcarrinho);
  botaoabrircarrinho.addEventListener("click", abrircarrinho);
}

function removercart(idproduto) {
  delete idsprodcartqtde[idproduto];
  salvarLocalstorage("cart", idsprodcartqtde);
  renderizarprodcart();
}

function renderizarprodcart() {
  const containercart = document.getElementById("produtos-carrinho");
  containercart.innerHTML = "";
  for (const idproduto in idsprodcartqtde) {
    desenharprodcart(idproduto);
  }
  attprecocart();
}

function incrementaeqtdeprod(idproduto) {
  idsprodcartqtde[idproduto]++;
  salvarLocalstorage("cart", idsprodcartqtde);
  attinfoqtde(idproduto);
  attprecocart();
}

function decrementarqtdeprod(idproduto) {
  if (idsprodcartqtde[idproduto] === 1) {
    removercart(idproduto);
    return;
  }
  idsprodcartqtde[idproduto]--;
  salvarLocalstorage("cart", idsprodcartqtde);
  attprecocart();
  attinfoqtde(idproduto);
}

function attinfoqtde(idproduto) {
  document.getElementById(`quantidade-${idproduto}`).innerText =
    idsprodcartqtde[idproduto];
}

function desenharprodcart(idproduto) {
  const produto = catalago.find((p) => p.id === idproduto);

  const containercart = document.getElementById("produtos-carrinho");

  const elementoarticle = document.createElement("article");

  const articleclasses = [
    "flex",
    "bg-slate-950",
    "text-slate-100",
    "rounded-lg",
    "relative",
  ];
  for (const articleclass of articleclasses) {
    elementoarticle.classList.add(articleclass);
  }

  const cartaocart = `<button id="remover-item-${produto.id}" class="absolute top-0 right-[5px]">
          <i class="fa-solid fa-circle-xmark hover:text-slate-200"></i>
        </button>
        <img src="./Assets/IMG/${produto.nomeimg}" alt="Carrinho: ${produto.nome}" class="h-24 w-24 rounded-lg object-cover" />
        <div class="flex flex-col justify-between p-2">
          <p class="text-sm">${produto.nome}</p>
          <p class="text-xs">tamanho:${produto.tamanho}</p>
          <p class="text-lg">R$${produto.preco},00</p>
        </div>
        <div class="flex text-slate-300 items-end absolute bottom-0 right-2  text-lg ">
          <button id="decrementarqtdeprod-${produto.id}">-</button> <!-- Removendo a função incrementaeqtdeprod e decrementarqtdeprod dos IDs -->
          <p id="quantidade-${produto.id}" class="ml-2">${idsprodcartqtde[idproduto]}</p>
          <button id="incrementaeqtdeprod-${produto.id}" class="ml-2">+</button>
        </div>`;

  elementoarticle.innerHTML = cartaocart;
  containercart.appendChild(elementoarticle);

  document
    .getElementById(`incrementaeqtdeprod-${produto.id}`)
    .addEventListener("click", () => incrementaeqtdeprod(produto.id));
  document
    .getElementById(`decrementarqtdeprod-${produto.id}`)
    .addEventListener("click", () => decrementarqtdeprod(produto.id));
  document
    .getElementById(`remover-item-${produto.id}`)
    .addEventListener("click", () => removercart(produto.id));
}

function addcart(idproduto) {
  if (idproduto in idsprodcartqtde) {
    incrementaeqtdeprod(idproduto);
    return;
  }
  idsprodcartqtde[idproduto] = 1;
  salvarLocalstorage("cart", idsprodcartqtde);
  attprecocart();
  desenharprodcart(idproduto);
}

function attprecocart() {
  const precocart = document.getElementById("preco-total");
  let precototalcart = 0;
  for (const idprodNocart in idsprodcartqtde) {
    precototalcart +=
      catalago.find((p) => p.id === idprodNocart).preco *
      idsprodcartqtde[idprodNocart];
  }
  precocart.innerText = `Total: R$ ${precototalcart},00`;
}

// filtroscat.js
const catalagoprodutos = document.getElementById("container-produto");

function exibirtodos() {
  const prodesconsdidos = Array.from(
    catalagoprodutos.getElementsByClassName("hidden")
  );

  for (const produto of prodesconsdidos) {
    produto.classList.remove("hidden");
  }
}

function esconderdoces() {
  exibirtodos();
  const produtosDoces = Array.from(
    catalagoprodutos.getElementsByClassName("doce")
  );

  for (const produto of produtosDoces) {
    produto.classList.add("hidden");
  }
}

function esconderSalgados() {
  exibirtodos();
  const produtosSalgados = Array.from(
    catalagoprodutos.getElementsByClassName("salgado")
  );

  for (const produto of produtosSalgados) {
    produto.classList.add("hidden");
  }
}

function inicializarFiltros() {
  document
    .getElementById("exibir-todos")
    .addEventListener("click", exibirtodos);
  document
    .getElementById("exibir-salgados")
    .addEventListener("click", esconderdoces);
  document
    .getElementById("exibir-doces")
    .addEventListener("click", esconderSalgados);
}

// cartaoproduto.js

function renderizarcat() {
  for (const prodcatalago of catalago) {
    const cartaoproduto = `
        <div class='font-Arial border-solid p-2 w-48 m-4 flex flex-col shadow-xl shadow-slate-700 group ${
          prodcatalago.salgado ? "salgado" : "doce"
        } rounded-lg' id="card-produto-${prodcatalago.id}">
            <img
                src="Assets/IMG/${prodcatalago.nomeimg}"
                alt=""
                class="group-hover:scale-110 duration-200 h-40 object-cover rounded-lg"
            />
            <p class='text-sm my-3 font-semibold'>${prodcatalago.tamanho}</p>
            <p class="text-sm font-bold">${prodcatalago.nome}</p>
            <p class="text-sm font-semibold">R$${prodcatalago.preco},00</p>
            <button id="adicionar-${
              prodcatalago.id
            }" class="my-2 bg-slate-950 text-slate-200 hover:bg-slate-300 hover:text-slate-900 rounded-lg hover:bg-slate-700"><i class="fa-solid fa-cart-plus"></i></button>
            </div>`;

    document.getElementById("container-produto").innerHTML += cartaoproduto;
  }

  for (const prodcatalago of catalago) {
    document
      .getElementById(`adicionar-${prodcatalago.id}`)
      .addEventListener("click", () => addcart(prodcatalago.id));
  }
}

renderizarcat();
inicializarcarrinho();
renderizarprodcart();
attprecocart();
inicializarFiltros();
