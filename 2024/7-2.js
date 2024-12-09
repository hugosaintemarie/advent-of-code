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

  const operators = ['+', '*', '||'];

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

    numbers = numbers.split(' ');

    for (let i = 0; i < variants; i += 1) {
      const based = i.toString(operators.length).padStart(length, '0');
      // console.log({ i, based });

      let string = numbers
        .map((d, i) => {
          if (i === numbers.length - 1) return d;
          return `${d}${operators[based[i]]}`;
        })
        .join('');

      const baseString = string;

      while (operators.some((o) => string.includes(o))) {
        const operation = string.match(/\d+[\*\+\|]+\d+/)[0];
        if (operation.includes('||')) {
          string = string.replace(operation, operation.replace('||', ''));
        } else {
          string = string.replace(operation, eval(operation));
        }
      }

      // console.log(`${baseString} = ${string}`);

      const res = parseInt(string);
      if (res === value) {
        sum += res;
        break;
      }
    }
  }

  console.log({ sum });
});
