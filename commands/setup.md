# Restaurant Review Web App - Project Setup

## Objective
Create a simple web app for restaurant customers to submit star ratings and reviews, with integration for external review platforms (Google Review, OpenRice) and internal comment collection.

## Task
Set up the initial project structure in Cursor with the following requirements:

1. **Tech Stack**:
   - Frontend: React (using Vite for fast setup)
   - Backend: Node.js with Express (optional, if needed for API handling)
   - Database: Supabase (preferred) or Google Sheets API for data storage
   - Styling: Tailwind CSS for simplicity and responsiveness

2. **File Structure**:
   - `src/`
     - `components/` (for reusable UI components)
     - `pages/` (for main pages like Home, Review Form, Feedback)
     - `utils/` (for Supabase/Google Sheets integration and helper functions)
   - `public/` (for static assets like restaurant logo)
   - `server/` (if backend is needed)

3. **Setup Steps**:
   - Initialize a Vite + React project: `npm create vite@latest restaurant-review -- --template react`
   - Install Tailwind CSS: Follow official Tailwind setup for Vite
   - Install Supabase client: `npm install @supabase/supabase-js`
   - (Optional) Set up Google Sheets API credentials if chosen over Supabase
   - Create basic routing with React Router: Home page, Review page, Feedback page

4. **Deliverables**:
   - A working project skeleton with all dependencies installed
   - A Home page with a "Leave a Review" button
   - Basic routing setup for navigation

## Notes
- Keep it modular and simple.
- Use environment variables for Supabase keys or Google Sheets API credentials.
- Do not implement full functionality yet—just the foundation.