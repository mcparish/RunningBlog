# RunningBlog

A React-based running blog application built with Bulma CSS framework that allows users to track their weekly running miles and create blog posts for each day.

## Features

- **Weekly Calendar**: Enter and track running miles for each day of the week (Monday-Sunday)
- **Automatic Totals**: Calculates weekly mileage totals automatically
- **Blog Posts**: Click on any day's miles to create and edit detailed blog posts about your runs
- **Local Storage**: All data is saved locally in your browser
- **Responsive Design**: Clean, mobile-friendly interface using Bulma CSS framework

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/mcparish/RunningBlog.git
cd RunningBlog
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## How to Use

1. **Add Miles**: Enter your running distance in the input field and click "Add Miles" for the corresponding day
2. **View Weekly Total**: The total miles for the week are automatically calculated and displayed
3. **Create Blog Posts**: Click on any blue, underlined miles value to create or edit a blog post for that day
4. **Write About Your Run**: Use the provided writing prompts to share details about your running experience
5. **Navigate**: Use the "Back to Calendar" link to return to the main page

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Bulma CSS Framework
- **Routing**: React Router DOM
- **State Management**: React Hooks
- **Data Persistence**: Browser localStorage

## Project Structure

```
src/
├── components/
│   ├── HomePage.tsx        # Main calendar and miles input page
│   └── BlogPostPage.tsx    # Individual blog post creation/editing
├── App.tsx                 # Main app component with routing
├── index.css              # Global styles and Bulma imports
└── main.tsx               # Application entry point
```

## Contributing

Feel free to fork this project and submit pull requests for any improvements.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
