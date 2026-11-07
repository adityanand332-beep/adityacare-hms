# AdityaCare HMS — Appointment Booking Edition

A portfolio/demo hospital management application built with React, Vite, Node.js, Express and MongoDB.

## What is included
- Public hospital landing page and searchable doctor directory.
- Patient self-registration and sign-in.
- Patient appointment requests with doctor, date and available time-slot selection.
- Patients can view, cancel and reschedule their own appointments.
- Admin dashboard with doctor/patient directories and appointment approve/reject/complete actions.
- Doctor sign-in and a schedule limited to that doctor's appointments.
- Demo seed data: 500 fictional doctors, 500 fictional patients and 1,200 fictional historical appointments.

## Requirements
- Node.js 18+ (Node 20 LTS recommended)
- MongoDB running locally

## Setup
### 1. Backend
Open a terminal in `server`:
```bash
npm install
```
Create `.env` from `.env.example` and set a long random `JWT_SECRET` before use.
```bash
npm run seed
npm run dev
```
Seeding **deletes and recreates the demo doctors, patients and appointments collections and doctor demo accounts**. Do not rerun it after entering data you want to keep.

### 2. Frontend
Open a second terminal in `client`:
```bash
npm install
npm run dev
```
Open the exact Local URL printed by Vite (normally http://localhost:5173).

## Demo accounts
- Admin: `admin@adityacare.demo` / `AdityaCare@2026`
- Doctor 1: `doctor1@adityacare.demo` / `Doctor@2026`
- Doctor 2: `doctor2@adityacare.demo` / `Doctor@2026`
- Patients: create a new patient account from the landing page.

All 500 seeded doctor accounts use the same demo password `Doctor@2026`; this is only for local demonstration. Patients register with their own email and password.

## Important limitations
This is an educational portfolio demo, not a production hospital information system. All seeded patient and appointment records are fictional. Do not enter real patient/medical information or use it for clinical decisions. A real deployment needs stronger security, verified identity, role-based audit trails, privacy/legal compliance, backups, rate limiting, CSRF protections, secure secret management, HTTPS, and operational review. Appointment slot checking is a demo-level availability check and does not yet use a transactional booking lock, so it is not suitable for high-concurrency real bookings.

**AdityaCare Multispeciality Hospital** — Your Health, Our Priority.  
Designed & Developed by Aditya Anand · 2026
