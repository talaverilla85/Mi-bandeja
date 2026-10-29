/**
 * Merge already transcribed, reviewed month data into the published dataset.
 * This does NOT interpret new PDFs or decide allergen safety.
 * Usage: node scripts/merge-validated-month.mjs /path/to/approved-menu.json
 */
import fs from 'node:fs';
const input=process.argv[2];
if(!input)throw new Error('Especifica archivo JSON validado: node scripts/merge-validated-month.mjs <archivo.json>');
const path=new URL('../data/menus.json',import.meta.url);
const existing=JSON.parse(fs.readFileSync(path));
const incoming=JSON.parse(fs.readFileSync(input,'utf8'));
const types=existing.menuTypes.map(x=>x.id);
if(JSON.stringify(incoming.menuTypes.map(x=>x.id))!==JSON.stringify(types))throw new Error('Los tipos de menú no coinciden. Revisar manualmente.');
const overlaps=Object.keys(incoming.days).filter(date=>existing.days[date]);
if(overlaps.length)throw new Error('Fechas ya publicadas: '+overlaps.join(', '));
for(const [date,day] of Object.entries(incoming.days))for(const t of types){
 const m=day[t];if(!m?.first?.name||!m?.second?.name||!m?.nutrition)throw new Error(`Datos incompletos: ${date} ${t}`);
}
const merged={...existing,month:'varios',days:{...existing.days,...incoming.days},closedDates:[...new Set([...(existing.closedDates||[]),...(incoming.closedDates||[])])],reviewFlags:[...(existing.reviewFlags||[]),...(incoming.reviewFlags||[])],sources:[...new Set([...(existing.sources||[existing.source]),incoming.source].filter(Boolean))]};
fs.writeFileSync(path,JSON.stringify(merged,null,2)+'\n');
console.log('Añadidos',Object.keys(incoming.days).length,'días verificados en la entrada. Revise alérgenos antes de publicar.');
