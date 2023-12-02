import fs from 'fs';
// PART 1
// function Test(file) {
//   const Test = fs
//     .readFileSync(file, 'utf-8')
//     .trim()
//     .split('\n')
//     .filter((line) => line.trim() != '');

//   const values = Test.map((line) => {
//     let characters = line.split('');
//     let first = characters.find((v) => !Number.isNaN(Number(v)));
//     let last = characters.reverse().find((v) => !Number.isNaN(Number(v)));
//     return Number(first + last);
//   });
//   return values.reduce((s, v) => s + v);
// }

// // console.log(partOne('./example.txt'));
// console.log(firstPart('./01_input.txt'));

// PART2;
const wMap = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
};
const firstRegExp = new RegExp(
  ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'].join(
    '|'
  )
);
const lastRegExp = new RegExp(
  ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']
    .join('|')
    .split('')
    .reverse()
    .join('')
);

//console.log(firstRegExp, lastRegExp);

function partTwo(file) {
  const lines = fs
    .readFileSync(file, 'utf-8')
    .trim()
    .split('\n')
    .filter((line) => line.trim() != '');

  const values = lines.map((line) => {
    const characters = line.split('');
    let Num1Index = characters.findIndex((v) => !Number.isNaN(Number(v)));
    let firstWmatch = line.match(firstRegExp);
    let firstWnumIndex = firstWmatch?.index;

    // console.log(firstWnumIndex,firstWmatch)
    let Num1 =
      Num1Index != -1
        ? firstWmatch
          ? Num1Index < firstWnumIndex
            ? line[Num1Index]
            : wMap[firstWmatch[0]]
          : line[Num1Index]
        : wMap[firstWmatch[0]];

    let lastNumIndex = characters
      .slice()
      .reverse()
      .findIndex((v) => !Number.isNaN(Number(v)));
    if (lastNumIndex !== -1) {
      lastNumIndex = characters.length - 1 - lastNumIndex;
    }

    let lastWmatch = line.split('').reverse().join('').match(lastRegExp);
    let lastWnumIndex = lastWmatch ? line.length - 1 - lastWmatch.index : null;

    let Num2 =
      lastNumIndex != -1
        ? lastWmatch
          ? lastNumIndex > lastWnumIndex
            ? line[lastNumIndex]
            : wMap[lastWmatch[0].split('').reverse().join('')]
          : line[lastNumIndex]
        : wMap[lastWmatch[0].split('').reverse().join('')];
    console.log(Num1, Num2);
    return Number(Num1 + Num2);
  });
  return values.reduce((s, v) => s + v);
}
// console.log(partTwo('./02_examples.txt'))
console.log(partTwo('./01_input.txt'));
