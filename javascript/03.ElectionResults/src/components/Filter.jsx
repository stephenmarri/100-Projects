import React from 'react'


const Filter = ({data, fitlerForState, setFilterFotState, filterForPower, setFilterForPower}) => {

    const updateStateFilter = (event) => {
        setFilterFotState(event.target.value)
    }
    const updateFilterForPower = (event) => {
        setFilterForPower(event.target.value)
    }
    
    return (
        <div id='fitler_container' className='w-full flex flex-row justify-between py-3 px-3'>

            <select style={{width: '15%'}} selected={filterForPower} onChange={updateFilterForPower} className='border border-gray-200 rounded-md' name="cars" id="cars">
                <option value="mp">MP</option>
                <option value="mla">MLA</option>
            </select>

            <select style={{width: '40%'}} value={fitlerForState} onChange={updateStateFilter} className='border border-gray-200 rounded-md' name="cars" id="cars">
            <option key='0' value="All">All</option>
                {
                    data.map((x, idx) => {
                        return <option key={idx} value={x}>{x}</option>
                    })
                }                
            </select>

            <input style={{width: '30%'}} className='border border-gray-200 px-2 rounded-md' type="text" name="filter" id="filter" placeholder='Search' />
        </div>
    )
}

export default Filter