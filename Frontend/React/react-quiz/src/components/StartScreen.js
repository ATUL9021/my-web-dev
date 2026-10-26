export default function StartScreen({ numberOfQuestions, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>{numberOfQuestions} questions to see your react master</h3>
      <button
        className="btn btn-ui"
        onClick={(e) => dispatch({ type: "start" })}
      >
        Let's Start!
      </button>
    </div>
  );
}
