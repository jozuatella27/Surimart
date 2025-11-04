export function formatSRD(n) {
  const v = Number(n || 0)
  return `SRD ${v.toLocaleString('nl-NL', { maximumFractionDigits: 0 })}`
}
export function phoneClean(tel) {
  return (tel || '').replace(/[^+\d]/g, '')
}
export function waLink(phone, text) {
  return `https://wa.me/${phoneClean(phone)}?text=${encodeURIComponent(text)}`
}
