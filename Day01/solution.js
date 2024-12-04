import fs from 'fs/promises';

const readDataFile = async () => {
  try {
    const rawData = await fs.readFile('./data.txt', 'utf8');
    const lines = rawData.trim().split('\n');
    const data = lines.map((line) => line.trim().split(/\s+/).map(Number));

    const listOne = data.map(([a, b]) => a);
    const listTwo = data.map(([a, b]) => b);

    // 1
    const sortedOne = listOne.slice().sort((a, b) => a - b);
    const sortedTwo = listTwo.slice().sort((a, b) => a - b);

    const result = () => {
      let sum = 0;
      sortedOne.forEach((value, i) => {
        sum += Math.abs(value - sortedTwo[i]);
      });
      return sum;
    };

    console.log('Calcul partie 1 :');
    console.log(result());

    // 2

    let multi = 0;
    const occurrences = {};
    listOne.forEach((value) => {
      if (!(value in occurrences)) {
        const count = listTwo.filter((val) => val === value).length;
        occurrences[value] = count;
      }
      multi += value * occurrences[value];
    });

    console.log('Calcul partie 2 :');
    console.log(multi);
  } catch (error) {
    console.error('Erreur lors de la lecture du fichier :', error);
  }
};

readDataFile();
