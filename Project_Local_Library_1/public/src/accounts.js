function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((nameA, nameB) =>
    nameA.name.last > nameB.name.last ? 1 : -1
  );
}

function getTotalNumberOfBorrows(account, books) {
  let counter = 0;
  let obj = [];
  for (let i = 0; i < books.length; i++) {
    obj = books[i].borrows;
    obj.forEach((element) => {
      console.log(element);
      if (account.id === element.id) {
        counter += 1;
      }
    });
  }
  return counter;
}

function getBooksPossessedByAccount(account, books, authors){
  let books_taken = [];
    books.forEach(book=>{
      if (book.borrows.find(item=>item.id === account.id && !item.returned)) {
        books_taken.push(book);
      }
    })
    console.log(books_taken);
    books_taken.forEach(book=>{
      let anAuthor = authors.find(person => person.id === book.authorId);
      book['author'] = anAuthor;
    })
    console.log(books_taken);
    return books_taken;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
