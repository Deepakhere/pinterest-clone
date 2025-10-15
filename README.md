# 🖼️ Pinterest-Style Image Gallery

A simple, responsive image gallery built with **Vite + React** and styled using **Tailwind CSS**. The gallery fetches images from the **Unsplash API** and features **infinite scroll**, **pagination**, and a **lightbox/modal** for viewing full-size images.

## 🚀 Tech Stack

- **Vite** – Fast build tool
- **React** – UI library
- **Tailwind CSS** – Styling framework
- **Unsplash API** – Image source
- **TanStack Query** (optional) – For data fetching and caching

## ✅ Features

- **Pinterest-style layout**
  - Fully responsive with 1 column on mobile, 2–3 columns on tablet, and 4–5 columns on desktop.
  - Images maintain their aspect ratio.
- **Infinite Scroll**
  - Loads 20 images initially, with more images automatically loading as the user scrolls.
  - Displays a loading spinner while fetching new images.
  - Handles the end of the result list gracefully.
- **Pagination**
  - Shows the current page number.
  - Includes buttons for navigating between pages.
  - Works seamlessly with infinite scroll.
- **Image Modal (Lightbox)**
  - Clicking an image opens a modal to display the full-size image.
  - Shows additional info like the image description (if available) and photographer's name.
  - Modal can be closed by clicking the close button, clicking outside the image, or pressing the Escape key.
  - Background is dimmed while the modal is open.
- **Error Handling**
  - User-friendly error messages when the API call fails.
  - Proper handling of network errors and loading states.

## 🛠️ Setup Instructions

### ✅ Prerequisites

- Node.js version **22.20.0** installed.
- **Unsplash Developer Account**: [Create an account here](https://unsplash.com/developers) to get your Access Key.

---

### 📦 Installation Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Create a .env file in the root directory and add your Unsplash Access Key:**
    ```bash
    VITE_UNSPLASH_ACCESS_KEY=your-access-key-here
    ```

4. **Start the development server:**
    ```bash
    npm run dev
    ```

5. **Open your browser and navigate to http://localhost:3000 to view the app.**
