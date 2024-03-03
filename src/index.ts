import { v4 as uuidv4 } from "uuid";
import { Server, StableBTreeMap, ic } from "azle";
import express from "express";
/**
    This type represents a book that can be listed on a board.
*/
class Book {
  id: string;
  title: string;
  author: string;
  pages: string;
  isRead: boolean;
  sold: number;
  body: string;
  attachmentURL: string;
  createdAt: Date;
  updatedAt: Date | null;
}

// storage for books (Library)
const booksStorage = StableBTreeMap<string, Book>(0);

export default Server(() => {
  const app = express();
  app.use(express.json());

  //   Function to Create Book
  app.post("/books", (req, res) => {
    const book: Book = {
      id: uuidv4(),
      createdAt: getCurrentDate(),
      ...req.body,
    };
    booksStorage.insert(book.id, book);
    res.json(book);
  });

  // Function to get All Books
  app.get("/books", (req, res) => {
    res.json(booksStorage.values());
  });

  //   Function to get a particular Book
  app.get("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const bookOpt = booksStorage.get(bookId);
    if ("None" in bookOpt) {
      res.status(404).send(`the book with id=${bookId} not found`);
    } else {
      res.json(bookOpt.Some);
    }
  });

  //   Function to update a Book
  app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const bookOpt = booksStorage.get(bookId);
    if ("None" in bookOpt) {
      res
        .status(400)
        .send(`couldn't update a book with id=${bookId}. book not found`);
    } else {
      const book = bookOpt.Some;
      const updatedBook = { ...book, ...req.body, updatedAt: getCurrentDate() };
      booksStorage.insert(book.id, updatedBook);
      res.json(updatedBook);
    }
  });

  //   Function to delete a Book
  app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const deletedBook = booksStorage.remove(bookId);
    if ("None" in deletedBook) {
      res
        .status(400)
        .send(`couldn't delete a book with id=${bookId}. book not found`);
    } else {
      res.json(deletedBook.Some);
    }
  });

  //   Function to handle Book Read Property
  app.put("/books/:id/mark", (req, res) => {
    const bookId = req.params.id;
    const bookOpt = booksStorage.get(bookId);

    if ("None" in bookOpt) {
      res
        .status(404)
        .send(`Couldn't update. Book with id=${bookId} not found.`);
    } else {
      const book = bookOpt.Some;

      // Mark the book as read if isRead is provided in the request body
      const updatedBook = {
        ...book,
        isRead: book.isRead ? false : true,
        updatedAt: getCurrentDate(),
      };

      booksStorage.insert(book.id, updatedBook);
      res.json(updatedBook);
    }
  });

  //   Function to handle Book sold
  app.post("/books/:id/sell", (req, res) => {
    const bookId = req.params.id;
    const bookOpt = booksStorage.get(bookId);

    if ("None" in bookOpt) {
      res.status(404).send(`Couldn't sell. Book with id=${bookId} not found.`);
    } else {
      const book = bookOpt.Some;

      const updatedBook = {
        ...book,
        sold: (book.sold || 0) + 1, // Increment the sold property by 1
        updatedAt: getCurrentDate(),
      };

      booksStorage.insert(book.id, updatedBook);
      res.json(updatedBook);
    }
  });

  return app.listen();
}); // to close the Server function.

function getCurrentDate() {
  const timestamp = new Number(ic.time());
  return new Date(timestamp.valueOf() / 1000_000);
}
