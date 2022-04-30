import LoadingPage from "./pages/loading/loading"
import "./App.css"
import React from "react";
import Quiz from "./pages/quiz/quiz"
import Result from "./pages/result/Results";
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import axios from "axios"

function App() {

  const [name,setName] = React.useState("")
  const [questions,setQuestions] = React.useState()
  const [score,setScore] = React.useState(0)
  const [numberOfQuestions,setNumberOfQuestions] = React.useState("")
  console.log(numberOfQuestions)
  //grab data from database
  async function getQuestions(category="",difficulty=""){
    const {data} = await axios.get(`https://opentdb.com/api.php?amount=${numberOfQuestions}${
      category && `&category=${category}`
    }${difficulty && `&difficulty=${difficulty}`}&type=multiple`)
    setQuestions(data.results)
  }
  return (
    <Router basename="quiz-app">
    <div className="App">
    <Routes> 
      {/* passed name and score as prop for display final result */}
        <Route path="/" element={<LoadingPage 
                                  getQuestions={getQuestions}
                                  setName={setName}
                                  setNumberOfQuestions ={setNumberOfQuestions}
                                  name={name} / >}  
                                  />

      <Route path="/quiz"  element={
        <Quiz  questions={questions} 
                            name={name}
                            score={score}
                            numberOfQuestions={numberOfQuestions}
                            setScore={setScore}/>}/>

      <Route path="/results" element={<Result
                              score={score}
                              name={name} 
                              numberOfQuestions={numberOfQuestions}
                              setScore={setScore}/>
                            }
                            />
    </Routes>
 
  </div>
 </Router>
  );
}

export default App
