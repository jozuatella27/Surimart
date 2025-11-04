import React, { useState } from 'react'
import { createVendor } from '../lib.store'

export default function VendorForm(){
  const [f, setF] = useState({
    bedrijfsnaam:'', contact_naam:'', telefoon_whatsapp:'', email:'', adres:'', categorieen:'',
    levert:true, bezorggebied_km:10, levertijd_blokken:'10:00-14:00;17:00-21:00'
  })
  const [ok, setOk] = useState('')

  const submit = async (e)=>{
    e.preventDefault()
    if(!f.bedrijfsnaam || !f.contact_naam || !f.telefoon_whatsapp){
      alert('Vul minimaal bedrijfsnaam, contact naam en WhatsApp-nummer in.')
      return
    }
    const id = await createVendor(f)
    setOk(`Bedankt! Je aanmelding is ontvangen. Vendor ID: ${id}`)
  }

  return (
    <form onSubmit={submit} className="card space-y-3 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold">Aanmelding leverancier</h2>
      <input className="input" placeholder="Bedrijfsnaam *" value={f.bedrijfsnaam} onChange={e=>setF({...f, bedrijfsnaam:e.target.value})} required/>
      <input className="input" placeholder="Contact naam *" value={f.contact_naam} onChange={e=>setF({...f, contact_naam:e.target.value})} required/>
      <input className="input" placeholder="WhatsApp nummer (+597…)*" value={f.telefoon_whatsapp} onChange={e=>setF({...f, telefoon_whatsapp:e.target.value})} required/>
      <input className="input" placeholder="E-mail" value={f.email} onChange={e=>setF({...f, email:e.target.value})} />
      <input className="input" placeholder="Adres" value={f.adres} onChange={e=>setF({...f, adres:e.target.value})} />
      <input className="input" placeholder="Categorieën (gescheiden door ; )" value={f.categorieen} onChange={e=>setF({...f, categorieen:e.target.value})} />
      <div className="flex items-center gap-2">
        <input id="levert" type="checkbox" checked={f.levert} onChange={e=>setF({...f, levert:e.target.checked})} />
        <label htmlFor="levert">Levert aan huis</label>
      </div>
      <div className="grid sm:grid-cols-2 gap-2">
        <input className="input" type="number" min="1" placeholder="Bezorggebied in km" value={f.bezorggebied_km} onChange={e=>setF({...f, bezorggebied_km:Number(e.target.value)})} />
        <input className="input" placeholder="Levertijd blokken (bijv. 10:00-14:00;17:00-21:00)" value={f.levertijd_blokken} onChange={e=>setF({...f, levertijd_blokken:e.target.value})} />
      </div>
      <button className="btn" type="submit">Verstuur</button>
      {ok && <div className="text-green-700">{ok}</div>}
    </form>
  )
}
