import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const CaseStudyPage = React.lazy(() => import('./components/CaseStudyPage'));

const routes = (
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/projects/:slug" element={<CaseStudyPage />} />
    {process.env.NODE_ENV !== 'production' && (
      <Route
        path="/docs/*"
        element={React.createElement(React.lazy(() => import('./docs/DocsApp')))}
      />
    )}
  </Routes>
);

root.render(
  <React.StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <React.Suspense fallback={null}>{routes}</React.Suspense>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
