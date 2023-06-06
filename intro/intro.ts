class Drink{
    private name:string;

    constructor(name:string){
        this.name = name;
    }

    info():string{
        return this.name
    }
}

const drink = new Drink("agua");

//console.log(drink.info());

interface Product{
    price:number;
    getPrice():string;
}

//Herencia 

class Beer extends Drink implements Product{
    private alcohol:number;
    price:number;

    constructor(name:string, alcohol:number,price:number){
        super(name);
        this.alcohol = alcohol;
        this.price = price;
    }

    getPrice():string{
        return "$ "+this.price;
    }

    info():string{
        return super.info()+" "+this.alcohol;
    }

}

const beer = new Beer("cerveza",50,1);

//console.log(beer.info());


class Snack implements Product{
    name:string;
    price: number;

    constructor(name:string, price:number){
        this.name = name;
        this.price = price;
    }

    getPrice(): string {
        return "El precio es: $ "+this.price;
    }
}

const products:Product[] = [
    new Beer("corona",4.5,1),
    new Snack("snack 1",10)
]

function getPrices(items:Product[]){
    items.forEach(item => {
        console.log(item.getPrice())
    });
}

getPrices(products)