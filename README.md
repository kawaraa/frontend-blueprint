# frontend-blueprint Source Code folders and files structure

Structuring the folders and files in your frontend project is crucial for maintaining a clean and organized codebase. While there's no one-size-fits-all UI framework solution, a well-thought-out structure makes it easier for developers to understand, maintain, and scale the application. Here's a common approach for structuring a only the reusable components.

### This project will following the Next.js App Router version with the following file structure:

- **app:**
  - The pages placeholder.
- **locale:**
  - For UI translation JSON files.
- **content:**
  - For static blogs and public documentations JSON file.
- **doc:**
  - Project Codebase-related documentations for contributors.
- **public:**
  - For the public files like logos background images `service-worker.js`.
- **services:** For outside related operations like calling a service outside the app like a payment service provider.
- **util:** Utility functions that can be used across the application such formatter or validators or (Input validation logic)

## HTML5 semantic elements

HTML5 has several semantic elements that define the different parts of a web page:

- `<header>` Defines a header for a document or a section
- `<nav>` Defines a set of navigation links
- `<section>` Defines a section in a document
- `<article>` Defines independent, self-contained content
- `<aside>` Defines content aside from the content (like a sidebar)
- `<footer>` Defines a footer for a document or a section
- `<details>` Defines additional details that the user can open and close on demand
- `<summary>` Defines a heading for the `<details>` element

You can read more about semantic elements in our HTML Semantics chapter on [w3schools](https://www.w3schools.com/html/html5_semantic_elements.asp)

### Theme colors:

#### Light:

- Background (bg): `white` Or `neutral-50`
- Card background (cbg): `#fafafa` / `zinc-50` or `#e8e6e6`
- Text and focused border (t): `#414141` / `slate-700`

#### Dark:

- Background (dbg): `black` Or `#121212` / `gray-950`
- Card background (dcbg): `#272727` / `zinc-800` or `neutral-900`
- Text and focused border (dt): `#dcd9d9` / `gray-300`

#### Shared:

- primary color (pc): `Choose the primary color of the theme`
- Error (red): `#f55c4a` / `red-400`
- Success (Green): `#a1c517` / `lime-500`
- Warning (Yellow):`#fdc902` / `yellow-400`
- Borders, lines and dividers (gray): `#999997` / `gray-500`
- Hover effect (h): `#0000001a`
- Links and actions (Blue): `#47A5de` / `blue-500` Or `cyan-400`

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
