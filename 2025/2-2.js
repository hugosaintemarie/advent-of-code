import fs from 'fs';

fs.readFile('./data', 'utf8', (_, data) => {
  console.clear();
  // console.log(data);
  const ranges = data.split(',');

  let sum = 0;

  for (const range of ranges) {
    const [start, end] = range.split('-').map((d) => parseInt(d));
    console.log('---');
    console.log('range', start, end);

    let invalidIdsInRange = [];

    for (let i = start; i <= end; i++) {
      // console.log(i);
      const str = i.toString();

      for (let j = 1; j < Math.ceil(str.length / 2 + 0.5); j++) {
        if (str.length % j !== 0) {
          // console.log(str.length, 'not divisible by', j, ', skipping');
          continue;
        }

        // oops, only repeated *twice*
        // eheheheh
        if (str.length !== j * 2) {
          // continue;
        }

        const sub = str.substring(0, j);
        // console.log('checking', i, 'with length', j, ':', sub);
        const candidate = sub.repeat(str.length / j);
        if (str === candidate) {
          if (invalidIdsInRange.includes(i)) {
            continue;
          }

          console.log('invalid id', i);
          sum += i;
          invalidIdsInRange.push(i);
        }
      }
    }
  }

  console.log({ sum });
});
