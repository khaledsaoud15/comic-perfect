const swiper = new Swiper(".swiper", {
  slidesPerView: 3,
  autoplay: {
    delay: 3500,
    pauseOnMouseEnter: true,
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  spaceBetween: 30,
  loop: true,
});

const slider_container = document.querySelector(".slider-container");
const cart_container = document.querySelector(".cart-container");
const overlay = document.querySelector(".fullOverlay");
const totalprice = document.querySelector(".totalprice span");
const cart_icon = document
  .querySelector(".cart-icon")
  .addEventListener("click", () => {
    overlay.style.display = "flex";
  });
const exitButton = document
  .querySelector(".exitbtn")
  .addEventListener("click", () => {
    overlay.style.display = "none";
  });

totalprice.textContent = 0;

const cartArray = [];
count = 1;

// CALCULATE TOTAL PRICE
const countTotal = (arr) => {
  let totalInArr = arr
    .map((el) => el.total)
    .reduce((curr, acc) => curr + acc, 0);
  totalprice.textContent = totalInArr;
  return totalprice;
};

// ADD TO CART
const addToCart = (id) => {
  const cartItem = cartArray.find((d) => d.id === id);
  const cartInData = data.find((d) => d.id === id);

  if (cartItem) {
    count++;
    cartItem.quantity = count;
    cartItem.total = cartItem.price * cartItem.quantity;
    countTotal(cartArray);
  } else {
    cartArray.push(cartInData);
    count = 1;
  }

  renderDataInCart();
};

// DELETE FROM CART
const deleteFromCart = (i) => {
  cartArray.splice(i, 1);
  renderDataInCart();
  countTotal(cartArray);
};

// INCREMENT ITEM QUANTITY IN CART
const incAndDec = (target) => {
  let item = cartArray.find((c) => c.id === target);
  if (item) {
    item.quantity += 1;
    item.total = item.price * item.quantity;
  }
  renderDataInCart();
  countTotal(cartArray);
};

// DECREMENT ITEM QUANTITY IN CART
const Dec = (target) => {
  let item = cartArray.find((c) => c.id === target);
  if (item.quantity <= 1) {
    return;
  }
  if (item) {
    item.quantity -= 1;
    item.total = item.price * item.quantity;
  }
  renderDataInCart();
  countTotal(cartArray);
};

// RENDER DATA in CART
const renderDataInCart = () => {
  cart_container.innerHTML = "";
  cartArray.map((c, i) => {
    cart_container.innerHTML += `
    <div
    class="space-y-2 w-1/3 h-auto shadow-xl rounded-lg overflow-hidden"
  >
    <img
      src=${c.img}
      alt=""
      class="w-full h-[40vh] object-cover"
    />
    <h1 class="font-semibold text-xl ml-2 text-center">${c.title}</h1>
    <div class="flex items-center justify-between w-full px-2">
      <p class="font-thin text-xl">
        Price: $${c.price} X <span class="font-semibold">${c.quantity}</span>
      </p>
      <div class="flex items-center gap-2">
        <button onclick=Dec(${c.id})  class="py-0 px-2 bg-transparent border border-black">
          -
        </button>
        <span class="font-semibold">${c.quantity}</span>
        <button onclick=incAndDec(${c.id}) class="py-0 px-2 bg-transparent border border-black">
          +
        </button>
      </div>
    </div>
    <div class="flex items-center justify-between px-2">
      <p class="font-thin text-xl">
        Total Price: <span class="font-bold">${c.total}</span>
      </p>
      <button onclick=deleteFromCart(${i}) class="bg-velvet text-white border-none px-2 py-1">
        Delete
      </button>
    </div>
  </div>
    `;
  });
};

// RENDER DATA IN DISPLAY
const renderData = () => {
  data.map((d) => {
    slider_container.innerHTML += `
    <div class="swiper-slide h-auto w-full flex flex-col gap-2">
    <img
      src=${d.img}
      alt=""
      class="h-[60vh]"
    />
    <div class="flex items-center justify-between px-3">
      <h1 class="text-xl font-bold">${d.title}</h1>
      <p class="text-base font-thin">
        Reviews: <span class="font-bold">35k</span>
      </p>
    </div>
    <div class="flex items-center justify-between p-3">
      <p class="font-thin">
        Price: <span class="font-bold">$${d.price}</span>
      </p>
      <button
        class="py-2 px-4 bg-transparent border border-black text-black font-semibold text-sm"
        onclick=addToCart(${d.id})
      >
        ADD TO CART
      </button>
    </div>
  </div>
    `;
  });
};

renderData();
