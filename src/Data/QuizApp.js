import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './QuizApp.css';

const QuizApp = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState(Array(5).fill(null));

  const questions = [
    {
      question: "What is the temperature of Hawking radiation emitted by a black hole?",
      options: [
        "T = ℏc³/(8πGMk_b)",
        "T = ℏc²/(4πGMk_b)",
        "T = ℏc/(2πGMk_b)",
        "T = ℏc⁴/(16πGMk_b)"
      ],
      correctAnswer: 0,
      explanation: "The correct formula for Hawking temperature is T_H = ℏc³/(8πGMk_b), where ℏ is the reduced Planck constant, c is the speed of light, G is the gravitational constant, M is the black hole mass, and k_b is the Boltzmann constant."
    },
    {
      question: "What defines the event horizon of a black hole?",
      options: [
        "The surface where light can orbit indefinitely",
        "The boundary where escape velocity equals the speed of light",
        "The point where tidal forces become infinite",
        "The region where time stops completely"
      ],
      correctAnswer: 1,
      explanation: "The event horizon is defined as the boundary where the escape velocity equals the speed of light. Nothing, not even light, can escape from within this boundary."
    },
    {
      question: "What is the significance of the Schwarzschild radius (r = 2M)?",
      options: [
        "It's where the black hole's gravity becomes repulsive",
        "It marks the location of the event horizon",
        "It's where time flows backwards",
        "It's the point where space becomes Euclidean"
      ],
      correctAnswer: 1,
      explanation: "The Schwarzschild radius (r = 2M) marks the location of the event horizon for a non-rotating black hole. At this radius, the escape velocity equals the speed of light."
    },
    {
      question: "What is the Unruh effect, which is analogous to Hawking radiation?",
      options: [
        "Accelerated observers detect thermal radiation in vacuum",
        "Black holes emit gravitational waves when merging",
        "Quantum particles tunnel through event horizons",
        "Space-time curvature creates virtual particles"
      ],
      correctAnswer: 0,
      explanation: "The Unruh effect predicts that an accelerated observer will detect thermal radiation in what an inertial observer would perceive as a vacuum. This is analogous to how Hawking radiation appears to a static observer near a black hole."
    },
    {
      question: "What does the Kruskal-Szekeres extension reveal about Schwarzschild black holes?",
      options: [
        "They contain wormholes to other universes",
        "They have both future and past singularities",
        "They possess a white hole counterpart",
        "All of the above"
      ],
      correctAnswer: 3,
      explanation: "The Kruskal-Szekeres extension of the Schwarzschild solution reveals a maximal extension that includes: (1) a white hole region (past singularity), (2) a black hole region (future singularity), and (3) another asymptotically flat universe connected via the interior."
    }
  ];

  const handleAnswerOptionClick = (optionIndex) => {
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[currentQuestion] = optionIndex;
    setSelectedAnswers(newSelectedAnswers);
    

    // Calculate score based on all answers (in case user changes previous answers)
    let newScore = 0;
    newSelectedAnswers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        newScore += 1;
      }
    });
    setScore(newScore);
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestion(currentQuestion - 1);
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswers(Array(5).fill(null));
  };

  const handleExitQuiz = () => {
    navigate(-1); // Go back to previous page
  };

  // Calculate percentage score
  const percentageScore = Math.round((score / questions.length) * 100);

  // Determine performance message based on score
  const getPerformanceMessage = () => {
    if (percentageScore >= 80) return "Excellent! You're a black hole expert!";
    if (percentageScore >= 60) return "Good job! You know quite a bit about black holes.";
    if (percentageScore >= 40) return "Not bad! You have some knowledge of black holes.";
    return "Keep studying! Black holes are fascinating to learn about!";
  };

  return (
    <div className="quiz-app">
      <h1 className='text'>Black Hole & Hawking Radiation Quiz</h1>

      {showScore ? (
        <div className="score-section">
          <div className="score-summary">
            <h2 className='hu2'>Quiz Completed!</h2>
            <div className="score-circle">
              <div className="score-percentage">{percentageScore}%</div>
              <div className="score-text">{score} out of {questions.length} correct</div>
            </div>
            <p className="performance-message">{getPerformanceMessage()}</p>
          </div>
          <div className="answers-review">
            <h3 className='hu2'>Detailed Feedback:</h3>
            {questions.map((question, index) => {
              const isCorrect = selectedAnswers[index] === question.correctAnswer;
              return (
                <div key={index} className={`question-review ${isCorrect ? 'correct' : 'incorrect'}`}>
                  <div className="question-header">
                    <span className="question-number">Question {index + 1}:</span>
                    <span className="question-status">
                      {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                    </span>
                  </div>
                  <p className="question-text">{question.question}</p>
                  <p className="user-answer">
                    <strong>Your answer:</strong> {question.options[selectedAnswers[index]]}
                  </p>
                  {!isCorrect && (
                    <p className="correct-answer">
                      <strong>Correct answer:</strong> {question.options[question.correctAnswer]}
                    </p>
                  )}
                  <p className="explanation">
                    <strong>Explanation:</strong> {question.explanation}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="quiz-actions">
            <button className="restart-button" onClick={handleRestartQuiz}>
              Restart Quiz
            </button>
            <button className="exit-button" onClick={handleExitQuiz}>
              Exit Quiz
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>Question {currentQuestion + 1}</span>/{questions.length}
            </div>
            <div className="question-text">{questions[currentQuestion].question}</div>
          </div>
          <div className="answer-section">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerOptionClick(index)}
                className={selectedAnswers[currentQuestion] === index ? 'selected' : ''}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="navigation-buttons">
            <button 
              onClick={handlePreviousQuestion}
              disabled={currentQuestion === 0}
            >
              Previous
            </button>
            <button onClick={handleNextQuestion}>
              {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default QuizApp;