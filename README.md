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

5. **Open your browser and navigate to http://localhost:5174 to view the app.**

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ImageGallery/   # Main gallery component with masonry layout
│   ├── ImageModal/     # Modal/lightbox component
│   ├── LoadingSpinner/ # Loading indicator component
│   ├── ErrorMessage/   # Error display component
│   └── PaginationControls/ # Pagination component
├── pages/              # Page components
│   └── Gallery/        # Main gallery page
├── hooks/              # Custom React hooks
│   ├── useInfiniteScroll.ts # Infinite scroll logic
│   └── useModal.ts     # Modal state management
├── services/           # API services (organized by endpoint)
│   ├── get-photos/     # Fetch photos list API
│   │   ├── get-photos.ts
│   │   └── index.ts
│   ├── search-photos/  # Search photos API
│   │   ├── search-photos.ts
│   │   └── index.ts
│   ├── get-photo-by-id/ # Get single photo API
│   │   ├── get-photo-by-id.ts
│   │   └── index.ts
│   ├── track-download/ # Download tracking API
│   │   ├── track-download.ts
│   │   └── index.ts
│   ├── image-utils/    # Image utility functions
│   │   ├── image-utils.ts
│   │   └── index.ts
│   ├── shared/         # Shared API utilities
│   │   ├── api-client.ts
│   │   ├── error-handler.ts
│   │   └── index.ts
│   └── index.ts        # Main services export
├── types/              # TypeScript type definitions
│   └── index.ts        # All type definitions
├── utils/              # Utility functions and config
│   └── config.ts       # App configuration
└── routes/             # Routing configuration
    └── AppRouter.tsx   # Main router setup
```

Each component follows the pattern:
- `ComponentName/`
  - `index.ts` - Export file
  - `ComponentName.tsx` - React component
  - `ComponentNameController.ts` - Business logic/controller

## 🎯 Implementation Highlights

### Masonry Layout
- Uses CSS `columns` property for responsive masonry layout
- Automatically adjusts column count based on screen size
- Maintains aspect ratios of original images

### Infinite Scroll
- Implemented with `react-intersection-observer`
- TanStack Query for data fetching and caching
- Smooth loading indicators and error handling

### Image Modal
- Full-screen image viewing with photographer details
- Keyboard navigation (ESC to close)
- Click outside to close functionality
- Background blur effect

### Error Handling
- Comprehensive error handling for API failures
- Network error detection and retry functionality
- User-friendly error messages

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 Responsive Design

- **Mobile** (< 640px): 1 column
- **Tablet** (640px - 1024px): 2-3 columns
- **Desktop** (> 1024px): 4-5 columns
