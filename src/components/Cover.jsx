export default function (props) {
    
    return (
        <section className="cover-page">
            <h1>Quizzical</h1>
            <p>Some description if needed</p>
            <button onClick={props.updateQuizStatus}>Start quiz</button>
        </section>
    )
}