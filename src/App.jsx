import Cover from "./components/Cover";
import React from "react";
import Quizzes from "./components/Quizzes";

export default function () {
    const [startQuiz, setStartQuiz] = React.useState(false); 

    function updateQuizStatus() {
        setStartQuiz((prevStartQuiz) => !prevStartQuiz);
    }

    return (
        <div>
            <div
                className={!startQuiz ? "blob1" : "blob1 blob1-start-quiz"}
            ></div>
            {startQuiz ? <Quizzes updateQuizStatus={updateQuizStatus} startQuiz={startQuiz}/> : <Cover updateQuizStatus={updateQuizStatus} />}
            <div
                className={!startQuiz ? "blob2" : "blob2 blob2-start-quiz"}
            ></div>
        </div>
    );
}
