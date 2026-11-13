import "./App.css";
import { useEffect, useState } from "react";
//import resume from "./assets/Resume - Abdullah-Ahmed.pdf , ./assets/Resume@Abdullah-Ahmed.pdf";
import resume from "./assets/Resume@Abdullah-Ahmed.pdf";
import VoiceAgent from "./components/voice/VoiceAgent";

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
      "An agentic legal assistant built with FastAPI, LangChain, and Google Gemini for autonomous legal search and grounded responses over Pakistani legal data.",
    technologies: [
      "Python",
      "FastAPI",
      "LangChain",
      "Google Gemini",
      "RAG",
      "Tool Calling",
    ],
    github:
      "https://github.com/Abdullah17442/Law-Assistant",
  },

  {
    number: "02",
    category: "DATA / NLP / INFORMATION RETRIEVAL",
    title: "Legal Judgment Processing Pipeline",
    description:
      "A Python and FastAPI pipeline that extracts, cleans, and structures Pakistani court judgments with legal metadata and searchable semantic representations.",
    technologies: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "pgvector",
      "Gemini Embeddings",
      "Semantic Chunking",
    ],
    github:
      "https://github.com/Abdullah17442/legal-document-processing-pipeline",
  },

  {
    number: "03",
    category: "DATA ENGINEERING / ETL / SEARCH",
    title: "Scalable Legal Data Engineering System",
    description:
      "A scalable web scraping and ETL system for legal document processing, vector indexing, and hybrid search across large legal datasets.",
    technologies: [
      "Python",
      "ETL",
      "Web Scraping",
      "BM25",
      "FAISS",
      "PostgreSQL",
    ],
    github:
      "https://github.com/Abdullah17442/legal-document-processing-pipeline",
  },

  {
    number: "04",
    category: "MOBILE / FINTECH / FINAL YEAR PROJECT",
    title: "YouPay — Biometric-Based Payment System",
    description:
      "A React Native (Expo) payment app for cardless fingerprint-based transactions with biometric verification, secure wallet flows, and Firebase-backed user data.",
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
];

function App() {
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);

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
            <a href="#certifications">Certifications</a>
            <a href="#contact">Contact</a>
            <a
              href={resume}
              download="Resume - Abdullah-Ahmed.pdf"
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
              SOFTWARE ENGINEER • AI • DATA • DEVOPS
            </div>

            <h1>
              Software
              <span>Engineer.</span>
            </h1>

            <p className="hero-description">
              Python backend engineer with 2 years of experience
              building FastAPI and REST services backed by PostgreSQL,
              MySQL, and Supabase. I deliver RAG-based legal search
              systems, scalable data pipelines, and production-ready
              AI applications with Docker, GitHub Actions, and AWS.
            </p>

            <div className="buttons">
              <a className="btn primary" href="#projects">
                View Projects
              </a>

              {/* VOICE AGENT BUTTON */}

              <button
                className="btn voice-btn"
                onClick={() => setIsVoiceOpen(true)}
              >
                🎙 Talk to Me
              </button>

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
                href="https://www.linkedin.com/in/abdullah-ahmed17442"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>

              <a
                className="btn"
                href={resume}
                download="Resume - Abdullah-Ahmed.pdf"
              >
                CV
              </a>
            </div>
          </div>

          {/* TECHNICAL FOCUS */}

          <div className="focus-list">
            <div className="focus-item">
              <strong>AI & Data Engineering</strong>
              <span>
                LLMs • RAG • Agentic AI • Embeddings • Vector Search
              </span>
            </div>

            <div className="focus-item">
              <strong>Backend & APIs</strong>
              <span>
                Python • FastAPI • REST APIs • PostgreSQL • Supabase
              </span>
            </div>

            <div className="focus-item">
              <strong>DevOps & Deployment</strong>
              <span>
                Docker • GitHub Actions • AWS • CI/CD • Production Support
              </span>
            </div>

            <div className="focus-item">
              <strong>Frontend & Mobile</strong>
              <span>
                React • React Native • Expo • Responsive UI • Firebase
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
              I’m a Computer Science graduate specializing in Data Science,
              with a focus on software engineering, Python backend development,
              and AI-powered systems. I build practical applications using
              Python, FastAPI, REST APIs, and PostgreSQL, alongside experience
              in LLMs, RAG pipelines, semantic search, and data engineering.
            </p>
            <p>
              My experience includes developing an AI-powered legal research
              platform that processes 450,000+ court judgments and 40,000+
              legal provisions. I’ve implemented hybrid retrieval systems
              combining embeddings, BM25, FAISS, and cross-encoder reranking
              to deliver relevant and accurate search results.
            </p>
            <p>
              Currently, I’m working as a DevOps Engineer Intern at Mobilink
              Microfinance Bank, where I support production systems, analyze
              application logs, troubleshoot incidents, and work with CI/CD
              pipelines. I also bring hands-on experience in React Native,
              cloud deployment, and clean backend architecture, with a focus
              on building scalable, reliable, and maintainable software.
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
              <AnimatedNumber target={3} />
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
              <h3>DevOps Engineer Intern</h3>

              <div className="date">
                Mobilink Microfinance Bank • October 2026 — Present
              </div>

              <p>
                Monitor production systems, troubleshoot incidents,
                and analyze application logs to identify and resolve
                operational issues quickly.
              </p>

              <p>
                Support CI/CD pipelines that automate build and
                deployment workflows, improving release reliability and
                deployment speed.
              </p>
            </div>

            <div className="timeline-item">
              <h3>Data & AI Engineer</h3>

              <div className="date">
                Stealth Legal Tech Startup • February 2026 — June 2026
              </div>

              <p>
                Engineered AI-powered legal research solutions using
                LLMs, RAG pipelines, and semantic search.
              </p>

              <p>
                Processed, cleaned, and structured 450,000+ court
                judgments and 40,000+ legal provisions for scalable
                search and analytics pipelines.
              </p>

              <p>
                Built automated validation and auditing workflows for
                JSON and JSONL datasets, and implemented hybrid search
                using embeddings, BM25, FAISS, and cross-encoder
                reranking.
              </p>
            </div>

            <div className="timeline-item">
              <h3>React Native Developer Intern</h3>

              <div className="date">
                National Information Technology Board • July 2025 —
                September 2025
              </div>

              <p>
                Built cross-platform mobile applications using React
                Native and Expo with responsive UI, Firebase
                Authentication, and REST API integration.
              </p>

              <p>
                Contributed reusable UI components and improved app
                performance in a collaborative team environment.
              </p>
            </div>

            <div className="timeline-item">
              <h3>
                Bachelor of Science in Computer Science (Data Science)
              </h3>

              <div className="date">
                HITEC University • 2022 — 2026
              </div>

              <p>
                Graduated with a focus on software development, data
                science, machine learning, and AI systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}

      <section id="certifications">
        <div className="container">
          <div className="section-label">Certifications</div>

          <div className="section-title">
            Certifications & Training
          </div>

          <div className="stack-grid certifications-grid">
            <div className="stack-card cert-card">
              <h3>AI Monitor Engineer Training Program</h3>
              <p>ClickChain AI Academy • Ongoing</p>
              <p>
                Learning to monitor AI agents, evaluate model
                outputs, and improve reliability in agentic
                workflows.
              </p>
            </div>

            <div className="stack-card cert-card">
              <h3>Workshop on Front-End Development</h3>
              <p>HITEC University</p>
              <p>
                Completed a front-end workshop covering modern web
                technologies and practical UI development.
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
              href="https://www.linkedin.com/in/abdullah-ahmed17442"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>

            <a
              href={resume}
              download="Resume - Abdullah-Ahmed.pdf"
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

      {/* VOICE AGENT MODAL */}

      <VoiceAgent
        isOpen={isVoiceOpen}
        onClose={() => setIsVoiceOpen(false)}
      />
    </>
  );
}

export default App;