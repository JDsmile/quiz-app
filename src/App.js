import LoadingPage from "./pages/loading/loading"
import "./App.css"
import React from "react";
import Quiz from "./pages/quiz/quiz"
import {BrowserRouter as Router,Route,Routes} from "react-router-dom"
import axios from "axios"

function App() {

  const [name,setName] = React.useState("")
  const [questions,setQuestions] = React.useState()
  const [score,setScore] = React.useState(0)

  async function getQuestions(category="",difficulty=""){
    const {data} = await axios.get(`https://opentdb.com/api.php?amount=10${
      category && `&category=${category}`
    }${difficulty && `&difficulty=${difficulty}`}&type=multiple`)
    setQuestions(data.results)
    // return ()=>{setQuestions()}
  }


  return (
    <Router>
    <div className="App">
    <Routes> 
        <Route path="/" element={<LoadingPage 
                                  getQuestions={getQuestions}
                                  setName={setName}
                                  name={name} / >}  />

      <Route path="/quiz"  element={<Quiz  questions={questions} 
                                          name={name}
                                          score={score}
                                          setScore={setScore}/>}/>
    </Routes>
 

  </div>
 </Router>
  );
}

export default App;
