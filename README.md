# VSU Hustle

**A peer-to-peer service marketplace for Virginia State University students**

VSU Hustle is a platform that empowers VSU students to promote and book on-campus side hustles — from haircuts and tutoring to flyer design and photography. Built specifically for the VSU community, it provides a central place for student talent to connect.

---

## Features

- Mobile-responsive user interface
- Landing page with dynamic navigation and user login dropdown
- Business listing pages with contact details, services, and reviews
- Search functionality:
  - By name
  - By category
  - (Planned: fuzzy search and autocomplete)
- Category pages that display relevant businesses
- Featured listings section for high-visibility promotion
- Keyword and category-based filtering
- Review system with star ratings, timestamps, and averages
- New Listing form with:
  - Title, category, and description
  - Contact information and business hours
  - Keyword tagging and image URL
  - Dynamic service entry with pricing and duration
- Centralized error handling using toast notifications

---

## Current Progress

| Component/Feature         | Status   |
| ------------------------- | -------- |
| Mobile Styling            | Complete |
| Landing Page              | Complete |
| Navigation Bar            | Complete |
| Business Directory        | Complete |
| Search by Name/Category   | Complete |
| Fuzzy Matching            | Planned  |
| Featured Section          | Complete |
| Category View             | Complete |
| Listing Details Page      | Complete |
| New Listing Form          | Complete |
| Error Handling            | Complete |
| Authentication            | Set Up   |
| Review System             | Basic    |
| Dashboard / Edit Listings | Planned  |
| Booking + Messaging       | Coming   |
| File Uploads              | Coming   |
| Filtering and Sort By     | Coming   |

---

## Roadmap

| Week    | Focus                                         |
| ------- | --------------------------------------------- |
| Week 1  | Planning, wireframes, project setup           |
| Week 2  | Auth, model creation, Firestore integration   |
| Week 3  | Listings display & search features            |
| Week 4  | Listing form, category-based filtering        |
| Week 5  | Dashboard, file uploads, autocomplete search  |
| Week 6+ | Ratings, bookings, student email verification |

---

## Tech Stack

| Layer       | Tools                                          |
| ----------- | ---------------------------------------------- |
| Frontend    | React (JavaScript), Tailwind CSS               |
| Backend/API | Firebase SDK                                   |
| Auth        | Firebase Auth                                  |
| Database    | Firestore                                      |
| Hosting     | Vercel (frontend), Firebase Hosting (optional) |

---

## TypeScript Upgrade

The MVP is currently written in JavaScript for rapid development. A migration to TypeScript is planned under the `ts-upgrade` branch to improve long-term maintainability and type safety.

---

## About the Creator

> “Many of us at VSU have talents and skills — tutoring, cutting hair, designing — but no streamlined way to promote it. VSU Hustle aims to change that.”

— Jordan Daniel  
Bachelor of Computer Science, Virginia State University

---

## Development Notes

- Centralized error handling using `handleError` and `handleFirebaseError`
- Firebase integration is modular for future scale
- React Router v6+ with `useNavigate` and `useParams`
- Fully mobile responsive and tested across devices

---

## Contributing

This project is actively maintained by a VSU student. If you're a student, alum, or supporter who’d like to contribute—especially with design, testing, or writing—please get in touch:

- GitHub: [@jjosephd](https://github.com/jjosephd)
- Email: jdan7808@students.vsu.edu

---

## License

MIT License — open for learning, remixing, and improving.
