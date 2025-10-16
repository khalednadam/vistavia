import { calc, via, } from '../index.ts' 

const count = via(4);
const doubleCount = calc(() => count.v * 2);

const tripleCount = calc(() => doubleCount.v * 3);


console.log('doubleCount', doubleCount.v)
console.log('tripleCount', tripleCount.v)
