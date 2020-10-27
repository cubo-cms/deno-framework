
import Core from './lib/Core.ts';
import Controller from './lib/Controller.ts';

let a = new Core({x:'x',y:23,z:[1,2,3]});
let b = new Core();


let d = new Controller();
await d.load('./application.json');

let e = new Controller();
await e.load('http://ip.jsontest.com/');

console.log(a);
console.log(b);

b.set('f',a.get('y'),48);

console.log(b);

let c = Core.create(Controller,{d:'d'},b);

console.log(c);

console.log(c instanceof Core);
console.log(c instanceof Controller);
console.log(b instanceof Controller);

console.log(d);
console.log(e);
