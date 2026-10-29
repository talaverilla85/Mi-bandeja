import fs from 'node:fs';
const db=JSON.parse(fs.readFileSync(new URL('../data/menus.json',import.meta.url)));
if (!Array.isArray(db.menuTypes) || !db.menuTypes.some(x=>x.id==='basal')) throw new Error('Falta menú basal');
const valid=Object.keys(db.days||{}).sort();
if (!valid.length) throw new Error('No hay días de menú');
const broken=[];
for(const date of valid){
 if(!/^\d{4}-\d{2}-\d{2}$/.test(date))broken.push('Fecha incorrecta: '+date);
 const day=db.days[date];
 for(const type of db.menuTypes){
  const m=day[type.id];
  if(!m?.first?.name||!m?.second?.name||!m?.nutrition) {broken.push(`${date} ${type.id}: datos incompletos`);continue;}
  for(const field of ['first','second','side','dessert','bread'])for(const id of m[field]?.allergens||[]){
   if(!Number.isInteger(id)||id<1||id>14)broken.push(`${date} ${type.id}: alérgeno inválido ${id}`);
  }
  for(const k of ['kcal','protein','carbs','fat']) if(!Number.isFinite(Number(m.nutrition[k])))broken.push(`${date} ${type.id}: ${k} no es numérico`);
 }
}
if(broken.length)throw new Error(broken.join('\n'));
console.log(`✓ ${valid.length} días · ${db.menuTypes.length} tipos · ${valid.length*db.menuTypes.length} menús con estructura válida`);
console.log('La validez de formato no confirma ingredientes ni alérgenos. Revisión por el comedor obligatoria.');
