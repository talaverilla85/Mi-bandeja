# Mi Bandeja 🍽️ — V5

Aplicación Next.js de menús escolares del CEIP Veinte de Enero, Gran Canaria.

Incluye 19 fechas lectivas de octubre de 2026, 10 modalidades, bandeja SVG ilustrada, selección persistente de menú, alérgenos, nutrición y recomendaciones orientativas para la cena.

## Desarrollo

`npm install` · `npm run check-data` · `npm run check-illustrations` · `npm run dev`

## Despliegue

Importa el repositorio en Vercel (framework Next.js, root `/`).

## Nuevos meses

El dibujo de los platos se genera a partir de los nombres. La extracción y carga automática de nuevos PDF todavía NO está implementada; incorpora un JSON revisado con `node scripts/merge-validated-month.mjs archivo-validado.json`. El importador de octubre es específico para ese archivo.

**Alérgenos**: esta web es orientativa y requiere validación del centro. Nunca se deben tomar decisiones de seguridad alimentaria basadas en las ilustraciones ni en datos extraídos automáticamente sin revisión.
