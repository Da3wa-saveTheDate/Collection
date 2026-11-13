# Ajwaa — digital invitations

The storefront for the Ajwaa invitation collection. One page, one journey:
what it is → how it works → choose a design → prices → try your names on the 3D phone.

## Adding or changing a design

1. Put the design's folder in `public/<id>/` (it must open at `/<id>/`).
2. Add it to `src/data/templates.json`. Its `category` decides which invitation type
   (tab, price and WhatsApp order text) it belongs to — see `getSuggestedPackage` in `src/lib/order.ts`.
3. Optional: save a phone screenshot of the design as `thumb-sources/<id>.webp` to control its thumbnail.
4. Run `npm run thumbs` to rebuild the gallery thumbnails in `public/thumbs/`.

Prices live in `src/lib/order.ts`; the wording of each invitation type lives in `src/data/catalog.ts`.

## Checks

`npm run build`, then `npx vite preview --host 127.0.0.1 --port 4173 --strictPort` and, in another terminal,
`npm run test:gallery`, `npm run test:experience` and `node tests/hero-visuals.mjs`.
`npm run test:telemetry` and `npm run test:telemetry:browser` need no server.

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend enabling type-aware lint rules by installing `oxlint-tsgolint` and editing `.oxlintrc.json`:

```json
{
  "$schema": "./node_modules/oxlint/configuration_schema.json",
  "plugins": ["react", "typescript", "oxc"],
  "options": {
    "typeAware": true
  },
  "rules": {
    "react/rules-of-hooks": "error",
    "react/only-export-components": ["warn", { "allowConstantExport": true }]
  }
}
```

See the [Oxlint rules documentation](https://oxc.rs/docs/guide/usage/linter/rules) for the full list of rules and categories.
