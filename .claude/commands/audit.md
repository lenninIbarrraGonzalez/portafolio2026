---
allowed-tools: Bash, Read
description: Ejecuta auditoría Lighthouse del sitio
---

Ejecuta una auditoría Lighthouse completa del portafolio.

## Pasos

1. Verifica que el servidor de desarrollo esté corriendo en localhost:3000
2. Si no está corriendo, inicia con `npm run dev` en background
3. Ejecuta lighthouse en http://localhost:3000
4. Analiza los resultados
5. Sugiere optimizaciones si alguna métrica < 90

## Comando Lighthouse

```bash
npx lighthouse http://localhost:3000 --output=json --output-path=./lighthouse-report.json --chrome-flags="--headless"
```

## Métricas Objetivo

- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90

## Análisis de Resultados

Después de ejecutar, reporta:
1. Score de cada categoría
2. Principales problemas encontrados
3. Recomendaciones específicas para mejorar
