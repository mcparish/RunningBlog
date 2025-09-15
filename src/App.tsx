import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import BlogPostPage from './components/BlogPostPage';

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog/:date" element={<BlogPostPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
