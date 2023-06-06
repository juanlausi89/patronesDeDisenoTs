//Con este patron puedo evitar que sea creado más de un objeto por clase
//Con este patron logro que la construccion del objeto no se pueda hacer con el constructor
//Singleton es un patron creacional, ya que nos da una tecnica para crear objetos
//Se utiliza cuando la persistencia de nuestro objeto nunca va a cambiar(ejemplo: calendario, dias de la semana)

class Singleton{
    private static instance: Singleton;
    public random: number; 

    private constructor(){
        this.random = Math.random();
    }

    public static getInstance():Singleton{
        if(!this.instance){
            this.instance = new Singleton();
        }

        return this.instance;
    }
}


const singleton = Singleton.getInstance();
const singleton2 = Singleton.getInstance();

//Puedo verificar que simpre es el mismo objeto
console.log(singleton)
console.log(singleton2)