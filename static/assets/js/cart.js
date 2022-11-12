// ************************************************
// Shopping Cart API
// ************************************************

var shoppingCart = (function() {
    // =============================
    // Private methods and propeties
    // =============================
    cart = [];
    
    // Constructor
    function Item(name, price, count,image,id) {
      this.name = name;
      this.price = price;
      this.count = count;
      this.image=image;
      this.id=id

    }
    
    // Save cart
    function saveCart() {
      sessionStorage.setItem('shoppingCart', JSON.stringify(cart));
    }
    
      // Load cart
    function loadCart() {
      cart = JSON.parse(sessionStorage.getItem('shoppingCart'));
    }
    if (sessionStorage.getItem("shoppingCart") != null) {
      loadCart();
    }
    
  
    // =============================
    // Public methods and propeties
    // =============================
    var obj = {};
    
    // Add to cart
    obj.addItemToCart = function(name, price, count, image,id) {
      for(var item in cart) {
        if(cart[item].name === name) {
          cart[item].count ++;
          saveCart();
          return;
        }
      }
      var item = new Item(name, price, count, image,id);
      cart.push(item);
      saveCart();
    }
    // Set count from item
    obj.setCountForItem = function(name, count) {
      for(var i in cart) {
        if (cart[i].name === name) {
          cart[i].count = count;
          break;
        }
      }
    };
    // Remove item from cart
    obj.removeItemFromCart = function(name) {
        for(var item in cart) {
          if(cart[item].name === name) {
            cart[item].count --;
            if(cart[item].count === 0) {
              cart.splice(item, 1);
            }
            break;
          }
      }
      saveCart();
    }
  
    // Remove all items from cart
    obj.removeItemFromCartAll = function(name) {
      for(var item in cart) {
        if(cart[item].name === name) {
          cart.splice(item, 1);
          break;
        }
      }
      saveCart();
    }
  
    // Clear cart
    obj.clearCart = function() {
      cart = [];
      saveCart();
    }
  
    // Count cart 
    obj.totalCount = function() {
      var totalCount = 0;
      for(var item in cart) {
        totalCount += cart[item].count;
      }
      return totalCount;
    }
  
    // Total cart
    obj.totalCart = function() {
      var totalCart = 0;
      for(var item in cart) {
        totalCart += cart[item].price * cart[item].count;
      }
      return Number(totalCart.toFixed(2));
    }
  
    // List cart
    obj.listCart = function() {
      var cartCopy = [];
      for(i in cart) {
        item = cart[i];
        itemCopy = {};
        for(p in item) {
          itemCopy[p] = item[p];
  
        }
        itemCopy.total = Number(item.price * item.count).toFixed(2);
        cartCopy.push(itemCopy)
      }
      return cartCopy;
    }
  
    // cart : Array
    // Item : Object/Class
    // addItemToCart : Function
    // removeItemFromCart : Function
    // removeItemFromCartAll : Function
    // clearCart : Function
    // countCart : Function
    // totalCart : Function
    // listCart : Function
    // saveCart : Function
    // loadCart : Function
    return obj;
  })();
  
  
  // *****************************************
  // Triggers / Events
  // ***************************************** 
  // Add item
  function viewListt() {
    var cartArray = shoppingCart.listCart();
    var ids_list= [];
    for(var i in cartArray) {
        obj={id:cartArray[i].id,cont:cartArray[i].count}
        ids_list.push(obj)
    }
    document.getElementById('order_ids').value=JSON.stringify(ids_list)
    document.getElementById('total').value=JSON.stringify(shoppingCart.totalCart())
  }

  $('.add-to-cart').click(function(event) {
    event.preventDefault();
    var name = $(this).data('name');
    let image=$(this).data('image')
    let id=$(this).data('id')
    var price = Number($(this).data('price'));
    shoppingCart.addItemToCart(name, price, 1,image,id);
    displayCart();
    viewListt()

  });
  
  // Clear items
  function clearcart(){

    shoppingCart.clearCart();
    viewCart();
    displayCart();
  };

  
  function displayCart() {
    var cartArray = shoppingCart.listCart();
    var output = "";
    for(var i in cartArray) {

        output +=`<li class="single-cart-list">
        <a href="#" class="photo"><img
            src="${cartArray[i].image}"
            class="cart-thumb" alt="image" /></a>
        <div class="cart-list-txt">
          <h6><a href="#">${cartArray[i].name}</a></h6>
          <p>${cartArray[i].count} x - <span class="price">Rs.${cartArray[i].total}</span></p>
        </div><!--/.cart-list-txt-->
        <div class="cart-close">
          <span class="lnr lnr-cross delete-item" data-name="${cartArray[i].name}"></span>
        </div><!--/.cart-close-->
      </li>`
    }
    $('.show-cart').html(output);
    $('.total-cart').html(` Rs.${shoppingCart.totalCart()}`);
    $('.total-count').html(`${shoppingCart.totalCount()}`);
  }

    function viewCart() {
    var cartArray = shoppingCart.listCart();
    var output = "";
    for(var i in cartArray) {

        output +=`<li class="single-cart-list">
        <a href="#" class="photo"><img
            src="${cartArray[i].image}"
            class="cart-thumb" alt="image" /></a>
        <div class="cart-list-txt">
          <h6><a href="#">${cartArray[i].name}</a></h6>
          <p>${cartArray[i].count} x - <span class="price">Rs.${cartArray[i].total}</span></p>
        </div>
        <div class="row" style="margin:5px;">
        <div class="col-lg-3 col-md-3 col-sm-3" style="margin-right:-20px; z-index:2; position:relative;">
        <button class=" minus-item btn
        btn-danger btn-block" data-name="${cartArray[i].name}" id="minus-itema" onclick="minusOne(this)">-</button>
        </div>
        <div class="col-lg-3 col-md-3 col-sm-3">
        <input type="text" class="form-control item-count "  style="width:40px; z-index:0; position:relative;" value="${cartArray[i].count}"  data-name="${cartArray[i].name}" data-total="${cartArray[i].total}"   data-total="${cartArray[i].count}" data-image="${cartArray[i].image}"/>
        </div>
        <div class=" col-lg-4 col-md-4 col-sm-4" style="margin-left:-8px;">
        <button class="plus-item btn
        btn-success btn-block " id="plus-one" onclick="PlusoNe(this)"  data-name="${cartArray[i].name}" data-total="${cartArray[i].total}"   data-total="${cartArray[i].count}" data-image="${cartArray[i].image}" data-id="${cartArray[i].id}">+</button>
        </div>
        </div>
        <div class="cart-close">
          <span class="lnr lnr-cross delete-item" data-name="${cartArray[i].name}" data-price="${cartArray[i].price}" data-image="${cartArray[i].image}"></span>
        </div><!--/.cart-close-->
      </li>`
    }
    $('.show-cart2').html(output);
    $('.total-cart').html(` Rs.${shoppingCart.totalCart()}`);
    $('.total-count').html(`${shoppingCart.totalCount()}`);
    
  }


  
  
  // Delete item button

 
  
  
  $('.show-cart').on("click", ".delete-item", function(event) {
    var name = $(this).data('name')
    shoppingCart.removeItemFromCartAll(name);
    viewCart();
    displayCart();
    viewListt();
    
  })

  
  
  // -1
  // $('.minus-item').on("click", ".minus-item", function(event) {
 
  // })
  console.log("working js")

   function minusOne(item){
      var name = item.getAttribute('data-name')
      shoppingCart.removeItemFromCart(name);
      displayCart();
      viewCart();
      viewListt();
    }

  // +1
 
  
  // 1++

  function PlusoNe(animal){
    var name = animal.getAttribute('data-name')
    var count = animal.getAttribute('data-count')
    var image = animal.getAttribute('data-image')
    var total = animal.getAttribute('data-total')
    var price=parseFloat(total)/parseFloat(count)
    shoppingCart.addItemToCart(name,price,1,image);
    displayCart();
    viewCart();
    viewListt();
  }
    // $("#plus-one").click(function(event){
    //   var name = $(this).data('name')
    //   var count = $(this).data('count')
    //   var image = $(this).data('image')
    //   var total = $(this).data('total')
    //   var price=parseFloat(total)/parseFloat(count)
    //   shoppingCart.addItemToCart(name,price,1,image);
    //   displayCart();
    //   viewCart();
    // });


  // Item count input
  $('.show-cart').on("change", ".item-count", function(event) {
     var name = $(this).data('name');
     var count = Number($(this).val());
    shoppingCart.setCountForItem(name, count);
    displayCart();
    viewCart();
    viewListt();
  });
  viewCart()
  displayCart()
  viewListt();
 

  
  