import React from "react";
import { Routes, Route, Link, useParams, Navigate } from "react-router-dom";
import { projects } from "./data/projects";
import { MarkdownView } from "./MarkdownView";
import "./docs.css";

function DocsHome() {
  return (
    <div className="docs-page">
      <div className="docs-shell">
        <header className="docs-header">
          <p className="docs-kicker">Local only — dev build</p>
          <h1>Project Architecture Notes</h1>
          <p className="docs-sub">
            Study reference for talking through my portfolio projects: real data flow,
            real module names, pulled from the actual repos.
          </p>
        </header>

        <div className="docs-grid">
          {projects.map((p) => (
            <Link to={`/docs/${p.slug}`} className="docs-card" key={p.slug}>
              <span className="docs-card-tag" style={{ background: p.color }}>
                {p.tag}
              </span>
              <h2>{p.name}</h2>
              <p>{p.summary}</p>
              <span className="docs-card-cta">View diagrams →</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectPage() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return <Navigate to="/docs" replace />;
  }

  return (
    <div className="docs-page">
      <div className="docs-shell">
        <div className="docs-breadcrumb">
          <Link to="/docs">← All projects</Link>
        </div>
        <header className="docs-header">
          <p className="docs-kicker" style={{ color: project.color }}>
            {project.tag}
          </p>
          <h1>{project.name}</h1>
          <p className="docs-sub">{project.summary}</p>
          <div className="docs-links">
            {project.repoUrl && (
              <a href={project.repoUrl} target="_blank" rel="noreferrer">
                Repo ↗
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer">
                Live ↗
              </a>
            )}
          </div>
        </header>
        <MarkdownView content={project.content} />
      </div>
    </div>
  );
}

export default function DocsApp() {
  return (
    <Routes>
      <Route path="/" element={<DocsHome />} />
      <Route path="/:slug" element={<ProjectPage />} />
    </Routes>
  );
}
