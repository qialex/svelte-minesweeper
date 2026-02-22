# Minesweeper

A classic Minesweeper game built with **Svelte 5** and **SvelteKit**.

🎮 [Play the Game](https://qialex.github.io/svelte-minesweeper/) | 📖 [Storybook](https://qialex.github.io/svelte-minesweeper/storybook/)

## Features

- 🎮 **Classic gameplay** - 8x8 grid with 10 mines
- 🛡️ **Safe first click** - Mines are placed after your first click, ensuring you never hit a mine on the first move
- ⏱️ **Timer** - Starts on first click, displays elapsed time
- 🚩 **Flag counter** - Shows remaining mines to find
- 😊 **Expressive face** - Reacts to your actions (surprised when clicking, sad when lost, cool when won)
- 🌓 **Dark mode** - Automatic theme based on system preference
- 📱 **Responsive** - Works on desktop and mobile

## Getting Started

Install dependencies:

```sh
bun install
```

Start the development server:

```sh
bun run dev
```

Run Storybook to view components:

```sh
bun run storybook
```

## Building

To create a production build:

```sh
bun run build
```

Preview the production build:

```sh
bun run preview
```

## Deployment

This project is configured to deploy to GitHub Pages with both the game and Storybook:

- `/` - Minesweeper game
- `/storybook` - Component documentation

Push to `main` branch to trigger automatic deployment.

## Tech Stack

- [Svelte 5](https://svelte.dev) - Frontend framework with runes
- [SvelteKit](https://kit.svelte.dev) - Full-stack framework
- [Tailwind CSS](https://tailwindcss.com) - Utility-first styling
- [Storybook](https://storybook.js.org) - Component documentation
- [Bun](https://bun.sh) - JavaScript runtime & package manager

## Author

**Oleksandr Aishenko**

- 🌐 Website: [aishenko.com](https://aishenko.com)
- 💼 LinkedIn: [linkedin.com/in/aishenko](https://www.linkedin.com/in/aishenko/)
- 📦 GitHub: [github.com/qialex](https://github.com/qialex)

## License

MIT
