// A grocery store uses a JavaScript function to calculate discounts on various items. They are testing out various percentage discounts but are getting unexpected results. Go over the code, and identify the reason why they aren't getting the expected discounted prices from the function. Then, modify the code so that it produces the correct results.


function Item() {
    return {
    name: 'Foo',
    description: 'Fusce consequat dui est, semper.',
    price: 50,
    quantity: 100,
    discount: function(percent) {
      let discount = this.price * percent / 100;
      this.price -= discount;
      
      return this.price;
    },
  };
}

console.log(new Item().discount(20), 'should return:', 40);   // should return 40
console.log(new Item().discount(50), 'should return:', 25);   // should return 25
console.log(new Item().discount(25), 'should return:', 37.5);   // should return 37.5

