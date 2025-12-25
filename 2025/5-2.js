import fs from 'fs';

fs.readFile('./data', 'utf8', (_, data) => {
  console.clear();
  // console.log(data);
  let [ranges] = data.split('\n\n').map((d) => d.split('\n'));
  ranges = ranges.map((d) => d.split('-').map((n) => parseInt(n)));

  // console.log({ ranges });

  const out = [];
  let a = ranges.shift();

  const work = () => {
    console.log(a);

    const equal = (a, b) => {
      return a[0] === b[0] && a[1] === b[1];
    };

    const findSame = () => {
      return ranges.find((b) => equal(a, b));
    };

    // intersect-higher
    // a0-----a1
    //    b0-------b1
    const findIntersectHigher = () => {
      return ranges.find(
        (b) => !equal(a, b) && b[0] > a[0] && b[0] <= a[1] && b[1] > a[1]
      );
    };

    // intersect-lower
    //     a0-------a1
    // b0-------b1
    const findIntersectLower = () => {
      return ranges.find(
        (b) => !equal(a, b) && b[0] < a[0] && b[1] >= a[0] && b[1] < a[1]
      );
    };

    // contained
    // a0-----------a1
    //    b0----b1
    //
    // a0-----------a1
    //
    // a0-----------a1
    //    bx
    //
    // a0-----------a1
    // bx
    //
    // a0-----------a1
    //              bx
    const findContained = () => {
      return ranges.find((b) => !equal(a, b) && b[0] >= a[0] && b[1] <= a[1]);
    };

    // wraps
    //    a0----a1
    // b0-----------b1
    //
    // a0----a1
    // b0-----------b1
    //
    //        a0----a1
    // b0-----------b1
    const findWraps = () => {
      return ranges.find(
        (b) =>
          !equal(a, b) &&
          ((b[0] <= a[0] && b[1] > a[1]) || (b[0] < a[0] && b[1] >= a[1]))
      );
    };

    let same = findSame();
    if (same) {
      console.log(a, 'is same as', same);
      ranges.splice(ranges.indexOf(same), 1);

      return work();
    }

    let wraps = findWraps();
    if (wraps) {
      console.log(a, 'is wrapped in', wraps);
      a = wraps;

      ranges.splice(ranges.indexOf(wraps), 1);

      return work();
    }

    let contained = findContained();
    if (contained) {
      console.log(a, 'contains', contained);
      ranges.splice(ranges.indexOf(contained), 1);

      return work();
    }

    let intersectHigher = findIntersectHigher();
    if (intersectHigher) {
      console.log(a, 'intersects -> with', intersectHigher);

      a = [a[0], intersectHigher[1]];

      ranges.splice(ranges.indexOf(intersectHigher), 1);

      return work();
    }

    let intersectLower = findIntersectLower();
    if (intersectLower) {
      console.log(a, 'intersects <- with', intersectLower);

      a = [intersectLower[0], a[1]];

      ranges.splice(ranges.indexOf(intersectLower), 1);

      return work();
    }

    ranges = ranges.filter((d) => d);

    out.push(a);
    ranges = ranges.filter((d) => d);

    if (ranges.length) {
      a = ranges.shift();
      work();
    }
  };

  work();

  ranges = out;

  console.log(out.length);

  let total = 0;
  for (const range of out) {
    total += range[1] - range[0] + 1;
  }
  console.log({ total });
});
