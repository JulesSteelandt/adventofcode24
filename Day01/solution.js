import fs from 'fs/promises';

const readDataFile = async () => {
  try {
    const rawData = await fs.readFile('./data.txt', 'utf8');
    const lines = rawData.trim().split('\n');
    const data = lines.map(line => line.trim().split(/\s+/).map(Number));

    const list_1 = data.map(([a, b]) => a);
    const list_2 = data.map(([a, b]) => b);

    //1
    const sorted_1 = list_1.slice().sort((a, b) => a - b);
    const sorted_2 = list_2.slice().sort((a, b) => a - b);

    const result = () => {
      let sum = 0;
      for (let i = 0; i < sorted_1.length; i++) {
        sum += Math.abs(sorted_1[i] - sorted_2[i]);
      }
      return sum;
    };

    console.log('Calcul partie 1 :');
    console.log(result());

    //2

    let multi = 0;
    const occurrences = {};
    list_1.forEach((value) => {
      if (!(value in occurrences)) {
        const count = list_2.filter((val) => val === value).length;
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
