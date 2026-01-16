---
allowed-tools: Read, Write, Glob
description: Crea un nuevo componente React para el portafolio
argument-hint: <ComponentName>
---

Crea un nuevo componente React llamado $ARGUMENTS en src/components/.

Sigue estas convenciones:
1. Usa TypeScript con interface para props
2. Incluye 'use client' si usa hooks o Framer Motion
3. Usa useTranslations de next-intl
4. Añade animación de entrada con Framer Motion usando las variantes de @/lib/animations
5. Exporta como named export
6. Usa los colores del tema (bg-background, text-foreground, etc.)
7. Implementa responsive design con breakpoints sm, md, lg

Plantilla base a seguir:

```tsx
'use client';

import { motion, useInView } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { fadeInUp, staggerContainer } from '@/lib/animations';

interface $ARGUMENTSProps {
  className?: string;
}

export function $ARGUMENTS({ className }: $ARGUMENTSProps) {
  const t = useTranslations('sectionName');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className={className}>
      {/* Implementación */}
    </section>
  );
}
```
