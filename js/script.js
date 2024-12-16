// Cart state
const cart = [];
let selectedPrice = 69;
let selectedColor = "purple";
let selectedSize = "S";

// Elements
const addToCartButton = document.querySelector(".add-to-cart");
const checkoutButton = document.querySelector(".checkout-btn");
const fullCartContainer = document.querySelector(".cart-container");
const hideCartContainer = document.querySelector(".close-cart-btn");
const cartContainer = document.querySelector(".cart");
const totalQuantityElement = document.querySelector(".total-quantity");
const totalPriceElement = document.querySelector(".total-price");
const cartQuantityEl = document.querySelector(".cart-quantity");
const colorButtons = document.querySelectorAll(".color-btn");
const sizeButtons = document.querySelectorAll(".size-btn");
const decrementBtn = document.querySelector(".decrement");
const incrementBtn = document.querySelector(".increment");
const quantityValueEl = document.querySelector(".quantity-value");
const productImage = document.querySelector(".product-image");
const shoppingCartIconEl = document.querySelector(".shopping-cart-btn");


let quantity = parseInt(quantityValueEl.textContent);

// Handle decrement button click
decrementBtn.addEventListener("click", () => {
  if (quantity > 1) {
    quantity--;
    quantityValueEl.textContent = quantity;
  }
});

// Handle increment button click
incrementBtn.addEventListener("click", () => {
  quantity++;
  quantityValueEl.textContent = quantity;
});

checkoutButton.addEventListener("click", () => {
  fullCartContainer.classList.remove("hidden");
});

hideCartContainer.addEventListener("click", () => {
  fullCartContainer.classList.add("hidden");
});

shoppingCartIconEl.addEventListener("click", () => {
  fullCartContainer.classList.toggle("hidden");
});

// Handle color selection
colorButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    selectedColor = btn.getAttribute("data-color");
    productImage.src = `/images/${selectedColor}.png`;

    // Style active color button
    colorButtons.forEach(b => b.classList.remove("ring-2", "ring-offset-2", "ring-purple-600"));
    btn.classList.add("ring-2", "ring-offset-2", selectedColor === "black" ? "ring-black" : `ring-${selectedColor}-600`);
  });
});

// Handle size selection
sizeButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    selectedSize = btn.getAttribute("data-size");
    selectedPrice = btn.getAttribute("data-price");

    // Style active size button
    sizeButtons.forEach(b => {
      b.classList.remove("bg-purple-50", "text-purple-600", "border-purple-600");
      b.classList.add("border-gray-200", "text-gray-900");
    });
    btn.classList.add("bg-purple-50", "text-purple-600", "border-purple-600");
  });
});

// Add to cart handler
addToCartButton.addEventListener("click", () => {
  if (quantity === 0) {
    alert("You can't add product on you cart with 0 quantity");
    return;
  }
  const product = {
    id: 1,
    name: "Classy Modern Smart watch",
    color: selectedColor,
    size: selectedSize,
    price: selectedPrice,
    quantity: quantity,
    image: `/images/${selectedColor}.png`,
  };

  const existingProduct = cart.find((item) => item.size === product.size && item.color === product.color);

  if (existingProduct) {
    existingProduct.quantity += quantity;
  } else {
    cart.push({ ...product });
  }

  updateCartUI();
  checkoutButton.classList.remove("hidden");
});

// Update Cart UI
function updateCartUI() {
  cartContainer.innerHTML = ""; // Clear cart

  let totalQuantity = 0;
  let totalPrice = 0;


  cart.forEach((item) => {
    const row = document.createElement("tr");

    row.innerHTML = `
        <td class="py-4">
          <div class="flex items-center gap-3">
            <img
              src="${item.image}"
              alt="${item.name}"
              class="w-16 h-16 object-cover rounded-lg bg-gray-100"
            />
            <span class="font-medium text-gray-800">${item.name}</span>
          </div>
        </td>
        <td class="py-4">${item.color.charAt(0).toUpperCase() + item.color.slice(1)}</td>
        <td class="py-4">${item.size}</td>
        <td class="py-4">${item.quantity}</td>
        <td class="py-4 text-right">$${(item.price * item.quantity).toFixed(2)}</td>
      `;

    cartContainer.appendChild(row);

    totalQuantity += item.quantity;
    totalPrice += item.price * item.quantity;
  });

  // Update total
  cartQuantityEl.textContent = totalQuantity;
  totalQuantityElement.textContent = totalQuantity;
  totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
}