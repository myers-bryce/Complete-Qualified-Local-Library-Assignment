function getTotalBooksCount(books = []) {
  return books.length;
}

function getTotalAccountsCount(accounts = []) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let checkedOut = books.filter((bookObj) => {
    let borrows = bookObj.borrows;
    let borrowedBooks = borrows.some((isBorrowed) => {
      return isBorrowed.returned === false;
    });
    return borrowedBooks;
  });
  return checkedOut.length;
}

const reduceBooksbyGenre = (books) => {
  const genre = books.reduce((books, book) => {
    if (!books[book.genre]) {
      books[book.genre] = [];
    }
    books[book.genre].push(book);
    return books;
  }, {});
  return genre;
};

function getMostCommonGenres(books) {
  // const group = books.genre
  const importGroup = reduceBooksbyGenre(books);
  // console.log("ImportGroup", importGroup);
  let result = [];
  for (let genre in importGroup) {
    //  console.log("Genre", genre);
    //  console.log(importGroup[genre].length);
    //  console.log({name : genre, count : importGroup[genre].length});
    result.push({ name: genre, count: importGroup[genre].length });
  }
  return result
    .sort((countA, countB) => (countA.count < countB.count ? 1 : -1))
    .slice(0, 5);
  // console.log(result);
}

function getMostPopularBooks(books) {
  return books
    .map((book) => {
      return { name: book.title, count: book.borrows.length };
    })
    .sort((lengthA, lengthB) => (lengthA.count < lengthB.count ? 1 : -1))
    .slice(0, 5);
}

const reduceBooksbyAuthor = (books, id) => {
  initialValue = 0;
  return books.reduce((totalBorrows, { authorId, borrows }) => {
    if (authorId === id) totalBorrows += borrows.length;
    return totalBorrows;
  }, initialValue);
};

function getMostPopularAuthors(books, authors) {
  let result = authors.map(({ name: { first, last }, id }) => ({
    name: `${first} ${last}`,
    count: reduceBooksbyAuthor(books, id),
  }));
  return result
    .sort((authorA, authorB) => (authorA.count < authorB.count ? 1 : -1))
    .slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
