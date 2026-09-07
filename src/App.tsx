import "./App.css";
import { useEffect, useState } from "react";
import resume from "./assets/Resume-Abdullah-Ahmed.pdf";

function AnimatedNumber({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = document.getElementById(`stat-${target}`);

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
          setCount(0);
        }
      },
      {
        threshold: 0.5,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [target]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const duration = 1600;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;

      const progress = Math.min(
        (currentTime - startTime) / duration,
        1
      );

      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCount(Math.floor(easeOut * target));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, target]);

  return (
    <strong id={`stat-${target}`}>
      {count}
      {suffix}
    </strong>
  );
}

const projects = [
  {
    number: "01",
    category: "AI / RAG / AGENTIC AI",
    title: "AI Legal Research Assistant",
    description:
      "An agentic AI legal research system for Pakistani statutes. The system combines LLM tool calling with hybrid retrieval to search legal information and generate grounded responses.",
    technologies: [
      "Python",
      "FastAPI",
      "LangChain",
      "Gemini",
      "RAG",
      "FAISS",
      "BM25",
    ],
    github:
      "https://github.com/Abdullah17442/Law-Assistant",
  },

  {
    number: "02",
    category: "DATA ENGINEERING / ETL",
    title: "Scalable Legal Data Engineering System",
    description:
      "A scalable data engineering pipeline for extracting, cleaning, validating, transforming and structuring large-scale legal datasets for AI-powered applications.",
    technologies: [
      "Python",
      "ETL",
      "Selenium",
      "Playwright",
      "BeautifulSoup",
      "PostgreSQL",
    ],
    github:
      "https://github.com/Abdullah17442/legal-document-processing-pipeline",
  },

  {
    number: "03",
    category: "DATA / NLP / INFORMATION RETRIEVAL",
    title: "Legal Judgment Processing Pipeline",
    description:
      "A Python and FastAPI pipeline for extracting, cleaning and structuring Pakistani court judgments with legal metadata and semantic representations for searchable legal data.",
    technologies: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "pgvector",
      "Embeddings",
      "Semantic Chunking",
    ],
    github:
      "https://github.com/Abdullah17442/legal-document-processing-pipeline",
  },

  {
    number: "04",
    category: "MOBILE / FINTECH / FINAL YEAR PROJECT",
    title: "YouPay — Biometric-Based Payment System",
    description:
      "A React Native mobile payment application enabling cardless fingerprint-based transactions with biometric verification, secure transaction flows and wallet management.",
    technologies: [
      "React Native",
      "Expo",
      "Firebase",
      "Firestore",
      "Biometrics",
    ],
    github:
      "https://github.com/Abdullah17442/YOUPAY",
  },

  {
    number: "05",
    category: "AI / CHATBOT / AUTOMATION",
    title: "WhatsApp AI Chatbot",
    description:
      "An AI-powered WhatsApp chatbot designed to automate conversations and provide intelligent responses through an integrated conversational AI workflow.",
    technologies: [
      "Python",
      "AI",
      "Chatbot",
      "WhatsApp",
      "APIs",
      "Automation",
    ],
    github:
      "https://github.com/Abdullah17442/Whatsapp-Chatbot",
  },
];

function App() {
  return (
    <>
      {/* NAVIGATION */}

      <nav>
        <div className="container nav-inner">
          <div className="logo">ABDULLAH AHMED</div>

          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#stack">Stack</a>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>

            <a
              href={resume}
              download="Abdullah-Ahmed Resume.pdf"
            >
              CV ↓
            </a>
          </div>
        </div>
      </nav>

      {/* HERO */}

      <header className="hero">
        <div className="container hero-grid">
          <div>
            <div className="eyebrow">
              AI • DATA • BACKEND
            </div>

            <h1>
              AI & Data
              <span>Engineer.</span>
            </h1>

            <p className="hero-description">
              I build AI-powered applications, scalable data
              pipelines, RAG systems, and backend services that
              turn complex data into reliable, production-ready
              solutions.
            </p>

            <div className="buttons">
              <a className="btn primary" href="#projects">
                View Projects
              </a>

              <a
                className="btn"
                href="https://github.com/Abdullah17442"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>

              <a
                className="btn"
                href="https://www.linkedin.com/in/abdullah-ahmed17442 "
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>

              <a
                className="btn"
                href={resume}
                download="Abdullah-Ahmed-Resume.pdf"
              >
                CV
              </a>
            </div>
          </div>

          {/* TECHNICAL FOCUS */}

          <div className="focus-list">
            <div className="focus-item">
              <strong>AI Engineering</strong>
              <span>
                LLMs • RAG • Agentic AI • Tool Calling • Embeddings
              </span>
            </div>

            <div className="focus-item">
              <strong>Data Engineering</strong>
              <span>
                ETL • Data Processing • Web Scraping • Data Validation
              </span>
            </div>

            <div className="focus-item">
              <strong>Backend Engineering</strong>
              <span>
                Python • FastAPI • REST APIs • PostgreSQL • Vector Search
              </span>
            </div>

            <div className="focus-item">
              <strong>Application Development</strong>
              <span>
                React • React Native • TypeScript • Firebase
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ABOUT */}

      <section id="about">
        <div className="container">
          <div className="section-label">About</div>

          <div className="section-title">
            Building software,
            <br />
            from idea to application.
          </div>

          <div className="about-grid">
            <div className="about-text">
              <p>
                I'm a Computer Science graduate with a major in
                Data Science, focused on AI engineering, data
                engineering, and backend development. I build
                practical systems involving LLMs, RAG, semantic
                search, data pipelines, and API-driven applications.
              </p>

              <p>
                My experience includes developing AI-powered legal
                research systems, processing large-scale legal
                datasets, building automated ETL pipelines, and
                developing backend services with Python and FastAPI.
              </p>

              <p>
                I also have experience building cross-platform
                mobile applications with React Native and
                integrating APIs, Firebase, and cloud-based
                services into production-oriented applications.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}

      <section className="stats-section">
        <div className="container">
          <div className="portfolio-stats">

            <div className="portfolio-stat">
              <AnimatedNumber target={450} suffix="K+" />
              <span>Legal Judgments Processed</span>
            </div>

            <div className="portfolio-stat">
              <AnimatedNumber target={40} suffix="K+" />
              <span>Legal Provisions</span>
            </div>

            <div className="portfolio-stat">
              <AnimatedNumber target={5} suffix="+" />
              <span>AI & Software Projects</span>
            </div>

            <div className="portfolio-stat">
              <AnimatedNumber target={2} />
              <span>Professional Experiences</span>
            </div>

          </div>
        </div>
      </section>

      {/* PROJECTS */}

      <section
        id="projects"
        className="projects-section"
      >
        <div className="container">
          <div className="section-label">
            Selected Work
          </div>

          <div className="projects-header">
            <div>
              <div className="section-title">
                Projects
              </div>

              <p className="projects-intro">
                A selection of software, mobile, data and AI
                projects I've built across different technologies.
              </p>
            </div>

            <a
              className="view-all-link"
              href="https://github.com/Abdullah17442"
              target="_blank"
              rel="noreferrer"
            >
              View All on GitHub ↗
            </a>
          </div>

          {/* PROJECT CARDS */}

          <div className="projects-scroll">
            {projects.map((project) => (
              <article
                className="project-card"
                key={project.number}
              >
                <div className="project-card-content">
                  <div className="project-number">
                    {project.number} — {project.category}
                  </div>

                  <h3>{project.title}</h3>

                  <p className="project-description">
                    {project.description}
                  </p>

                  {/* TECHNOLOGIES */}

                  <div className="tags">
                    {project.technologies.map(
                      (technology) => (
                        <span
                          className="tag"
                          key={technology}
                        >
                          {technology}
                        </span>
                      )
                    )}
                  </div>

                  {/* LINKS */}

                  <div className="project-card-footer">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                    >
                      GitHub ↗
                    </a>

                    <a href="#contact">
                      Discuss ↗
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* SCROLL / VIEW MORE */}

          <div className="projects-scroll-footer">
            <span>
              ← Scroll to explore more projects →
            </span>

            <a
              href="https://github.com/Abdullah17442"
              target="_blank"
              rel="noreferrer"
              className="view-projects-btn"
            >
              View More Projects ↗
            </a>
          </div>
        </div>
      </section>

      {/* STACK */}

      <section id="stack">
        <div className="container">
          <div className="section-label">
            Technology
          </div>

          <div className="section-title">
            What I work with
          </div>

          <div className="stack-grid">

            <div className="stack-card">
              <h3>Languages</h3>
              <p>
                Python
                <br />
                JavaScript
                <br />
                TypeScript
                <br />
                C++
                <br />
                SQL
              </p>
            </div>

            <div className="stack-card">
              <h3>AI / Data</h3>
              <p>
                RAG
                <br />
                LLMs
                <br />
                Fine-Tuning
                <br />
                Embeddings
                <br />
                Prompt Engineering
                <br />
                Hugging Face
              </p>
            </div>

            <div className="stack-card">
              <h3>Retrieval</h3>
              <p>
                FAISS
                <br />
                BM25
                <br />
                Semantic Search
                <br />
                Cross-Encoder Reranking
                <br />
                Vector Search
              </p>
            </div>

            <div className="stack-card">
              <h3>Data Engineering</h3>
              <p>
                ETL Pipelines
                <br />
                Web Scraping
                <br />
                Data Cleaning
                <br />
                Data Validation
                <br />
                Data Processing
              </p>
            </div>

            <div className="stack-card">
              <h3>Backend</h3>
              <p>
                FastAPI
                <br />
                REST APIs
                <br />
                Node.js
                <br />
                PostgreSQL
                <br />
                MySQL
                <br />
                Firebase
              </p>
            </div>

            <div className="stack-card">
              <h3>Frontend & Mobile</h3>
              <p>
                React
                <br />
                React Native
                <br />
                Expo
                <br />
                HTML
                <br />
                CSS
              </p>
            </div>

            <div className="stack-card">
              <h3>Libraries</h3>
              <p>
                TensorFlow
                <br />
                Pandas
                <br />
                NumPy
                <br />
                Scikit-learn
                <br />
                BeautifulSoup
                <br />
                Selenium
                <br />
                Playwright
              </p>
            </div>

            <div className="stack-card">
              <h3>Cloud & DevOps</h3>
              <p>
                Docker
                <br />
                GitHub
                <br />
                REST APIs
                <br />
                Backend Deployment
              </p>
            </div>

            <div className="stack-card">
              <h3>Currently Focused On</h3>
              <p>
                Agentic AI
                <br />
                RAG Systems
                <br />
                Data Engineering
                <br />
                AI Infrastructure
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* EXPERIENCE */}

      <section id="experience">
        <div className="container">
          <div className="section-label">
            Background
          </div>

          <div className="section-title">
            Experience & Education
          </div>

          <div className="timeline">

            <div className="timeline-item">
              <h3>Data & AI Engineer</h3>

              <div className="date">
                Stealth Legal Tech Startup • February 2026 — June 2026
              </div>

              <p>
                Engineered AI-powered legal research solutions
                using LLMs, RAG pipelines, semantic search, and
                automated retrieval workflows.
              </p>

              <p>
                Processed and structured 450,000+ court judgments
                and 40,000+ legal provisions for scalable
                AI-powered legal search systems.
              </p>

              <p>
                Built automated data cleaning, validation, and
                auditing pipelines for large-scale JSON and
                JSONL datasets.
              </p>

              <p>
                Implemented hybrid retrieval using BM25,
                embeddings, FAISS, and cross-encoder reranking
                for improved legal document retrieval.
              </p>
            </div>

            <div className="timeline-item">
              <h3>React Native Developer Intern</h3>

              <div className="date">
                National Information Technology Board • July 2025 —
                September 2025
              </div>

              <p>
                Built cross-platform mobile applications using
                React Native and Expo, integrated REST APIs and
                Firebase Authentication, and contributed to
                reusable UI components and application performance.
              </p>
            </div>

            <div className="timeline-item">
              <h3>
                Bachelor of Science in Computer Science
              </h3>

              <div className="date">
                HITEC University • 2022 — 2026
              </div>

              <p>
                Major: Data Science. Academic focus spanning
                software development, data science, machine
                learning and AI systems.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* CONTACT */}

      <section id="contact" className="contact">
        <div className="container">
          <div className="section-label">
            Contact
          </div>

          <h2>Let's build something.</h2>

          <p>
            Interested in AI, data engineering or building
            intelligent products?
          </p>

          <div className="buttons contact-buttons">
            <a
              className="btn primary"
              href="mailto:abdullahahmed17882@gmail.com"
            >
              Email Me
            </a>
          </div>

          <div className="socials">

            <a href="tel:+923070661155">
              +923070661155
            </a>

            <a
              href="https://github.com/Abdullah17442"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>

            <a
              href="https://www.linkedin.com/in/abdullah-ahmed17442/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>

            <a
              href={resume}
              download="Abdullah-Ahmed-Resume.pdf"
            >
              CV
            </a>

            <a href="mailto:abdullahahmed17882@gmail.com">
              Email
            </a>

          </div>
        </div>
      </section>

      {/* FOOTER */}

      <footer>
        © 2026 Abdullah Ahmed. Built with React & TypeScript.
      </footer>
    </>
  );
}

export default App;
