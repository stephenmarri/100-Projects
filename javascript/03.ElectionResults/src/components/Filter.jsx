import React from 'react'


const Filter = ({data, fitlerForState, setFilterFotState}) => {

    const updateStateFilter = (event) => {
        setFilterFotState(event.target.value)
    }
    
    return (
        <div id='fitler_container' className='w-full flex flex-row justify-between py-3 px-3'>

            <select className='border border-gray-200 rounded-md' name="cars" id="cars">
                <option value="MP">MP</option>
                <option value="MLA">MLA</option>
            </select>

            <select value={fitlerForState} onChange={updateStateFilter} className='border border-gray-200 rounded-md' name="cars" id="cars">
            <option key='0' value="All">All</option>
                {
                    data.map((x, idx) => {
                        return <option key={idx} value={x}>{x}</option>
                    })
                }                
            </select>

            <input className='border border-gray-200 px-2 rounded-md' type="text" name="filter" id="filter" placeholder='Search' />
        </div>
    )
}

export default Filter