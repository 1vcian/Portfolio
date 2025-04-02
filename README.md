# Lucian Medrihan's Personal Portfolio

![Technologies](https://img.shields.io/badge/Tech-Next.js%20%7C%20React%20%7C%20TypeScript%20%7C%20Tailwind-blue)

This repository contains the source code of my personal portfolio, a web application developed with Next.js that showcases my skills, experiences, and projects as a Full Stack Software Engineer.

## Live Demo

### [Try Me](https://1vcian.github.io/Portfolio/)

## 📄 Resume Templates

I've created custom LaTeX resume templates that are available in this repository:

- **English Resume**: A clean, professional template with highlighted skills and project sections
- **Italian Resume**: Translated version of the same template

Feel free to use these templates for your own resume! They're available in the `/public` directory.

## 🚀 Technologies Used

- **Frontend**: React.js, Next.js, TypeScript
- **Styling**: Tailwind CSS, AOS (Animate On Scroll)
- **Analytics**: Vercel Analytics, Google Analytics
- **Deployment**: Vercel
- **Resume**: LaTeX

## 📋 Features

- **Responsive Design**: Optimized for devices of all sizes
- **Smooth Animations**: Implemented with the AOS library
- **Main Sections**:
  - About Me: Personal introduction and technical skills
  - Where I Have Worked: Work experiences
  - Something I've Built: Completed projects
  - Get In Touch: Contact form
- **Analytics Integration**: Performance monitoring with Vercel Speed Insights
- **Downloadable Resume**: Custom-designed LaTeX resume templates in multiple languages

## 🛠️ Installation and Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/tuousername/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser** and visit `http://localhost:3000`

## 🏗️ Project Structure

```
├── components/         # React components
│   ├── Header/         # Header components
│   ├── Home/           # Main home components
│   │   ├── AboutMe/    # "About Me" section
│   │   ├── WhereIHaveWorked/ # Work experiences section
│   │   └── SomethingIveBuilt/ # Projects section
│   └── Icons/          # Icon components
├── pages/              # Next.js pages
├── public/             # Static assets
├── styles/             # Global CSS files
└── config.ts           # Configurations
```

## 📦 Production Build

```bash
npm run build
npm start
# or
yarn build
yarn start
```