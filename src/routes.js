const { addBook, getAllBooks, getBookById, editBookById, deleteBookById } = require('./handler');


const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBook,
    },
    {
        method: 'GET',
        path: '/books',
        handler: getAllBooks
    },
    {
        method: 'GET',
        path: '/books/{bookid}',
        handler: getBookById,
    },
    {
        method: 'PUT',
        path: '/books/{bookid}',
        handler: editBookById,
    },
    {
        method: 'DELETE',
        path: '/books/{bookid}',
        handler: deleteBookById,
    }
];

module.exports = routes;