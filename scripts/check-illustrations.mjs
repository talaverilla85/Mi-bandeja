import fs from 'node:fs';
import {visualKind,makeTraySVG} from '../lib/tray-svg.js';
const db=JSON.parse(fs.readFileSync(new URL('../data/menus.json',import.meta.url)));
let draws=0;const unclassified=[];
for(const [date,types] of Object.entries(db.days))for(const [type,meal] of Object.entries(types)){
 for(const dish of [meal.first,meal.second])if(visualKind(dish.name)==='other')unclassified.push(`${date} ${type}: ${dish.name}`);
 const svg=makeTraySVG(meal.first.name,[meal.second.name,meal.side?.name].filter(Boolean).join(' con '),meal.dessert?.name,meal.bread?.name,type!=='basal');
 if(!svg.startsWith('<svg')||!svg.endsWith('</svg>'))throw new Error(`SVG incorrecto: ${date} ${type}`);
 draws++;
}
if(unclassified.length)console.warn('Ilustraciones genéricas para:',unclassified.join(' | '));
console.log(`✓ ${draws} bandejas construibles sin generar fotografías`);
