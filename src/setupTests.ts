// Jest setup (picked up automatically by react-scripts).
import '@testing-library/jest-dom';

// jsdom has no IntersectionObserver; the navbar's active-section tracking needs one.
class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() { return []; }
}
Object.defineProperty(window, 'IntersectionObserver', { writable: true, value: MockIntersectionObserver });

// jsdom doesn't implement scrolling.
window.HTMLElement.prototype.scrollIntoView = jest.fn();
window.scrollTo = jest.fn() as unknown as typeof window.scrollTo;
