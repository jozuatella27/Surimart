import React, { useEffect, useState } from 'react'
import Home from './Home'
import ProductCard from './ProductCard'
import VendorForm from './VendorForm'
import Admin from './Admin'

export default function App(){
  const [route, setRoute] = useState(window.location.hash || '#home')
  useEffect(()=>{
    const onHash = ()=> setRoute(window.location.hash || '#home')
    window.addEventListener('hashchange', onHash)
    return ()=> window.removeEventListener('hashchange', onHash)
  },[])

  let screen = <Home />
  if (route.startsWith('#product:')) screen = <ProductCard />
  if (route.startsWith('#vendor')) screen = <VendorForm />
  if (route.startsWith('#admin')) screen = <Admin />

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-4">
      <nav className="nav justify-between">
        <div className="flex items-center gap-3">
          <a href="#home" className="font-semibold">SuriMart</a>
          <a href="#vendor" className="link">Vendor Onboarding</a>
          <a href="#admin" className="link">Admin</a>
        </div>
        <div className="text-sm text-slate-500">© 2025 SuriMart — Pilot</div>
      </nav>
      {screen}
    </div>
  )
}
