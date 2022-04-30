import React from "react";
import "./loading.css"
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import data from "../../data/cat"
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import img from "../../../src/quiz.svg"

export default function Loading({getQuestions,name,setName,setNumberOfQuestions}){

    const [category,setCategory]= React.useState("")
    const [difffculty,setDifffculty] = React.useState("")
    const [error,setError] = React.useState(false)

    const navigate = useNavigate()


    function startQuiz(){
        if(!category || !difffculty || !name){
            setError(true)
        } else{
            setError(false)
            getQuestions(category,difffculty)
            navigate("/quiz")
        }
    }

    
    return(

        <div className="container">
            <h1 className="title">It's Testing Time! </h1> 
            <div className="flex">
                <img src={img}className="quiz-img" alt="quiz image" />
                <div>

                    <h3 className="quiz-setting">Quiz Settings</h3>
                    <div className="settings-selection">

                    {error && <Alert variant="outlined" severity="error" style={{marginBottom:20}}>
                        One or more field is empty!
                    </Alert>}

                        <TextField label="Enter Your Name" style={{marginBottom:20}} required
                        onChange={(e)=>setName(e.target.value)}
                        />
                        
                        <TextField select 
                            label="Select Category" 
                            style={{textAlign:"left",marginBottom:20}} 
                            defaultValue={""}
                            onChange={(e)=>setCategory(e.target.value)}
                            required
                            >

                            {data.map( (item) =>(
                                <MenuItem key={item.category} value={item.value} >
                                    {item.category}
                                </MenuItem>
                            ))}
                            
                        </TextField>


                        
                        <TextField select 
                            label="Number of questions" 
                            style={{textAlign:"left",marginBottom:20}} 
                            defaultValue={""}
                            onChange={(e)=>setNumberOfQuestions(e.target.value)}
                            required
                            >

                            {[...Array(10)].map((x, i) =>
                                <MenuItem key={i} value={i+1}>
                                    {i+1}
                                </MenuItem>
                            )}    
                        </TextField>

                        <TextField select label="Select Difficulty" 
                            style={{textAlign:"left",marginBottom:20}} 
                            defaultValue={""}
                            onChange={(e)=>setDifffculty(e.target.value)}
                            required
                            > 
                            <MenuItem key="Easy" value="easy"> Easy</MenuItem>
                            <MenuItem key="Medium" value="medium"> Medium</MenuItem>
                            <MenuItem key="Hard" value="hard"> Hard</MenuItem>
                        </TextField>

                        <Button variant="contained" size="large"
                            onClick={startQuiz}>Start quiz</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}