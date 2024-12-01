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

  list1 = list1.sort((a, b) => a - b);
  list2 = list2.sort((a, b) => a - b);
  console.log(list1, list2);

  let diff = 0;
  for (let i = 0; i < list1.length; i += 1) {
    diff += Math.abs(list1[i] - list2[i]);
  }
  console.log(diff);
});
