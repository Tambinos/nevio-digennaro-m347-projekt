var Product = /** @class */ (function () {
    function Product(name, price) {
        this.name = name;
        this.price = price;
    }
    return Product;
}());
var ShoppingCart = /** @class */ (function () {
    function ShoppingCart(products) {
        this.products = products;
    }
    ShoppingCart.prototype.avgOfNumberArray = function () {
        var sum = 0;
        this.products.forEach(function (product) {
            sum += product.price;
        });
        return sum;
    };
    ShoppingCart.prototype.allProducts = function () {
        this.products.forEach(function (product) {
            console.log(product.name + " " + product.price + "$");
        });
    };
    ShoppingCart.prototype.addProduct = function (product) {
        this.products.push(product);
    };
    return ShoppingCart;
}());
var product1 = new Product("Apple", 0.5);
var product2 = new Product("Banana", 0.3);
var product3 = new Product("Orange", 0.7);
var cart = new ShoppingCart([product1, product2]);
cart.addProduct(product3);
console.log("Products in the shopping cart:");
cart.allProducts();
var averagePrice = cart.avgOfNumberArray();
console.log("Average Price: ".concat(averagePrice.toFixed(2), "$"));
//# sourceMappingURL=Aufgabe6.js.map