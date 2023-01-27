import React from "react";
import Question from "./Question";
import Confetti from "react-confetti";

export default function (props) {
    const [questions, setQuestions] = React.useState({});
    const [isQuizEnd, setIsQuizEnd] = React.useState(false);
    const [correctAnswers, setCorrectAnswers] = React.useState([
        { questionNum: 1, isCorrect: false },
        { questionNum: 2, isCorrect: false },
        { questionNum: 3, isCorrect: false },
        { questionNum: 4, isCorrect: false },
        { questionNum: 5, isCorrect: false },
    ]);
    const [record, setRecord] = React.useState(0);

    function updateIsQuizEnd() {
        setIsQuizEnd(true);
    }
    function calculateScore() {
        for(let i = 0 ; i < correctAnswers.length; i++) {
            setRecord((prevRecord) => {
                return prevRecord + (correctAnswers[i].isCorrect ? 1 : 0)
            })
        }
    }

    React.useEffect(() => {
        fetch(
            "https://opentdb.com/api.php?amount=5&category=25&difficulty=easy&type=multiple"
        )
            .then((res) => res.json())
            .then((data) => setQuestions(data));
    }, []);

    let questionsJSXArray = [];
    if (questions.results !== undefined) {
        questionsJSXArray = questions.results.map((item, index) => {
            return (
                <Question
                    key={index}
                    questionNum={index + 1}
                    question={item.question}
                    correct={item.correct_answer}
                    incorrect={item.incorrect_answers}
                    isQuizEnd={isQuizEnd}
                    setCorrectAnswers={setCorrectAnswers}
                    correctAnswers={correctAnswers}
                />
            );
        });
    }

    return (
        <main className="quizzes-div">
            {questionsJSXArray}
            <footer>
                {isQuizEnd && record === 5 && <Confetti/> }
                {isQuizEnd && <p className="record">You scored {record}/5 correct answers </p>}
                {isQuizEnd ? (
                    <button
                        className="play-again-btn"
                        onClick={props.updateQuizStatus}
                    >
                        Play again
                    </button>
                ) : (
                    <button
                        className="check-answers-btn"
                        onClick={() => {
                            updateIsQuizEnd();
                            calculateScore();
                        }}
                    >
                        Check answers
                    </button>
                )}
            </footer>
        </main>
    );
}
