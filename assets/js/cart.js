function showCartDiv()
{
    items = localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')) :[];
    if(items[0] > 0) // this mean count > 0 (count of products in the cart)
    {
        var cartDiv = document.createElement("div");   
        cartDiv.setAttribute("id", "cart");

        priceSpan = document.createElement("span");
        priceSpan.append(items[0])
        priceSpan.classList.add("cart-number")
        cartDiv.append(priceSpan);
        cartDiv.append(' $'+items[1])
    
    
        var linkToCart = document.createElement("a");
        linkToCart.href = "#";
        var cartIcon = document.createElement("i");
        cartIcon.setAttribute("class", "fa fa-cart-plus");
        cartIcon.style = "font-size:24px";
        linkToCart.appendChild(cartIcon);
        linkToCart.append(" Checkout");
        linkToCart.addEventListener("click", function(event){
            event.preventDefault();
            displayCart();
        });

        cartDiv.append(linkToCart);

        mainDiv.appendChild(cartDiv);
    }
}

function addToCart(product)
{
    items = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) :[];
    cartDiv = document.getElementById('cart');
    // check if there is acart div cuz in product page there is not cart div
    if(cartDiv)
        cartDiv.innerHTML = '';

    if(isNaN(items[0])) // these means there is no items in the cart
    {
        product.count = 1;
        console.log(product);
        var data = [1, product['Price'], [product] ];
        console.log(data)
        localStorage.setItem('cart', JSON.stringify(data));
        showCartDiv()
    }
    else{
        var count = ++items[0];
        var price = items[1]+product['Price'];

        var productIndex = items[2].findIndex(function(p){
            return p.ProductId == product.ProductId
        })
        console.log(productIndex)
        
        //if the product is already in the cart 
        if(productIndex >-1) //cuz it is array so it has index 0
        {
            // increase the count
            items[2][productIndex].count++;
            console.log(items[2])
        }
        else
        {
            // add new item in the cart
            product.count = 1;
            items[2].push(product);

        }
        var data = [count, price, items[2] ];

        localStorage.setItem('cart', JSON.stringify(data));
        
        if(cartDiv)
        {
            showCartDiv();
        }

    }


}


function displayCart()
{
    mainDiv.innerHTML = '';
    //table for cart
    var cartTable = document.createElement("table");
    cartTable.setAttribute("class", "table table-striped");
    mainDiv.appendChild(cartTable);

    //thead for the table
    var thead = document.createElement("thead");
    cartTable.appendChild(thead);

    // tr for the thead 
    var tr1 = document.createElement("tr");
    thead.appendChild(tr1);

    // th for the tr
    tr1.appendChild( document.createElement("th"));
    
    thProduct = document.createElement("th");
    thProduct.append("product");
    tr1.appendChild( thProduct );

    thAvailable= document.createElement("th");
    thAvailable.append("Available");
    tr1.appendChild( thAvailable );

    thQuantity= document.createElement("th");
    thQuantity.append("Quantity");
    thQuantity.classList.add("text-center")
    tr1.appendChild( thQuantity );

    
    thPrice= document.createElement("th");
    thPrice.append("Price");
    thPrice.classList.add("text-right")
    tr1.appendChild( thPrice );

    thTotalPrice= document.createElement("th");
    thTotalPrice.append("Total Price");
    thTotalPrice.classList.add("text-right")
    tr1.appendChild( thTotalPrice );

    

    //tbody of the table
    var tbody = document.createElement("tbody");
    cartTable.appendChild(tbody);

    // tr2 for the tbody (the acutal products)
    cartProducts = localStorage.getItem('cart')? JSON.parse(localStorage.getItem('cart')) :[];

    // if there is items in the cart
    if(cartProducts[0] > 0)
    {
        cartProducts[2].forEach((prod, i)=>{

            var tr2 = document.createElement("tr");
            tbody.appendChild(tr2);

            //td for tr
            var tdImg = document.createElement("th");
            var img = document.createElement("img");
            img.setAttribute("src", cartProducts[2][i].ProductPicUrl);
            img.width = "100";
            img.height = "50";
            tdImg.appendChild(img);
            tr2.appendChild(tdImg);

            var tdName = document.createElement("td");
            tdName.append(cartProducts[2][i].Name);
            tr2.appendChild(tdName);

            var tdStock = document.createElement("td");
            tdStock.append("In Stock");
            tr2.appendChild(tdStock);

            //td for the quantity
            var tdQuantity = document.createElement("td");
            var inputQuantity = document.createElement("input");
            inputQuantity.classList.add("form-control");
            inputQuantity.type = "number";
            inputQuantity.disabled = "true";
            inputQuantity.value = cartProducts[2][i].count;
            tdQuantity.appendChild(inputQuantity);
            tr2.appendChild(tdQuantity);

            // price of the product
            var tdPrice = document.createElement("td");
            tdPrice.classList.add("text-right");
            tdPrice.append(cartProducts[2][i].Price);
            tr2.appendChild(tdPrice);

            var tdTotalPrice = document.createElement("td");
            tdTotalPrice.classList.add("text-right");
            tdTotalPrice.append(cartProducts[2][i].Price * cartProducts[2][i].count );
            tr2.appendChild(tdTotalPrice);

            //td for the trash to delete item from cart
            var tdTrash = document.createElement("td");
            tdTrash.classList.add("text-right");
            tr2.appendChild(tdTrash);

            var buttonTrash = document.createElement("button");
            buttonTrash.setAttribute("class", "btn btn-sm btn-danger");

            buttonTrash.addEventListener("click", function(){
                if(cartProducts[0] >= 1)
                {
                    //if the amount of product is 1
                    if(cartProducts[2][i].count == 1)
                    {
                        console.log(cartProducts[2]) ;
                        var count = --cartProducts[0];
                        var price = cartProducts[1] - cartProducts[2][i].Price;
                        cartProducts[2].splice(i,1);

                        var data = [count, price, cartProducts[2] ];
                        localStorage.setItem('cart', JSON.stringify(data))
                        displayCart();
                    }
                    else // the count of product more than one
                    {
                        var count = cartProducts[0] - cartProducts[2][i].count;
                        var price = cartProducts[1] - (cartProducts[2][i].Price * cartProducts[2][i].count);
                        cartProducts[2].splice(i,1);
                        var data = [count, price, cartProducts[2] ];
                        localStorage.setItem('cart', JSON.stringify(data))
                        displayCart();

                    }
                }

            });

            tdTrash.appendChild(buttonTrash);

            var iconTrash = document.createElement("icon");
            iconTrash.setAttribute("class", "fa fa-trash");
            buttonTrash.appendChild(iconTrash);
        })
    }
    else{ //if there is no item in the cart remove the cart
        localStorage.removeItem("cart");
    }


    //tr3 for the total price
    var tr3 = document.createElement("tr");
    tbody.appendChild(tr3);
    tr3.appendChild( document.createElement("td"));
    tr3.appendChild( document.createElement("td"));
    tr3.appendChild( document.createElement("td"));
    tr3.appendChild( document.createElement("td"));
    tr3.appendChild( document.createElement("td"));

    var tdTotal = document.createElement("td");
    var strongTotal = document.createElement("strong");
    strongTotal.append("Total");
    tdTotal.appendChild(strongTotal);
    tr3.appendChild(tdTotal);

    var tdTotalValue = document.createElement("td");
    tdTotalValue.setAttribute("class", "text-right");
    var strongTotalValue = document.createElement("strong");
    cartProducts[0] > 0 ?  strongTotalValue.append(cartProducts[1]) : strongTotalValue.append(0);
   
    tdTotalValue.appendChild(strongTotalValue);
    tr3.appendChild(tdTotalValue);


    
    
    
    
}