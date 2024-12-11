const input = '3028 78 973951 5146801 5 0 23533 857'
const data = input.split(' ').map(Number);


const blink = (data, numberBlink) => {
  let stones = data;
  let calculated = new Map();

  const blinking = (stoneList, mapCalcul) => {
    const newStones = [];
    stoneList.forEach((element) => {
      const stringElement = element.toString();
      if (mapCalcul.has(element)) {
        const res = mapCalcul.get(element);
        if (Array.isArray(res)) {  
          newStones.push(...res);  
        } else {
          newStones.push(res);     
        }
      } else if (element === 0) {
        newStones.push(1);
        mapCalcul.set(element, 1);
      } else if (stringElement.length % 2 === 0) {
        const middle = Math.floor(stringElement.length / 2);
        const left = stringElement.slice(0, middle);
        const right = stringElement.slice(middle);
        newStones.push(Number(left));
        newStones.push(Number(right));
        mapCalcul.set(element, [Number(left), Number(right)]);
      } else {
        newStones.push(element * 2024);
        mapCalcul.set(element, element * 2024);
      }
    });
    return [newStones, mapCalcul];
  };

  let i = 0;
  while (i < numberBlink) {
    const res = blinking(stones, calculated);
    stones = res[0];
    calculated = res[1];
    i++;
  }
  return stones;
};

    // part1
    let Stones = blink(data, 25);

    console.log('Calcul partie 1 :');
    console.log(Stones.length);

    // part2 (pour l'instant ne marche pas, dépassement de capacité)
    Stones = blink(data, 75);

    console.log('Calcul partie 2 :');
    console.log(Stones.length);
  
