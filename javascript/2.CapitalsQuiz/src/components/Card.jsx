import React, {useEffect, useState } from 'react'

const Card = ({question, getNewQuestion}) => {
    const [bt, setbt] = useState('Check');
    const [status, setStatus] = useState('...');
    const [showCapital, setshowCapital] = useState('...');
        
    
    function checkQues(event){
        console.log(event)
        if(event.target.innerText == "Check"){
            let usr_answer = document.querySelector('#input_box').value
            if (usr_answer == question.capital){
                question.score = question.score + 1
                setStatus('Correct')
            }else{
                setStatus('Incorrect')
            }
            setshowCapital(question.capital)
            setbt('Submit')
        }else{
            setbt('Check')
            setStatus('...')
            setshowCapital('...')
            getNewQuestion()
        }

    }

  return (
    <div id='main_card' className='fc'>
        <div id="score" className='text-right italic pt-2 pr-2'>Score:{question.score}/{question.total}</div>
        <div id="question" className='fr text-center text-3xl'><span className='px-2 sm:px-5'>What is the capital city of&#160;<span className='font-semibold font-serif text-cyan-500'>{question.country}</span>?</span></div>
        <div id="input_container" className='fr'>
            <input type="text" required className='w-1/2 h-12 ps-3' name="input_box" id="input_box" placeholder='Enter your answer...'/>
            <button type='submit' className={`w-1/4 h-12 ${bt == "Check" ? 'bg-blue-400' : 'bg-green-400'} font-bold`} id='btn_check' onClick={(e)=>checkQues(e)}>{bt}</button>
        </div>
        <div id="info" className='fr font-bold bg-gray-300'>
            <div id="answer_status" className='fr font-bold border-r-2'>{status}</div>
            <div id="answer_text" className='fr'><span className='text-wrap px-3'>{showCapital}</span></div>
        </div>
    </div>
  )
}

export default Card