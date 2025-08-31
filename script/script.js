import products from "./products.js";

//Header

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
  if (window.scrollY > 0) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

//Menu-Burger

const headerContainer = document.querySelector(".header__container");
const menu = document.querySelector(".header__menu");
const menuLinks = document.querySelectorAll(".menu__link");
const headerButton = document.querySelector(".header__button");
const headerButtons = document.querySelector(".header__buttons");
const headerActions = document.querySelector(".header__actions");
const menuBurgerBtn = document.querySelector(".menu-burger");

const headerFormModal = document.getElementById("header-modal");
const formModalOverlay = document.querySelector(".modal__overlay");
const formModalClose = document.querySelector(".modal-close");
const headerForm = document.querySelector(".header__form");
const formMessages = document.getElementById("formMessages");

const MOBILE = 428;

menuBurgerBtn.addEventListener("click", () => {
  menu.classList.toggle("active");
  menuBurgerBtn.classList.toggle("active");
  if (menu.classList.contains("active")) {
    document.body.classList.add("modal-open");
  } else {
    document.body.classList.remove("modal-open");
  }
});

document.addEventListener("click", (e) => {
  if (
    !menu.contains(e.target) &&
    !menuBurgerBtn.contains(e.target) &&
    !headerFormModal.contains(e.target) &&
    !formModalOverlay.contains(e.target) &&
    !formModalClose.contains(e.target) &&
    !formMessages.contains(e.target)
  ) {
    closeMenu();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});

menuLinks.forEach((menuLink) => {
  menuLink.addEventListener("click", closeMenu);
});

function closeMenu() {
  menu.classList.remove("active");
  menuBurgerBtn.classList.remove("active");
  document.body.classList.remove("modal-open");
}

function moveButton() {
  if (window.innerWidth <= MOBILE) {
    if (!menu.contains(headerButton)) menu.appendChild(headerButton);
    if (!headerActions.contains(menuBurgerBtn))
      headerActions.appendChild(menuBurgerBtn);
  } else {
    if (!headerButtons.contains(headerButton)) {
      headerButtons.insertBefore(headerButton, headerActions);
    }

    if (!headerContainer.contains(menuBurgerBtn))
      headerContainer.appendChild(menuBurgerBtn);
  }
}

moveButton();

window.addEventListener("resize", moveButton);

//Header-Form-Modal

headerButton.addEventListener("click", () => {
  headerFormModal.classList.add("show");
  document.body.classList.add("modal-open");
});

formModalOverlay.addEventListener("click", closeModalForm);
formModalClose.addEventListener("click", closeModalForm);

function closeModalForm() {
  headerFormModal.classList.remove("show");
  document.body.classList.remove("modal-open");
}

//Form-Validation

window.addEventListener("load", () => {
  headerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameInput = document.querySelector(".form__name");
    const emailInput = document.querySelector(".form__email");
    const passwordInput = document.querySelector(".form__password");

    formMessages.innerHTML = "";
    let errors = [];

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (name.length < 4) {
      errors.push("Name is not valid");
      nameInput.classList.add("error");
    } else {
      nameInput.classList.remove("error");
    }

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      errors.push("Email is not valid");
      emailInput.classList.add("error");
    } else {
      emailInput.classList.remove("error");
    }

    if (password.length < 6) {
      errors.push("Password is not valid");
      passwordInput.classList.add("error");
    } else {
      passwordInput.classList.remove("error");
    }

    if (errors.length > 0) {
      formMessages.innerHTML = errors
        .map((e) => `<p class="form__error" style="color:red">${e}</p>`)
        .join("");
      return;
    }

    formMessages.innerHTML = `<p class="form-message-green" style='color:green'>Form submitted successfully!</p>`;

    headerForm.reset();

    setTimeout(() => {
      formMessages.innerHTML = "";
    }, 3000);
  });
});

//Animation

const animationItems = document.querySelectorAll(".animation");
const animationItemsEvents = document.querySelectorAll(".item-events");
const fallItems = document.querySelectorAll(".fall");

const allItems = Array.from(animationItemsEvents);

allItems.sort(
  (a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top
);

const animation = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const el = entry.target;

      if (el.classList.contains("animation")) {
        el.classList.add("show");
      }

      if (el.classList.contains("fall")) {
        const index = Array.from(fallItems).indexOf(el);
        el.style.animationDelay = `${index * 0.3}s`;
        el.classList.add("show");
      }

      if (el.classList.contains("item-events")) {
        const index = allItems.indexOf(el);
        el.style.animationDelay = `${index * 0.3}s`;
        el.classList.add("show");
      }

      observer.unobserve(el);
    }
  });
});

animationItems.forEach((item) => animation.observe(item));
animationItemsEvents.forEach((item) => animation.observe(item));
fallItems.forEach((item) => animation.observe(item));

//Lazy-Loading

const lazyImages = document.querySelectorAll("img.lazy");

const lazyObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.addEventListener("load", () => {
          img.classList.add("loaded");
        });
        observer.unobserve(img);
      }
    });
  },
  {
    rootMargin: "200px 0px",
    threshold: 0.1,
  }
);

lazyImages.forEach((img) => lazyObserver.observe(img));

//Moving Element

const contentItem = document.querySelector(".content__item");
const contentItemContent = document.querySelector(".content__item-content");
const homeButtonsContent = document.querySelector(".home__buttons-content");

const mediaQuery = window.matchMedia("(max-width: 510px)");

function handleMove(e) {
  if (e.matches) {
    if (contentItem.parentNode !== homeButtonsContent) {
      homeButtonsContent.appendChild(contentItem);
    }
  } else {
    if (contentItem.parentNode !== contentItemContent) {
      contentItemContent.appendChild(contentItem);
    }
  }
}

handleMove(mediaQuery);

mediaQuery.addEventListener("change", handleMove);

//Tabs

const tabsButtons = document.querySelectorAll(".tabs__button");
const contentMenu = document.querySelectorAll(".tab-content");

let allProducts = [];

tabsButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.tab;

    tabsButtons.forEach((b) => b.classList.remove("active"));
    contentMenu.forEach((c) => c.classList.remove("active"));

    button.classList.add("active");
    contentMenu.forEach((content) => {
      if (content.dataset.content === target) {
        content.classList.add("active");
      }
    });

    let type;

    if (target === "tab1") {
      type = "all";
    } else if (target === "tab2") {
      type = "Meat";
    } else if (target === "tab3") {
      type = "Vegetarian";
    } else if (target === "tab4") {
      type = "SeaProducts";
    } else if (target === "tab5") {
      type = "Mushroom";
    }

    renderProductsType(type);
  });
});

//Render-Type-Products

function renderProductsType(type) {
  const activeContent = document.querySelector(".tab-content.active");
  const menuItems1 = activeContent.querySelector(".menu__items1");
  const menuItems2 = activeContent.querySelector(".menu__items2");

  if (menuItems1) menuItems1.innerHTML = "";
  if (menuItems2) menuItems2.innerHTML = "";

  const filteredProducts =
    type === "all" ? allProducts : allProducts.filter((p) => p.type === type);

  filteredProducts.forEach((product, index) => {
    renderProducts(product, index, menuItems1, menuItems2);
  });
}

//Render-Products

const buttonShop = document.getElementById("button-shop");
const cartCountEl = document.getElementById("cart-count");
const productsInBasket = [];

function updateCartCount() {
  let totalQuantity = productsInBasket.reduce(
    (sum, prod) => sum + prod.quantity,
    0
  );
  cartCountEl.textContent = totalQuantity > 0 ? totalQuantity : "";
  cartCountEl.style.display = totalQuantity > 0 ? "block" : "none";
}

const savedCart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];
productsInBasket.push(...savedCart);
updateCartCount();

function renderProducts(product, index, menuItems1, menuItems2) {
  const div = document.createElement("div");

  let basePrice = product.price;
  let quantity = product.quantity || 1;

  div.classList.add("content__product", "product");
  div.innerHTML = `
   <div class="product__image">
    <img src="${product.img}" alt="${product.name}"/>
    </div>
     <div class="product__title">${product.name}</div>
     <div class="product__text text"> <p>${product.text}</p> </div>
     <div class="product__buttons-size">
      <button class="button-size button-size1">${product.buttonSize1}</button>
      <button class="button-size button-size2">${product.buttonSize2}</button>
      <button class="button-size button-size3">${product.buttonSize3}</button>
      </div>
      <button class="product__button-ingridients button">${product.buttonIngridients}</button>
      <div class="product__info info-product">
      <div class="info-product__price">${basePrice} $</div>
      <div class="info-product__buttons">
      <button class="info-product__button-minus">${product.buttonMinus}</button>
      <div class="info-product__quantity">${quantity}</div>
      <button class="info-product__button-plus">${product.buttonPlus}</button>
      </div>
      </div>
      <button data-push="btn-push${index}" class="product__button button-push button" id="${product.id}">Order Now</button>
`;

  if (index < 4 && menuItems1) {
    menuItems1.appendChild(div);
  } else if (menuItems2) {
    menuItems2.appendChild(div);
  }

  function setupSizeButtons(div) {
    const buttons = div.querySelectorAll(".button-size");

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        buttons.forEach((b) => b.classList.remove("active"));
        button.classList.toggle("active");
      });
    });
  }

  setupSizeButtons(div);

  function checkSizeSelected(div) {
    const activeSize = div.querySelector(".button-size.active");
    return activeSize ? activeSize.textContent : null;
  }

  //Product-Button-Ingridients

  const productButtonIngridients = div.querySelectorAll(
    ".product__button-ingridients"
  );

  productButtonIngridients.forEach((btnIngridients) => {
    btnIngridients.addEventListener("click", () => {
      openModal(product);
    });
  });

  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `
  <div class="modal__overlay"></div>
  <div class="modal__content">
    <span class="modal-close">&times;</span>
    <h2 class="modal__title"></h2>
    <div class="modal__text"></div>
  </div>
`;
  document.body.appendChild(modal);

  const modalTitle = modal.querySelector(".modal__title");
  const modalText = modal.querySelector(".modal__text");
  const closeBtn = modal.querySelector(".modal-close");
  const overlay = modal.querySelector(".modal__overlay");

  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", closeModal);

  function closeModal() {
    modal.classList.remove("show");
    document.body.classList.remove("modal-open");
  }

  function openModal(product) {
    modalTitle.textContent = product.name;
    modalText.textContent = product.text;

    requestAnimationFrame(() => modal.classList.add("show"));
  }

  //Plus and Minus

  const buttonsPlus = div.querySelectorAll(".info-product__button-plus");
  const buttonMinus = div.querySelectorAll(".info-product__button-minus");
  const quantityEl = div.querySelector(".info-product__quantity");
  const priceEl = div.querySelector(".info-product__price");

  const minQuantity = 1;
  const maxQuantity = 100;

  quantity = minQuantity;
  quantityEl.textContent = quantity;
  priceEl.textContent = basePrice.toFixed(2) + "$";

  function mouseClick(button) {
    button.addEventListener("mousedown", () => {
      button.classList.add("active");
    });
    button.addEventListener("mouseup", () => {
      button.classList.remove("active");
    });
    button.addEventListener("mouseleave", () => {
      button.classList.remove("active");
    });
  }

  buttonsPlus.forEach((btnPlus) => {
    mouseClick(btnPlus);

    btnPlus.addEventListener("click", () => {
      if (quantity < maxQuantity) {
        quantity++;
        quantityEl.textContent = quantity;
        priceEl.textContent = (basePrice * quantity).toFixed(2) + "$";
      }
    });
  });

  buttonMinus.forEach((btnMinus) => {
    mouseClick(btnMinus);

    btnMinus.addEventListener("click", () => {
      if (quantity > minQuantity) {
        quantity--;
      }
      quantityEl.textContent = quantity;
      priceEl.textContent = (basePrice * quantity).toFixed(2) + "$";
    });
  });

  //Button-Push

  const buttonPush = div.querySelector(".button-push");

  buttonPush.addEventListener("click", () => {
    if (!checkSizeSelected(div)) {
      alert("Please enter the size of the selected pizza.");
      return;
    }

    const activeSizeBtn = div.querySelector(".button-size.active");
    const buttons = div.querySelectorAll(".button-size");
    buttons.forEach((b) => b.classList.remove("active"));
    const size = activeSizeBtn ? activeSizeBtn.textContent : "";

    const totalPrice = (basePrice * quantity).toFixed(2) + "$";

    const existing = productsInBasket.find(
      (p) => p.name === product.name && p.size === size
    );

    if (existing) {
      existing.quantity += quantity;
      existing.totalPrice = (basePrice * existing.quantity).toFixed(2) + "$";
    } else {
      productsInBasket.push({
        name: product.name,
        size,
        quantity,
        totalPrice,
      });
    }

    updateCartCount();
    localStorage.setItem("cart", JSON.stringify(productsInBasket));
  });
}

function closeModal() {
  modal.classList.remove("show");
  document.body.classList.remove("modal-open");
}

const modal = document.createElement("div");
modal.classList.add("modal");
modal.innerHTML = `
    <div class="modal__overlay"></div>
    <div class="modal__content">
    <span class="modal-close">&times;</span>
    <h2 class="modal__title">Your basket:</h2>
    <div id="basket-items"></div>
    </div>
    `;

document.body.appendChild(modal);

const basketContainer = modal.querySelector("#basket-items");
const closeBtn = modal.querySelector(".modal-close");
const overlay = modal.querySelector(".modal__overlay");

closeBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

buttonShop.addEventListener("click", () => {
  basketContainer.innerHTML = "";

  productsInBasket.forEach((prod) => {
    const prodDiv = document.createElement("div");
    prodDiv.classList.add("basket-item");

    prodDiv.innerHTML = `
      <div class="basket-item__title">${prod.name}</div>
      <div class="basket-item__size">${prod.size} sm</div>
      <div class="basket-item__quantity">${prod.quantity}</div>
      <div class="basket-item__price">${prod.totalPrice}</div>
      <div class="basket-item__btn-delete">&times;</div>
      `;

    const btnDelete = prodDiv.querySelector(".basket-item__btn-delete");

    btnDelete.addEventListener("click", () => {
      productsInBasket.splice(productsInBasket.indexOf(prod), 1);
      prodDiv.remove();
      updateCartCount();
      localStorage.setItem("cart", JSON.stringify(productsInBasket));
    });

    basketContainer.appendChild(prodDiv);
  });
  document.body.classList.add("modal-open");
  modal.classList.add("show");
});

allProducts = products;
renderProductsType("all");

//Modal

const modalBtns = document.querySelectorAll(".modal-btn");

function createModal() {
  const modal = document.createElement("div");
  modal.classList.add("modal");

  modal.innerHTML = `
    <div class="modal__overlay"></div>
    <div class="modal__content">
    <span class="modal-close">&times;</span>
    <div class="modal-text text">
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. A, eius
      minima. Ipsa laborum corrupti vel natus accusamus accusantium,
      dolore sequi laudantium eligendi quod voluptas voluptatum eius,
      quibusdam illum expedita deleniti?</p>
    </div>
    </div>
  `;

  const modalOverlay = modal.querySelector(".modal__overlay");
  const modalClose = modal.querySelector(".modal-close");

  modalOverlay.addEventListener("click", closeItemModal);
  modalClose.addEventListener("click", closeItemModal);

  function closeItemModal() {
    modal.classList.remove("show");
    document.body.classList.remove("modal-open");

    setTimeout(() => modal.remove(), 300);
  }

  document.body.classList.add("modal-open");
  document.body.appendChild(modal);

  requestAnimationFrame(() => {
    setTimeout(() => modal.classList.add("show"), 10);
  });
}

modalBtns.forEach((modalBtn) => {
  modalBtn.addEventListener("click", createModal);
});
