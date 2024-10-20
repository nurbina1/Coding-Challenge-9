// Book class to represent a book in the library
class Book {
    constructor(title, author, ISBN) {
        this.title = title;
        this.author = author;
        this.ISBN = ISBN;
        this._isAvailable = true;
    }

    // Method to get the details of the book as a formatted string
    getDetails() {
        return `Title: ${this.title}, Author: ${this.author}, ISBN: ${this.ISBN}`;
    }

    // Getter method for isAvailable to access the private _isAvailable property
    get isAvailable() {
        return this._isAvailable;
    }

    // Setter method for isAvailable to update the availability status of the book
    set isAvailable(status) {
        this._isAvailable = status;
    }
}

// Section class to manage a collection of books
class Section {
    constructor(name) {
        this.name = name;
        this.books = []; // Array to store Book objects belonging to this section
    }

    // Method to add a Book object to the books array
    addBook(book) {
        this.books.push(book);
    }

    // Method to get the number of available books in the section
    getAvailableBooks() {
        return this.books.filter(book => book.isAvailable).length;
    }

    // Method to list all books in the section with their availability status
    listBooks() {
        return this.books.map(book => `${book.title} - ${book.isAvailable ? 'Available' : 'Borrowed'}`).join('\n');
    }

    // Method to calculate the total number of available books in the section using getAvailableBooks
    calculateTotalBooksAvailable() {
        return this.getAvailableBooks();
    }
}

// Patron class to represent a library user
class Patron {
    constructor(name) {
        this.name = name;
        this.borrowedBooks = []; // Array to store borrowed Book objects
    }

    // Method to allow the patron to borrow a book if available
    borrowBook(book) {
        if (book.isAvailable) {
            book.isAvailable = false; // Mark book as borrowed
            this.borrowedBooks.push(book); // Add book to borrowed list
            console.log(`${this.name} borrowed "${book.title}".`);
        } else {
            console.log(`"${book.title}" is currently unavailable.`);
        }
    }

    // Method to allow the patron to return a borrowed book
    returnBook(book) {
        const index = this.borrowedBooks.indexOf(book);
        if (index !== -1) {
            book.isAvailable = true; 
            this.borrowedBooks.splice(index, 1); 
            console.log(`${this.name} returned "${book.title}".`);
        } else {
            console.log(`"${book.title}" was not borrowed by ${this.name}.`);
        }
    }
}

// VIPPatron class that inherits from Patron and has priority borrowing
class VIPPatron extends Patron {
    constructor(name) {
        super(name);
        this.priority = true; // VIP patrons have borrowing priority
    }

    // Override the borrowBook method to allow VIP patrons to have priority
    borrowBook(book) {
        if (book.isAvailable) {
            super.borrowBook(book); // Use the parent method if the book is available
        } else if (this.priority) {
            // Logic for VIP priority could involve a queue system, but here we notify the attempt.
            console.log(`${this.name} (VIP) could not borrow "${book.title}" as it's currently borrowed.`);
        } else {
            console.log(`"${book.title}" is currently unavailable for ${this.name} (VIP).`);
        }
    }
}

// Book Instances Creation
const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", "9780743273565");
const book2 = new Book("1984", "George Orwell", "9780451524935");
const book3 = new Book("Crime and Punishment", "Fyodor Dostoevsky", "9780486454115");
const book4 = new Book("The Hobbit", "J.R.R. Tolkien", "9780547928227");

// Section Instances Creation
const fictionSection = new Section("Fiction");
const scienceSection = new Section("Science");

// Adding Books to Sections
fictionSection.addBook(book1);
fictionSection.addBook(book2);
fictionSection.addBook(book3);
scienceSection.addBook(book4);

// Patron Instances Creation
const patron1 = new Patron("Alice");
const vipPatron = new VIPPatron("Bob");

// Patrons Borrow Books
patron1.borrowBook(book1); // Alice borrows The Great Gatsby
vipPatron.borrowBook(book2); // Bob (VIP) borrows 1984
vipPatron.borrowBook(book3); // Bob (VIP) borrows To Kill a Mockingbird
patron1.borrowBook(book4); // Alice tries to borrow Brave New World (successful)

// Calculation of Total Available Books in Each Section
console.log(`Total available books in Fiction: ${fictionSection.calculateTotalBooksAvailable()}`);
console.log(`Total available books in Science: ${scienceSection.calculateTotalBooksAvailable()}`);

// Patrons Return Books
patron1.returnBook(book1); // Alice returns The Great Gatsby
vipPatron.returnBook(book2); // Bob returns 1984

// Calculation of Total Available Books Again
console.log(`Total available books in Fiction after returns: ${fictionSection.calculateTotalBooksAvailable()}`);
console.log(`Total available books in Science after returns: ${scienceSection.calculateTotalBooksAvailable()}`);

// Display the list of books and their status in each section
console.log("Fiction Section Books:\n" + fictionSection.listBooks());
console.log("Science Section Books:\n" + scienceSection.listBooks());
