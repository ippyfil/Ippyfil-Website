---
layout: null
---

// Shop JS
$(function() {
  const cart = initCart();
  const shopItems = initAvailableItems();
  let currentItem = null;

  
  $('.shop-link').on('click', function() {
    const item = shopItems.find(i => i.id == $(this).data('product'))
    currentItem = new Item(item);
    // Add listeners for modal buttons (addBeer, removeBeer, addToCart, quantityUp, quantityDown)
  })



});

class Cart {
  constructor() {
    this.items = [];
  }
}

class Item {
  constructor(shopItem) {
    this.product = shopItem.id;
    this.price = shopItem.price;
    this.name = shopItem.name;
    this.beers = [];
  }
}

function initCart() {
  const savedCart = localStorage.getItem('shoppingCart');
  let shoppingCart;
  if (!savedCart) {
    shoppingCart = new Cart();
  } else {
    try {
      shoppingCart = JSON.parse(savedCart);
    } catch (e) {
      shoppingCart = new Cart();
    }
  }
  return shoppingCart;
}

function initAvailableItems() {
  const shopItems = [];
  let choices;
  let choiceIds;
  let choiceArray;

  {% assign shop=site.shop-items  | sort:"order" | where:"lang", page.lang %}
  {% for item in shop %}
  choices = "{{item.choices}}".split(',');
  choiceIds = "{{item.choiceIds}}".split(',');
  choiceArray = choices.map((c,ix) => ({name: c, id: choiceIds[ix]}));

  shopItems.push({
    id: {{item.item-id}},
    name: "{{item.title}}",
    price: {{item.price}},
    choices: choiceArray,
    size: {{item.size}},
  })
  {% endfor %}

  return shopItems;
}