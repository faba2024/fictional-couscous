import React, { useEffect, useState } from 'react';
import { Wallet, Plus, Search, Check, MessageCircle, Trash2, Pencil, Bell, Users, CircleDollarSign, CalendarDays, X } from 'lucide-react';
const brl = n => Number(n || 0).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const date = s => s ? new Date(s+'T12:00:00').toLocaleDateString('pt-BR') : '—';
const initial = [
 {id:1,name:'João Silva',phone:'77999990001',amount:150,due:'2026-11-10',time:'09:00',status:'pending'},
 {id:2,name:'Maria Oliveira',phone:'77999990002',amount:280,due:'2026-11-12',time:'10:00',status:'pending'},
 {id:3,name:'Carlos Santos',phone:'77999990003',amount:95,due:'2026-10-25',time:'09:00',status:'pending'}
];
export default function App(){
 const [items,setItems]=useState(()=>{try{return JSON.parse(localStorage.getItem('cf_items'))||initial}catch{return initial}});
 const [search,setSearch]=useState(''); const [show,setShow]=useState(false); const [edit,setEdit]=useState(null);
 const empty={name:'',phone:'',amount:'',due:'',time:'09:00'}; const [form,setForm]=useState(empty);
 useEffect(()=>localStorage.setItem('cf_items',JSON.stringify(items)),[items]);
 const pending=items.filter(x=>x.status==='pending'), paid=items.filter(x=>x.status==='paid');
 const overdue=pending.filter(x=>x.due<new Date().toISOString().slice(0,10));
 const filtered=items.filter(x=>(x.name+' '+x.phone).toLowerCase().includes(search.toLowerCase()));
 function openNew(){setEdit(null);setForm(empty);setShow(true)}
 function save(e){e.preventDefault();const row={...form,id:edit??Date.now(),amount:Number(form.amount),status:edit?items.find(x=>x.id===edit)?.status||'pending':'pending'};setItems(old=>edit?old.map(x=>x.id===edit?row:x):[row,...old]);setShow(false)}
 function paidNow(id){setItems(old=>old.map(x=>x.id===id?{...x,status:'paid',paidAt:new Date().toISOString()}:x))}
 function whats(x){const msg=encodeURIComponent('Olá, '+x.name+'! Lembramos que sua cobrança de '+brl(x.amount)+' vence em '+date(x.due)+'. Obrigado!');window.open('https://wa.me/55'+x.phone.replace(/\\D/g,'')+'?text='+msg,'_blank')}
 return <div className="app"><header><div className="brand"><span className="logo"><Wallet/></span><div><b>Cobrança Fácil</b><small>GESTÃO DE COBRANÇAS</small></div></div><span className="user">Minha empresa</span></header>
 <main><section className="intro"><div><p className="eyebrow">CONTROLE FINANCEIRO</p><h1>Visão geral</h1><p className="muted">Acompanhe seus clientes e mantenha suas cobranças em dia.</p></div><button className="primary" onClick={openNew}><Plus size={18}/> Novo cliente</button></section>
 <section className="stats"><article><Users/><small>Clientes cadastrados</small><strong>{items.length}</strong></article><article><Wallet/><small>Total a receber</small><strong>{brl(pending.reduce((a,x)=>a+x.amount,0))}</strong></article><article><CircleDollarSign/><small>Total recebido</small><strong>{brl(paid.reduce((a,x)=>a+x.amount,0))}</strong></article><article><CalendarDays/><small>Em atraso</small><strong>{overdue.length}</strong></article></section>
 <div className="notice"><Bell/><div><b>Conferência de pagamentos</b><p>Confira se o cliente pagou antes do vencimento. Ao confirmar, marque como pago para retirar dos pendentes.</p></div></div>
 <section className="listhead"><div><h2>Clientes e cobranças</h2><p className="muted">Seu histórico permanece salvo neste aparelho.</p></div><label className="search"><Search/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Buscar cliente..."/></label></section>
 <div className="tablebox">{filtered.length===0?<p className="empty">Nenhum cliente encontrado.</p>:<div className="table-scroll"><table><thead><tr><th>CLIENTE</th><th>VALOR</th><th>VENCIMENTO</th><th>STATUS</th><th>AÇÕES</th></tr></thead><tbody>{filtered.map(x=><tr key={x.id}><td><b>{x.name}</b><small>{x.phone}</small></td><td>{brl(x.amount)}</td><td>{date(x.due)}<small>{x.time||'09:00'}</small></td><td><span className={'pill '+x.status}>{x.status==='paid'?'Pago':x.due<new Date().toISOString().slice(0,10)?'Em atraso':'Pendente'}</span></td><td className="actions">{x.status==='pending'&&<button title="Abrir WhatsApp (envio manual)" onClick={()=>whats(x)}><MessageCircle/></button>}{x.status==='pending'&&<button title="Marcar como pago" onClick={()=>paidNow(x.id)}><Check/></button>}<button title="Editar" onClick={()=>{setEdit(x.id);setForm({name:x.name,phone:x.phone,amount:x.amount,due:x.due,time:x.time||'09:00'});setShow(true)}}><Pencil/></button><button title="Excluir" onClick={()=>{if(confirm('Excluir este cadastro?'))setItems(old=>old.filter(y=>y.id!==x.id))}}><Trash2/></button></td></tr>)}</tbody></table></div>}</div>
 <footer>© 2026 Cobrança Fácil · Organize hoje. Receba melhor.</footer></main>
 {show&&<div className="overlay" onClick={e=>e.target===e.currentTarget&&setShow(false)}><form className="modal" onSubmit={save}><div className="modalhead"><div><h2>{edit?'Editar cliente':'Novo cliente'}</h2><p>Preencha os dados da cobrança.</p></div><button type="button" className="close" onClick={()=>setShow(false)}><X/></button></div>
 <label>Nome do cliente<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Nome completo"/></label><label>WhatsApp<input required value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="DDD + número"/></label>
 <div className="two"><label>Valor (R$)<input required type="number" min="0.01" step="0.01" value={form.amount} onChange={e=>setForm({...form,amount:e.target.value})}/></label><label>Vencimento<input required type="date" value={form.due} onChange={e=>setForm({...form,due:e.target.value})}/></label></div>
 <label>Horário preferido<input type="time" value={form.time} onChange={e=>setForm({...form,time:e.target.value})}/></label><p className="hint">Nesta versão, o WhatsApp abre para envio manual. A automação será conectada numa próxima etapa.</p><div className="modalactions"><button type="button" className="secondary" onClick={()=>setShow(false)}>Cancelar</button><button className="primary"><Check/> Salvar</button></div></form></div>}
 </div>
}