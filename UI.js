import { products } from "./products.js";

let cart = [];
console.log(cart);

function RenderProducts(ProductsList) {
  const ProductCardsElement = document.getElementById("products-container");
  ProductCardsElement.replaceChildren();
  const HeaderElement = document.createElement("h2");
  HeaderElement.textContent = `Available Products`;
  ProductCardsElement.appendChild(HeaderElement);

  ProductsList.forEach((product) => {
    const cardElement = createCardElement(product);
    ProductCardsElement.appendChild(cardElement);

    return ProductCardsElement;
  });
}
const totalElement = 0; 
function RenderCart(ProductsList) {
  const CartCardsElement = document.getElementById("cart-container");
  CartCardsElement.replaceChildren();
  const HeaderElement = document.createElement("h2");
  HeaderElement.textContent = `Your Cart`;
  CartCardsElement.appendChild(HeaderElement);

  ProductsList.forEach((product) => {
   totalElement =+ product.price; 
    const cardElement = createCardElement(product);
    CartCardsElement.appendChild(cardElement);
  });
  

}

function createCardElement(product) {
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");
  cardElement.draggable = true;
  cardElement.addEventListener("dragstart", (e) => {
    console.log("DragEvent");
    e.dataTransfer.setData("text/plain", product.title);
  });

  //add event listeners here

  const cardImageElement = document.createElement("div");
  cardImageElement.classList.add("card-img");
  cardImageElement.style = `background-image: url('${product.image}')`;
  const cardContentElement = document.createElement("div");
  cardContentElement.classList.add("card-content");
  cardElement.appendChild(cardImageElement);
  cardElement.appendChild(cardContentElement);

  const cardTitleElement = document.createElement("div");
  cardTitleElement.classList.add("card-title");
  cardTitleElement.textContent = product.title;
  cardContentElement.appendChild(cardTitleElement);

  const cardDescriptionElement = document.createElement("div");
  cardDescriptionElement.classList.add("card-description");
  cardDescriptionElement.textContent = product.description;
  cardContentElement.appendChild(cardDescriptionElement);

  const cardPriceElement = document.createElement("div");
  cardPriceElement.classList.add("card-price");
  cardPriceElement.textContent = `$${product.price}`;
  cardContentElement.appendChild(cardPriceElement);

  const cardQuantityElement = document.createElement("div");
  cardQuantityElement.classList.add("card-quantity");
  cardQuantityElement.textContent = `Quantity ${product.quantity}`;
  cardContentElement.appendChild(cardQuantityElement);

  return cardElement;
}

function CartEventListeners() {
  const CartCardsElement = document.getElementById("cart-container");
  CartCardsElement.addEventListener("dragover", (e) => {
    e.preventDefault();
    //add drag styles
  });

  CartCardsElement.addEventListener("drop", (e) => {
    console.log("dropped", e);
    console.log(cart);
    const itemTitle = e.dataTransfer.getData("text/plain");

    const product = products.find((p) => {
      if (p.title === itemTitle) {
        return true;
      }
      return false;
    });

    product.quantity = product.quantity - 1;
    RenderProducts(products);

    const ItemsInCart = cart.find((p) => {
      if (p.title === itemTitle) {
        return true;
      }
      return false;
    });

    if (ItemsInCart) {
      ItemsInCart.quantity = ItemsInCart.quantity + 1;
    } else {
      cart = [...cart, { ...product, quantity: 1 }];
    }

    RenderCart(cart);
  });

  CartCardsElement.addEventListener("dragenter", (e) => {
    e.preventDefault();
  });
}






RenderCart(cart);
RenderProducts(products);
CartEventListeners();
