const { log } = require("console");

//1. reverse alphabet
const reverse = (value) => {
  const number = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  const splitStr = value.split("");
  let numberFound;
  for (let i = 0; i < splitStr.length; i++) {
    const alphabet = splitStr[i];
    if (number.includes(alphabet)) {
      numberFound = splitStr[i];
      splitStr.splice(i, 1);
    }
  }
  const reversedStr = splitStr.reverse();
  if (numberFound) {
    reversedStr.push(numberFound);
  }
  const result = reversedStr.join("");
  console.log(result);
};

reverse("NEGIE1");

//2. find the longest
const longest = (value) => {
  const words = value.split(" ");
  let selectedWord;
  let longest = 0;
  for (let i = 0; i < words.length; i++) {
    if (longest < words[i].length) {
      longest = words[i].length;
      selectedWord = words[i];
    }
  }
  console.log(selectedWord + " : " + longest + " character");
};

longest("Saya sangat senang mengerjakan soal algoritma");

//3. INPUT & QUERY
const INPUT = ["xc", "dz", "bbb", "dz"];
const QUERY = ["bbb", "bc", "dz"];

const wordCounter = () => {
  const result = QUERY.map((queryWord) => {
    let count = 0;
    INPUT.filter((inputWord) => {
      if (inputWord === queryWord) {
        count++;
      }
    }).length;
    return count;
  });
  console.log(result);
};

wordCounter();

//4. Diagonal Matrix
const matrix = [
  [1, 2, 0],
  [4, 5, 6],
  [7, 8, 9],
];

let first = 0;
let second = 0;
const diagonalSum = () => {
  for (let i = 0; i < matrix.length; i++) {
    first += matrix[i][i];
    second += matrix[i][matrix.length - 1 - i];
  }
  const result = first - second;
  console.log(result);
};

diagonalSum();
