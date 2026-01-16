---
allowed-tools: Read, Write, Edit, Glob, Bash
description: Cambia a una propuesta de estilo específica (1, 2 o 3)
argument-hint: <1|2|3>
---

Cambia el portafolio a la propuesta de estilo número $ARGUMENTS.

## Propuestas Disponibles

### Propuesta 1: Minimalista Elegante
- Fondo: #FAFAFA (light) / #0A0A0A (dark)
- Acento: #2563EB (azul profundo)
- Características: espacio blanco, tipografía limpia, animaciones sutiles fade-in

### Propuesta 2: Dark Futurista / Glassmorphism
- Fondo: #030712 con gradientes
- Acentos: #06B6D4 (cyan), #EC4899 (magenta), #8B5CF6 (violeta)
- Características: glassmorphism (backdrop-blur), glow effects, partículas

### Propuesta 3: Bento Grid Moderno
- Fondo: #F5F5F7 (light) / #1D1D1F (dark)
- Acentos: #FF6B35 (naranja), #10B981 (verde)
- Características: grid asimétrico, micro-interacciones, sombras suaves

## Archivos a Modificar

1. `src/app/globals.css` - Variables CSS del tema
2. Componentes específicos si necesitan estilos únicos

## Pasos

1. Lee la propuesta seleccionada
2. Actualiza globals.css con las variables de color
3. Ajusta las animaciones según el estilo
4. Verifica que dark mode funcione
5. Ejecuta `npm run build` para verificar
