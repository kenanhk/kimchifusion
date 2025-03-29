# Restaurant Review Web App - Frontend Review Flow

## Objective
Build the frontend logic and UI for the review submission process, including star rating and navigation based on user input.

## Task
Implement the review submission flow with the following requirements:

1. **Components**:
   - `StarRating.js`: A reusable component for selecting 1-5 stars (use a simple clickable star system with Tailwind styling)
   - `ReviewForm.js`: Main form component containing StarRating and a "Submit" button

2. **Pages**:
   - `ReviewPage.js`:
     - Display the `ReviewForm` component
     - On submit, check the star rating:
       - If 5 stars: Redirect to an external review link (Google Review or OpenRice, configurable via a variable)
       - If < 5 stars: Navigate to `/feedback` page
   - `FeedbackPage.js`:
     - Show a text area for customer comments/concerns
     - Add a "Submit Feedback" button

3. **Logic**:
   - Use React state to track the selected star rating
   - Use React Router for navigation between pages
   - For 5-star redirect, use `window.location.href` to open external links (e.g., "https://www.google.com/reviews/restaurant-id" or "https://www.openrice.com/review")
   - Store the rating temporarily in state before redirecting or navigating

4. **UI Requirements**:
   - Clean, mobile-friendly design with Tailwind CSS
   - Stars should highlight on hover/click (yellow for selected, gray for unselected)
   - Feedback page should have a simple form layout with a text area and button

## Deliverables**:
   - A functional `ReviewPage` where users can select stars and submit
   - Conditional navigation: 5 stars → external link, < 5 stars → `FeedbackPage`
   - A styled, responsive UI for both pages

## Notes
- Hardcode external review links for now (e.g., placeholders).
- Do not connect to the database yet—just focus on the frontend flow.