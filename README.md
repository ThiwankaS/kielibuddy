# 🇫🇮 Kielibuddy
**Finnish vocabulary, simplified.**

Kielibuddy is a modern, full-stack language learning platform designed to help users master the complexities of the Finnish language. The project emphasizes a robust DevOps lifecycle, featuring containerized deployment and automated quality gates.



---

## 🚀 Live Demo
**View the project live:** [https://kielibuddy.fly.dev](https://kielibuddy.fly.dev)

---

## 🛠️ Technical Stack
* **Frontend**: React (Vite), JavaScript, and **Tailwind CSS** (Planned for UI).
* **Backend**: **Go 1.23** (standard library for high-performance routing).
* **Database**: **MongoDB** (Planned for vocabulary storage).
* **DevOps**: Docker (multi-stage builds), GitHub Actions (CI/CD), and Fly.io.
* **Testing**: Cypress (E2E) and Go `testing` package (Unit).

---

## 🔄 CI/CD Pipeline
This project follows a strict **Test-Deploy-Release** workflow:
1.  **Test**: Every push to `main` triggers Go unit tests and Cypress E2E tests.
2.  **Deploy**: Upon success, a multi-stage Docker build packages the app for Fly.io.
3.  **Release**: An automated GitHub Release is created with a unique version tag.

---

## 🗺️ Roadmap & Future Plans

### Phase 2: Core Features
* **MongoDB Integration**: Flexible, document-based storage for vocabulary.
* **Tailwind CSS**: Migration to Tailwind for a polished, responsive UI.
* **User Authentication**: Secure sessions for progress tracking.

### Phase 3: Finnish-Specific Tools
* **Case-Ending Engine**: Drills for the 15 Finnish noun cases.
* **Vowel Harmony**: Real-time feedback on phonetic construction.
* **KPT-Gradation**: Visual guides for consonant gradation.

---

## 💻 Local Development

### Prerequisites
* Go 1.23+
* Node.js 22+
* Docker

### Setup
1.  **Clone & Build**:
    ```bash
    git clone [https://github.com/thiwankas/kielibuddy.git](https://github.com/thiwankas/kielibuddy.git)
    cd kielibuddy
    sudo docker build -t kielibuddy-local .
    ```
2.  **Run**:
    ```bash
    sudo docker run -p 8080:8080 kielibuddy-local
    ```

---

## 👤 Author
**Thiwanka**
* GitHub: [@thiwankas](https://github.com/ThiwankaS)
