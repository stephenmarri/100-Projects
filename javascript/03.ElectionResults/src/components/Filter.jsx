import React from 'react'


const Filter = ({data}) => {
    console.log(data)
    
    return (
        <div id='fitler_container' className='w-full flex flex-row justify-around border-b border-black py-2 px-3'>

            <select className='border border-gray-200 rounded-md' name="cars" id="cars">
                <option value="Nation">Nation</option>
                <option value="State">State</option>
            </select>

            <select className='border border-gray-200 rounded-md' name="cars" id="cars">
                {
                    data.map(x => {
                        return <option value="{x}">{x}</option>
                    })
                }                
            </select>

            <input className='border border-gray-200 px-2 rounded-md' type="text" name="filter" id="filter" placeholder='Search' />
        </div>
    )
}

export default Filter