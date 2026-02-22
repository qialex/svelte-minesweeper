# Minesweeper

A simple Minesweeper game built with Svelte 5 and SvelteKit.

## Features

- 8x8 grid with 10 mines
- Left-click to reveal cells
- Right-click to place/remove flags
- Auto-reveal empty adjacent cells (flood fill)
- Win/lose detection
- Timer starts on first click
- Flag counter showing remaining mines
- **Safe first click** - mines are placed after your first click, ensuring you never hit a mine on the first move

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
