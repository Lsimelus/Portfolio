import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const CaseStudyPage = React.lazy(() => import('./components/CaseStudyPage'));

const routes = (
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/projects/:slug" element={<CaseStudyPage />} />
  </Routes>
);

root.render(
  <React.StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <React.Suspense fallback={null}>{routes}</React.Suspense>
    </BrowserRouter>
    {/* Page views for Vercel Web Analytics (enable it in the Vercel project's Analytics tab) */}
    <Analytics />
  </React.StrictMode>
);

