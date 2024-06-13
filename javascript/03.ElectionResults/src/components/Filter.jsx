import React from 'react'


const Filter = () => {
    return (
        <div id='fitler_container' className='w-full flex flex-row justify-between border-b border-black py-2 px-5'>


            <select className='border border-gray-200 px-2' name="cars" id="cars">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="mercedes">Mercedes</option>
                <option value="audi">Audi</option>
            </select>
            <input className='border border-gray-200 px-2' type="text" name="filter" id="filter" placeholder='Search' />
        </div>
    )
}

export default Filter