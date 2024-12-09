import fs from 'fs/promises';

const readDataFile = async () => {
  try {
    const rawData = await fs.readFile('./data.txt', 'utf8');
    const lines = rawData.split('\n');
    const data = lines.map((line) => line.trim().split(/\s+/).map(Number));

    part1(data);

    part2(data);
  } catch (error) {
    console.error('Erreur lors de la lecture du fichier :', error);
  }
};

/// /////////////
// P1
/// /////////////
const part1 = (data) => {
  let safe = 0;
  let isSafe = false;

  data.forEach((row, i) => {
    if (isSafe) safe += 1;
    let sign = 1;
    let compare = 0;
    isSafe = true;

    row.forEach((cell, j) => {
      if (!isSafe) return true;
      if (j === 0) {
        compare = cell;
      } else {
        if (j === 1) sign = Math.sign(compare - cell);
        const newSign = Math.sign(compare - cell);
        if (
          newSign === 0 ||
          newSign !== sign ||
          Math.abs(compare - cell) > 3 ||
          Math.abs(compare - cell) < 1
        ) {
          isSafe = false;
        }
        compare = cell;
      }
    });
  });

  console.log('Calcul partie 1 :');
  console.log(safe);
};

/// /////////////
// P2
/// /////////////
const part2 = (data) => {
  let safe = 0;
  let isSafe = false;

  data.forEach((row, i) => {
    if (isSafe) safe += 1;
    let sign = 1;
    let compare = 0;
    isSafe = false;

    for (let k = 0; k < row.length; k++) {
      let delSafe = true;

      const newRow = row.filter((_, j) => j !== k);

      newRow.forEach((cell, j) => {
        if (!delSafe) return true;
        if (j === 0) {
          compare = cell;
        } else {
          if (j === 1) sign = Math.sign(compare - cell);
          const newSign = Math.sign(compare - cell);
          if (
            newSign === 0 ||
            newSign !== sign ||
            Math.abs(compare - cell) > 3 ||
            Math.abs(compare - cell) < 1
          ) {
            delSafe = false;
          } else {
            compare = cell;
          }
        }
      });
      if (delSafe) {
        isSafe = true;
        break;
      }
    }
  });

  console.log('Calcul partie 2 :');
  console.log(safe);
};

readDataFile();
