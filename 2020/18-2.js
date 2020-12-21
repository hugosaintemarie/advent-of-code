const fs = require('fs');

fs.readFile('./data.md', 'utf8', (err, data) => {
    console.clear();
    data = data.split('\n');
    // console.log(data);

    let total = 0;
    for (let line of data) {
        // console.log('---');
        // console.log(line);

        while (isNaN(line)) {
            let pair = line.match(/\(\d+ \+ \d+\)/)?.[0];
            if (!pair) pair = line.match(/\d+ \+ \d+/)?.[0];

            if (!pair) pair = line.match(/\d+ \+ \([\d\* ]+\)/)?.[0];
            if (!pair) pair = line.match(/\([\d\* ]+\) \+ \d+/)?.[0];
            
            if (!pair) pair = line.match(/\([\d\* ]+\) \+ \([\d\* ]+\)/)?.[0];

            if (!pair) {
                pair = line.match(/\d+ \+ [\d\*\(\) ]+|[\d\*\(\) ]+ \+ \d+/)?.[0].trim();

                if (pair) {
                    let par = -1;
                    for (let i in pair) {
                        if (pair[i] === '(') par = par === -1 ? 1 : ++par;
                        if (pair[i] === ')') par -= 1;

                        if (par === 0) {
                            pair = pair.slice(0, parseInt(i) + 1);
                            break;
                        }
                    }
                }
            }

            if (!pair) pair = line.match(/\([\d\* ]*(\(\d+ \* \d+\))[\d\* ]*\)/)?.[0];  
            if (!pair) pair = line.match(/\d+ \* \d+/)?.[0];
            if (!pair) pair = line.match(/\(\d+\)/)?.[0];

            line = line.replace(pair, `${eval(pair)}`);

            // console.log(pair);
            // console.log('-');
            // console.log(line);
        }

        console.log(line);
        total += parseInt(line);
    }

    console.log(total);
});

//  27078994731993
//  98621258158412
// 237940609397646
// 240019893422125
// 240450807308313
// 241215764951770
// 316238181417131