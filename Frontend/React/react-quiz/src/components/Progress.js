export default function Progress({
  currentQuestion,
  dispatch,
  points,
  totalPoints,
  numberOfQuestions,
  answer,
}) {
  return (
    <header className="progress">
      <progress
        max={numberOfQuestions}
        value={answer !== null ? currentQuestion + 1 : currentQuestion}
      />
      <p>
        Question <strong>{currentQuestion + 1}</strong>/{numberOfQuestions}
      </p>

      <p>
        <strong>{points}</strong>/{totalPoints}
      </p>
    </header>
  );
}
