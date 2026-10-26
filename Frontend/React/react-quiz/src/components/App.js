import Header from "./Header.js";
import Main from "./Main.js";
import Loader from "./Loader.js";
import Error from "./Error.js";
import Questions from "./Questions.js";
import { useReducer, useEffect } from "react";
import NextButton from "./NextButton.js";
import StartScreen from "./StartScreen.js";
import Progress from "./Progress.js";
import FinishScreen from "./FinishScreen.js";
import Timer from "./Timer.js";
const initialState = {
  questions: [],
  //loding,error,ready,active,finish
  status: "loading",
  currentQuestion: 0,
  answer: null,
  points: 0,
  highScore: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "data":
      return { ...state, questions: action.payload, status: "ready" };

    case "dataFailed":
      return { ...state, status: "error" };

    case "start":
      return { ...state, status: "active" };

    case "newAnswer":
      const question = state.questions[state.currentQuestion];
      let addPoints = 0;
      if (action.payload === question.correctOption) {
        addPoints = question.points;
      }
      return {
        ...state,
        answer: action.payload,
        points: state.points + addPoints,
      };

    case "timeOut":
      return {
        ...state,
        answer: null,
        status: "finish",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
        currentQuestion: state.currentQuestion + 1,
      };

    case "nextQuestion":
      if (state.currentQuestion + 1 === state.questions.length) {
        return {
          ...state,
          answer: null,
          status: "finish",
          highScore:
            state.points > state.highScore ? state.points : state.highScore,
          currentQuestion: state.currentQuestion + 1,
        };
      }

      return {
        ...state,
        answer: null,
        currentQuestion: state.currentQuestion + 1,
      };

    case "reset":
      console.log("in rest");
      return { ...initialState, questions: state.questions, status: "ready" };

    default:
      console.log("done");
      throw new Error(" wrong action type");
  }
}
function App() {
  const [
    { seconds, status, points, currentQuestion, highScore, questions, answer },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numberOfQuestions = questions.length;
  let totalPoints = 0;

  questions.forEach((question) => (totalPoints += question.points));
  useEffect(function () {
    async function getData() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();
        dispatch({ type: "data", payload: data });
        console.log(data);
      } catch (error) {
        dispatch({ type: "dataFailed" });
      }
    }

    getData();
  }, []);

  function returnJSXAccordingToStatus() {
    switch (status) {
      case "loading":
        return <Loader />;
      case "error":
        return <Error />;

      case "ready":
        return (
          <StartScreen
            numberOfQuestions={numberOfQuestions}
            dispatch={dispatch}
          />
        );

      case "active":
        return (
          <>
            <Progress
              dispatch={dispatch}
              numberOfQuestions={numberOfQuestions}
              points={points}
              totalPoints={totalPoints}
              currentQuestion={currentQuestion}
              answer={answer}
            />
            <Questions
              question={questions[currentQuestion]}
              answer={answer}
              dispatch={dispatch}
              points={points}
            />
            <footer>
              <Timer seconds={3} dispatch={dispatch} />
              <NextButton
                currentQuestion={currentQuestion}
                numberOfQuestions={numberOfQuestions}
                dispatch={dispatch}
                answer={answer}
              />
            </footer>
          </>
        );

      case "finish":
        return (
          <FinishScreen
            highScore={highScore}
            points={points}
            totalPoints={totalPoints}
            dispatch={dispatch}
          />
        );

      default:
        throw new Error("state is wrong");
    }
  }
  return (
    <div className="app">
      <Header />
      <Main dispatch={dispatch}>{returnJSXAccordingToStatus()}</Main>
    </div>
  );
}

export default App;
