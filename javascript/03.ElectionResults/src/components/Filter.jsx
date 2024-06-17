import React from 'react'


const Filter = ({data, fitlerForState, setFilterFotState, filterForPower, setFilterForPower, setSearchTerm}) => {

    const updateStateFilter = (event) => {
        setFilterFotState(event.target.value)
    }
    const updateFilterForPower = (event) => {
        setFilterForPower(event.target.value)
    }
    const updateSearchTerm = (event) => {
        setSearchTerm(event.target.value)
    }
    
    return (
        <div id='fitler_container' className='w-full flex flex-row justify-between items-center px-3'>

            <div style={{width: '60%'}} className='flex flex-row justify-start items-center'>
                <select style={{width: '25%'}} selected={filterForPower} onChange={updateFilterForPower} className='border border-gray-200 rounded-md' name="cars" id="cars">
                    <option value="mp">MP</option>
                    <option value="mla">MLA</option>
                </select>
                <select style={{width: '60%'}} value={fitlerForState} onChange={updateStateFilter} className='border border-gray-200 rounded-md ms-2' name="cars" id="cars">
                <option key='0' value="All">All</option>
                    {
                        data.map((x, idx) => {
                            return <option key={idx} value={x}>{x}</option>
                        })
                    }
                </select>
            </div>

            <input style={{width: '40%'}} onChange={updateSearchTerm}  className='border border-gray-200 px-2 rounded-md' type="text" name="filter" id="filter" placeholder='Search' />
        </div>
    )
}

export default Filter