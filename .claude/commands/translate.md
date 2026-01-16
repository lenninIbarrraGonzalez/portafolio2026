---
allowed-tools: Read, Write, Edit
description: Agrega o actualiza traducciones en español e inglés
argument-hint: <section.key> "<español>" "<english>"
---

Agrega la traducción especificada: $ARGUMENTS

## Archivos de Traducción

- `src/messages/es.json` - Español
- `src/messages/en.json` - Inglés

## Formato de Argumento

```
section.key "texto en español" "text in english"
```

## Ejemplo

```
hero.newButton "Descargar CV" "Download CV"
```

## Instrucciones

1. Parsea el argumento para extraer la clave y los valores
2. Lee ambos archivos de traducción
3. Agrega o actualiza la clave en la estructura anidada
4. Guarda ambos archivos
5. Verifica que el JSON sea válido

## Reglas

- Mantén la estructura anidada consistente
- No modifiques otras traducciones
- Usa traducciones naturales, no literales
- Asegúrate de que las claves sean camelCase
