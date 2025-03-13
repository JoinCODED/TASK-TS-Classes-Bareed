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
  money: number;

  constructor(money = 0) {
    this.money = money;
  }

  credit = (amount: number) => {
    this.money+=amount;
  };

  debit = (amount: number) => {
    this.money-=amount;
  };
}

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
  name: string;
  location: Point;
  wallet: Wallet;
   
  constructor(name: string, x: number, y: number, money?: number)
  {
    this.name = name;
    this.location = new Point(x, y);
    this.wallet = new Wallet(money)
  }

  moveTo(point: Point)
  {
    this.location.x = point.x;
    this.location.y = point.y;
  }
}

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
class Vendor extends Person{
  // implement Vendor!
  range: number;
  price: number;

  constructor(name: string, x: number, y: number, range=5, price = 1)
  {
    super(name, x, y);
    this.range = range;
    this.price = price;
  }

  sellTo = (customer: Customer, numberOfIceCreams: number) => {
    this.location.x = customer.location.x;
    this.location.y = customer.location.y;
    
    customer.wallet.debit(this.price*numberOfIceCreams);
    this.wallet.credit(this.price*numberOfIceCreams);
  }
}

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
class Customer extends Person{
  // implement Customer!
  wallet: Wallet;

  constructor(name: string, x: number, y: number)
  {
    super(name, x, y);
    this.wallet = new Wallet(10);
  }

  _isInRange = (vendor: Vendor) => {
    return vendor.location.distanceTo(this.location) <= vendor.range;
  }

  _haveEnoughMoney = (vendor: Vendor, numberOfIceCreams: number) => {
    return this.wallet.money >= vendor.price*numberOfIceCreams
  }

  requestIceCream = (vendor: Vendor, numberOfIceCreams: number) => {
    if(this._isInRange(vendor) && this._haveEnoughMoney(vendor, numberOfIceCreams))
    {
      vendor.sellTo(this, numberOfIceCreams);
    }
  }
}

export { Point, Wallet, Person, Customer, Vendor };

/***********************************************************
 * If you want examples of how to use the
 * these classes and how to test your code manually,
 * check out the README.md file
 ***********************************************************/
