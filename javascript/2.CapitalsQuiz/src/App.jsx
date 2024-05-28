import React, {useEffect, useState } from 'react'
import './App.css'
import Wrapper from './components/Wrapper'
import Card from './components/Card'
import {coutries} from './assets/countries.js'



const App = () => {
  const [allQuestions, setallQuestions] = useState(coutries);
  
  let objQuestion = {
    country: '',
    capital: '',
    score:0,
    total:-1
  }
  const [question, setQuestion] = useState(objQuestion);
  const getAllQuestions = async () =>{
    console.log("starteed")
    //  setallQuestions(await getAllCountries())
    getNewQuestion();
    console.log(allQuestions)
  }
 
  useEffect(() => {
    getAllQuestions() ;
},[])

  const getNewQuestion = () => {
    const randInt = Math.floor(Math.random()*allQuestions.length)
    const newQuestion = allQuestions[randInt]
    const newObj = {...objQuestion}
    newObj.country = newQuestion["name"]["common"]
    newObj.capital = newQuestion["capital"][0]
    newObj.score = question.score 
    newObj.total = question.total + 1
    setQuestion(newObj)
  }

  return (
    <Wrapper >
      {/* <Card country={"United States of America"} capital={"lorem10lorem1 loremlorem em10 lorem10lor rem10"} score={1} total={10}/> */}
      <Card question={question} getNewQuestion={getNewQuestion} />
    </Wrapper>  
)

}

const getAllCountries = async () => {
  const req = await fetch('https://restcountries.com/v3.1/all/?fields=name,capital')
  const data = await req.json()
  console.log(data)
  return data
}

export default App