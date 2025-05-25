#  VSU Hustle

**A peer-to-peer service marketplace for Virginia State University students.**

VSU Hustle is a student-built platform that helps students discover, promote, and book on-campus side hustles — from haircuts and tutoring to flyer design and photography. Built with real VSU student needs in mind, it connects hustlers with their campus community.

---

## 📸 Features (MVP)

- 🛍 Browse services by category (Hair, Tutoring, Creative, etc.)
- 🔍 Search and filter service listings
- 👤 Student-authenticated login and service posting
- 📝 Dashboard to manage your listings
- 📨 Direct inquiry or contact links for buyers

---

## 📅 Roadmap

| Phase       | Focus                                          |
| ----------- | ---------------------------------------------- |
| ✅ Week 1   | Planning & UI wireframes                       |
| ✅ Week 2   | Auth + service listing model                   |
| 🔄 Week 3   | Browse & search listings                       |
| 🔄 Week 4   | Dashboard & file uploads                       |
| 🛠️ Week 5   | Contact flow & UI polish                       |
| ⏳ Week 6–7 | Ratings, booking, and deployment               |
| 🧪 Stretch  | Payments, reviews, VSU-only email verification |

---

## 🛠 Tech Stack

| Layer       | Tools                                                   |
| ----------- | ------------------------------------------------------- |
| Frontend    | React (JavaScript) + Tailwind                           |
| Backend/API | Flask or Firebase (TBD)                                 |
| Database    | Firestore or PostgreSQL                                 |
| Auth        | Firebase Auth or Supabase                               |
| Hosting     | Vercel (Frontend), Render or Firebase Hosting (Backend) |

---

## ✏️ Planned Upgrade: TypeScript

This MVP is being developed in **JavaScript** for rapid iteration. A TypeScript migration is planned under the `ts-upgrade` branch to improve long-term maintainability.

---

## 🧑‍🎓 Why VSU Hustle?

> "A lot of us are grinding with skills on the side — cutting hair, doing nails, tutoring, designing, fixing phones — but there's no organized way to promote that on campus. VSU Hustle changes that."

- Jordan Daniel, Creator
- Bachelor of Computer Science, Virginia State University

---

## 📌 To Do

- [ ] Finalize tech stack
- [ ] Set up project boilerplate
- [ ] Build listing form + listing viewer
- [ ] Implement student-only login
- [ ] Polish responsive design

---

## 🙌 Contributing

Right now, this is a solo project. If you're a VSU student or alum and want to contribute (especially designers or testers), DM [@jjosephd on GitHub](https://github.com/jjosephd) or email jdan7808@students.vsu.edu.

---

## 🏁 License

MIT — Open to learn, remix, and build better.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
