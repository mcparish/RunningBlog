import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface BlogPost {
  date: string;
  day: string;
  miles: number;
  title: string;
  content: string;
}

const BlogPostPage: React.FC = () => {
  const { date } = useParams<{ date: string }>();
  const navigate = useNavigate();
  const [blogPost, setBlogPost] = useState<BlogPost>({
    date: date || '',
    day: date || '',
    miles: 0,
    title: '',
    content: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (date) {
      // Load weekly miles to get the miles for this day
      const savedWeeklyMiles = localStorage.getItem('weeklyMiles');
      if (savedWeeklyMiles) {
        const weeklyMiles = JSON.parse(savedWeeklyMiles);
        const dayMiles = weeklyMiles[date] || 0;
        
        // Load existing blog post if available
        const savedBlogPosts = localStorage.getItem('blogPosts');
        let existingPost = null;
        
        if (savedBlogPosts) {
          const blogPosts = JSON.parse(savedBlogPosts);
          existingPost = blogPosts[date];
        }

        setBlogPost(prev => ({
          ...prev,
          date: date,
          day: date,
          miles: dayMiles,
          title: existingPost?.title || `${date.charAt(0).toUpperCase() + date.slice(1)} Run - ${dayMiles} miles`,
          content: existingPost?.content || ''
        }));

        // If no existing post, start in editing mode
        if (!existingPost || !existingPost.content) {
          setIsEditing(true);
        }
      }
    }
  }, [date]);

  const handleSave = () => {
    // Save blog post to localStorage
    const savedBlogPosts = localStorage.getItem('blogPosts');
    const blogPosts = savedBlogPosts ? JSON.parse(savedBlogPosts) : {};
    
    blogPosts[date!] = {
      title: blogPost.title,
      content: blogPost.content,
      date: blogPost.date,
      day: blogPost.day,
      miles: blogPost.miles
    };
    
    localStorage.setItem('blogPosts', JSON.stringify(blogPosts));
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reload from localStorage
    const savedBlogPosts = localStorage.getItem('blogPosts');
    if (savedBlogPosts) {
      const blogPosts = JSON.parse(savedBlogPosts);
      const existingPost = blogPosts[date!];
      if (existingPost) {
        setBlogPost(prev => ({
          ...prev,
          title: existingPost.title,
          content: existingPost.content
        }));
      }
    }
    setIsEditing(false);
  };

  const formatDate = (day: string) => {
    const today = new Date();
    const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const currentDayIndex = today.getDay();
    const targetDayIndex = dayNames.indexOf(day.toLowerCase());
    
    // Calculate days difference (Monday as start of week)
    let daysDiff = targetDayIndex - 1; // Monday = 0
    if (daysDiff < 0) daysDiff = 6; // Sunday becomes 6
    
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() - currentDayIndex + 1 + daysDiff);
    
    return targetDate.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <section className="section">
      <div className="container">
        {/* Navigation */}
        <nav className="breadcrumb" aria-label="breadcrumbs">
          <ul>
            <li>
              <button 
                className="button is-text"
                onClick={() => navigate('/')}
              >
                ← Back to Calendar
              </button>
            </li>
          </ul>
        </nav>

        {/* Blog Post Header */}
        <div className="box">
          <div className="level">
            <div className="level-left">
              <div className="level-item">
                <div>
                  <p className="heading">Running Date</p>
                  <p className="title is-4">{formatDate(blogPost.day)}</p>
                </div>
              </div>
              <div className="level-item">
                <div>
                  <p className="heading">Distance</p>
                  <p className="title is-4">{blogPost.miles.toFixed(1)} miles</p>
                </div>
              </div>
            </div>
            <div className="level-right">
              <div className="level-item">
                {!isEditing ? (
                  <button 
                    className="button is-primary"
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Post
                  </button>
                ) : (
                  <div className="buttons">
                    <button 
                      className="button is-success"
                      onClick={handleSave}
                    >
                      Save
                    </button>
                    <button 
                      className="button is-light"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Blog Post Content */}
        <div className="box">
          {isEditing ? (
            <div>
              <div className="field">
                <label className="label">Post Title</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    value={blogPost.title}
                    onChange={(e) => setBlogPost(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter a title for your running post..."
                  />
                </div>
              </div>
              
              <div className="field">
                <label className="label">Your Running Experience</label>
                <div className="control">
                  <textarea
                    className="textarea"
                    rows={10}
                    value={blogPost.content}
                    onChange={(e) => setBlogPost(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="How was your run today? Share your thoughts, feelings, route details, weather conditions, achievements, or anything else about your running experience..."
                  />
                </div>
                <p className="help">
                  Share details about your run: route, pace, weather, how you felt, achievements, challenges, etc.
                </p>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="title is-3">{blogPost.title}</h2>
              {blogPost.content ? (
                <div className="content">
                  {blogPost.content.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              ) : (
                <div className="notification is-light">
                  <p>No blog post content yet. Click "Edit Post" to add your running experience!</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Suggestions for first-time users */}
        {isEditing && !blogPost.content && (
          <div className="box">
            <h3 className="title is-5">💡 Writing Suggestions</h3>
            <div className="content">
              <p>Not sure what to write? Here are some ideas:</p>
              <ul>
                <li><strong>Route & Distance:</strong> Where did you run and how far?</li>
                <li><strong>Pace & Performance:</strong> How did you feel? Was it easy or challenging?</li>
                <li><strong>Weather Conditions:</strong> How was the weather? Did it affect your run?</li>
                <li><strong>Achievements:</strong> Did you hit any personal goals or milestones?</li>
                <li><strong>Challenges:</strong> What was difficult about today's run?</li>
                <li><strong>Mood & Energy:</strong> How did you feel before, during, and after?</li>
                <li><strong>Equipment:</strong> New shoes, gear, or technology you tried?</li>
                <li><strong>Future Plans:</strong> What's next in your training?</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogPostPage;