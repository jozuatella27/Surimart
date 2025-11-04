import React, { useEffect, useState } from 'react'
import { approveVendor, listVendors } from '../lib.store'

export default function Admin(){
  const [rows, setRows] = useState([])
  const load = async ()=> setRows(await listVendors('pending'))
  useEffect(()=>{ load() },[])

  const approve = async(id)=>{
    await approveVendor(id)
    await load()
  }

  return (
    <div className="card">
      <h2 className="text-xl font-bold mb-3">Pending vendors</h2>
      {!rows.length ? <div className="empty">Geen pending vendors.</div> : (
        <div className="space-y-2">
          {rows.map(v => (
            <div key={v.id} className="p-3 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <div className="font-semibold">{v.bedrijfsnaam} — {v.contact_naam}</div>
                <div className="text-sm text-slate-600">{v.telefoon_whatsapp} · {v.email}</div>
              </div>
              <button className="btn" onClick={()=>approve(v.id)}>Approve</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
