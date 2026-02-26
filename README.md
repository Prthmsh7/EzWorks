# EzWorks — Frontend Assignment

Hi! This is my submission for the EzWorks front-end developer assessment. I've built both the **Tree View** and **Kanban Board** components as a single-page dashboard using React, TypeScript, and Tailwind CSS.

## Live Demo

> _Deploy link will be added here once hosted._

## My Approach

I started by setting up a clean Vite + React + TypeScript project and then tackled each question one at a time.

### Question 1: Tree View

For the tree view, I went with a recursive `<TreeNode />` component that renders itself for each child. The data model is straightforward — each node has an `id`, `label`, `hasChildren` flag, and optional `children` array.

**What I implemented:**

- **Expand/Collapse** — Clicking the chevron toggles children visibility. Icons change contextually (folder open/closed, file type icons based on extension).
- **Lazy Loading** — Nodes with `hasChildren: true` but no loaded children simulate an API call with a loading spinner, then inject mock children. Results are cached so they don't refetch.
- **Add / Edit / Delete** — You can add a child to any node, double-click to rename, or delete with an inline confirmation prompt.
- **Drag & Drop** — Built with `@dnd-kit`. Nodes are draggable within the tree.
- **Visual hierarchy** — Each depth level has a distinct color, and dotted connector lines show parent-child relationships clearly.

### Question 2: Kanban Board

The Kanban board follows a `Board → Column → Card` structure with three default columns: Todo, In Progress, and Done.

**What I implemented:**

- **Add / Delete Cards** — Click the `+` button on any column header to add a card. Delete with an inline "Delete? ✓ ✗" confirmation (no native popup).
- **Drag & Drop** — Cards can be dragged within the same column to reorder, or across columns to move them. Uses `@dnd-kit` with a `DragOverlay` for smooth visual feedback.
- **Inline Editing** — Click any card title to edit it. Enter saves, Escape cancels.
- **Responsive Layout** — Three-column grid on desktop, stacks vertically on mobile.

### Extra Polish

Beyond the core requirements, I added a few things to make the submission feel more complete:

- **Dark Mode** — Toggle in the header with localStorage persistence.
- **Single-Page Layout** — Both components are showcased side-by-side in a clean dashboard layout that fits in one viewport.
- **Premium Styling** — Glassmorphic header, smooth transitions, hover micro-interactions, and a cohesive color system.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** for bundling
- **Tailwind CSS v4** for styling
- **@dnd-kit** for drag & drop
- **Lucide React** for icons

## Running Locally

```bash
git clone https://github.com/Prthmsh7/EzWorks.git
cd EzWorks
npm install
npm run dev
```

## Project Structure

```
src/
├── components/
│   ├── TreeView/
│   │   ├── TreeView.tsx      # Main tree component
│   │   ├── TreeNode.tsx      # Recursive node renderer
│   │   ├── treeTypes.ts      # TypeScript interfaces
│   │   └── treeUtils.ts      # Pure utility functions (find, add, remove, update)
│   ├── Kanban/
│   │   ├── KanbanBoard.tsx   # Board with DnD context
│   │   ├── Column.tsx        # Sortable column
│   │   ├── Card.tsx          # Draggable card with inline edit/delete
│   │   └── kanbanTypes.ts    # TypeScript interfaces
│   └── Layout/
│       ├── ShowcaseLayout.tsx # Dashboard shell with theme toggle
│       └── ShowcaseSection.tsx # Reusable section wrapper
├── mockData/
│   ├── treeMockData.ts
│   └── kanbanMockData.ts
├── App.tsx
└── main.tsx
```

## Notes

- All tree operations (find, add, remove, update) are implemented as pure functions in `treeUtils.ts` for testability.
- No `any` types — everything is strongly typed.
- State updates are immutable throughout.
- I chose `@dnd-kit` over `react-dnd` because it has a cleaner API and better support for sortable lists out of the box.

---

**Prathmesh Shukla**
