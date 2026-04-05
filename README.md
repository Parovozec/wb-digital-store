# WB Digital Store

E-commerce catalog for digital goods with cart functionality. Built with Feature-Sliced Design (FSD) architecture.

## Stack

- **React 18** + **TypeScript** (strict)
- **Zustand** + persist — cart & product state
- **FSD architecture** — entities, widgets, app layers
- **Vite** — build tool

## Features

- Product catalog with category filtering and search
- Add to cart / remove / quantity management
- Cart persisted in localStorage
- Slide-in cart drawer with total calculation
- Responsive product grid with badges (new / sale / hot)
- Discount display with original price

## Architecture (FSD)

```
src/
├── app/              # App entry, providers
├── entities/
│   ├── product/      # Product model, types, UI card
│   └── cart/         # Cart model, store
├── widgets/
│   ├── catalog/      # Full catalog with filters
│   └── cart/         # Cart drawer widget
└── styles/           # Global CSS
```

## Run

```bash
npm install
npm run dev
```
