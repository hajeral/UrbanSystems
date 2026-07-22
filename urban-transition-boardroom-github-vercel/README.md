# Urban Transition Boardroom

A deterministic executive-learning simulation built around geospatial urban intelligence, laser scanning and digital twins.

## What participants do

Three executive committees take Meridian City from system diagnosis through outcomes and SDGs, circular design, SCALEC assessment, governance, procurement, brownfield integration, data sovereignty, pilot learning and an operational stress event.

The runtime contains no AI. Choices update a transparent rules engine, dynamic risk register, programme-health indicators, stage gates and final assurance classification.

## Local verification

```bash
npm ci
npm test
npm run build
npm run dev
```

## Vercel deployment

This repository is intentionally flat: `app/` and `package.json` are at the repository root.

1. Push the contents of this folder to the root of a GitHub repository.
2. Import the repository in Vercel.
3. Leave **Root Directory** at `./`.
4. Leave Install, Build and Output commands on **automatic/default**.
5. Select Node.js **22.x** in Project Settings.
6. Deploy.

No environment variables or database are required for this Stage 1 classroom prototype. Progress is stored in each browser. For live multi-device facilitator monitoring, add a shared backend in Stage 2.
