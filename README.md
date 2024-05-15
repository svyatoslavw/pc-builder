<div align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" alt="logo" width="100" height="100" />

   <h1>PC Builder</h1>
  
  <p>
  (Next.js, @redux/toolkit, supabase)
  </p>
  
  <span>
  Constructor for creating your own PC at a good price.
  </span>
  <a href="https://pc-builder-v1.vercel.app/">check demo</a>
</div>

<table align="center">
    <tr>
        <td>
<a href="#"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" alt="Google" width="40" height="40" /></a>
        </td>
                                <td>
<a href="#"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="" width="40" height="40" /></a>
        </td>
                                <td>
<a href="#"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/supabase/supabase-original.svg" alt="" width="40" height="40" /></a>
        </td>
                                        <td>
<a href="#"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg" alt="" width="40" height="40" /></a>
        </td>
    </tr>
</table>

## :notebook_with_decorative_cover: Table of Contents

- [About the Project](#star2-about-the-project)
  - [Screenshots](#camera-screenshots)
  - [Technologies Stack](#space_invader-tech-stack)
- [Getting Started](#toolbox-getting-started)
  - [Environment Variables](#key-environment-variables)
  - [Installation](#gear-installation)
  - [Run Locally](#running-run-locally)

### :camera: Screenshots

<div align="center">
  <a href="#"><img src="https://github.com/svyatoslavw/pc-builder/blob/main/public/bg.png" alt="screenshot1" /></a><br>
  <a href="#"><img src="https://github.com/svyatoslavw/pc-builder/blob/main/public/bg2.png" alt="screenshot2" /></a><br>
</div>

### :space_invader: Tech Stack

<details>
  <summary>Client</summary>
  <ul>
    <li><a href="https://nextjs.org/">Next.js</a></li>
    <li><a href="https://redux-toolkit.js.org/">Redux</a></li>
    <li><a href="https://ui.shadcn.com/docs">Shadcn UI</a></li>
    <li><a href="https://tailwindcss.com/">TailwindCSS</a></li>
    <li><a href="https://zod.dev/">Zod</a></li>
  </ul>
</details>

<details>
<summary>Server</summary>
  <ul>
    <li><a href="https://supabase.com/">Supabase</a></li>
    <li><a href="https://dashboard.stripe.com/">Stripe</a></li>
  </ul>
</details>
<br />

## :toolbox: Getting Started

### :key: Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`APP_URL =`

`NEXT_PUBLIC_SUPABASE_URL =`
`NEXT_PUBLIC_SUPABASE_ANON_KEY =`
`NEXT_PRIVATE_SUPABASE_ADMIN =`

`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY =`
`STRIPE_SECRET_KEY =`
`STRIPE_ENDPOINT_SECRET =`

### :gear: Installation

Clone the project

```
git clone https://github.com/svyatoslavw/pc-builder.git
```

```
cd pc-builder
```

### :running: Run Locally

Install dependencies

```bash
  npm install
  # or
  yarn dev
  # or
  pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.
