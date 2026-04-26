# Engineering Decisions: Content Performance Explorer

## Architecture

The application is structured as a SPRA using a component-based architecture with clear separation of concerns. The hierarchy follows a logical flow: `App` → `Pages` → `Components`, with shared utilities, types, data, and context files at the root level.

- **Component Hierarchy**:
  - Top-level: `App.tsx` handles routing with React Router.
  - Pages: `Dashboard` and `Test` pages encapsulate feature-specific logic.
  - Components: Organized into `Dashboard` (feature-specific), `Layout` (shared UI), and `UI` (reusable elements).
  - Sub-components like `Charts`, `Loading`, and `Table` are further modularized to be reusable but can be further optimised to be more reusable.

- **State Management**:
  - Using React's Context API for Global state for filters, search, pagination, and sorting (`DashboardContext`) with a reducer pattern. This avoids prop drilling and centralizes dashboard-specific state.
  - Local state in components handles data loading and UI states (e.g., loading, error).

- **Data Fetching**:
  - Data is sourced from static JSON files in the `data/` directory, simulating API responses. This approach is chosen for simplicity, with async loading using `useEffect` and `fetch` for local files.
  - No external APIs or backend; data is pre-processed and transformed in utilities (`utilityFn.ts`).

This structure supports scalability for a dashboard app, with clear boundaries between UI, logic, and data.

## Library Choices

- **React**: For hooks and performance optimizations. 
- **TypeScript**: Provides type safety, reducing runtime errors. Essential for maintainable code in a team setting.
- **Vite**: Fast build tool with hot reloading. Chosen over Create React App for better performance and modern tooling.
- **Material-UI (MUI)**: Comprehensive UI library for consistent design. Includes icons and theming. Trade-off: Larger bundle size vs. rapid development; suitable for admin dashboards.
- **Recharts**: Declarative charting library for data visualization. Lightweight and React-native. Trade-off: Less customization than D3, but simpler for common charts.
- **React Router**: For client-side routing. Minimal and effective for a small app.
- **Emotion**: CSS-in-JS for styling with MUI. Allows dynamic theming.
- **Notistack**: For toast notifications. Simple integration with MUI.
- **ESLint**: For code quality. Configured as Dev Dependency.

Trade-offs considered: Avoided heavier libraries like Redux (overkill for this scope) or custom CSS frameworks to keep bundle small.

## Trade-offs

- **Optimized for Simplicity and Speed**: Prioritized quick development with static data and minimal state. No server-side rendering or advanced caching, as it's a client-side demo.
- **Bundle Size vs. Features**: Used MUI for full UI kit, accepting ~200KB overhead for rapid prototyping.
- **Type Safety vs. Flexibility**: Strict TypeScript usage, but some `any` types in utilities for quick data handling.
- **Static Data**: Easy to develop with, but not scalable. With more time, I'd implement a mock API or real backend.
- **Testing**: Would use Vitest to add unit tests.

## Improvements for Production

- **Error Handling and Resilience**: Add global error boundaries, retry logic for data fetching, and user-friendly error states.
- **Performance**: Implement lazy loading for components, memoization (React.memo), and virtualization for large tables.
- **Testing**: Add Vitest for unit tests, React Testing Library for components.
- **Accessibility**: Audit with tools like Lighthouse; ensure ARIA labels and keyboard navigation.
- **Data Layer**: Replace static JSON with a real API (e.g., REST), add caching (React Query), and real-time updates.
- **Security**: Sanitize inputs, add authentication if needed.
- **CI/CD**: Set up automated builds, linting, and deployment pipelines.
- **Scalability**: Modularize further, add storybook for components, and consider micro-frontends if the app grows.
- **Monitoring**: Integrate analytics and error tracking.

This architecture provides a solid foundation, balancing simplicity for development with extensibility for production.</content>
<parameter name="filePath">/Users/vaibhavkumar/Developer/side-projects/assignment/content-performance-explorer/DECISIONS.md
