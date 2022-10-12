function findAccountById(accounts, id) {
  let result = accounts.find((accountObj) => accountObj.id === id);
  return result ? result : null;
}

function sortAccountsByLastName(accounts) {
  accounts.sort((accA, accB) => {
    return accA.name.last.toLowerCase() < accB.name.last.toLowerCase() ? -1 : 1;
  });
  return accounts;
}

function getTotalNumberOfBorrows(account, books) {
  let total = 0;
  books.forEach((book) => {
    return book.borrows.forEach((borrowsObj) => {
      account.id === borrowsObj.id && total++;
    });
  });
  return total
}

function getBooksPossessedByAccount(account, books, authors) {
  return books.filter((book) => {
    let checkedOut = book.borrows[0]
    return !checkedOut.returned && checkedOut.id === account.id
  })
  .map((book) => {
    let author = authors.find(author => author.id === book.authorId)
    return{...book, author}
  })
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
