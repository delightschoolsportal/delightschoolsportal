# Delight Schools Portal
Run locally: `npm install` then `npm run dev`.
Deploy: push to `main` (GitHub repo Settings → Pages → Source: GitHub Actions).
Rules: paste `firestore.rules` into Firebase Console → Firestore → Rules → Publish.
First Director: Authentication → Add user; then Firestore → create `users/{uid}` with
fullName, role="director", section="all", branchId="all", accountStatus="active".
