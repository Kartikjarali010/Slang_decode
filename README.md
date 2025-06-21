<a href="https://studio.firebase.google.com/import?url=https%3A%2F%2Fgithub.com%2FKartikjarali010%2FSlang_decode">
  <picture>
    <source
      media="(prefers-color-scheme: dark)"
      srcset="https://cdn.firebasestudio.dev/btn/open_light_32.svg">
    <source
      media="(prefers-color-scheme: light)"
      srcset="https://cdn.firebasestudio.dev/btn/open_dark_32.svg">
    <img
      height="32"
      alt="Open in Firebase Studio"
      src="https://cdn.firebasestudio.dev/btn/open_blue_32.svg">
  </picture>
</a>

# Slang Decoder

This is a Next.js application that uses AI to define modern slang and internet terminology. Users can enter a slang word and get its definition, along with a confidence score for the provided explanation.

## Features

- **AI-Powered Definitions**: Utilizes Genkit and Google's Gemini models to provide accurate and context-aware definitions of slang words.
- **Definition Evaluation**: An AI-powered evaluation flow assesses the accuracy and confidence of the initial definition.
- **Trending Searches**: A list of popular slang terms for users to quickly search.
- **Light & Dark Mode**: A theme toggle allows users to switch between light and dark themes.
- **Responsive Design**: The UI is fully responsive and works on all screen sizes.
- **Dynamic Background**: A subtle, animated background adds a modern touch to the user interface.

## Tech Stack

- [Next.js](https://nextjs.org/) – React framework for building server-side rendered and static web applications.
- [React](https://reactjs.org/) – A JavaScript library for building user interfaces.
- [TypeScript](https://www.typescriptlang.org/) – A typed superset of JavaScript that compiles to plain JavaScript.
- [Tailwind CSS](https://tailwindcss.com/) – A utility-first CSS framework for rapid UI development.
- [ShadCN UI](https://ui.shadcn.com/) – A collection of re-usable components built with Radix UI and Tailwind CSS.
- [Genkit](https://firebase.google.com/docs/genkit) – An open-source framework from Google to build, deploy, and monitor production-grade AI-powered features.
- [Lucide React](https://lucide.dev/) – A beautiful and consistent icon library.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18 or later)
- [npm](https://www.npmjs.com/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd <project-directory>
    ```
3.  **Install NPM packages:**
    ```bash
    npm install
    ```

### Environment Variables

To run this project, you will need to add the following environment variable to your `.env` file:

`GOOGLE_API_KEY="YOUR_API_KEY_HERE"`

You can get a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Running the Application

1.  **Start the development server:**
    ```bash
    npm run dev
    ```
2.  **Open your browser** and navigate to `http://localhost:3000`.
