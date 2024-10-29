import React from 'react';

const QuizSummary = ({ totalAttempts, correctAnswers, incorrectAnswers, notAttempted }) => {
  return (
    <div className="container mt-3">
      <h4 className='text-center'>Quiz Summary</h4>
      <div className="row text-center">
        <div className="col-md-6">
            <p className='fw-bold'>Total Attempts: </p>
            <p className='fw-bold'>Correct Answers: </p>
            <p className='fw-bold'>Incorrect Answers: </p>
            <p className='fw-bold'>Not Attempted: </p>

        </div>
        <div className="col-md-6">
            <p className='fw-bold'> {totalAttempts}</p>
            <p className='fw-bold'>{correctAnswers}</p>
            <p className='fw-bold'>{incorrectAnswers}</p>
            <p className='fw-bold'>{notAttempted}</p>
            
        </div>

      </div>
    </div>
  );
};

export default QuizSummary;
