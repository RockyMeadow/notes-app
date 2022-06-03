# Notes

A note taking application built as a submission for the [Fullstack Challenge](https://coderpush.slite.com/p/note/3DPDTNkdGE0gd-woDhk8LT/Full-Stack-Challenge-v2). An instance of the application has been deployed in [here](https://coderpush-todo.vercel.app/)

## Tech Stack

- Frontend:
  - Vue 3, Tyepscript, Tailwind
  - Supabase.js for HTTP and WebSocket clients

- Backend:
  - Supabase

## Finished features
 - You can add/edit/delete a note
 - Your notes on multiple tabs or windows are updated in realtime
 - Note upon editing should be autosaved

## Future improvements
 - Support notes management by user accounts

For further improvements, please check the Issues section.

## Local development

```
npm install
```

### Backend: start up local docker container
Requires installing [Supabase CLI](https://supabase.com/docs/reference/cli/installing-and-updating)

```
cd api/
supabase start
```

### Frontend: compiles and hot-reloads for development

Create a `.env.local` file in app/ that has following content, replaces env values by the url and anon key prompted earilier from Supabase CLI
```
VITE_SUPABASE_URL=YOUR_SUPABASE_URL
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

```
npm run dev -w app
```

### Frontend: Compiles and minifies for production

```
npm run build -w app
```

### Lints

```
npm run lint
```
