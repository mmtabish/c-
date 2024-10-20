// const coding = ["js", "ruby", "java","python", "cpp"]

// const values = coding.forEach((item) => {
//     console.log(item);
// })

// console.log(values);


const myNums = [1,2,3,4,5,6,7,8,9,10]

// const newNums = myNums.filter((num) =>{
//     return num > 4;
// })

// 

const book = [
    {title: 'Book One', genre: 'Fiction', publish: 1985,editor:2006 },
    {title: 'Book Two', genre: 'Fiction', publish: 1981,editor:2004 },
    {title: 'Book three', genre: 'Fiction1', publish: 1981,editor:2007 },
    {title: 'Book four', genre: 'Fiction44', publish: 1981,editor:2002 },
    {title: 'Book Five', genre: 'Fiction23', publish: 1981,editor:2009 },
    {title: 'Book six', genre: 'Fiction23', publish: 1981,editor:1999 },
    {title: 'Book seven', genre: 'Fiction32', publish: 1981,editor:1939 },
    {title: 'Book Eight', genre: 'Fiction3', publish: 1981,editor:2022 }
];

const userBook = book.filter((bk) => bk.genre ==='Fiction')

console.log(userBook);