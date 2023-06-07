/*Se compone de un subject, que tiene varios observadores(un arreglo de observadores)
Los observadores se van a enterar cuando subject cambie de estado, esto significa que un subject puede tener un estado
El estado son las propiedades que cambian de la clase, estos observadores tienen que estar al tanto
cuando cambia alguna de ellas*/


interface IObserver<T>{
    refresh(value: T) : void;
}

interface ISubject<T>{
    observers: IObserver<T>[];

    suscribe(observer:IObserver<T>):void;
    unsuscribe(observer:IObserver<T>):void;
    notify(value: T): void;
}


class Subject<T> implements ISubject<T> {
    observers: IObserver<T>[];

    constructor(){
        this.observers = [];
    }

    suscribe(observer: IObserver<T>): void {
        this.observers.push(observer);
    }

    unsuscribe(observer: IObserver<T>): void {
        this.observers = this.observers.filter(obs => obs !== observer)
    }

    notify(value: T): void {
        this.observers.forEach(e=>{
            e.refresh(value);
        })
    }
}

class Observer<T> implements IObserver<T>{
    private funcion: (value: T) => void;

    constructor(funcion: (value: T) => void){
        this.funcion = funcion;
    }

    refresh(value: T): void {
        this.funcion(value);
    }
}

//Creamos un subject de numeros
const subject = new Subject<number>();

//Creamos un observador 1, que va a observar al subject
const observer1 = new Observer<number>((n)=>{
    console.log(`soy el observer 1 y me notificaron que el nùmero es ${n}`);
});

//Creamos un observador 2, que va a observar al subject
const observer2 = new Observer<number>((n)=>{
    console.log(`soy el observer 2 y me notificaron que el nùmero es ${n}`);
});

//El observador 1 se suscribe al subject
subject.suscribe(observer1);

//El observador 2 se suscribe al subject
subject.suscribe(observer2);

//Vamos a avisar a nuestros observadores que el numero es 1.2
subject.notify(1.2)


/*
Aquí tienes algunos ejemplos de casos reales en los que se puede utilizar el patrón Observador:

Aplicaciones de chat en tiempo real: En una aplicación de chat, puedes utilizar el patrón Observador para notificar a los usuarios cuando se reciben nuevos mensajes. 
Cada usuario sería un observador suscrito al objeto del chat y recibiría una notificación cuando otro usuario envía un mensaje.

Sistemas de notificaciones: En aplicaciones o sitios web que necesitan enviar notificaciones a los usuarios, el patrón Observador es útil. 
Los usuarios pueden suscribirse a diferentes tipos de notificaciones (por ejemplo, mensajes nuevos, actualizaciones de amigos, notificaciones de eventos, etc.) 
y recibirán notificaciones cuando se produzca el evento correspondiente.

Interfaz de usuario en tiempo real: Si tienes una interfaz de usuario que debe actualizarse automáticamente cuando cambia un dato o un estado, el patrón Observador 
es una opción adecuada. Por ejemplo, en una aplicación de seguimiento de pedidos en línea, los observadores pueden recibir actualizaciones cuando 
el estado de un pedido cambie (enviado, en tránsito, entregado, etc.).

Monitoreo de sensores: En sistemas que involucran monitoreo de sensores o dispositivos externos, puedes utilizar el patrón Observador para notificar 
a diferentes componentes del sistema cuando los datos del sensor cambian. Los observadores pueden ser responsables de realizar acciones específicas 
en respuesta a los cambios en los datos del sensor.

Desarrollo de videojuegos: En el desarrollo de videojuegos, el patrón Observador se utiliza para notificar a los diferentes componentes del juego sobre eventos importantes, 
como colisiones, cambios en el estado del juego, entrada de usuario, etc. Por ejemplo, un objeto que representa a un enemigo puede ser un sujeto que notifica a otros objetos 
cuando el jugador se acerca.
 */