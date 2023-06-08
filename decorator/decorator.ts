/*Es un tipo de patron de diseño de estructura
Viene a solucionar cuando nosotros tenemos mucha que agregar mucha funcionalidad jerarquicamente a un conjunto de clases
Problema: Tenemos una clase padre y queremos agregarle mas funcionalidad agregamos un hijo y queremos mas funcionalidad y agregamos otro hijo,
tenemos muchos niveles
El decorador lo que hace es reducir este tipo de jerarquización haciendo envoltorios de funcionalidad
Un envoltorio de funcionalidad, imaginate que tienes una funcionalidad de una clase que es la principal quieres agregarle funcionalidad extra
 a esto que ya existe en lugar de heredar, entonces lo que vamos hacer es un envoltorio y este envoltorio lo que va hacer es ejecutar lo del 
 padre mas una funcionalidad extra y si quisieras mas podrias poner otro envoltorio pero sin tener que jerarquizar
*/

interface Component{
    getDetail():string;
}

//Clase principal
class ProductComponent implements Component{

    protected name: string;

    constructor(name:string){
        this.name = name;
    }

    getDetail(): string {
        return `${this.name}`;
    }
}

//Decorador
//Es abstracta, no puedo crear objeto de esta clase directamente, de sus hijos si puedo. Solo sirve para heredar
abstract class ProductDecorator implements Component{
    protected component: Component;

    constructor(component:Component){
        this.component = component;
    }

    getDetail(): string {
        return this.component.getDetail();
    }
}

//decorador 1
class CommercialInfoProductDecorator extends ProductDecorator{
    
    private tradename: string;
    private brand:string;

    constructor(component:Component,tradename:string, brand:string){
        super(component);
        this.tradename = tradename;
        this.brand = brand;
    }

    public getDetail(): string {
        return `${this.tradename} ${this.brand} `+
        super.getDetail();
    }
}

//decorador 2 
class StoreProductDecorator extends ProductDecorator{

    private price: number;
    

    constructor(component:Component,price:number){
        super(component);
        this.price = price;
    }

    public getDetail(): string {
        return super.getDetail()+` ${this.price} `;
        
    }

}

//Ejecucion component en estado puro
const productComponent = new ProductComponent("Cerveza");
console.log(productComponent.getDetail())

//Ahora vamos a envolverlo con el decorador 1
const commercialInfoProductDecorator = new CommercialInfoProductDecorator(productComponent,"Argentina porter", "Fuller's");
console.log(commercialInfoProductDecorator)

//Ahora vamos a envolverlo con el decorador 2
const storeProductDecorator = new StoreProductDecorator(productComponent,20);
console.log(storeProductDecorator)

//envolvemos decorador 2 con decorador decorador 1, tenemos multiples funcionalidades
const storeProduct2 = new StoreProductDecorator(commercialInfoProductDecorator,15.5);
console.log(storeProduct2)

/*Podemos añadir funcionamiento sin modificar las clases que ya tenemos, esto respeta el pricipio solid de agregar nueva funcionalidad 
sin modificar lo que ya tenemos*/


/*
El patrón Decorator (Decorador) se utiliza en programación para agregar funcionalidad adicional a un objeto de manera dinámica. 
El Decorador proporciona una alternativa flexible a la herencia, ya que permite extender el comportamiento de un objeto 
sin modificar su estructura interna. Aquí tienes algunos ejemplos de casos reales en los que puedes utilizar el patrón Decorator:

Decoración de salidas: Puedes utilizar el patrón Decorator para agregar funcionalidad adicional a las salidas de texto en una aplicación. 
Por ejemplo, puedes tener un decorador que envuelve el texto en etiquetas HTML o que añade colores y formatos especiales.

Cifrado de datos: En sistemas de seguridad, puedes utilizar el patrón Decorator para agregar funcionalidad de cifrado 
a los objetos que almacenan o transmiten datos sensibles. Puedes tener un decorador que cifre los datos antes de ser 
guardados o que los descifre antes de ser utilizados.

Registro y seguimiento: En aplicaciones de registro y seguimiento, puedes utilizar el patrón Decorator para 
agregar funcionalidad de registro a los objetos relevantes. Puedes tener un decorador que registre todas las 
llamadas a los métodos de un objeto, capturando información como el tiempo de ejecución, los parámetros utilizados, etc.

Cacheo de resultados: Si tienes operaciones costosas en términos de rendimiento o tiempo de ejecución, puedes 
utilizar el patrón Decorator para agregar un mecanismo de caché a dichas operaciones. Puedes tener un decorador 
que almacene en memoria caché los resultados previos y los devuelva directamente si los mismos parámetros se utilizan nuevamente.

Autenticación y autorización: En sistemas de autenticación y autorización, puedes utilizar el patrón Decorator 
para agregar funcionalidad de verificación de permisos a los objetos relevantes. Puedes tener un decorador que 
verifique si un usuario tiene los permisos necesarios antes de permitir que se ejecute un método.

Estos son solo algunos ejemplos de casos reales donde puedes utilizar el patrón Decorator en programación. 
El patrón Decorator te permite agregar funcionalidad de manera flexible y modular, evitando la necesidad de 
crear múltiples clases derivadas o alterar la estructura existente del código.

*/