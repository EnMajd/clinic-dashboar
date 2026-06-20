
# Advanced Radiology Clinic | Dr. Ahmad Al-Khatib

A complete clinic management system for a radiology practice, combining a public-facing website for booking appointments via WhatsApp and Telegram with a professional admin dashboard for managing appointments and patients. The system supports walk‑in patient registration, AI‑based X‑ray analysis (experimental), and Excel reporting.

---

##  Key Features

- **Public Patient Website**  
  A professional landing page with sections (About the Doctor, Services, Book Appointment, X‑ray Analysis).  
- **Appointment Booking**  
  Patients can book an appointment and send the details directly via **WhatsApp** or **Telegram**, with automatic saving to the database.  
- **AI X‑ray Analysis**  
  Upload an X‑ray image and receive a preliminary report using the Groq Vision API (or a simulation mode).  
- **Comprehensive Admin Dashboard**  
  - Live statistics (total appointments, new, confirmed, cancelled).  
  - Full‑featured table with sorting, search, date filtering, and export to Excel.  
  - Monthly calendar view with dots on appointment days.  
  - **Walk‑in Patient Registration** directly from the dashboard.  
  - Quick status change buttons (confirm, cancel, revert to new).  
  - Edit and delete appointments with confirmation modals.  
  - **Delete All Data** with a 5‑second countdown confirmation.  
- **Authentication System**  
  A dedicated login page (password‑protected) secures access to the admin dashboard.  
- **Dark / Light Mode**  
  Full support with preference saved locally.  
- **Fully Responsive**  
  Works on all screen sizes (mobile, tablet, desktop).  

---

##  Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Node.js + Express |
| Database | SQLite (better‑sqlite3) |
| Frontend | HTML5, CSS3, JavaScript (Vanilla) |
| Fonts | Google Fonts (Cairo) |
| Icons | Font Awesome |
| AI | Groq API (llama‑3.2‑11b‑vision‑preview) |
| Excel Export | SheetJS (xlsx) |
| File Upload | Multer |

---

##  Project Structure
