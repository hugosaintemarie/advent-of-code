import { log } from 'console';
import fs from 'fs';

function nthIndex(str, pat, n) {
  var L = str.length,
    i = -1;
  while (n-- && i++ < L) {
    i = str.indexOf(pat, i);
    if (i < 0) break;
  }
  return i;
}

function setAt(str, index, replacement) {
  return (
    str.substring(0, index) +
    replacement +
    str.substring(index + replacement.length)
  );
}

fs.readFile('./data.txt', 'utf8', (_, data) => {
  console.clear();
  data = data.trim();

  // console.log(data);

  const operators = ['+', '*'];

  let sum = 0;

  for (const line of data.split('\n')) {
    console.log('---');
    console.log(line);
    let [value, numbers] = line.split(': ');
    value = parseInt(value);
    // numbers = numbers.split(' ').map((n) => parseInt(n));

    const whitespaces = numbers.split(' ').length - 1;
    const variants = Math.pow(operators.length, whitespaces);

    const length = (variants - 1).toString(operators.length).length;

    for (let i = 0; i < variants; i += 1) {
      const based = i.toString(operators.length).padStart(length, '0');
      // console.log({ i, based });

      const test = `${'('.repeat(whitespaces - 1)}${numbers}`
        .split(' ')
        .map((d, i) => {
          if (i === numbers.split(' ').length - 1) return d;

          return `${d}${i > 0 && i !== numbers.split(' ').length - 1 ? ')' : ''}${operators[based[i]]}`;
        })
        .join('');

      // console.log(test);

      if (eval(test) === value) {
        console.log(`${test} = ${eval(test)} matches ${value}`);
        sum += value;
        break;
      }
    }
  }

  console.log({ sum });
});
