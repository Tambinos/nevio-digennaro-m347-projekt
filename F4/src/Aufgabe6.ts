class Product{
    name:string
    price:number
    constructor(name:string,price:number) {
        this.name = name;
        this.price = price;
    }
}
class ShoppingCart{
    products:Product[]
    constructor(products:Product[]) {
        this.products =products
    }
    avgOfNumberArray(): number {
        let sum = 0;
        this.products.forEach(product => {
                sum += product.price
            }
        )
        return sum
    }
    allProducts(){
        this.products.forEach(product =>{
            console.log(product.name + " " + product.price + "$")
        })
    }
    addProduct(product:Product){
        this.products.push(product)
    }
}

let product1 = new Product("Apple", 0.5);
let product2 = new Product("Banana", 0.3);
let product3 = new Product("Orange", 0.7);

let cart = new ShoppingCart([product1, product2]);
cart.addProduct(product3);

console.log("Products in the shopping cart:");
cart.allProducts();

let averagePrice = cart.avgOfNumberArray();
console.log(`Average Price: ${averagePrice.toFixed(2)}$`);
