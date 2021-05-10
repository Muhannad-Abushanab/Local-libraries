//helper
function sortObjectByValue(obj) {
  const keys = Object.keys(obj);
  return keys.sort((keyA, keyB) => {
    if (obj[keyA] > obj[keyB]) {
      return -1;
    } else if (obj[keyB] > obj[keyA]) {
      return 1;
    } else {
      return 0;
    }
  });
}

function getTotalBooksCount(books) {
  let total = 0;
  let result = books.filter((book) => {
    book.title === 0 ? (total += 0) : (total += 1);
    //console.log(total)
  });
  return total;
}

function getTotalAccountsCount(accounts) {
  let total = 0;
  let result = accounts.filter((acc) => {
    acc.id === null ? (total += 0) : (total += 1);
    //console.log(total)
  });
  return total;
}

function getBooksBorrowedCount(books) {
  let total = 0;
  let result = books.filter((book) => {
    const checks = book.borrows;
    checks.forEach((check) => {
      check.returned === false ? (total += 1) : (total += 0);
      //console.log(check.returned);
    });
  });
  return total;
}

function getMostCommonGenres(books) {
  const allGenres = books.reduce((acc, { genre }) => {
    if (typeof acc[genre] == "undefined") {
      acc[genre] = 1;
    } else {
      acc[genre] += 1;
    }
    //console.log(acc[genre])
    return acc;
  }, {});

  const sortedGenres = sortObjectByValue(allGenres);

  let finalSortedArr = sortedGenres
    .map((item) => ({ name: item, count: allGenres[item] }))
    .slice(0, 5);

  return finalSortedArr;
}

function getMostPopularBooks(books) {
  const allPopularBooks = books.reduce((acc, { title }, counter) => {
    acc[title] = books[counter].borrows.length;
    counter++;
    return acc;
  }, {});

  const sortedBooks = sortObjectByValue(allPopularBooks);

  let formattedBooksArray = sortedBooks
    .map((item) => ({ name: item, count: allPopularBooks[item] }))
    .slice(0, 5);

  return formattedBooksArray;
}

function getMostPopularAuthors(books, authors) {
  let authorNames = books.map((book)=>{
    for (authorObj in authors)
    {
      const author = authors[authorObj];
      if(author.id === book.authorId)
          book.authorName = `${author.name.first} ${author.name.last}`;
    }
      return {authorName : book.authorName,
        borrowCount : book.borrows.length}
  });
  console.log(authorNames);
  const groupedBorrowCount = authorNames.reduce((arr, author) =>{
      const found = arr.find(sameAuthor =>
        sameAuthor.name === author.authorName);
      if (!found)
        arr.push({name: author.authorName, count : author.borrowCount});
      else {
        arr.map((duplicateAuthor)=>{
          if (duplicateAuthor.name === author.authorName)
            duplicateAuthor.count += author.borrowCount;
        })
      }
    return arr;
  },[])
  groupedBorrowCount.sort((authorA,authorB)=>authorA.count < authorB.count ? 1 : -1);
  groupedBorrowCount.length = 5;
  return groupedBorrowCount;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
