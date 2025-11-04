import React, { useEffect, useMemo, useState } from 'react'
import { listProducts } from '../lib.store'
import { formatSRD } from '../lib.util'

export default function Home(){
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState([])
  const [q, setQ] = useState('')
  const [cat, setCat] = useState('')
  const [sort, setSort] = useState('new')

  useEffect(()=>{
    (async ()=>{
      try{
        setLoading(true)
        const rows = await listProducts()
        setProducts(rows)
      } finally { setLoading(false) }
    })()
  },[])

  const cats = useMemo(() => Array.from(new Set(products.map(p=>p.categorie).filter(Boolean))), [products])

  const filtered = useMemo(() => {
    let arr = products
      .filter(p => p.actief !== false)
      .filter(p => !q || (p.titel||'').toLowerCase().includes(q.toLowerCase()))
      .filter(p => !cat || p.categorie === cat)

    if (sort === 'price_asc') arr = arr.slice().sort((a,b)=>Number(a.prijs_srd||0)-Number(b.prijs_srd||0))
    if (sort === 'price_desc') arr = arr.slice().sort((a,b)=>Number(b.prijs_srd||0)-Number(a.prijs_srd||0))
    return arr
  }, [products, q, cat, sort])

  return (
    <div className="space-y-4">
      <div className="card grid sm:grid-cols-3 gap-3">
        <input className="input" placeholder="Zoek product..." value={q} onChange={e=>setQ(e.target.value)} />
        <div className="flex flex-wrap gap-2">
          <button onClick={()=>setSort('new')} className={'chip ' + (sort==='new'?'chip-active':'')}>Nieuwste</button>
          <button onClick={()=>setSort('price_asc')} className={'chip ' + (sort==='price_asc'?'chip-active':'')}>Prijs ↑</button>
          <button onClick={()=>setSort('price_desc')} className={'chip ' + (sort==='price_desc'?'chip-active':'')}>Prijs ↓</button>
        </div>
        <div className="flex gap-2 overflow-x-auto">
          <button onClick={()=>setCat('')} className={'chip ' + (!cat?'chip-active':'')}>Alle</button>
          {cats.map(c => (
            <button key={c} onClick={()=>setCat(c)} className={'chip ' + (cat===c?'chip-active':'')}>{c}</button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({length:6}).map((_,i)=>(
            <div key={i} className="card space-y-2">
              <div className="skel h-40 w-full" />
              <div className="skel h-5 w-2/3" />
              <div className="skel h-4 w-1/3" />
              <div className="skel h-6 w-1/4" />
            </div>
          ))}
        </div>
      ) : filtered.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(p => (
            <div key={p.id} className="card">
              <img src={p.foto_url || 'https://picsum.photos/seed/surimart/600/400'} alt="" className="w-full h-40 object-cover rounded-xl" />
              <div className="mt-2 font-semibold">{p.titel}</div>
              <div className="text-slate-600 text-sm">{p.categorie}</div>
              <div className="mt-1 text-sky-700 font-bold">{formatSRD(p.prijs_srd)}</div>
              <a className="btn mt-3" href={`#product:${p.id}`}>Bekijk</a>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty">Geen producten gevonden.</div>
      )}
    </div>
  )
}
