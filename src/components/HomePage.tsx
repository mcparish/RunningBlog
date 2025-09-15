import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface WeeklyMiles {
  monday: number;
  tuesday: number;
  wednesday: number;
  thursday: number;
  friday: number;
  saturday: number;
  sunday: number;
}

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [miles, setMiles] = useState<number>(0);
  const [weeklyMiles, setWeeklyMiles] = useState<WeeklyMiles>({
    monday: 0,
    tuesday: 0,
    wednesday: 0,
    thursday: 0,
    friday: 0,
    saturday: 0,
    sunday: 0,
  });

  // Load saved data from localStorage
  useEffect(() => {
    const savedMiles = localStorage.getItem('weeklyMiles');
    if (savedMiles) {
      setWeeklyMiles(JSON.parse(savedMiles));
    }
  }, []);

  // Save data to localStorage whenever weeklyMiles changes
  useEffect(() => {
    localStorage.setItem('weeklyMiles', JSON.stringify(weeklyMiles));
  }, [weeklyMiles]);

  const handleMilesSubmit = (day: keyof WeeklyMiles) => {
    if (miles > 0) {
      setWeeklyMiles(prev => ({
        ...prev,
        [day]: miles
      }));
      setMiles(0);
    }
  };

  const handleDayClick = (day: string, dayMiles: number) => {
    if (dayMiles > 0) {
      navigate(`/blog/${day}`);
    }
  };

  const getTotalMiles = () => {
    return Object.values(weeklyMiles).reduce((total, dayMiles) => total + dayMiles, 0);
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
    targetDate.setDate(today.getDate() - currentDayIndex + 1 + daysDiff); // Start from Monday
    
    return targetDate.toLocaleDateString();
  };

  return (
    <section className="section">
      <div className="container">
        <h1 className="title has-text-centered">Running Blog</h1>
        
        {/* Miles Input Section */}
        <div className="box">
          <h2 className="subtitle">Enter Your Running Miles</h2>
          <div className="field has-addons">
            <div className="control">
              <input
                className="input"
                type="number"
                placeholder="Miles"
                value={miles || ''}
                onChange={(e) => setMiles(parseFloat(e.target.value) || 0)}
                min="0"
                step="0.1"
              />
            </div>
          </div>
        </div>

        {/* Weekly Calendar */}
        <div className="box weekly-calendar">
          <h2 className="subtitle">Weekly Running Log</h2>
          <div className="table-container">
            <table className="table is-fullwidth is-striped">
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Date</th>
                  <th>Miles</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(weeklyMiles).map(([day, dayMiles]) => (
                  <tr key={day}>
                    <td className="is-capitalized">
                      <strong>{day}</strong>
                    </td>
                    <td>{formatDate(day)}</td>
                    <td>
                      {dayMiles > 0 ? (
                        <span
                          className="clickable-miles"
                          onClick={() => handleDayClick(day, dayMiles)}
                          title="Click to view/edit blog post"
                        >
                          {dayMiles.toFixed(1)}
                        </span>
                      ) : (
                        <span>0.0</span>
                      )}
                    </td>
                    <td>
                      <button
                        className="button is-primary is-small"
                        onClick={() => handleMilesSubmit(day as keyof WeeklyMiles)}
                        disabled={miles <= 0}
                      >
                        Add Miles
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <th colSpan={2}>Weekly Total</th>
                  <th>{getTotalMiles().toFixed(1)}</th>
                  <th></th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Instructions */}
        <div className="notification is-info is-light">
          <p><strong>How to use:</strong></p>
          <ul>
            <li>Enter your miles in the input field above</li>
            <li>Click "Add Miles" for the corresponding day</li>
            <li>Click on any miles value to create or view a blog post for that day</li>
            <li>Your data is automatically saved locally</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default HomePage;