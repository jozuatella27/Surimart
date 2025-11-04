# SuriMart Starter (ZIP)
Vite + React + Tailwind + Firebase (Firestore) + PWA.

## Snel starten (Windows/PowerShell)
1. Pak de ZIP uit naar bijv. `C:\Projects\surimart`
2. Open die map in VS Code
3. Voer uit:
```powershell
npm install
npm run dev
```
4. Firestore vullen (in Firebase Console):
   - Collection: `products`
   - Doc fields: 
     - `titel` (string) — bijv. "Verse tomaten"
     - `prijs_srd` (number) — 45
     - `categorie` (string) — "Groenten & Fruit"
     - `foto_url` (string) — "https://picsum.photos/seed/tomaat/600"
     - `vendor_id` (string) — "vendor1"
     - `vendor_tel` (string) — "+5978999999"
     - `actief` (boolean) — true

5. Build/Deploy (optioneel via GitHub Actions):
   - `npm run build`
   - `firebase init hosting:github` (public=dist, SPA=yes, build=`npm ci && npm run build`)
