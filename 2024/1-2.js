import fs from 'fs';

fs.readFile('./data', 'utf8', (_, data) => {
  console.clear();
  data = data.trim();

  let list1 = [];
  let list2 = [];

  for (const line of data.split('\n')) {
    console.log(line);
    const [first, last] = line.split(/\s+/).map((d) => parseInt(d));
    console.log({ first, last });
    list1.push(first);
    list2.push(last);
  }

  console.log(list1, list2);

  let sum = 0;
  for (let i = 0; i < list1.length; i += 1) {
    const n = list1[i];
    const occurences = list2.filter((d) => d === n).length;
    sum += n * occurences;
  }
  console.log(sum);
});
