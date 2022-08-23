class User {
    constructor(name, surname, pets, books) {
        this.name = name;
        this.surname = surname;
        this.pets = pets || [];
        this.books = books || [];
    }

    getFullName() {
        return console.log(`El nombre completo del usuario es ${this.name} ${this.surname}`);
    }

    addPet(newPet) {
        this.pets.push(newPet);
    }

    countPet() {
            return console.log(`La cantidad de mascotas es ${this.pets.length}`);
    }

    getPets() {
        const Pet = []
        this.pets.map(pet =>
            Pet.push(pet)
        )
        return console.log(`Las mascotas son: ${Pet}`);
    }

    addBook(name, autor) {
        this.books.push({name:name, autor:autor});
    }

    getBooksName() {
        const booksName = []
        this.books.map(book =>
            booksName.push(book.name)
        )
        return console.log(`Los libros son: ${booksName}`);
    }
}

//Testing the code

const user = new User('Andrea', 'Perez', ['Pajaro', 'Cuy', 'Gato'], [{name: 'Elantris', autor: 'Brandon Sanderson'},{name: 'El imperio final', autor: 'Brandon Sanderson'},{name: 'Steelheart', autor: 'Brandon Sanderson'}]);
const user2 = new User('Carlos', 'Leon', ['Pato', 'Serpiente'], [{name: 'Ensayo sobre la ceguera', autor: 'José Saramago'},{name: 'Desolación', autor: 'Gabriela Mistral'}]);
const user3 = new User('Patricia', 'Lopez', ['Perico', 'Perro', 'Tortuga'], [{name: 'Cien años de soledad', autor: 'Gabriel García Márquez'}]);

user.getFullName();
user.getPets();
user.countPet();
user.addPet('Lagartija');
user.getPets();
user.countPet();
user.getBooksName();
user.addBook('La sombra del viento', 'Carlos Ruiz Zafón');
user.getBooksName();

user2.getFullName();
user2.getPets();
user2.countPet();
user2.addPet('Perro');
user2.getPets();
user2.countPet();
user2.getBooksName();
user2.addBook('El Bestiario de Axlin', 'Laura Gallego');
user2.getBooksName();

user3.getFullName();
user3.getPets();
user3.countPet();
user3.addPet('Conejo');
user3.getPets();
user3.countPet();
user3.getBooksName();
user3.addBook('El Valle de los Lobos', 'Laura Gallego');
user3.getBooksName();