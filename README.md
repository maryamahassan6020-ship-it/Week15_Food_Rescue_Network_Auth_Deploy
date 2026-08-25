# Week 15 — Food Rescue Network: Auth, Protected Routes & Deploy (starter)

Your final assignment. It's your Food Rescue board with the pieces of **auth** dropped in — a login page,
a signup page, and a profile page are already here. Your job is to make auth *work*, protect the routes,
and **deploy the app to the internet**.

Follow the **auth demo from class** (`auth-demo`) — the setup is identical, just on the Food Rescue board.

## Run it

```bash
npm install
npm run dev
```

The board works right away. The login/signup/profile pages are wired up but won't do anything until you
finish the store and the guards.

## Your job

### 1. Finish the auth store — `src/store/useAuthStore.js`

The state is done. Fill in the four actions (there's a TODO for each): `login`, `fetchMe`, `signup`,
`logout`. Use the DummyJSON auth API, exactly like the demo:

- **login** → `POST https://dummyjson.com/auth/login`, save the `accessToken` to `localStorage`.
- **fetchMe** → `GET https://dummyjson.com/auth/me` with an `Authorization: Bearer <token>` header.
- **signup** → `POST https://dummyjson.com/users/add`.
- **logout** → remove the token and clear the user.

Demo account: **emilys / emilyspass**.

### 2. Build the route guards — `PrivateRoute.jsx` and `PublicRoute.jsx`

These two files exist but are empty. Build them, following the demo:

- **PrivateRoute** — read the token from the store. No token → `<Navigate to="/login" replace />`.
  Otherwise render `<Outlet />`. (Locks the profile page.)
- **PublicRoute** — has a token → `<Navigate to="/profile" replace />`. Otherwise render `<Outlet />`.
  (Keeps logged-in users off the login/signup pages.)

### 3. Protect the routes — `src/App.jsx`

Import your two guards, then wrap the routes (there are TODO comments showing exactly where): `/login` and
`/signup` go inside `<PublicRoute>`, and `/profile` goes inside `<PrivateRoute>`.

### 4. Deploy to Vercel 🚀

Put your finished app online:

1. Push your project to a **GitHub** repository.
2. On **vercel.com**, choose **Add New → Project** and import that repo. Vercel detects Vite and builds it.
3. Add a **`vercel.json`** in the project root so refreshing a route (like `/profile`) doesn't 404:

   ```json
   { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
   ```
4. Redeploy, then open your **live URL** and test: log in, visit the profile, refresh the page.

## Done when

- You can log in (the token is saved) and the navbar shows Profile + Log out.
- Visiting `/profile` while logged out sends you to `/login` (PrivateRoute).
- Visiting `/login` while logged in sends you to `/profile` (PublicRoute).
- A refresh keeps you logged in.
- The app is **live at a Vercel URL**, and refreshing any page works.

## Submit

Submit **two** links: your **GitHub repo** and your **live Vercel URL**.
