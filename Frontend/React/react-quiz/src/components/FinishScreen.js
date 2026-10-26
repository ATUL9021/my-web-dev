export default function FinishScreen({
  points,
  totalPoints,
  highScore,
  dispatch,
}) {
  const percentage = Math.ceil((points / totalPoints) * 100);
  return (
    <>
      <p className="result">
        You scored <strong>{points} </strong> points out of {totalPoints} points
        i.e {percentage}%
      </p>
      <p className="highScore"> your highe score is {highScore}</p>
      <button
        className="btn btn-ui"
        onClick={(e) => dispatch({ type: "reset" })}
      >
        Restart Quiz
      </button>
    </>
  );
}
