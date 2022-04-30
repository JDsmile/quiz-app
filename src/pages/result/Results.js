import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import "./Results.css"



export default function Results({score,name,setScore,numberOfQuestions}){

    const navigate = useNavigate()
    function reset(){
        navigate("/")
        setScore(0)
    }
    return(
        <div className="result-container">
            <p className="name"> {name}, <span>you scored  <span className="score">{score}</span> / {numberOfQuestions} </span></p>
            <Button 
                size="large"
                color="primary"
                sx={{bgcolor:"white"}}
                onClick={reset} >Start Over</Button>
        </div>
    )
}