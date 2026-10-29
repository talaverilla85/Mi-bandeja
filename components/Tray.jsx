import {makeTraySVG} from '@/lib/tray-svg';

/** 100% data-driven illustrated tray. The same reusable parts work for every
 * published date and for all adapted menus, including newly imported months.
 * Pictures are illustrative only; allergen information always comes from data.
 */
export default function Tray({meal,red,onSelect}){
  if(!meal)return null;
  const picture=makeTraySVG(meal.first?.name,[meal.second?.name,meal.side?.name].filter(Boolean).join(' con '),meal.dessert?.name,meal.bread?.name,red);
  const slots=[
    {id:'cup',label:'Bebida',dish:{name:'Agua',allergens:[],isWater:true}},
    {id:'first',label:'Primer plato',dish:meal.first},
    {id:'second',label:'Segundo plato',dish:meal.second},
    {id:'dessert',label:'Postre',dish:meal.dessert}
  ];
  return <div className="tray-stage illustration-stage">
    <div className="illustrated-tray-wrap">
      <div className="illustrated-tray" dangerouslySetInnerHTML={{__html:picture}}/>
      {slots.map(({id,label,dish})=><button key={id} type="button" className={`illustrated-hit illustrated-hit-${id}`} onClick={()=>onSelect(dish,label)} aria-label={`${label}: ${dish?.name||''}`}/>) }
    </div>
    <div className="tray-touch-caption">👆 Toca un compartimento para ver sus alérgenos</div>
  </div>
}
