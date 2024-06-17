import React, { useEffect, useState } from 'react'

const Card = ({ question, getNewQuestion }) => {
    const [bt, setbt] = useState('Check');
    const [status, setStatus] = useState('...');
    const [showCapital, setshowCapital] = useState('...');

    useEffect(() => {
        if(bt == "Check"){

            document.querySelector('input').focus()
        }else{
    
            document.querySelector('button').focus()
        }
    }, [bt]);

    const form_submt = (event) => {
        event.preventDefault();
        if (bt == "Check") {
            let usr_answer = document.querySelector('#input_box').value
            document.querySelector('#input_box').value = '';
            if (transformText(usr_answer) == transformText(question.capital)) {
                question.score = question.score + 1
                setStatus('Correct')
            } else {
                setStatus('Incorrect')
            }
            question.total = question.total + 1
            setshowCapital(question.capital)
            setbt('Next Question')
        } else {
            setbt('Check')
            setStatus('...')
            setshowCapital('...')
            getNewQuestion()
        }
    }

    function transformText(st){
        return String(st).trim().toLowerCase().replace(" ", "")
    }



    return (
        <div id='main_card' className='fc'>
            <div id="score" className='text-right italic text-lg pt-2 pr-2'>Score:{question.score}/{question.total}</div>

            <div id="question" className='fr text-center text-3xl'><span className='px-2 sm:px-5'>What is the capital city of&#160;<span className='font-semibold font-serif text-cyan-500'>{question.country}</span>?</span></div>

            <form onSubmit={form_submt} id="input_container" className='fr w-full'>
                <input type="text"  className={`w-11/12 sm:w-3/5 text-lg h-12 ps-3 ${bt == "Check" ? "" : "hidden"}`} name="input_box" id="input_box" placeholder='Enter your answer...' required = {bt == "Check"} />
                <button type='submit' className={`w-1/2 h-12 ${bt == "Check" ? 'bg-blue-300 w-1/3' : 'bg-amber-500 w-1/2 '} font-bold`} id='btn_check' >{bt}</button>
            </form>

            <div id="info" className='fr font-bold bg-gray-300'>

                <div id="answer_status" className={`fr ${status == "Correct" ? "bg-green-400" : status == "Incorrect" ? "bg-red-300" : ""} border-r-2`}>{status}</div>
                <div id="answer_text" className='fr'><span className='text-wrap px-3'>{showCapital}</span></div>
            </div>
        </div>
    )
}

export default Card