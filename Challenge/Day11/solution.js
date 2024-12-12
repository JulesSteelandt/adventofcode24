const input = '3028 78 973951 5146801 5 0 23533 857'
const data = input.split(' ').map(Number);


/* 
3e essai, J'ai modifié la façon dont j'utilise la map pour optimiser au maximum les calculs 
en s'inspirant de la solution de personne sur le net
J'y étais presque. Dommage de ne pas avoir trouvé seul !
*/

const blink = (data, repeat) => {
  let total = data.length;
  const calculated = new Map(); 

  const blinking = (stone, repeat) => {
    const cacheKey = `${stone}-${repeat}`; 
    if (calculated.has(cacheKey)) {
      return calculated.get(cacheKey);
    }

    let result = 0;

    if (repeat > 0) {
      const stringElement = stone.toString();
      if (stone === 0) {
        result = blinking(1, repeat - 1);
      } else if (stringElement.length % 2 === 0) {
        const middle = Math.floor(stringElement.length / 2);
        const left = Number(stringElement.slice(0, middle));
        const right = Number(stringElement.slice(middle));
        result = 1 + blinking(left, repeat - 1) + blinking(right, repeat - 1); 
      } else {
        result = blinking(stone * 2024, repeat - 1);
      }
    }

    calculated.set(cacheKey, result);
    return result;
  };

  data.forEach((stone) => {
    total += blinking(stone, repeat);
  });

  return total;
};

// Part 1
let Stones = blink(data, 25);
console.log('Calcul partie 1 :', Stones);

// Part 2
Stones = blink(data, 75);
console.log('Calcul partie 2 :', Stones);



/*
Deuxieme essai, proche de la solution, mais je n'ai pas réussi à faire mieux
il fonctionne, mais il est trop lent pour les grands nombres (+20m sans résultat)

const blink = (data, repeat) => {
  let total = data.length;
  let calculated = new Map();

  const blinking = (stone, repeat) => {
    if (repeat > 0) {
      const stringElement = stone.toString();
      if (calculated.has(stone)) {
        const res = calculated.get(stone);
        if (Array.isArray(res)) {  
          total +=1;
          blinking(res[0], repeat-1); 
          blinking(res[1], repeat-1); 
        } else {
          blinking(res, repeat-1);   
        }
      }
      else if (stone === 0) {
        calculated.set(stone, 1);
        blinking(1, repeat-1);
      } else if (stringElement.length % 2 === 0) {
        const middle = Math.floor(stringElement.length / 2);
        const left = stringElement.slice(0, middle);
        const right = stringElement.slice(middle);
        calculated.set(stone, [Number(left), Number(right)]);
        total += 1;
        blinking(Number(left), repeat-1);
        blinking(Number(right), repeat-1);
      } else {
        calculated.set(stone, stone * 2024);
        blinking(stone * 2024, repeat-1);
      }
    }
  }


  data.forEach((stone) => {
     blinking(stone, repeat);
  });

  return total;

};
*/

/*
Premier essai, mais ne marche pas pour les grands nombres
On garde qd même pour la réflexion

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
    
    
    
    
    */
