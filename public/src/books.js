function findAuthorById(authors, id) {
  let result = authors.find((authorObj) => {
    return authorObj.id === id;
  });
  return result ? result : null;
}

function findBookById(books, id) {
  let result = books.find((bookObj) => {
    return bookObj.id === id;
  });
  return result ? result : null;
}

function partitionBooksByBorrowedStatus(books) {
  let checkedOut = books.filter((bookObj) => {
    let borrows = bookObj.borrows;
    let borrowedBooks = borrows.some((isBorrowed) => {
      return isBorrowed.returned === false;
    });
    return borrowedBooks;
  });
  let returnedBooks = books.filter((bookObj) => {
    let borrows = bookObj.borrows;
    let notBorrowed = borrows.every((isBorrowed) => {
      return isBorrowed.returned === true;
    });
    return notBorrowed;
  });
  return [checkedOut, returnedBooks];
}

function getBorrowersForBook(book, accounts) {
  return book.borrows
    .map((borrow) => {
      let account = accounts.find((account) => account.id === borrow.id);
      return { ...borrow, ...account };
    })
    .slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
