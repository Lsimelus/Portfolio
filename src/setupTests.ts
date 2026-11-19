// Vitest setup (vite.config.ts → test.setupFiles).
import '@testing-library/jest-dom/vitest';

// jsdom has no IntersectionObserver; the navbar's active-section tracking needs one.
class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() { return []; }
}
Object.defineProperty(window, 'IntersectionObserver', { writable: true, value: MockIntersectionObserver });

// jsdom doesn't implement scrolling.
window.HTMLElement.prototype.scrollIntoView = vi.fn();
window.scrollTo = vi.fn() as unknown as typeof window.scrollTo;
