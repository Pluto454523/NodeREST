
const express = require('express');
const Sequelize = require('sequelize');
const app = express();

app.use(express.json());

// create a connect tion
const sequelize = new Sequelize('database','username','password', {
    host: 'localhost',
    dialect: 'sqlite',
    storage: '../Database/Book.sqlite',
})

const Book = sequelize.define('book', { 
    id: { 
        type: Sequelize.INTEGER, 
        autoIncrement: true, 
        primaryKey: true 
    }, 
    title: { 
        type: Sequelize.STRING, 
        allowNull: false, 
    },    
    author: { 
        type: Sequelize.STRING, 
        allowNull: false
    }
})

sequelize.sync()

// route to get all books 
app.get('/books', (req, res) => {
    Book.findAll().then((books) => {
        res.json(books)
    }).catch((err) => {
        res.status(500).send(err)
    });
})


// route to get a book by id
app.get('/books/:id', (req, res) => {
    db.get(`SELECT * FROM ${tableName} WHERE id = ?`, req.params.id, (err, row) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (!row) {
                res.status(404).send('Book not found');
            } else {
                res.json(row);
            }
        }
    });
});



// route to create a new book
app.post('/books', (req, res) => {
    const book = req.body
    db.run(`INSERT INTO ${tableName} (title, author) VALUES (?, ?)`, book.title, book.author, function (err) {
        if (err) {
            res.status(500).send(err)
        } else {
            book.id = this.lastID
            res.send(book)
        }
    })
})

// route to update a book
app.put('/books/:id', (req, res) => {
    const book = req.body;
    db.run(`UPDATE ${tableName} SET title= ?, author = ? WHERE id = ?`, book.title, book.author, req.params.id, function (err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(book);
        }
    });
});



// route to delete a book
app.delete('/books/:id', (req, res) => {
    db.run(`DELETE FROM ${tableName} WHERE id = ?`, req.params.id, function (err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send({});
        }
    });
});
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`))