# AdaptLearn Landing Page

A highly polished, responsive, and animated landing page for **AdaptLearn**—a personalized learning platform. This project was meticulously crafted from a Figma prototype to deliver a premium user experience with fluid scrolling animations, custom hover effects, and dynamic 3D interactions.

## ✨ Features

- **Pixel-Perfect UI**: Precisely matches the provided Figma prototype's typography (Inter), color palette (dark teal & pale green), and spatial layouts.
- **Dynamic 3D Stack Animation**: The hero section features a beautiful stacked card component. As you scroll, the cards fluidly stagger, scale up, and vanish upwards one-by-one. When you scroll back up, the stack perfectly rebuilds itself.
- **Bidirectional Scroll Staggering**: Uses `IntersectionObserver` to track scroll direction. Elements seamlessly cascade up and down as they enter and leave the viewport with organic sibling delays.
- **Interactive Wiping CTA Blocks**: Call-to-action blocks feature a robust left-to-right background color wipe, followed by a smooth text fade-in.
- **Top Scroll Progress Bar**: A sleek progress line anchored to the top of the window that fills left-to-right as you scroll down the page.
- **Go To Top Button**: A stylish floating arrow button that appears dynamically to return you to the top.
- **Premium Hover States**: Buttons feature glowing deep-teal auras, while tabs and cards elevate with deep, layered box-shadows.

## 🛠️ Technologies Used

- **HTML5**: Semantic and clean structure.
- **CSS3 (Vanilla)**: Advanced techniques used for `clip-path`, pseudo-elements (`::before`), CSS variables, flexbox/grid layouts, and cubic-bezier transitions. No external CSS frameworks were used for maximum flexibility and performance.
- **JavaScript (Vanilla)**: For `IntersectionObserver` logic, window scroll event listeners, and dynamic DOM manipulation.
- **Vite**: Blazing fast frontend build tool and development server.

## 🚀 Getting Started

To run this project locally, follow these simple steps:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository** (or download the source code):
   ```bash
   git clone <your-repo-url>
   cd adapt-learn-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **View the app**:
   Open your browser and navigate to `http://localhost:5173/` (or the port specified in your terminal).

## 📁 Project Structure

```text
adapt-learn-app/
├── public/                 # Static assets (images, icons)
├── index.html              # Main HTML structure
├── style.css               # All custom styling and animations
├── main.js                 # Scroll listeners and IntersectionObserver logic
└── package.json            # Project metadata and scripts
```

## 🎨 Design Notes

The core design centers around an adaptive learning experience, reflecting the platform's core offering. The use of soft mint greens (`#e1eee7` and `#f2f7f5`) paired with strong, confident dark teals (`#1a3b44`) creates an environment that feels both professional and welcoming.
