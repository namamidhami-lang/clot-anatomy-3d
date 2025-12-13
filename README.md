# Clot Anatomy 3D — Prototype

This repository is a minimal prototype demonstrating an interactive 3D anatomy viewer for showing blood clot locations and authoritative, cited symptom/risk information.

Important: This is an educational prototype and is NOT a diagnostic tool. All medical content has been sourced from public authoritative references and must still be reviewed by a qualified clinician before any real-world or patient-facing use.

## What's included (updated)
- 3D viewer (react-three-fiber) loads GLB vascular model per sex
- Clickable hotspots for clot locations (one per limb + pulmonary entry)
- Controls for sex, age, height, weight (updates BMI)
- Risk calculation driven by data in `data/clots.json` with source links
- Read-only (no backend)

## Medical sources used to populate data/clots.json
- Lower-limb DVT (NHS, Mayo Clinic, NHLBI):
  - https://www.nhs.uk/conditions/deep-vein-thrombosis-dvt/
  - https://www.mayoclinic.org/diseases-conditions/deep-vein-thrombosis/symptoms-causes/syc-20352557
  - https://www.nhlbi.nih.gov/health/deep-vein-thrombosis

- Upper-limb DVT (radiologyinfo, Thrombosis UK):
  - https://www.radiologyinfo.org/en/info/acs-upper-extremity-dvt
  - https://thrombosisuk.org/wp-content/uploads/2024/12/Upper-extremity-DVT.pdf

- Pulmonary embolism (NICE CKS, Mayo Clinic, American Lung Association):
  - https://cks.nice.org.uk/topics/pulmonary-embolism/
  - https://www.mayoclinic.org/diseases-conditions/pulmonary-embolism/symptoms-causes/syc-20354647
  - https://www.lung.org/lung-health-diseases/lung-disease-lookup/pulmonary-embolism/symptoms-diagnosis

- Risk factors (CDC, NICE, AHA, JAMA):
  - https://www.cdc.gov/blood-clots/risk-factors/index.html
  - https://cks.nice.org.uk/topics/deep-vein-thrombosis/background-information/risk-factors/
  - https://www.heart.org/en/health-topics/venous-thromboembolism/risk-factors-for-vte
  - https://jamanetwork.com/journals/jamacardiology/fullarticle/2720423

## 3D models (recommended sources)
I will add CC‑licensed GLB/GLTF models for male and female anatomy into `/public/models` shortly. Recommended sources (please verify license on each model before reuse):
- AnatomyTOOL (Open 3D Model) — CC BY-SA: https://anatomytool.org/open3dmodel
- Z-Anatomy / Sketchfab collections (filter by CC license): https://sketchfab.com/Z-Anatomy/collections/human-anatomy
- Open Anatomy Project / Open Anatomy Browser: https://www.openanatomy.org/

## How to run
1. Node 18+ installed
2. npm install
3. npm run dev
4. Open http://localhost:3000

## License & disclaimer
- Educational use only. Not medical advice.
- I will only add CC‑BY / CC‑BY‑SA / CC0 models to this repo.

## Next steps
- I have added authoritative citations to `data/clots.json`. I will now add CC‑licensed GLB models (male_vascular.glb and female_vascular.glb) found from AnatomyTOOL or Sketchfab and commit them to `/public/models`.
