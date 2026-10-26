export default function NextButton({
  dispatch,
  answer,
  currentQuestion,
  numberOfQuestions,
}) {
  if (answer === null) return null;
  return (
    <button
      className="btn btn-ui"
      onClick={(e) => dispatch({ type: "nextQuestion" })}
    >
      {currentQuestion === numberOfQuestions - 1 ? "finish" : "next"}
    </button>
  );
}
