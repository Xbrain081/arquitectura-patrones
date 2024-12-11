class User {
    constructor(id, name, email, age) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.age = age;
    }
}
module.exports = User;

//Porqué tan sencillo? 
//Porque debe ser una lógica pura, lo q quiere decir q no debe depender de una logica externa