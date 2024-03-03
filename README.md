# SURE LIBRARY

This project is a simple Express.js-based API for managing books. It provides endpoints for creating, updating, deleting books, marking them as read, and tracking the number of books sold.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Examples](#examples)
- [Note](#contributing)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Freedteck/sure-library.git
   cd sure-library
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Change Node Version

   ```bash
   nvm use 20
   ```

4. Install DFX

   ```bash
   sudo apt-get install podman
   ```

   ```bash
   DFX_VERSION=0.16.1 sh -ci "$(curl -fsSL https://sdk.dfinity.org/install.sh)"
   ```

   ```bash
   echo 'export PATH="$PATH:$HOME/bin"' >> "$HOME/.bashrc"
   ```

   ```bash
   dfx --version
   ```

5. Start the Local Internet Computer:

   ```bash
   dfx start --host 127.0.0.1:8000 --clean
   ```

6. Deploying the Canister on Localhost

   ```bash
   dfx deploy
   ```

## Usage

Make HTTP requests to the provided endpoints using tools like `curl` or a platform like Postman. Ensure that the server is running during usage.

## Endpoints

- `POST /books`: Create a new book.
- `GET /books`: Get all books.
- `GET /books/:id`: Get a specific book by ID.
- `PUT /books/:id`: Update a specific book by ID.
- `DELETE /books/:id`: Delete a specific book by ID.
- `PUT /books/:id/mark`: Mark a book as read or unread.
- `POST /books/:id/sell`: Increment the number of times a book has been sold.

## Examples

### Create a Book

```bash
curl -X POST http://bkyz2-fmaaa-aaaaa-qaaaq-cai.localhost:8000/books -H "Content-type: application/json" -d '{"title": "The Great Gatsby", "author": "F. Scott Fitzgerald", "pages": "180", "isRead": false, "sold": 0, "body": "A classic novel about the American Dream.", "attachmentURL": "http://example.com/great-gatsby.jpg"}'
```

### Get All Books

```bash
curl http://bkyz2-fmaaa-aaaaa-qaaaq-cai.localhost:8000/books
```
You should have an output similar to:

```bash
[{"id":"96672a88-822f-4033-8a24-462fa8f4fcd8","createdAt":"2024-03-03T07:50:51.727Z","title":"The Great Gatsby","author":"F. Scott Fitzgerald","pages":"180","isRead":false,"sold":0,"body":"A classic novel about the American Dream.","attachmentURL":"http://example.com/great-gatsby.jpg"}]
```

### Update a Book

```bash
curl -X PUT http://bkyz2-fmaaa-aaaaa-qaaaq-cai.localhost:8000/books/{book-id} -H "Content-type: application/json" -d '{"title": "Updated Title", "body": "Updated body."}'
````

### Mark a Book as Read

```bash
curl -X PUT http://bkyz2-fmaaa-aaaaa-qaaaq-cai.localhost:8000/books/{book-id}/mark -H "Content-type: application/json" -d '{"isRead": true}'
```

### Sell a Book

```bash
curl -X POST http://bkyz2-fmaaa-aaaaa-qaaaq-cai.localhost:8000/books/{book-id}/sell
```

## Note

You need a **Node.js version 20** to run this project.

Replace `{book-id}` with the id of the book you want
