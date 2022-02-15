import React, { useEffect } from "react";
import "./quiz.css"
import he from "he"
import { Button } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import { color } from "@mui/system";
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";


export default function Quiz({questions,name,score,setScore}){

    const [currentQuestion,setCurrentQuestion]= React.useState(0)
    const [choices,SetChoices] = React.useState([])
    const [correctAnswer, setCorrectAnswer] = React.useState()
    const [selected,setSelected] = React.useState()
    const [error, setError] = React.useState(false)

    const navigate = useNavigate()
    
    useEffect(()=>{
        //shuffle answer array 
            SetChoices(questions && [questions[currentQuestion].correct_answer, ... questions[currentQuestion].incorrect_answers].sort(() => Math.random() - 0.5))
            setCorrectAnswer(questions && questions[currentQuestion].correct_answer)
    },[questions,currentQuestion])

    function changeQuestion(){
        if(!selected){
            setError(true)
        } else if(currentQuestion<9)
        {
            setCurrentQuestion(currentQuestion+1)
            setError(false)
            setSelected("")
      
        } else{
            //show result
            setError(false)
        }

        if(currentQuestion>=9){
            navigate("/results")
           
        }


        
    }

    function checkSelect(choice){
        if(choice===selected && choice===correctAnswer){
            return "correct"
        } else if(choice===selected && choice!==correctAnswer){
            return "wrong"
        } else if(choice===correctAnswer){
            return "correct"
            
        }
    }

    function checkAnswer(choice){
        setSelected(choice)
        if(choice===correctAnswer){
            setScore(score+1) 
        }
        setError(false)

    }

    return(
        <div className="container">
            <h1 className="title">Test your knowlodge</h1>
            <h2 className="intro">Welcome, {name}</h2>

            <div className="board">
                {questions && <p>  Question: <span className="num">{currentQuestion+1} </span>/10</p>}
                <p>Score: {score}</p>
            </div>

            {questions? (
                <div className="question-container">
                    {error && <Alert variant="outlined" severity="error" style={{marginBottom:20}}>
                        Please select your answer</Alert>}

                    <p className="current-question">{questions && he.decode(questions[currentQuestion].question)}</p>

                    <div className="option-container"> 
                        {choices && choices.map((choice)=>(
                            <button className={`choice ${selected && checkSelect(choice)}`} onClick={()=>checkAnswer(choice)}
                            disabled={selected}
                            key={choice}
                            >{he.decode(choice)}</button>
                            ))}
                    </div>

                    <div className="btns">
                        <Button variant="contained" size="large" 
                          sx={{
                            width: 200
                          }}
                        
                        onClick={changeQuestion}>{currentQuestion>8 ? "Result" : " Next"}</Button>
                    </div>

                </div>
                ):(
                    <CircularProgress/>

                )}

        </div>
    )
}