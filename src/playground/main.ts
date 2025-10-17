import { calc, effect, mesh, via } from '../index.ts' 

const count = via(4);
const doubleCount = calc(() => count.v * 2);

const item = mesh({ name: 'item', price: 10 });

const tripleCount = calc(() => doubleCount.v * 3);

effect(() => {
    console.log('item', item)
})

// console.log('item', item.price)
// console.log('doubleCount', doubleCount.v)
item.price = 20;

// console.log('tripleCount', tripleCount.v)
