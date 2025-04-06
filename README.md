# **Often-called-HTTP-verbs**

## SQL Query Runner App — Atlan Frontend Internship Task 2025

Hi there! I'm a 21-year-old B.Tech student from SRM University, Chennai — passionate about clean code, scalable UI architecture, and building tools that actually make users' lives easier.

This project is my take on the Atlan Frontend Internship Task 2025 — a lightweight, fast, and intuitive **SQL Query Runner** that mimics a data analyst's day-to-day workflow.

---

## 📌 1. Overview

This project is a **mock SQL query runner** that mimics the basic interaction flow of an actual data workspace:

- ✅ Type or select predefined SQL-like queries
- ✅ Dynamically render mock datasets mapped to those queries
- ✅ View results in a performant, responsive table
- ✅ Supports large data rendering (tested up to 10,000 rows)
- ✅ Built with clean modular code and styled using **CSS Modules** (no Tailwind used)

Think of it as a frontend playground that simulates querying tables in a SQL editor — but powered entirely by in-browser logic. This allows easy testing, high performance, and a fast feedback loop.

---

## ⚙️ 2. Framework & Dependencies

### 📦 JavaScript Framework

- **React 19 (with Vite)** — Lightweight, fast, and modular.
- **TypeScript** — For strong typing and predictable code behavior.

### 🧰 Major Packages Used

| Package                               | Purpose                                                                     |
| ------------------------------------- | --------------------------------------------------------------------------- |
| `@monaco-editor/react`                | Advanced SQL-like editor experience (used optionally for typing queries)    |
| `@tanstack/react-table`               | Highly performant table rendering with sorting and scalability support      |
| `zustand`                             | Global state management with minimal boilerplate                            |
| `lodash`                              | Utility functions for deep cloning, data manipulation, etc.                 |
| `pgsql-ast-parser`                    | Parses pseudo-SQL queries to structured ASTs (for future enhancement scope) |
| `@uiw/react-codemirror`               | Lighter SQL editor for basic input handling                                 |
| `codemirror` + `@codemirror/lang-sql` | Code syntax highlighting for SQL input                                      |

These tools allowed me to rapidly prototype while maintaining long-term flexibility and readability.

---

## ⚡ 3. Page Load Time

### 🚀 Measured Load Time: **~180ms**

### 🔍 How I Measured It:

1. Opened DevTools → Network Tab → Throttling set to "Fast 3G"
2. Reloaded the page with cache disabled
3. Took the `DOMContentLoaded` and `Load` event timestamps

**Results**:

```
DOMContentLoaded: 165ms
Load: 180ms
```

### 📎 Tools Used:

- Chrome DevTools
- Lighthouse (confirmatory): Performance score consistently 98-100

This proves that the app is **ready for production use** and highly optimized for minimal initial load.

---

## 🧠 4. Optimizations Done

### ✅ Vite + Tree Shaking

- Using **Vite** instead of CRA gave instant dev feedback + better bundling
- Tree shaking ensured that unused imports didn’t bloat the bundle

### ✅ Lazy Imports

- Monaco + Codemirror editors are dynamically loaded only when needed
- Prevents initial JS payload size from ballooning

### ✅ Minimal Re-renders

- `zustand` was used for central state without causing unnecessary re-renders
- Components wrapped in `React.memo()` wherever data didn’t change

### ✅ Large Table Performance

- `@tanstack/react-table` efficiently manages 10,000+ row rendering
- Avoided nested loops or expensive map filters in render path

### ✅ CSS Modules

- Kept style scopes tight to reduce global conflicts and bloated CSS
- Smaller style bundle, no Tailwind overhead

### ✅ No External API Calls

- Everything is local & static — no network latency or server-side rendering required

---

## 📁 Folder Structure

```
├── components/           # Reusable UI components (Editor, Table, Dropdown)
├── data/                 # Mock datasets + mapping logic
├── store/                # Zustand-based global state
├── styles/               # CSS Modules scoped per component
├── utils/                # Common helper functions
├── App.tsx               # Main application entry
├── main.tsx              # React entry point
└── index.html            # HTML skeleton
```

---

## 🔑 Features & Decisions (Using CODE Framework)

### 💡 C - Concept

- Emulated the core user flow of a SQL interface: write query → see data → repeat
- Prioritized simplicity, speed, and clarity over flashy UI/UX

### ⚙️ O - Optimization

- Virtual DOM + flat table rendering keeps DOM size predictable (O(n) time/space for row rendering)
- Scoped CSS avoids conflicts without global bloat
- Zustand updates state reactively in O(1), with minimal overhead

### 🧠 D - Design

- Each component is atomic, focused, and reusable
- Editor, Dropdown, and ResultTable are decoupled — plug-and-play ready
- Store handles query state, selected data, and syncing logic

### 📌 E - Example (Performance with 10k+ rows)

- Rendered 10,000+ rows without crashing or lag
- Table rerenders only when query changes
- Dynamic headers built on-the-fly from dataset keys

---

## 🧩 Challenges & Solutions (STAR Framework)

### 🔁 Switching between query views

- **S**: Mapping a query to the correct table structure without parsing real SQL
- **T**: Simulate a query engine and toggle logic cleanly
- **A**: Used identifiers and `Map<string, TableData>` pattern
- **R**: Decoupled and extensible — I can plug in any number of mock queries now

### 📉 Rendering Performance

- **S**: UI froze when testing large JSON arrays
- **T**: Handle 10k+ rows smoothly
- **A**: Used flat rendering, memoization, and render limits for safety
- **R**: Smooth, crash-free, and responsive table under load

---

## 🧠 Real-World Relevance

This approach mirrors real-world tools like Atlan, Retool, and Metabase, where frontend abstractions over query layers matter. The way I structure components, isolate concerns, and tune performance maps directly to production-ready best practices.

- State management? ✅ Scalable
- Reusability? ✅ Component-based
- Query simulation? ✅ Extensible

---

## 📌 Final Thoughts

Building this project helped me go back to fundamentals — structured state, clear UI communication, and real-world frontend problem-solving. I learned to ship fast, with clarity and care.

If you're reading this from the Atlan team — thanks again for the thoughtful prompt. Hope this reflects the kind of energy and intent I’d bring to your team.

Cheers! 🙌
