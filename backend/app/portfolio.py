# portfolio.py

PORTFOLIO = {
    # ============================================================
    # BASIC INFORMATION
    # ============================================================

    "name": "Abdullah Ahmed",

    "role": "AI & Data Engineer",

    "professional_title": "AI & Data Engineer | AI Automation | RAG | LLMs | Data Engineering",

    "location": "Pakistan",

    "current_status": """
    Abdullah Ahmed is a Computer Science graduate with a major in Data Science.

    He completed his Bachelor of Science in Computer Science from HITEC
    University in July 2026.

    Abdullah is no longer a student. He has graduated and is currently
    focused on building his career in AI engineering, data engineering,
    backend development, AI automation, LLM applications, RAG systems,
    and AI-powered products.
    """,

    # ============================================================
    # ABOUT ABDULLAH
    # ============================================================

    "about": """
    Abdullah Ahmed is a Computer Science graduate with a major in Data Science,
    focused on AI engineering, data engineering, backend development, and
    practical AI application development.

    He has hands-on experience building systems involving Large Language Models,
    Retrieval-Augmented Generation, semantic search, hybrid information
    retrieval, embeddings, data pipelines, APIs, and AI-powered applications.

    Abdullah enjoys turning AI concepts into practical software products.
    His work combines Python, FastAPI, databases, LLM APIs, retrieval systems,
    automation, and modern frontend technologies.

    He is particularly interested in Generative AI, AI agents, RAG systems,
    LLM-powered workflows, AI automation, data engineering, and backend systems.

    Abdullah's portfolio demonstrates both software engineering and AI/data
    engineering experience through academic, professional, and personal projects.
    """,

    # ============================================================
    # EDUCATION
    # ============================================================

    "education": {
        "degree": "Bachelor of Science in Computer Science",
        "university": "HITEC University",
        "years": "2022 — 2026",
        "major": "Data Science",
        "status": "Graduated",
        "graduation_date": "July 2026",

        "description": """
        Abdullah completed a Bachelor of Science in Computer Science with
        a major in Data Science at HITEC University.

        His academic background covered software development, data science,
        machine learning, artificial intelligence, databases, algorithms,
        and computer science fundamentals.

        He graduated in July 2026.
        """
    },

    # ============================================================
    # PROFESSIONAL EXPERIENCE
    # ============================================================

    "experience": [
        {
            "title": "Data & AI Engineer",
            "company": "Stealth Legal Tech Startup",
            "period": "February 2026 — June 2026",

            "description": """
            Abdullah worked as a Data & AI Engineer at a stealth legal
            technology startup.

            He worked on AI-powered legal research solutions involving
            Large Language Models, Retrieval-Augmented Generation,
            semantic search, information retrieval, and automated
            retrieval workflows.

            He processed and structured more than 450,000 court judgments
            and more than 40,000 legal provisions for AI-powered legal
            search and research systems.

            He built automated data cleaning, validation, transformation,
            and auditing pipelines for large-scale JSON and JSONL datasets.

            He also implemented hybrid information retrieval using BM25,
            vector embeddings, FAISS, and cross-encoder reranking.

            His work involved preparing large-scale legal data so that
            it could be efficiently searched and consumed by AI systems.
            """,

            "technologies": [
                "Python",
                "FastAPI",
                "LLMs",
                "RAG",
                "Embeddings",
                "FAISS",
                "BM25",
                "Cross-Encoder Reranking",
                "PostgreSQL",
                "JSON",
                "JSONL",
                "ETL",
                "Data Cleaning",
                "Data Validation",
                "Semantic Search"
            ]
        },

        {
            "title": "React Native Developer Intern",
            "company": "National Information Technology Board (NITB)",
            "period": "July 2025 — September 2025",

            "description": """
            Abdullah worked as a React Native Developer Intern at the
            National Information Technology Board.

            He developed cross-platform mobile applications using
            React Native and Expo.

            His work included integrating REST APIs, implementing
            Firebase Authentication, developing reusable UI components,
            creating responsive interfaces, debugging applications,
            and following software engineering practices.
            """,

            "technologies": [
                "React Native",
                "Expo",
                "JavaScript",
                "REST APIs",
                "Firebase",
                "Firebase Authentication"
            ]
        }
    ],

    # ============================================================
    # PROJECTS
    # ============================================================

    "projects": [
        {
            "title": "AI Legal Research Assistant",

            "category": "AI / RAG / AGENTIC AI",

            "description": """
            An agentic AI legal research system designed for Pakistani
            statutes and legal information.

            The system combines Large Language Models with tool calling
            and hybrid information retrieval.

            It can retrieve relevant legal information and generate
            grounded responses based on retrieved information.

            The retrieval system combines keyword-based BM25 search,
            vector embeddings, FAISS, and reranking to improve the
            relevance of retrieved legal information.
            """,

            "technologies": [
                "Python",
                "FastAPI",
                "LangChain",
                "Gemini",
                "LLMs",
                "RAG",
                "FAISS",
                "BM25",
                "Embeddings",
                "Semantic Search",
                "Cross-Encoder Reranking"
            ]
        },

        {
            "title": "Scalable Legal Data Engineering System",

            "category": "DATA ENGINEERING / ETL",

            "description": """
            A scalable data engineering system designed to extract,
            clean, validate, transform, and structure large-scale
            legal datasets for AI applications.

            The pipeline handles data collection, cleaning,
            duplicate removal, validation, transformation,
            and preparation of legal documents for downstream
            AI and retrieval systems.

            The system was designed to make large collections of
            legal information suitable for search, embeddings,
            RAG systems, and LLM applications.
            """,

            "technologies": [
                "Python",
                "ETL",
                "Selenium",
                "Playwright",
                "BeautifulSoup",
                "PostgreSQL",
                "Data Cleaning",
                "Data Validation",
                "Data Processing"
            ]
        },

        {
            "title": "Legal Judgment Processing Pipeline",

            "category": "DATA / NLP / INFORMATION RETRIEVAL",

            "description": """
            A Python and FastAPI-based pipeline for processing Pakistani
            court judgments.

            The pipeline extracts and structures legal documents,
            cleans the content, preserves relevant metadata,
            performs semantic chunking, and generates representations
            suitable for semantic search and AI applications.

            PostgreSQL and pgvector are used for structured storage
            and vector-based retrieval.
            """,

            "technologies": [
                "Python",
                "FastAPI",
                "PostgreSQL",
                "pgvector",
                "Embeddings",
                "Semantic Chunking",
                "NLP",
                "Semantic Search"
            ]
        },

        {
            "title": "YouPay — Biometric-Based Payment System",

            "category": "MOBILE / FINTECH / FINAL YEAR PROJECT",

            "description": """
            YouPay is a React Native mobile payment application designed
            to support cardless fingerprint-based transactions.

            The application includes biometric verification, secure
            transaction flows, wallet functionality, and Firebase-based
            backend services.

            The project demonstrates Abdullah's experience with mobile
            application development, authentication, Firebase,
            biometrics, and application architecture.
            """,

            "technologies": [
                "React Native",
                "Expo",
                "Firebase",
                "Firestore",
                "Biometrics"
            ]
        },

        {
            "title": "WhatsApp AI Chatbot",

            "category": "AI / CHATBOT / AUTOMATION",

            "description": """
            An AI-powered WhatsApp chatbot designed to automate
            conversations and provide intelligent responses through
            an integrated conversational AI workflow.

            The project demonstrates practical experience with
            conversational AI, APIs, automation, and chatbot systems.
            """,

            "technologies": [
                "Python",
                "AI",
                "Chatbot",
                "WhatsApp",
                "APIs",
                "Automation"
            ]
        }
    ],


    # ============================================================
    # TECHNICAL SKILLS
    # ============================================================

    "skills": {

        "programming_languages": [
            "Python",
            "JavaScript",
            "TypeScript",
            "C++",
            "SQL",
            "HTML",
            "CSS"
        ],

        "ai_and_machine_learning": [
            "Artificial Intelligence",
            "Generative AI",
            "Large Language Models",
            "RAG",
            "AI Agents",
            "Fine-Tuning",
            "Embeddings",
            "Prompt Engineering",
            "Hugging Face",
            "Machine Learning",
            "Deep Learning",
            "Computer Vision"
        ],

        "information_retrieval": [
            "FAISS",
            "BM25",
            "Vector Search",
            "Semantic Search",
            "Hybrid Retrieval",
            "Cross-Encoder Reranking",
            "Embeddings"
        ],

        "data_engineering": [
            "ETL Pipelines",
            "Data Cleaning",
            "Data Validation",
            "Data Transformation",
            "Data Processing",
            "Web Scraping",
            "Large-Scale Dataset Processing"
        ],

        "backend": [
            "FastAPI",
            "Python Backend Development",
            "REST APIs",
            "Node.js",
            "WebSockets",
            "API Integration"
        ],

        "databases": [
            "PostgreSQL",
            "MySQL",
            "Firebase",
            "Firestore",
            "pgvector",
            "FAISS"
        ],

        "frontend": [
            "React",
            "JavaScript",
            "TypeScript",
            "HTML",
            "CSS"
        ],

        "mobile_development": [
            "React Native",
            "Expo",
            "Firebase",
            "Firebase Authentication"
        ],

        "data_science": [
            "Pandas",
            "NumPy",
            "scikit-learn",
            "TensorFlow",
            "Keras",
            "PyTorch",
            "OpenCV"
        ],

        "tools_and_frameworks": [
            "LangChain",
            "BeautifulSoup",
            "Selenium",
            "Playwright",
            "PySpark",
            "Docker",
            "Kubernetes",
            "AWS",
            "Git",
            "GitHub",
            "VS Code",
            "Google Colab"
        ]
    },

    # ============================================================
    # PORTFOLIO WEBSITE
    # ============================================================

    "portfolio_website": {

        "description": """
        Abdullah's portfolio website is a personal software engineering
        and AI portfolio designed to showcase his education, professional
        experience, technical skills, AI projects, data engineering work,
        and contact information.

        The website also contains an interactive AI voice assistant
        that allows visitors to have a natural voice conversation about
        Abdullah's background and technical work.
        """,

        "frontend": """
        The portfolio frontend is built using React and TypeScript.

        The interface uses custom CSS rather than Tailwind CSS.

        The website contains sections for the hero area, about section,
        statistics, experience and education, projects, skills,
        and contact information.

        The portfolio also includes links to Abdullah's GitHub,
        LinkedIn, and downloadable resume.
        """,

        "frontend_technologies": [
            "React",
            "TypeScript",
            "CSS",
            "JavaScript"
        ],

        "deployment": """
        The portfolio is designed as a modern web application and
        can be deployed using Vercel.
        """,

        "resume": "Resume-Abdullah-Ahmed.pdf"
    },

    # ============================================================
    # PORTFOLIO STATISTICS
    # ============================================================

    "portfolio_statistics": {
        "legal_judgments_processed": "450K+",
        "legal_provisions": "40K+",
        "ai_and_software_projects": "5+",
        "professional_experiences": "2"
    },

    # ============================================================
    # AI VOICE ASSISTANT
    # ============================================================

    "voice_assistant": {

        "name": "Abdullah's AI Voice Assistant",

        "description": """
        Abdullah's AI Voice Assistant is an interactive voice-based
        AI assistant embedded directly into his portfolio website.

        It allows visitors to ask questions about Abdullah's education,
        professional experience, projects, technical skills,
        portfolio, and background using natural voice conversation.

        The assistant can also explain how it was built and describe
        the technologies and architecture behind the voice agent.
        """,

        # --------------------------------------------------------
        # ARCHITECTURE
        # --------------------------------------------------------

        "architecture": """
        The voice assistant uses a React and TypeScript frontend
        together with a Python FastAPI backend.

        The browser captures microphone audio using the Web Audio API.

        The frontend performs voice activity detection to identify
        when the user starts and stops speaking.

        Audio is transmitted from the React frontend to the FastAPI
        backend through a WebSocket connection.

        The FastAPI backend maintains the real-time communication
        with the Gemini Live API.

        User audio is sent from the backend to Gemini, where the
        conversational AI processes the user's speech and generates
        a response.

        Gemini's generated audio is streamed back through the backend
        to the React frontend.

        The frontend receives the audio stream and plays the response
        directly in the browser.

        The frontend also manages the conversation interface,
        microphone state, transcript display, audio playback,
        connection status, mute controls, and conversation lifecycle.
        """,

        # --------------------------------------------------------
        # TECHNOLOGIES
        # --------------------------------------------------------

        "technologies": [
            "React",
            "TypeScript",
            "CSS",
            "Python",
            "FastAPI",
            "WebSockets",
            "Gemini Live API",
            "Web Audio API",
            "Real-Time Audio Streaming",
            "Voice Activity Detection"
        ],

        # --------------------------------------------------------
        # AUDIO FLOW
        # --------------------------------------------------------

        "audio_flow": """
        The voice interaction follows this general flow:

        1. The visitor opens the voice assistant on the portfolio.

        2. The visitor speaks into the browser microphone.

        3. The React frontend captures microphone audio.

        4. Voice activity detection identifies speech and silence.

        5. The frontend sends audio data through a WebSocket.

        6. The FastAPI backend receives the audio.

        7. The backend streams the audio to the Gemini Live API.

        8. Gemini processes the conversation and generates a response.

        9. Gemini's response audio is streamed back to the backend.

        10. The backend forwards the response audio to the React frontend.

        11. The frontend plays the generated audio.

        12. The conversation continues until the visitor ends the session.
        """,

        # --------------------------------------------------------
        # KNOWLEDGE SYSTEM
        # --------------------------------------------------------

        "knowledge_system": """
        The voice assistant receives structured portfolio information
        about Abdullah as context.

        This information includes his education, graduation status,
        professional experience, projects, technical skills,
        portfolio architecture, and contact information.

        The portfolio knowledge is relatively small and structured,
        so a vector database or RAG pipeline is not necessary for
        answering questions about Abdullah's portfolio.

        Instead, the structured portfolio information can be provided
        directly to the AI model as context.

        This is different from Abdullah's larger legal AI projects,
        where RAG and vector search are useful because those systems
        work with hundreds of thousands of documents.
        """,

        # --------------------------------------------------------
        # WHY IT WAS BUILT
        # --------------------------------------------------------

        "purpose": """
        Abdullah built the voice assistant as a practical demonstration
        of his experience with AI agents, real-time AI applications,
        LLM APIs, WebSockets, streaming audio, voice activity detection,
        backend development, and full-stack AI application development.

        It also provides an interactive way for recruiters, developers,
        and visitors to explore his portfolio instead of only reading
        static information.
        """,

        # --------------------------------------------------------
        # IMPORTANT DISTINCTION
        # --------------------------------------------------------

        "important_note": """
        The portfolio voice assistant is not itself the same as
        Abdullah's legal RAG system.

        The voice assistant primarily uses structured portfolio context
        because the amount of information it needs to know about Abdullah
        is relatively small.

        Abdullah's legal AI systems use much larger retrieval pipelines,
        including BM25, embeddings, FAISS, semantic search, and
        cross-encoder reranking, because those systems work with
        hundreds of thousands of legal documents.
        """
    },

    # ============================================================
    # HOW ABDULLAH APPROACHES AI SYSTEMS
    # ============================================================

    "ai_engineering_approach": """
    Abdullah focuses on building practical AI systems rather than
    using AI only as a standalone model.

    His typical approach is to first understand the business or
    application problem, then determine what data is available,
    how that data should be processed, which AI model or API is
    appropriate, and how the AI component should integrate with
    the rest of the application.

    For knowledge-intensive applications, he considers techniques
    such as RAG, embeddings, semantic search, hybrid retrieval,
    reranking, and structured data pipelines.

    For application development, he commonly uses Python and FastAPI
    for backend services and React or React Native for frontend
    applications.

    He is interested in AI agents, LLM-powered workflows, automation,
    APIs, and building MVPs that can later be scaled into production
    systems.
    """,

    # ============================================================
    # LEGAL AI EXPERIENCE
    # ============================================================

    "legal_ai_experience": {
        "documents_processed": "450,000+ court judgments",
        "legal_provisions": "40,000+",

        "description": """
        Abdullah has practical experience working with large-scale
        legal datasets.

        His legal AI work involved extracting, cleaning, validating,
        transforming, and structuring legal documents before making
        them available for AI-powered retrieval.

        The retrieval architecture combined traditional keyword
        retrieval such as BM25 with vector embeddings and FAISS,
        followed by cross-encoder reranking.

        This approach allows the system to combine lexical matching
        with semantic similarity and then improve the ranking of
        retrieved results.
        """,

        "retrieval_stack": [
            "BM25",
            "Embeddings",
            "FAISS",
            "Semantic Search",
            "Cross-Encoder Reranking"
        ]
    },

    # ============================================================
    # CAREER INTERESTS
    # ============================================================

    "career_interests": [
        "AI Engineer",
        "AI & Data Engineer",
        "AI Automation Engineer",
        "Data Engineer",
        "Generative AI Engineer",
        "LLM Engineer",
        "RAG Engineer",
        "Junior Python Developer",
        "Backend Developer",
        "React Developer",
        "React Native Developer",
        "Full-Stack Developer"
    ],

    "areas_of_interest": [
        "Generative AI",
        "Large Language Models",
        "AI Agents",
        "RAG Systems",
        "AI Automation",
        "Data Engineering",
        "Backend Engineering",
        "Semantic Search",
        "Information Retrieval",
        "LLM APIs",
        "AI Product Development"
    ],

    # ============================================================
    # GITHUB / ONLINE PRESENCE / CONTACT
    # ============================================================

    "contact": {
        "email": "abdullahahmed17882@gmail.com",

        "github": "https://github.com/Abdullah17442",

        "linkedin": "https://www.linkedin.com/in/abdullahahmed17442/"
    },

    # ============================================================
    # RESUME
    # ============================================================

    "resume": {
        "filename": "Resume-Abdullah-Ahmed.pdf",

        "description": """
        Abdullah's resume contains his education, professional
        experience, technical skills, projects, and AI/data engineering
        background.
        """
    },

    # ============================================================
    # AI ASSISTANT RESPONSE RULES
    # ============================================================

    "assistant_instructions": """
    When answering questions about Abdullah Ahmed, use the portfolio
    information provided in this context as the primary source of truth.

    IMPORTANT EDUCATION RULE:

    Abdullah Ahmed has already graduated.

    He completed his Bachelor of Science in Computer Science,
    majoring in Data Science, at HITEC University.

    His graduation date is July 2026.

    He is NOT currently a student.

    Never say that Abdullah is currently studying.

    Never say that Abdullah is still completing his degree.

    Never say that Abdullah is expected to graduate.

    Never describe his graduation as being in the future.

    If asked when Abdullah graduated, answer:
    "Abdullah graduated in July 2026."

    If asked whether Abdullah is still a student, answer:
    "No. Abdullah graduated in July 2026."

    If asked about Abdullah's education, mention that he completed
    his Bachelor of Science in Computer Science with a major in
    Data Science at HITEC University.

    When discussing his professional experience, mention his
    Data & AI Engineer experience at a stealth legal tech startup
    from February 2026 to June 2026 and his React Native Developer
    internship at NITB from July 2025 to September 2025.

    When discussing his legal AI experience, mention that he worked
    with more than 450,000 court judgments and more than 40,000
    legal provisions.

    When discussing retrieval, mention BM25, embeddings, FAISS,
    semantic search, and cross-encoder reranking where relevant.

    When discussing the portfolio voice assistant, explain that it
    uses a React and TypeScript frontend, Python FastAPI backend,
    WebSockets, real-time audio streaming, voice activity detection,
    and the Gemini Live API.

    Do not claim that the portfolio voice assistant uses RAG or a
    vector database unless the actual implementation is changed to
    use one.

    Keep answers conversational and natural because the assistant
    is a voice-based portfolio assistant.

    Do not invent experience, companies, degrees, technologies,
    projects, or achievements that are not included in the portfolio
    context.

    If information is not available in the portfolio context,
    clearly say that the information is not currently available
    rather than inventing an answer.
    """
}