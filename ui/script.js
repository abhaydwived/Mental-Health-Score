document.getElementById('prediction-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const submitBtn = document.getElementById('submit-btn');
  const emptyState = document.getElementById('empty-state');
  const scoreState = document.getElementById('score-state');
  const errorState = document.getElementById('error-state');
  const scoreDisplay = document.getElementById('score-display');
  const errorMessage = document.getElementById('error-message');
  
  submitBtn.disabled = true;
  submitBtn.textContent = 'Analyzing...';
  
  emptyState.style.display = 'none';
  scoreState.style.display = 'none';
  errorState.style.display = 'none';
  
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  
  // Convert number strings to actual numbers
  const numberFields = ['age', 'avg_daily_usage_hours', 'daily_unlocks', 'study_hours', 'physical_activity_hours', 'sleep_hours_per_night'];
  numberFields.forEach(field => {
    data[field] = data[field] === '' ? 0 : Number(data[field]);
  });

  try {
    const response = await fetch('http://localhost:8000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to connect to the server');
    }

    const result = await response.json();
    
    scoreDisplay.textContent = result.predicted_mental_health_score;
    scoreState.style.display = 'flex';
    
  } catch (err) {
    errorMessage.textContent = err.message || 'Something went wrong';
    errorState.style.display = 'flex';
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Calculate Score';
  }
});
