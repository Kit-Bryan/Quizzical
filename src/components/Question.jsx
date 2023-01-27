import React from "react";

export default function (props) {
    const [optionsHeld, setOptionsHeld] = React.useState([
        false,
        false,
        false,
        false,
    ]);

    const [randomizeOptions, setRandomizeOptions] = React.useState([]);

    function decodeHtml(html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function updateChosenAnswer(id) {
        // Unclicking a button
        if (optionsHeld[id] === true) {
            setOptionsHeld([false, false, false, false]);
            return;
        }

        // Clicking a button that hasnt been clicked
        const newArray = [];
        for (let index = 0; index < 4; index++) {
            newArray.push(id === index ? true : false);
        }
        setOptionsHeld(newArray);

        if (randomizeOptions[id] === props.correct) {
            props.setCorrectAnswers((prevCorrectAnswers) => {
                return prevCorrectAnswers.map((item) => {
                    return(
                        item.questionNum === props.questionNum ? {...item, isCorrect:true}: item
                        )
                });
            });
        } else if (randomizeOptions[id] !== props.correct) {
            props.setCorrectAnswers((prevCorrectAnswers) => {
                return prevCorrectAnswers.map((item) => {
                    return(
                        item.questionNum === props.questionNum ? {...item, isCorrect:false}:item
                        )
                    })
                })
            }
    }

    React.useEffect(() => {
        const randomizeQuestions = props.incorrect.slice();
        randomizeQuestions.push(props.correct);
        setRandomizeOptions(shuffle(randomizeQuestions));
    }, []);

    const randomizedOptions = randomizeOptions.map((item, index) => {
        let styles = {};

        if (optionsHeld[index] === true) {
            if (item === props.correct) {
                styles = { backgroundColor: "#94D7A2", color: "#293264" };
            } else {
                styles = { backgroundColor: "#F8BCBC" };
            }
        } else if (item === props.correct) {
            styles = { backgroundColor: "#94D7A2", color: "#293264" };
        }
        return props.isQuizEnd ? (
            <button
                className={optionsHeld[index] ? "option chosen" : "option"}
                key={index}
                disabled
                style={styles}
            >
                {decodeHtml(item)}
            </button>
        ) : (
            <button
                className={optionsHeld[index] ? "option chosen" : "option"}
                key={index}
                onClick={() => updateChosenAnswer(index)}
            >
                {decodeHtml(item)}
            </button>
        );
    });

    return (
        <div className="question-div">
            <h5 className="question">{decodeHtml(props.question)}</h5>
            <div className="options-div">{randomizedOptions}</div>
            <hr />
        </div>
    );
}
