# Lennin Ibarra - Portfolio

![Next.js](https://img.shields.io/badge/Next.js-16.1.3-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss)
![Tests](https://img.shields.io/badge/Tests-350%20passing-brightgreen?style=flat-square)
![Coverage](https://img.shields.io/badge/Coverage-92%25-brightgreen?style=flat-square)

Personal portfolio website for **Lennin Ibarra**, Senior Frontend Engineer. Built with Next.js 16, React 19, and TypeScript. Features bilingual support (Spanish/English), smooth animations, and a modern Bento Grid design.

## Features

- **Bilingual** - Full Spanish and English support with next-intl
- **Modern Design** - Apple-style Bento Grid layout with soft shadows and micro-interactions
- **Smooth Animations** - Scroll-triggered animations powered by Framer Motion
- **3D Elements** - Three.js integration for visual effects
- **Custom Cursor** - Interactive cursor with hover states
- **Magnetic Buttons** - Buttons that follow mouse movement
- **Smooth Scroll** - Lenis-powered smooth scrolling experience
- **Responsive** - Mobile-first design that works on all devices
- **SEO Optimized** - Meta tags, JSON-LD, sitemap, and robots.txt
- **92%+ Test Coverage** - Comprehensive test suite with Jest and RTL

## Tech Stack

| Category          | Technologies                                    |
| ----------------- | ----------------------------------------------- |
| **Framework**     | Next.js 16.1.3 (App Router)                     |
| **UI Library**    | React 19.2.3                                    |
| **Language**      | TypeScript 5                                    |
| **Styling**       | Tailwind CSS 4                                  |
| **Animations**    | Framer Motion 12.26                             |
| **3D Graphics**   | Three.js, @react-three/fiber, @react-three/drei |
| **Smooth Scroll** | Lenis 1.3                                       |
| **i18n**          | next-intl 4.7                                   |
| **Carousel**      | Embla Carousel 8.6                              |
| **Icons**         | Lucide React, React Icons                       |
| **Testing**       | Jest 30, React Testing Library, Playwright      |

## Quick Start

```bash
# Clone the repository
git clone https://github.com/lenninIbarrraGonzalez/portfolio2026.git

# Navigate to project directory
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command                 | Description                    |
| ----------------------- | ------------------------------ |
| `npm run dev`           | Start development server       |
| `npm run build`         | Create production build        |
| `npm start`             | Start production server        |
| `npm run lint`          | Run ESLint                     |
| `npm test`              | Run tests                      |
| `npm run test:watch`    | Run tests in watch mode        |
| `npm run test:coverage` | Run tests with coverage report |

## Project Structure

```
src/
├── app/
│   ├── [locale]/          # i18n routing (es, en)
│   │   ├── layout.tsx     # Root layout with metadata
│   │   └── page.tsx       # Home page
│   ├── globals.css        # Global styles & themes
│   ├── robots.ts          # SEO robots configuration
│   └── sitemap.ts         # SEO sitemap generation
│
├── components/
│   ├── Hero.tsx           # Hero section with typewriter
│   ├── About.tsx          # About section
│   ├── Experience.tsx     # Work experience timeline
│   ├── Education.tsx      # Education section
│   ├── Skills.tsx         # Skills grid
│   ├── ProjectsCarousel/  # Projects showcase
│   ├── Testimonials.tsx   # Testimonials carousel
│   ├── Contact.tsx        # Contact form
│   ├── ui/                # Reusable UI components
│   └── three/             # 3D components
│
├── lib/
│   ├── animations.ts      # Framer Motion variants
│   └── utils.ts           # Utility functions
│
├── i18n/                  # Internationalization config
├── messages/              # Translation files (es.json, en.json)
├── config/                # App configuration
└── __tests__/             # Test files
```

## Internationalization

The portfolio supports Spanish (default) and English. Translations are managed with `next-intl`.

**Usage in components:**

```tsx
// Client components
import { useTranslations } from "next-intl";

function MyComponent() {
  const t = useTranslations("section");
  return <h1>{t("title")}</h1>;
}
```

**Translation files location:**

- Spanish: `src/messages/es.json`
- English: `src/messages/en.json`

## Testing

Run the test suite:

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run in watch mode
npm run test:watch
```

**Coverage Report:**

- Statements: 92%
- Branches: 79%
- Functions: 93%
- Lines: 93%

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Deploy automatically

### Manual Build

```bash
npm run build
npm start
```

## Author

**Lennin Ibarra** - Senior Frontend Engineer

- Website: [lenninibarra.com](https://lenninibarra.netlify.app/)
- GitHub: [@lenninIbarrraGonzalez](https://github.com/lenninIbarrraGonzalez)
- LinkedIn: [lennin-geovanny-ibarra](https://www.linkedin.com/in/lennin-geovanny-ibarra/)
- Email: ing.lenninibarra@gmail.com

## License

This project is open source and available under the [MIT License](LICENSE).

---

Built with Next.js 16 and React 19
