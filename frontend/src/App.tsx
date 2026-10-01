import React, { useState } from 'react';
import './App.css';

interface FormData {
  age: number | '';
  gender: string;
  country: string;
  academic_level: string;
  most_used_platform: string;
  purpose_of_use: string;
  avg_daily_usage_hours: number | '';
  daily_unlocks: number | '';
  study_hours: number | '';
  physical_activity_hours: number | '';
  sleep_hours_per_night: number | '';
  stress_level: string;
}

const initialData: FormData = {
  age: 20,
  gender: 'Male',
  country: 'USA',
  academic_level: 'Undergraduate',
  most_used_platform: 'Instagram',
  purpose_of_use: 'Entertainment',
  avg_daily_usage_hours: 3,
  daily_unlocks: 50,
  study_hours: 4,
  physical_activity_hours: 1,
  sleep_hours_per_night: 7,
  stress_level: 'Medium'
};

function App() {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    let parsedValue: string | number = value;
    if (type === 'number') {
      parsedValue = value === '' ? '' : Number(value);
    }

    setFormData(prev => ({
      ...prev,
      [name]: parsedValue
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // Convert any empty strings to 0 before sending to API
    const payload = { ...formData };
    (Object.keys(payload) as (keyof FormData)[]).forEach(key => {
      if (payload[key] === '') {
        (payload[key] as any) = 0;
      }
    });
    
    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to connect to the server');
      }

      const data = await response.json();
      setScore(data.predicted_mental_health_score);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="layout">
      <div className="card form-container">
        <div className="header">
          <h1>Mental Health Analytics</h1>
          <p>Provide your daily habits and demographic information for an instant assessment.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="form-grid">
          
          <div className="input-group">
            <label htmlFor="age">Age</label>
            <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} min="10" max="100" required />
          </div>

          <div className="input-group">
            <label htmlFor="gender">Gender</label>
            <select id="gender" name="gender" value={formData.gender} onChange={handleChange}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="country">Country</label>
            <input type="text" id="country" name="country" value={formData.country} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label htmlFor="academic_level">Academic Level</label>
            <select id="academic_level" name="academic_level" value={formData.academic_level} onChange={handleChange}>
              <option value="High School">High School</option>
              <option value="Undergraduate">Undergraduate</option>
              <option value="Graduate">Graduate</option>
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="most_used_platform">Top Platform</label>
            <select id="most_used_platform" name="most_used_platform" value={formData.most_used_platform} onChange={handleChange}>
              <option value="Facebook">Facebook</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Instagram">Instagram</option>
              <option value="Snapchat">Snapchat</option>
              <option value="Twitter">Twitter</option>
              <option value="YouTube">YouTube</option>
              <option value="TikTok">TikTok</option>
              <option value="LINE">LINE</option>
              <option value="KakaoTalk">KakaoTalk</option>
              <option value="VKontakte">VKontakte</option>
              <option value="WhatsApp">WhatsApp</option>
              <option value="WeChat">WeChat</option>
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="purpose_of_use">Main Purpose</label>
            <select id="purpose_of_use" name="purpose_of_use" value={formData.purpose_of_use} onChange={handleChange}>
              <option value="Networking">Networking</option>
              <option value="Education">Education</option>
              <option value="Entertainment">Entertainment</option>
              <option value="News">News</option>
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="avg_daily_usage_hours">Screen Time (hrs)</label>
            <input type="number" id="avg_daily_usage_hours" name="avg_daily_usage_hours" value={formData.avg_daily_usage_hours} onChange={handleChange} min="0" max="24" step="0.1" required />
          </div>

          <div className="input-group">
            <label htmlFor="daily_unlocks">Phone Unlocks</label>
            <input type="number" id="daily_unlocks" name="daily_unlocks" value={formData.daily_unlocks} onChange={handleChange} min="0" required />
          </div>

          <div className="input-group">
            <label htmlFor="study_hours">Study (hrs)</label>
            <input type="number" id="study_hours" name="study_hours" value={formData.study_hours} onChange={handleChange} min="0" max="24" step="0.1" required />
          </div>

          <div className="input-group">
            <label htmlFor="physical_activity_hours">Exercise (hrs)</label>
            <input type="number" id="physical_activity_hours" name="physical_activity_hours" value={formData.physical_activity_hours} onChange={handleChange} min="0" max="24" step="0.1" required />
          </div>

          <div className="input-group">
            <label htmlFor="sleep_hours_per_night">Sleep (hrs)</label>
            <input type="number" id="sleep_hours_per_night" name="sleep_hours_per_night" value={formData.sleep_hours_per_night} onChange={handleChange} min="0" max="24" step="0.1" required />
          </div>

          <div className="input-group">
            <label htmlFor="stress_level">Stress Level</label>
            <select id="stress_level" name="stress_level" value={formData.stress_level} onChange={handleChange}>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Very High">Very High</option>
            </select>
          </div>

          <div className="action-row">
            <button type="submit" disabled={loading} className={loading ? 'loading' : ''}>
              {loading ? 'Analyzing...' : 'Calculate Score'}
            </button>
          </div>
        </form>
      </div>

      <div className="card result-container">
        {error ? (
          <div className="error">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            <p>{error}</p>
          </div>
        ) : score !== null ? (
          <div className="score-wrapper fade-in">
            <h2>Your Wellness Score</h2>
            <div className="score-circle">
              <span className="score-number">{score}</span>
            </div>
            <p className="score-context">Based on your daily digital behavior and lifestyle factors.</p>
          </div>
        ) : (
          <div className="empty-state">
            <div className="icon-placeholder">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--border-color)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"></path></svg>
            </div>
            <p>Fill out the form and submit to see your score.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
