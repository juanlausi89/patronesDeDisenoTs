/*https://refactoring.guru/es/design-patterns/strategy*/
//Este es un patron de diseño de comportamiento
/*Nos va ayudar a poder tener comportamientos distintos en un objeto y 
poder agregarles nuevos comportamientos sin tener que modificar el contexto inicial*/
/*El contexto es el la clase central que va a unificar las cosas y es del que vamos hacer el objeto
los demas van a servir para hacer la funcionalidad*/
/*Este patron se centra en tener una clase contexto la cual tenga una estrategia y tenga una accion, la estrategia
se la vamos asignar de algunas de las clases que tengan funcionalidad y nos brinda la facilidad de seguir agregando nuevo 
comportamiento sin modificar la clase inicial */
/*A veces tenemos un codigo con mucho switch case, aca no necesitamos mas de eso, simplemente creamos una nueva clase
que tenga un nuevo comportamiento la seteamos al contexto y este contexto va  ejecutar la accion de la clase que tiene la estrategia */
/*En el frontend un ejemplo en el que se puede utilizar es cuando tenemos distintos comportamientos dependiendo de un combobox */


interface Strategy{
    login(user:string, password: string): boolean;
}


class LoginContext{
    
    private strategy: Strategy;

    constructor(strategy:Strategy){
        this.strategy = strategy;
    }

    setStrategy(strategy:Strategy){
        this.strategy = strategy;
    }

    login(user:string, password:string):boolean{
        return this.strategy.login(user, password);
    }
}


class LoginDBStrategy implements Strategy{
    login(user: string, password: string) {
        console.log("nos dirigimos a la base de datos")

        if(user==="admin" && password==="entra"){
            return true;
        }

        return false;
    }
}

class LoginServiceKeycloakStrategy implements Strategy{
    login(user: string, password: string) {
        console.log("nos dirigimos a un servico de keycloak")

        if(user==="admin" && password==="entra"){
            return true;
        }

        return false;
    }
}

class LoginGoogleStrategy implements Strategy{
    login(user: string, password: string) {
        console.log("nos dirigimos a google")

        if(user==="admin" && password==="entra"){
            return true;
        }

        return false;
    }
}

const auth  = new LoginContext(new LoginDBStrategy());
auth.login("admin","entra");

auth.setStrategy(new LoginServiceKeycloakStrategy);
auth.login("admin","entra");

auth.setStrategy(new LoginGoogleStrategy);
auth.login("admin","entra");