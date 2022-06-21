const { nanoid } = require('nanoid');
const books = require('./books');

const addBook = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    if (!name) {
        const response = h.response({
            "status": "fail",
            "message": "Gagal menambahkan buku. Mohon isi nama buku"
        });
        response.code(400);
        return response;
    }
    if (readPage > pageCount) {
        const response = h.response({
            "status": "fail",
            "message": "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
        });
        response.code(400);
        return response;
    }

    let finished = false;
    if (pageCount === readPage) {
        finished = true;
    }


    const newBook = {
        id, name, year, author, summary, publisher, pageCount, readPage, reading, finished, insertedAt, updatedAt
    };

    books.push(newBook);

    const isSuccess = books.filter((book) => book.id === id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            },
        });
        response.code(201);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal ditambahkan',
    });
    response.code(500);
    return response;
};

const getAllBooks = (request, h) => {

    const name = encodeURIComponent(request.query.name);
    const reading = encodeURIComponent(request.query.reading);
    const finished = encodeURIComponent(request.query.finished);
    if (name == "undefined" && reading == "undefined" && finished == "undefined") {
        const response = h.response({
            status: 'success',
            data: {
                "books":
                    books.map((book) => ({
                        id: book.id,
                        name: book.name,
                        publisher: book.publisher,
                    })),
            },
        });
        response.code(200);
        return response;
    }

    let casereading;
    let casefinished;
    lowecasename = name.toLocaleLowerCase();

    if (reading == 0) {
        casereading = false;
    } else if (reading == 1) {
        casereading = true;
    }

    if (finished == 0) {
        casefinished = false;
    } else if (finished == 1) {
        casefinished = true;
    }

    const indexfinished = books.findIndex((book) => book.finished == casefinished);

    if (name != "undefined") {
        angka = [];
        books.map((book, index) => {
            if (book.name.toLocaleLowerCase().includes(lowecasename)) {
                angka.push(index)
            }
        });
        newbooks = [];
        //create a new array of books that match the index from angka value
        angka.forEach((angka) => {
            newbooks.push(books[angka]);
        });

        if (typeof angka !== 'undefined' && angka.length > 0) {
            const response = h.response({
                "status": "success",
                "data": {
                    "books": newbooks.map((book) => ({
                        id: book.id,
                        name: book.name,
                        publisher: book.publisher,
                    })),
                }
            });
            response.code(200);
            return response;
        }
    } else if (reading != "undefined") {
        angka = [];
        books.map((book, index) => {
            if (book.reading == casereading) {
                angka.push(index)
            }
        });
        newbooks = [];
        //create a new array of books that match the index from angka value
        angka.forEach((angka) => {
            newbooks.push(books[angka]);
        });
        if (typeof angka !== 'undefined' && angka.length > 0) {
            const response = h.response({
                "status": "success",
                "data": {
                    "books": newbooks.map((book) => ({
                        id: book.id,
                        name: book.name,
                        publisher: book.publisher,
                    })),
                }
            });
            response.code(200);
            return response;
        }
    } else if (finished != "undefined") {
        angka = [];
        books.map((book, index) => {
            if (book.finished == casefinished) {
                angka.push(index)
            }
        });
        newbooks = [];
        //create a new array of books that match the index from angka value
        angka.forEach((angka) => {
            newbooks.push(books[angka]);
        });
        if (typeof angka !== 'undefined' && angka.length > 0) {
            const response = h.response({
                "status": "success",
                "data": {
                    "books": newbooks.map((book) => ({
                        id: book.id,
                        name: book.name,
                        publisher: book.publisher,
                    })),
                }
            });
            response.code(200);
            return response;
        }
    }


};




const getBookById = (request, h) => {
    const { bookid } = request.params;
    const index = books.findIndex((book) => book.id === bookid);

    if (index !== -1) {
        const response = h.response({
            "status": "success",
            "data": {
                "book": books[index]
            }
        });
        response.code(200);
        return response;
    } else {
        const response = h.response({
            status: "fail",
            message: "Buku tidak ditemukan"
        });
        response.code(404);
        return response;
    }

};

const editBookById = (request, h) => {
    const { bookid } = request.params;

    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    const updatedAt = new Date().toISOString();
    if (!name) {
        const response = h.response({
            "status": "fail",
            "message": "Gagal memperbarui buku. Mohon isi nama buku"
        });
        response.code(400);
        return response;
    }

    if (readPage > pageCount) {
        const response = h.response({
            "status": "fail",
            "message": "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
        });
        response.code(400);
        return response;
    }

    const index = books.findIndex((book) => book.id === bookid);

    if (index !== -1) {
        books[index] = {
            ...books[index],
            name, year, author, summary, publisher, pageCount, readPage, reading, updatedAt,
        };
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

const deleteBookById = (request, h) => {
    const { bookid } = request.params;

    const index = books.findIndex((book) => book.id === bookid);

    if (index !== -1) {
        books.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        });
        response.code(200);
        return response;
    }

    const response = h.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);
    return response;
};

module.exports = { addBook, getAllBooks, getBookById, editBookById, deleteBookById };
