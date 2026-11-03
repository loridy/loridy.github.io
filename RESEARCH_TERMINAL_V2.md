# Research Terminal V2 — editorial and deployment guide

## What changed
- Static research portfolio replaces a student-style résumé landing page.
- GPA and volatile "months of experience" counters are removed.
- Research / Investment Ideas / Prototypes / About have dedicated navigation.
- Two public methodology articles are clearly labeled **Research Design**, not completed backtests.
- Prototypes distinguish public repositories, private high-level work, live demo and product concepts.
- Dark and light modes follow OS preference on first visit, with a persisted manual toggle.
- Old Notes route stays accessible, pointing to Research; placeholder index is emptied.
- No new frontend dependencies; CFA Sprint remains untouched.

## Publishing content
1. Add carefully reviewed, public-only articles as HTML under `articles/`; link them from `research.html` and `index.html`.
2. Change research status from Research Design only after real data and methods are reproducibly audited.
3. For dated ideas, record thesis, original timestamp, horizon, expected return drivers, specific risks, subsequent updates and outcome in `ideas.html`.
4. For prototypes, include status, problem, core workflow, limitations and optional live/demo links; never include employer/client/bank confidential information.

## Outstanding deployment blocker: HTTPS
The custom domain is `835648.xyz`. Public checks on 2026-11-03 showed HTTP works but HTTPS connection failed; the GitHub Pages hostname redirected to HTTP. This is **not fixed** by changing the theme or HTML.
- Confirm authoritative DNS records for the apex domain point to the documented GitHub Pages IP addresses (do not guess them; use current official GitHub documentation).
- In repo Settings → Pages, check the custom domain, certificate state and **Enforce HTTPS** control.
- Remove incompatible/proxy DNS rules and review CAA records if certificate issuance fails.
- Only enable login, OAuth or cloud-sync on `cfa-sprint/` after functional HTTPS and certificate checks.
- Recheck `https://835648.xyz`, `https://loridy.github.io` redirect behavior, TLS and mixed content using a browser after GitHub reports certificate ready.
Official guidance: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/securing-your-github-pages-site-with-https

## Verification checklist before merge
- [ ] Confirm nav and article links on a static webserver.
- [ ] Confirm theme switch from light and dark, persistence and OS initial preference.
- [ ] Inspect narrow/mobile breakpoints, contrast and keyboard navigation.
- [ ] Ensure GPA and outdated career labels are absent.
- [ ] Verify articles remain labeled protocol without invented empirical results.
- [ ] Smoke-test the untouched `cfa-sprint/` path and functionality.
- [ ] Fix custom domain HTTPS separately (repo settings and DNS).
- [ ] Review public materials for confidentiality and publication rights, including the existing CFA exam questions.

## Migration notes
`notes.html` remains as a legacy landing page. It deliberately does not redirect automatically, to avoid surprising bookmarked visitors. `content/notes.json` contains no placeholder entries. `notes.js` no longer renders unsafe HTML from untrusted metadata. Existing archival and CFA Sprint files remain on disk.

## Editorial update (2026-11-03)
Three evidence-based case study pages were added under `projects/`, sourced from the publicly accessible Market Recap and HKU-FYP documentation. The AI Research Workbench is explicitly labeled as a product concept rather than shipped software. `research.html` distinguishes existing methodological content from an unverified multi-asset research agenda.

The existing CFA Sprint application is retained at its original URL, but is excluded from featured work pending confirmation of distribution rights for the published question bank. A removed homepage link does not remove public access to the underlying quiz.
