import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import "./Results.css"



export default function Results({score,name,setScore}){

    const navigate = useNavigate()
    function reset(){
        navigate("/")
        setScore(0)
    }
    return(
        <div className="result-container">
            <p className="name"> {name}, <span>you scored  <span className="score">{score}</span> / 10 </span></p>

            <p>
                {score >=8 ? "Well done" : "Try to do better next time"}
            </p>

            <Button onClick={reset}>Start Over</Button>
        </div>
    )
}