import { db } from './lib.firebase'
import {
  collection, getDocs, query, where, addDoc, serverTimestamp, doc, updateDoc
} from 'firebase/firestore'

export async function listProducts() {
  const col = collection(db, 'products')
  const q = query(col, where('actief', '!=', false))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

export async function createVendor(data) {
  const col = collection(db, 'vendors')
  const res = await addDoc(col, { ...data, status: 'pending', created_at: serverTimestamp() })
  return res.id
}

export async function approveVendor(vendorId) {
  await updateDoc(doc(db, 'vendors', vendorId), { status: 'approved' })
}

export async function listVendors(status='pending') {
  const col = collection(db, 'vendors')
  const q = query(col, where('status', '==', status))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

export async function createOrder(data) {
  const col = collection(db, 'orders')
  const res = await addDoc(col, { ...data, created_at: serverTimestamp(), status: 'nieuw' })
  return res.id
}
