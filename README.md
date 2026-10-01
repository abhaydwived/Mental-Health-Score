# Mental Health Score Predictor

🌐 **Live Demo:** [https://abhaydwived.github.io/Mental-Health-Score/](https://abhaydwived.github.io/Mental-Health-Score/)

![Mental Health Analytics](https://img.shields.io/badge/Status-Active-brightgreen)
![Python](https://img.shields.io/badge/Python-3.8%2B-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.142.2-009688)
![Scikit-Learn](https://img.shields.io/badge/scikit--learn-1.6.1-F7931E)

## 📌 Project Overview
**Mental Health Score Predictor** is a full-stack web application designed to evaluate and predict a user's mental well-being score based on their daily digital behavior and lifestyle factors. 

By analyzing inputs such as screen time, social media platform usage, sleep hours, study/work habits, and stress levels, the application leverages a pre-trained Machine Learning model to generate an instant mental health assessment.

This project is highly suitable for adding to your resume as it demonstrates the integration of Machine Learning models with modern web development architectures (FastAPI backend and a dynamic HTML/CSS/JS frontend).

## 🚀 Features
- **Interactive UI**: A modern, responsive, and user-friendly form to collect lifestyle and demographic data.
- **Instant Predictions**: Get real-time wellness scores upon form submission.
- **Machine Learning Integration**: Utilizes a pre-trained scikit-learn model (`Mental_Health_Model.pkl`) for accurate predictions based on historical data.
- **Robust REST API**: Built with **FastAPI**, handling CORS and data validation seamlessly using Pydantic models.

## 🛠️ Tech Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Python, FastAPI, Uvicorn
- **Data & ML**: Scikit-Learn, Pandas, Joblib
- **Validation**: Pydantic

## 📂 Project Structure
```text
├── index.html                  # Main frontend page with the assessment form
├── style.css                   # Styles for the UI (Layout, Animations, Theming)
├── script.js                   # Handles form submission & API requests (Frontend logic)
├── main.py                     # FastAPI server handling prediction endpoints
├── Mental_Health_Model.pkl     # Pre-trained Machine Learning model
├── requirements.txt            # Python dependencies
└── README.md                   # Project documentation
```

## ⚙️ Installation & Setup

### Prerequisites
- Python 3.8+ installed on your machine.
- A modern web browser.

### 1. Install Dependencies
Navigate to the project directory and install the required Python packages:
```bash
pip install -r requirements.txt
```

### 2. Run the Backend API
Start the FastAPI server using Uvicorn:
```bash
uvicorn main:app --reload
```
The API will be available at `http://127.0.0.1:8000`. You can also explore the interactive API documentation at `http://127.0.0.1:8000/docs`.

### 3. Run the Frontend
Simply open the `index.html` file in your preferred web browser. 
*(Alternatively, you can serve the frontend using an extension like VS Code Live Server for a better development experience).*

## 🧠 Data Science & Machine Learning Workflow
The model development process is documented in `Mental Health Score.ipynb` and involves the following steps:

### 1. Exploratory Data Analysis (EDA)
- Analyzed the distribution of the target variable (`Mental_Health_Score`).
- Investigated relationships between features:
  - **Stress vs Score**: Confirmed that higher stress levels consistently correlate with lower mental health scores.
  - **Screen Time & Sleep vs Score**: Analyzed behavioral patterns affecting the score.

### 2. Feature Engineering & Preprocessing
- **High Cardinality Handling**: Grouped the 111 unique countries into the top 10 most frequent and bucketed the rest into "Other" to retain signal without adding excessive noise.
- **Encoding Strategy**:
  - *Ordinal Encoding* for `Stress_Level` (Low < Medium < High < Very High) to preserve its natural order.
  - *One-Hot Encoding* for categorical variables like Gender, Academic Level, Platform, and Country.

### 3. Model Training & Evaluation
Multiple regression models were trained and evaluated to predict the mental health score. The performance (R² Testing Score) of each model was:
- **Linear Regression**: 73.98%
- **Decision Tree**: 74.77%
- **Random Forest (Tuned)**: 86.50%
- **Random Forest (Default)**: **87.76%** 🏆 *(Selected for deployment)*

The default **Random Forest Regressor** achieved the highest accuracy and the lowest Mean Absolute Error (MAE: 0.347), proving most capable at capturing the non-linear patterns in the dataset.

## 🚀 API Deployment & Architecture
After finding the optimal model, it was serialized (`Mental_Health_Model.pkl`) and deployed to a robust production-ready API.

- **FastAPI**: Used to build high-performance, asynchronous REST API endpoints.
- **Pydantic**: Handled strict data validation and type hinting for incoming requests. A custom `StudentData` model ensures that all constraints (e.g., age between 10-100, valid categorical options) are strictly enforced before predictions are made.
- **CORS Middleware**: Configured to seamlessly allow the HTML/Vanilla JS frontend to communicate with the backend.
## 💡 Future Enhancements
- Add user authentication and history tracking to monitor mental health over time.
- Implement data visualizations (charts/graphs) on the frontend to break down the score.
- Containerize the application using Docker for easier deployment.
