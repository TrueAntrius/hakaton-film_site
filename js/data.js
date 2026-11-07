// Справочник способов оплаты (UI) и геометрия зала. Остальные данные приходят из БД через /api/bootstrap
const PAYS=[{id:"mir",name:"Карта «Мир»"},{id:"sbp",name:"СБП"},{id:"sber",name:"SberPay"},{id:"ymoney",name:"ЮMoney"},{id:"tpay",name:"T-Pay"}];
const seatPos=(c,r,i)=>{const n=c.rows[r],sofa=r==c.rows.length-1,x=(i-(n-1)/2)*(sofa?1.75:.88);return[x,r*.32,4+r*1.15+x*x*.012]};
