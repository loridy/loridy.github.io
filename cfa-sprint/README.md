# CFA Sprint Online (CFA Level I)

900 multiple-choice questions are included in `index.html`. The application stores practice results in the browser's localStorage.

## Publishing with GitHub Pages
Repository: `loridy/loridy.github.io`
Go to repository **Settings > Pages**.
Under **Build and deployment**, choose **Deploy from a branch**.
Choose branch **main**, folder **/(root)**, then Save.
The quiz is live at `http://835648.xyz/cfa-sprint/` (the repository has a `CNAME` that redirects `loridy.github.io` here). HTTPS for the custom domain is not working yet; enable/repair TLS via repository Pages settings and DNS before activating cloud authentication.
Page rendering and quiz submissions have been verified through a real browser. If an existing GitHub Pages source/workflow is configured, preserve it rather than overwriting.

## Important
- The website contains 900 practice questions, but the original answer-page scans and original question PDFs are not bundled in the public site. These are in the downloadable offline bundle from the ChatGPT conversation.
- Questions and answers in a public GitHub Pages repository are publicly retrievable. Don't publish materials unless you have rights to do so.
- Progress and mistakes use browser-local storage, so they **do not automatically synchronize** across devices. Use the website's export/import features to move progress between devices.
- `cloud-config.js`, `cloud-sync.js`, and `setup.sql` are unconfigured, optional future cloud-sync assets. No backend service has been connected and no user data is sent to one.
