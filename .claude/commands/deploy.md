---
allowed-tools: Bash
description: Despliega el portafolio a Vercel
argument-hint: [--prod]
---

Despliega el portafolio a Vercel.

## Comandos

```bash
# Preview deploy (por defecto)
vercel

# Production deploy (si se pasa --prod)
vercel --prod
```

## Argumento: $ARGUMENTS

Si el argumento contiene `--prod`, ejecuta deploy de producción.
De lo contrario, ejecuta preview deploy.

## Pasos

1. Verifica que exista vercel.json o configuración válida
2. Ejecuta el comando de deploy correspondiente
3. Espera a que termine el deploy
4. Muestra la URL del deploy al finalizar

## Notas

- Los preview deploys generan URLs únicas para cada commit
- El production deploy actualiza el dominio principal
- Asegúrate de que el proyecto esté vinculado a Vercel
