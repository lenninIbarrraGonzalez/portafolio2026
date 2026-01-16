---
name: framer-animations
description: Skill para crear animaciones profesionales con Framer Motion. Úsalo cuando necesites añadir animaciones de entrada, hover, scroll o gestures a componentes React.
allowed-tools: Read, Write, Edit
---

# Framer Motion Animations Skill

## Cuándo usar este skill

- Añadir animaciones de entrada a secciones
- Crear efectos hover interactivos
- Implementar animaciones de scroll (parallax, reveal)
- Añadir gestures (drag, tap, pan)
- Crear transiciones de página

## Variantes Predefinidas del Proyecto

El proyecto tiene variantes predefinidas en `src/lib/animations.ts`:

```tsx
import { fadeInUp, fadeIn, slideInFromLeft, slideInFromRight, scaleIn, staggerContainer, staggerContainerSlow, staggerContainerFast } from '@/lib/animations';
```

### fadeInUp
Entrada desde abajo con fade - ideal para textos y cards
```tsx
<motion.div variants={fadeInUp}>Contenido</motion.div>
```

### staggerContainer
Container que anima hijos con delay escalonado
```tsx
<motion.div variants={staggerContainer} initial="hidden" animate="visible">
  <motion.div variants={fadeInUp}>Item 1</motion.div>
  <motion.div variants={fadeInUp}>Item 2</motion.div>
</motion.div>
```

## Scroll Animations con useInView

```tsx
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

function Section() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      Contenido
    </motion.div>
  );
}
```

## Hover y Tap Animations

```tsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Click me
</motion.button>

// Con elevación
<motion.div
  whileHover={{ y: -5, transition: { duration: 0.2 } }}
>
  Card content
</motion.div>
```

## Respeta prefers-reduced-motion

```tsx
import { useReducedMotion } from 'framer-motion';

function AnimatedComponent() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      animate={{ x: shouldReduceMotion ? 0 : 100 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
    >
      Contenido
    </motion.div>
  );
}
```

## Animaciones por Propuesta de Estilo

### Propuesta 1 (Minimalista)
- Animaciones sutiles, duraciones 0.3-0.5s
- Solo fadeInUp y stagger
- Sin efectos 3D
- Easing suave: [0.25, 0.46, 0.45, 0.94]

### Propuesta 2 (Dark Futurista)
- Animaciones elaboradas, duraciones 0.5-0.8s
- Rotaciones 3D en hover: `rotateX`, `rotateY`
- Efectos de glow con box-shadow animado
- Partículas flotantes con `animate={{ y: [0, -20, 0] }}`

### Propuesta 3 (Bento Grid)
- Micro-interacciones en cada card
- Elevación en hover: `y: -10` con sombra aumentada
- Iconos animados: `rotate`, `bounce`
- Count up para números con `useSpring`

## Layout Animations

```tsx
<motion.div layout>
  {items.map(item => (
    <motion.div key={item.id} layout>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

## Exit Animations con AnimatePresence

```tsx
import { AnimatePresence } from 'framer-motion';

<AnimatePresence>
  {isVisible && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      Contenido
    </motion.div>
  )}
</AnimatePresence>
```
