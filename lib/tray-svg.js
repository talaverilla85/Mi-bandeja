/**
 * Mi Bandeja: deterministic, reusable SVG illustration system. No day-specific
 * generated images or inference of allergies from a picture.
 * Every day/type can be drawn from its dish names without a remote image API.
 * Illustrated components represent categories, not exact recipes or portions.
 */
const has=(s,re)=>re.test((s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase());
export function visualKind(name=''){
  if(has(name,/crema|pure|sopa|caldo|minestrone/))return 'soup';
  if(has(name,/lentejas|garbanzos|judias|alubias|potaje|berros/))return 'stew';
  if(has(name,/tortilla/))return 'egg';
  if(has(name,/pizza/))return 'pizza';
  if(has(name,/macarrones|pasta|espirales|espaguett?i|fideos/))return 'pasta';
  if(has(name,/arroz|paella|cuscus/))return 'rice';
  if(has(name,/merluza|dorado|atun|bacalao|pescado|sardinas/))return 'fish';
  if(has(name,/huevo/))return 'egg';
  if(has(name,/pollo|pavo|carne|cerdo|lomo|bondiola|hamburguesa|alb[oó]ndiga|chopsuey/))return 'meat';
  if(has(name,/ensalada|verduras|crudite|br[oó]coli/))return 'vegetables';
  return 'other';
}
const beanLocs=[[68,78],[104,84],[148,75],[187,85],[235,81],[260,109],[78,115],[122,120],[171,110],[213,125],[242,154],[79,154],[112,170],[164,154],[196,177],[146,192],[226,197],[92,194]];
const grainLocs=[[72,90],[110,82],[147,90],[186,89],[223,96],[261,111],[83,131],[121,125],[159,126],[202,132],[237,146],[95,166],[136,167],[175,164],[212,184],[160,199],[253,183],[109,199]];
const garnish = `<g fill="#3d9e63" opacity=".9"><ellipse cx="137" cy="115" rx="9" ry="4" transform="rotate(-30 137 115)"/><ellipse cx="151" cy="113" rx="9" ry="4" transform="rotate(32 151 113)"/><ellipse cx="160" cy="132" rx="6" ry="3"/></g>`;
function bowl(color,content=''){
 return `<ellipse cx="162" cy="132" rx="138" ry="96" fill="#174f73" opacity=".14"/><ellipse cx="160" cy="122" rx="138" ry="96" fill="url(#bowlRim)" stroke="#f9faf5" stroke-width="4"/><ellipse cx="160" cy="124" rx="121" ry="81" fill="${color}" stroke="#eae7df" stroke-width="3"/>${content}<ellipse cx="160" cy="122" rx="119" ry="79" fill="none" stroke="#fff6d9" opacity=".24" stroke-width="3"/>`;
}
function vegBits(){return `<g><rect x="83" y="101" width="30" height="24" rx="6" fill="#ed9441" transform="rotate(12 99 115)"/><rect x="215" y="104" width="27" height="23" rx="6" fill="#e5a052" transform="rotate(-15 229 114)"/><rect x="143" y="170" width="27" height="23" rx="7" fill="#e3c184"/><ellipse cx="114" cy="165" rx="16" ry="10" fill="#699e50"/><ellipse cx="193" cy="93" rx="14" ry="9" fill="#72a252"/></g>`}
function soup(name){
 const green=has(name,/calabacin|brocoli|puerro|acelga|berros/), orange=has(name,/zanahoria|calabaza/);
 const base=green?'#b8cb76':orange?'#eeb75f':'#d6bb7f';
 const noodle=has(name,/fideo|pollo|minestrone|arroz/);
 let details=noodle?`${grainLocs.map(([x,y],i)=>`<path d="M${x-8} ${y} q8 -11 17 0" fill="none" stroke="${i%2?'#f6dc82':'#bbd0a0'}" stroke-width="5" stroke-linecap="round"/>`).join('')}${vegBits()}`:`<g fill="#8cae64" opacity=".65">${grainLocs.slice(0,11).map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="${i%3+1}.5"/>`).join('')}</g>${garnish}`;
 return bowl(base,details);
}
function stew(name){
 const lentils=has(name,/lenteja/), chickpeas=has(name,/garbanzo/), peas=has(name,/alubia|judia/);
 const sauce=lentils?'#a97946':chickpeas?'#d2aa60':'#b88150';
 const beans=beanLocs.map(([x,y],i)=>lentils?`<g><ellipse cx="${x}" cy="${y}" rx="12" ry="8" fill="${i%2?'#98734b':'#bb935e'}"/><path d="M${x-3} ${y-2} q5 -4 8 -1" fill="none" stroke="#dac394" stroke-width="2"/></g>`:`<g><ellipse cx="${x}" cy="${y}" rx="${chickpeas?12:14}" ry="${chickpeas?11:10}" transform="rotate(${i*20} ${x} ${y})" fill="${chickpeas?(i%2?'#eed69a':'#dfc58a'):(i%2?'#b28c65':'#d7b183')}"/><ellipse cx="${x-3}" cy="${y-4}" rx="4" ry="2" fill="#fff1c7" opacity=".6"/></g>`).join('');
 return bowl(sauce,`${vegBits()}${beans}${garnish}`);
}
function pasta(name){
 const red=has(name,/tomate|bolo|napolitana|aurora/), cream=has(name,/nata|carbonara/), veggie=has(name,/calabacin/);
 const sauce=red?'#d56b45':cream?'#e9d09b':'#dfb568';
 const spirals=grainLocs.map(([x,y],i)=>`<g transform="translate(${x} ${y}) rotate(${i*37})"><path d="M-16 -5 Q-7 -14 0 -4 T15 -3 M-16 4 Q-7 -5 0 5 T15 6" fill="none" stroke="${i%3===0?'#f7c66a':'#e8a74f'}" stroke-width="10" stroke-linecap="round"/><path d="M-15 -8 Q-7 -11 0 -2 T14 -5" fill="none" stroke="#ffdf86" stroke-width="2"/></g>`).join('');
 const egg=has(name,/huevo/)?`<g>${[[113,111],[203,141],[155,176],[241,103]].map(([x,y])=>`<g><rect x="${x-15}" y="${y-10}" width="30" height="22" rx="6" fill="#fff4d6" stroke="#e2d6be" stroke-width="1.5" transform="rotate(12 ${x} ${y})"/><circle cx="${x+2}" cy="${y+1}" r="7" fill="#f2b543"/></g>`).join('')}</g>`:'';
 return `<ellipse cx="161" cy="173" rx="139" ry="61" fill="#27597b" opacity=".1"/><ellipse cx="163" cy="132" rx="139" ry="90" fill="${sauce}"/>${spirals}${egg}${garnish}${veggie?vegBits():''}`;
}
function rice(name){
 const orange=has(name,/paella|tomate|arroz con pollo/);
 const sauce=orange?'#dfac55':'#eddbac';
 return `<ellipse cx="161" cy="140" rx="143" ry="91" fill="${sauce}"/>${Array.from({length:65},(_,i)=>{const x=54+((i*79)%216),y=74+((i*31)%140);return `<ellipse cx="${x}" cy="${y}" rx="10" ry="4.2" transform="rotate(${i*39} ${x} ${y})" fill="${i%4===0?'#fff5cc':i%3===0?'#d6a858':'#f5d889'}"/>`}).join('')}${vegBits()}${has(name,/huevo/)?`<ellipse cx="169" cy="133" rx="41" ry="32" fill="#fff9e9"/><circle cx="173" cy="131" r="21" fill="#f5b539"/>`:''}`;
}
function vegetables(name){return `<ellipse cx="162" cy="142" rx="140" ry="78" fill="#7dac64"/>${Array.from({length:14},(_,i)=>{const x=65+((i*61)%190),y=85+((i*39)%100);return `<path d="M${x} ${y} Q${x-22} ${y-38} ${x+7} ${y-34} Q${x+33} ${y-9} ${x} ${y}" fill="${i%2?'#8fba6b':'#aed079'}" stroke="#6d9c5e" stroke-width="2"/>`}).join('')}${vegBits()}${grainLocs.slice(0,7).map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="${6+i%3}" fill="${i%2?'#d65d42':'#dd9b52'}"/>`).join('')}`}
function fish(name){
 const more=has(name,/papa|ensalada|verdura/), tuna=has(name,/atun/);
 return `<ellipse cx="166" cy="146" rx="138" ry="87" fill="#d1a360" opacity=".21"/>${more?vegetables('ensalada'):''}<g transform="rotate(-11 163 137)"><path d="M57 98 Q141 57 263 95 Q279 113 272 153 Q154 195 55 151 Q41 124 57 98" fill="${tuna?'#d2a78a':'#f7eed9'}" stroke="${tuna?'#ab775b':'#eadfc2'}" stroke-width="4"/><path d="M64 106 Q155 76 264 100" fill="none" stroke="#fff6de" stroke-width="8" opacity=".7"/>${[0,1,2,3].map(i=>`<path d="M${100+i*36} 95 q-22 28 -1 66" fill="none" stroke="${tuna?'#b57b61':'#dfcba3'}" stroke-width="3" opacity=".7"/>`).join('')}</g>${garnish}`;
}
function meat(name){
 const chicken=has(name,/pollo|pavo/), sauce=has(name,/salsa|fiesta|estofado|adobo/), stir=has(name,/chopsuey/);
 const bases=stir?vegetables('ensalada'):sauce?`<ellipse cx="159" cy="134" rx="139" ry="84" fill="#cf965a" opacity=".55"/>`:'';
 const coords=[[85,91,0],[153,102,-7],[226,107,13],[106,157,15],[183,168,-15],[247,158,7]];
 const pieces=coords.map(([x,y,r],i)=>`<g transform="translate(${x} ${y}) rotate(${r})"><path d="M-32 -17 Q-11 -31 18 -25 Q38 -8 28 15 Q4 30 -26 19 Q-40 2 -32 -17" fill="${chicken?(i%2?'#e8b17e':'#d89c63'):(i%2?'#bc774c':'#a96140')}" stroke="${chicken?'#c58c58':'#9c6241'}" stroke-width="3"/><path d="M-17 -15 q16 -9 32 -3" stroke="#f8d6a5" opacity=".8" stroke-width="5" fill="none" stroke-linecap="round"/></g>`).join('');
 return `${bases}${pieces}${has(name,/papa/)?`${[[79,162],[242,183],[147,77],[214,92]].map(([x,y])=>`<rect x="${x}" y="${y}" width="28" height="25" rx="7" fill="#edd39a" stroke="#d6b278" stroke-width="3"/>`).join('')}`:''}${garnish}`;
}
function egg(name){return `<ellipse cx="161" cy="142" rx="142" ry="83" fill="#e7c876"/><path d="M77 190 L119 73 Q232 68 254 143 L77 190" fill="#f0bd4b" stroke="#b97c30" stroke-width="7"/><path d="M122 89 Q194 80 227 142" fill="none" stroke="#f9db7c" stroke-width="10"/>${grainLocs.slice(0,11).map(([x,y],i)=>`<rect x="${x+18}" y="${y-8}" width="9" height="8" rx="3" fill="${i%3===0?'#b98d43':'#fce4a1'}" opacity=".8"/>`).join('')}${garnish}`}
function pizza(name){return `<ellipse cx="164" cy="133" rx="144" ry="85" fill="#c38754"/><ellipse cx="164" cy="129" rx="130" ry="76" fill="#ecc775"/><ellipse cx="164" cy="125" rx="116" ry="66" fill="#d6784b"/><ellipse cx="164" cy="125" rx="106" ry="59" fill="#f2e4aa" opacity=".75"/>${[[89,107],[142,154],[196,107],[234,152],[137,88]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="14" fill="#cf6b53" stroke="#b6593e" stroke-width="3"/>`).join('')}${garnish}`}
function other(){return `<ellipse cx="162" cy="140" rx="130" ry="88" fill="#f0d8ac"/><path d="M79 152 Q148 79 248 141" fill="none" stroke="#dda66d" stroke-width="22" stroke-linecap="round"/>${vegBits()}`}
export function dishSVG(name){
 switch(visualKind(name)){
  case 'soup':return soup(name);
  case 'stew':return stew(name);
  case 'pasta':return pasta(name);
  case 'rice':return rice(name);
  case 'vegetables':return vegetables(name);
  case 'fish':return fish(name);
  case 'meat':return meat(name);
  case 'egg':return egg(name);
  case 'pizza':return pizza(name);
  default:return other();
 }
}
function water(){return `<ellipse cx="205" cy="279" rx="94" ry="19" fill="#235e88" opacity=".22"/><path d="M124 109 L143 259 Q205 295 266 259 L287 109" fill="url(#glass)" stroke="#e7faff" stroke-width="9" opacity=".89"/><ellipse cx="205" cy="112" rx="83" ry="27" fill="#c9f1ff" fill-opacity=".8" stroke="#edfaff" stroke-width="8"/><path d="M140 190 Q202 216 269 188" fill="none" stroke="#fff" stroke-width="5" opacity=".72"/><path d="M164 130 L176 252" stroke="white" stroke-width="9" opacity=".33"/>`}
function dessert(name='',bread=''){
 let part=has(name,/yogur/)?`<path d="M69 98 H156 L143 212 Q110 236 78 212 Z" fill="#f6f6f1" stroke="#c8d7e2" stroke-width="6"/><ellipse cx="113" cy="98" rx="48" ry="12" fill="#fffdf5" stroke="#dae3e8" stroke-width="6"/><path d="M88 99 q25 21 49 0" fill="none" stroke="#e8e9df" stroke-width="5"/>`:`<path d="M67 155 C42 96 87 65 119 87 C153 57 196 94 171 162 C141 218 95 213 67 155" fill="url(#apple)" stroke="#679845" stroke-width="5"/><path d="M119 91 q4 -21 15 -29" fill="none" stroke="#70553b" stroke-width="6" stroke-linecap="round"/><ellipse cx="144" cy="65" rx="22" ry="10" fill="#4e9e59" transform="rotate(-22 144 65)"/>`;
 if(bread)part+=`<g transform="translate(171 143) rotate(-13)"><path d="M0 28 Q36 -21 106 -10 Q134 30 107 72 H2 Q-10 58 0 28" fill="#c8864f" stroke="#99653c" stroke-width="5"/><path d="M12 30 Q43 -5 101 0 Q119 28 99 61 H13 Z" fill="#f6ddb2"/>${[[25,33],[52,19],[81,41],[46,47],[93,17]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="5" ry="3" fill="#d9b787"/>`).join('')}</g>`;
 return `<ellipse cx="160" cy="224" rx="126" ry="15" fill="#235e88" opacity=".14"/>${part}`;
}
export function makeTraySVG(firstName='',secondName='',dessertName='Fruta',breadName='Pan',red=false){
 const light=red?'#ee989b':'#b5e1ff';const dark=red?'#bb4d58':'#5a9cdb';
 const first=dishSVG(firstName),second=dishSVG(secondName);
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 680" role="img" aria-label="Bandeja ilustrada del menú. Ilustraciones orientativas, consulta los nombres de cada plato para conocer el contenido." style="width:100%;height:auto;display:block">
 <defs>
 <linearGradient id="trayBase" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${light}"/><stop offset=".49" stop-color="${red?'#e98689':'#83beef'}"/><stop offset="1" stop-color="${dark}"/></linearGradient>
 <linearGradient id="trayWell" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${red?'#b84d55':'#5c99cc'}"/><stop offset=".4" stop-color="${red?'#db797f':'#88bfeb'}"/><stop offset="1" stop-color="${red?'#f09ca0':'#b8e0fa'}"/></linearGradient>
 <linearGradient id="bowlRim" x1="0" y1="0" x2=".8" y2="1"><stop stop-color="#fcfffc"/><stop offset=".65" stop-color="#f2f0e9"/><stop offset="1" stop-color="#cfcdd0"/></linearGradient>
 <linearGradient id="glass" x1="0" y1="0" x2="1" y2=".6"><stop stop-color="#ffffff" stop-opacity=".3"/><stop offset=".4" stop-color="#d8faff" stop-opacity=".75"/><stop offset="1" stop-color="#f6ffff" stop-opacity=".24"/></linearGradient>
 <linearGradient id="steel" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#ffffff"/><stop offset=".55" stop-color="#8da6b2"/><stop offset="1" stop-color="#f3f8fb"/></linearGradient>
 <linearGradient id="apple" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#d8ef72"/><stop offset=".65" stop-color="#a5c954"/><stop offset="1" stop-color="#7dac46"/></linearGradient>
 <filter id="trayshadow" x="-30%" y="-30%" width="160%" height="160%"><feDropShadow dx="0" dy="12" stdDeviation="14" flood-color="#3e6f95" flood-opacity=".21"/></filter>
 <filter id="innerShadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#235581" flood-opacity=".14"/></filter>
 <clipPath id="firstClip"><path d="M487 63 H878 Q946 63 946 132 V326 Q946 391 880 391 H774 Q716 390 656 328 L467 128 Q427 63 487 63Z"/></clipPath>
 <clipPath id="secondClip"><path d="M121 327 H311 Q378 327 433 388 L611 548 Q654 624 582 624 H120 Q55 624 55 556 V397 Q55 327 121 327Z"/></clipPath>
 </defs>
 <rect x="18" y="20" width="968" height="642" rx="84" fill="url(#trayBase)" filter="url(#trayshadow)"/>
 <rect x="31" y="32" width="942" height="616" rx="75" fill="none" stroke="#edfaff" stroke-width="9" opacity=".77"/>
 <rect x="61" y="65" width="318" height="243" rx="62" fill="url(#trayWell)" stroke="#c9e9fc" stroke-width="9" filter="url(#innerShadow)"/>
 <path d="M487 63 H878 Q946 63 946 132 V326 Q946 391 880 391 H774 Q716 390 656 328 L467 128 Q427 63 487 63Z" fill="url(#trayWell)" stroke="#d4f0ff" stroke-width="9"/>
 <path d="M121 327 H311 Q378 327 433 388 L611 548 Q654 624 582 624 H120 Q55 624 55 556 V397 Q55 327 121 327Z" fill="url(#trayWell)" stroke="#d4f0ff" stroke-width="9"/>
 <rect x="706" y="413" width="240" height="215" rx="57" fill="url(#trayWell)" stroke="#d4f0ff" stroke-width="9"/>
 <g>${water()}</g>
 <g clip-path="url(#firstClip)"><g transform="translate(510 101) scale(1.17 1.10)">${first}</g></g>
 <g clip-path="url(#secondClip)"><g transform="translate(125 356) scale(1.35 1.03)">${second}</g></g>
 <g transform="translate(688 408) scale(.83 .79)">${dessert(dessertName,breadName)}</g>
 <g transform="translate(493 367) rotate(-41)">
 <rect x="-32" y="-195" width="167" height="388" rx="14" fill="#f9fdff" opacity=".75"/>
 <g fill="url(#steel)" stroke="#788e9a" stroke-width="3"><ellipse cx="13" cy="-125" rx="25" ry="52"/><rect x="6" y="-100" width="14" height="276" rx="7"/><rect x="73" y="-105" width="13" height="281" rx="6"/><path d="M58 -165 v56 q0 15 22 15 q22 0 22 -15 v-56" fill="none" stroke-width="12"/></g>
 <path d="M62 -182 v70 M75 -182 v70 M88 -182 v70 M101 -182 v70" fill="none" stroke="#8799a3" stroke-width="7" stroke-linecap="round"/>
 </g>
 </svg>`;
}
/** Standalone illustration for the detail dialog and reusable dish cards. */
export function makeDishSVG(name=''){
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" role="img" aria-label="Ilustración orientativa del plato" style="display:block;width:100%;height:100%"><defs><linearGradient id="bowlRim" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff"/><stop offset="1" stop-color="#dbdbe0"/></linearGradient></defs>${dishSVG(name)}</svg>`;
}
