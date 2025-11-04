import React, { useEffect, useMemo, useState } from 'react'
import { db } from '../lib.firebase'
import { doc, getDoc } from 'firebase/firestore'
import { createOrder } from '../lib.store'
import { formatSRD, waLink } from '../lib.util'

export default function ProductCard(){
  const id = window.location.hash.split(':')[1]
  const [product, setProduct] = useState(null)
  const [qty, setQty] = useState(1)
  const [customer, setCustomer] = useState({ name:'', phone:'', address:'' })
  const [sending, setSending] = useState(false)

  useEffect(()=>{
    (async ()=>{
      const snap = await getDoc(doc(db,'products', id))
      if (snap.exists()) setProduct({ id: snap.id, ...snap.data() })
    })().catch(console.error)
  },[id])

  const subtotaal = useMemo(()=> Number(product?.prijs_srd || 0) * (qty || 1), [product, qty])
  const bezorgkosten = 15
  const totaal = subtotaal + bezorgkosten

  const message = useMemo(()=>{
    if(!product) return ''
    return [
      'Hallo! Ik wil graag bestellen via SuriMart:',
      '',
      `Items:`,
      `- ${product.titel} × ${qty} — ${formatSRD(product.prijs_srd)}`,
      '',
      `Subtotaal: ${formatSRD(subtotaal)}`,
      `Bezorgkosten: ${formatSRD(bezorgkosten)}`,
      `Totaal: ${formatSRD(totaal)}`,
      `Bezorgadres: ${customer.address}`,
      `Gewenste tijd: vandaag`,
      `Naam & Tel: ${customer.name} | ${customer.phone}`,
      '',
      `Kunt u dit bevestigen? Dankjewel!`
    ].join('\n')
  },[product, qty, customer, subtotaal, totaal])

  const goWhatsApp = async () => {
    if(!product) return
    if(!customer.name || !customer.phone) {
      alert('Vul minimaal je naam en telefoonnummer in.')
      return
    }
    try{
      setSending(true)
      await createOrder({
        klant_naam: customer.name,
        telefoon: customer.phone,
        adres: customer.address,
        items: [{ product_id: product.id, titel: product.titel, qty, prijs_srd: product.prijs_srd }],
        subtotaal_srd: subtotaal,
        bezorgkosten_srd: bezorgkosten,
        totaal_srd: totaal,
        vendor_id: product.vendor_id,
        kanaal: 'whatsapp_pilot'
      })
      window.location.href = waLink(product.vendor_tel || '+5970000000', message)
    } finally { setSending(false) }
  }

  if (!product) return <div className="card">Product laden...</div>

  return (
    <div className="card space-y-3">
      <img src={product.foto_url || 'https://picsum.photos/seed/surimart/900/500'} alt="" className="w-full h-56 object-cover rounded-xl" />
      <div className="text-2xl font-bold">{product.titel}</div>
      <div className="text-slate-600">{product.categorie}</div>
      <div className="text-sky-700 font-bold">{formatSRD(product.prijs_srd)}</div>

      <div className="grid sm:grid-cols-3 gap-2">
        <label className="label">Aantal
          <input className="input" type="number" min="1" value={qty} onChange={e=>setQty(Math.max(1, Number(e.target.value)||1))} />
        </label>
        <label className="label">Naam
          <input className="input" value={customer.name} onChange={e=>setCustomer({...customer, name:e.target.value})} />
        </label>
        <label className="label">Telefoon
          <input className="input" value={customer.phone} onChange={e=>setCustomer({...customer, phone:e.target.value})} />
        </label>
      </div>
      <label className="label">Adres
        <input className="input" value={customer.address} onChange={e=>setCustomer({...customer, address:e.target.value})} />
      </label>

      <div className="rounded-xl bg-slate-50 p-3 text-sm text-slate-600">
        <div className="flex justify-between"><span>Subtotaal</span><span>{formatSRD(subtotaal)}</span></div>
        <div className="flex justify-between"><span>Bezorgkosten</span><span>{formatSRD(bezorgkosten)}</span></div>
        <div className="flex justify-between font-semibold text-slate-800"><span>Totaal</span><span>{formatSRD(totaal)}</span></div>
      </div>

      <button className="btn" disabled={sending} onClick={goWhatsApp}>
        {sending ? 'Bezig...' : 'Bestel via WhatsApp'}
      </button>
    </div>
  )
}
