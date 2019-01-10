var ajaxRequest = new XMLHttpRequest();
ajaxRequest.open('get', 'https://gist.githubusercontent.com/a7med-hussien/7fc3e1cba6abf92460d69c0437ce8460/raw/da46abcedf99a3d2bef93a322641926ff60db3c3/products.json')
ajaxRequest.send();
ajaxRequest.onreadystatechange = function(){
    if(ajaxRequest.readyState == 4 && ajaxRequest.status == 200){
        var products = JSON.parse(this.responseText);
        products = products['ProductCollection'];
        displayProducts(products);

        /*save products in localstorage just to display it again when user click home 
        so we don't have to request from server every time user click home insted just request
        when user open website or click refresh */
        localStorage.setItem('homeProducts', JSON.stringify(products));
        
    
    }
}

document.getElementById("home").addEventListener("click", function(event){
    event.preventDefault();
    //after the website load first time i don't have to request from the server every time
    //the user click on home so saved the product in localstorage
    //-so now every time the user open the website the main script load and request products
    // from the server and save it in localsotrage amd when click home retive it
    homeProducts = localStorage.getItem('homeProducts')? JSON.parse(localStorage.getItem('homeProducts')) :[];
    displayProducts(homeProducts);
});

document.getElementById("contact").addEventListener("click", function(event){
    event.preventDefault();
    displayContact();
});

document.getElementById("about").addEventListener("click", function(event){
    event.preventDefault();
    displayAbout();
});




//the main div that contain all products
var mainDiv = document.getElementById('pageContent');



function displayProducts(products)
{
    mainDiv.innerText='';
    //the div with class row that contanin all products
    var productsDiv = document.createElement("div");
    productsDiv.classList.add("row");

        products.forEach((product,i) => 
        {
            // the div that contanin single product
            var div = document.createElement("div");
            div.classList.add('card');
            div.classList.add('mx-auto');
            div.classList.add('mt-3');
            div.setAttribute("style","width: 17rem;")

            //the a tag that display the product details page
            var productLink = document.createElement("a");
            productLink.setAttribute("href", "#");
            productLink.addEventListener("click", function(event){
                event.preventDefault();
                showProduct(product);
            });

            //product img
            var productImg = document.createElement("img");
            productImg.setAttribute('src',product['ProductPicUrl']);
            productImg.width="200";
            productImg.height="250";
            productImg.setAttribute("class", "card-img-top")
            //append the image to the a tag
            productLink.appendChild(productImg);

            //the container div for product details
            var detailsDiv = document.createElement("div");
            detailsDiv.classList.add("card-body");
            // product name
            var productName = document.createElement("h5");
            productName.classList.add("card-title");
            productName.setAttribute("style", "height:40px")
            productName.append(product['Name']);
            
            // product price
            var productPrice = document.createElement("p");
            productPrice.append("$"+product['Price']);
            productPrice.style = "color:red";

            var cart = document.createElement('button');
            cart.append("Add to cart")
            cart.setAttribute("class", "btn btn-info")
            cart.setAttribute("id", i);
            cart.addEventListener('click', function(event){
                event.preventDefault();
                addToCart(product);
            })

            //append to details div
            detailsDiv.appendChild(productName);
            detailsDiv.appendChild(productPrice);
            detailsDiv.appendChild(cart)

            //append product to the products div
            div.appendChild(productLink);
            div.appendChild(detailsDiv);
            
            //append the single product to the whole products div
            productsDiv.appendChild(div);
        });

    //after the loop append products div to the main div
    mainDiv.appendChild(productsDiv);

    // display the cart 
    showCartDiv();

}




// single product page
function showProduct(product)
{
    mylocation = "singleProduct"
    mainDiv.innerHTML = '';
    
    //product div
    var productDiv = document.createElement("div");
    productDiv.setAttribute("class", "card mt-4");
    mainDiv.appendChild(productDiv);

    //the div that has class row 
    var rowDiv = document.createElement("div");
    rowDiv.setAttribute("class", "row");
    productDiv.appendChild(rowDiv);

    // first aside in div that have class row to display image
    var aside1 = document.createElement("aside");
    aside1.setAttribute("class", "col-sm-5 border-right img-container");
    rowDiv.appendChild(aside1);

    //product image
    var productImg = document.createElement("img");
    productImg.setAttribute('src',product['ProductPicUrl']);
    aside1.appendChild(productImg);

    // second aside in div that have class row to display the rest of product details
    var aside2 = document.createElement("aside");
    aside2.setAttribute("class", "col-sm-7 card-body p-5");
    rowDiv.appendChild(aside2);

    //product name
    var productName = document.createElement("h3");
    productName.setAttribute("class", "title mb-3");
    productName.append(product["Name"])
    aside2.appendChild(productName);

    //product price
    var productPrice = document.createElement("span");
    productPrice.setAttribute("class", "price h3 text-warning");
    productPrice.append("$"+ product["Price"]);
    aside2.appendChild(productPrice);

    //product availability
    var productStatus = document.createElement("p");
    productStatus.append("Availability ")
    productStatus.setAttribute("class", "mt-2");
    var availability = document.createElement("span");;
    if(product["Status"] == "Available"){
        availability.append("in stock");
        availability.classList.add("text-success");
    }
    else{
        availability.append("out of stock");
        availability.classList.add("text-danger");
    }
    productStatus.appendChild(availability);
    aside2.appendChild(productStatus);

    aside2.appendChild(document.createElement("hr") );

    //product description
    var description =  document.createElement("dt");
    description.append("Description");
    aside2.appendChild(description);
    var productDescription = document.createElement("dd");
    productDescription.append(product["Description"]);
    aside2.appendChild(productDescription);

    //product category
    var category =  document.createElement("dt");
    category.append("Category");
    aside2.appendChild(category);
    var productCategory = document.createElement("dd");
    productCategory.append(product["Category"]);
    aside2.appendChild(productCategory);

    aside2.appendChild(document.createElement("hr") );

    //product Quantity
    var quantity =  document.createElement("dt");
    quantity.append("Quantity: ");
    aside2.appendChild(quantity);
    
    var ProductQuantity = document.createElement("input");
    ProductQuantity.type = "number";
    ProductQuantity.value = 1;
    ProductQuantity.style = "width:70px;";
    ProductQuantity.setAttribute("class", "form-control form-control-sm");
    aside2.appendChild(ProductQuantity);

    aside2.appendChild(document.createElement("hr") );

    // add this product to cart
    var addtocart = document.createElement("a");
    addtocart.setAttribute("class", "btn btn-lg btn-outline-primary text-uppercase");
    addtocart.setAttribute("href", "#");
    addtocart.append("  Add to cart ");
    aside2.appendChild(addtocart);

    //add event listener for the cart
    addtocart.addEventListener("click", function(event){
        event.preventDefault();
        var quantity = ProductQuantity.value;
        if(quantity <= product.Quantity)
        {
            for(var i=0; i< quantity; i++)
            {
                addToCart(product)
            }
        }
        else{
            alert("only avilable quanity is "+product.Quantity)
        }
        
    })
    
    // display the cart 
    showCartDiv();
}