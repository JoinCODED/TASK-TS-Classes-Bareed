/**************************************************************
 * Point: defines a point on the map using X and Y coordinates
 *
 * x: x coordinate
 * y: y coordinate
 *
 * distanceTo(point): takes a point, calculates the distance to
 *                     that point from the current point.
 *
 * let point = new Point(x, y);
 ****************************************************************/
class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  distanceTo(point: Point) {
    let xDelta = this.x - point.x;
    let yDelta = this.y - point.y;
    return Math.sqrt(xDelta * xDelta + yDelta * yDelta); // PYTHAGORAS!
  }

  equals(point: Point) {
    return point.x === this.x && point.y === this.y;
  }

  static randomPoint(maxX = 100, maxY = 100) {
    let x = Math.random() * maxX;
    let y = Math.random() * maxY;
    return new Point(x, y);
  }
}
let point = new Point(4,6)

/**********************************************************
 * Wallet: keeps track of money
 *
 * money: how much money is in the wallet. Defaults to 0.
 *
 * credit(amount): adds `amount` to `money`.
 *
 * debit(amount): subtracts `amount` from `money`.
 *
 * let wallet = new Wallet(money);
 **********************************************************/
class Wallet {
  // implement Wallet!
  constructor(public money = 0) {
    money = this.money
  }

  credit = (amount: number) => {this.money = this.money + amount};

  debit = (amount: number) => {this.money = this.money - amount};
}
let wallet = new Wallet(10)
/**********************************************************
 * Person: defines a person with a name (and feelings)
 *
 * name: name of said person
 * location: a Point instance
 * wallet: a Wallet instance initially with 0.
 *
 * moveTo(point): updates the `location` to `point`
 *
 * let person = new Person(name, x, y);
 **********************************************************/
class Person {
  // implement Person!
  name: string
  location: Point
  wallet: Wallet 

  constructor(name:string, x:number, y:number, wallet:number= 0){
    this.name = name
    this.location = new Point(x,y)
    this.wallet = new Wallet(wallet)
  }

  moveTo(newLocation: Point){
    this.location = newLocation
  }
}

let person = new Person('Abdulrahman', 5,4, 10)
/**********************************************************
 * Vendor: defines a vendor
 * Subclasses Person
 *
 * range: the maximum distance this vendor can travel - initially 5
 * price: the cost of a single ice cream - initially 1
 *
 * sellTo(customer, numberOfIceCreams):  sells a specific number of ice creams
 *     to the customer by doing the following:
 *         - Moves to the customer's location
 *         - Transfers money from the customer's wallet
 *           to the vendor's wallet
 *
 * new vendor = new Vendor(name, x, y);
 **********************************************************/
class Vendor extends Person {
  // implement Vendor!
  range: number
  price: number

  constructor(name: string, x:number,y:number, price:number = 1, range:number = 5){
    super(name, x,y);
    this.range = range
    this.price = price
  }
  moveTo(newLocation: Point): void {
    this.location = newLocation
  }

  sellTo(customer: Customer, numberOfIceCreams:number){
    this.moveTo(customer.location)
    const amount = numberOfIceCreams*this.price
    customer.wallet.debit(amount)
    this.wallet.credit(amount)
  }
}
let vendor = new Vendor('shop', 2,3, 5,2);
/**********************************************************
 * Customer: defines a customer
 * Subclasses Person
 *
 * wallet: a Wallet instance initially with 10.
 *
 * _isInRange(vendor): checks if the customer is in range of vendor.
 *
 * _haveEnoughMoney(vendor, numberOfIceCreams): checks if the customer
 *     has enough money to buy a specific number of ice creams from vendor.
 *
 * requestIceCream(vendor, numberOfIceCreams): if the customer is in the vendor's
 *     range and has enough money for ice cream, a request is sent to the vendor.
 *
 * new customer = new Customer(name, x, y);
 **********************************************************/
class Customer extends Person {
  // implement Customer!
  constructor(public name:string, public x:number, public y:number){
    super(name, x,y)
    this.wallet.money = 10
  }

  _isInRange(vendor:Vendor): boolean{
    if(this.location.distanceTo(vendor.location)<=vendor.range){
      return true
    }
    else return false

  }

  _haveEnoughMoney(vendor: Vendor, numberOfIceCreams:number): boolean{
    if(this.wallet.money>=numberOfIceCreams*vendor.price){
      return true
    }
    else 
    return false
  }

  requestIceCream(vendor:Vendor, numberOfIceCreams: number){
    if(this._isInRange(vendor)  && this._haveEnoughMoney(vendor, numberOfIceCreams)){
      return vendor.sellTo(this,numberOfIceCreams)
    } 
  }
}
let customer = new Customer('customer', 2,3)

export { Point, Wallet, Person, Customer, Vendor };

/***********************************************************
 * If you want examples of how to use the
 * these classes and how to test your code manually,
 * check out the README.md file
 ***********************************************************/
