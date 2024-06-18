import React from 'react'

const Filter = ({statesData, filters, setFilters}) => {

    const updatePower = event => setFilters([event.target.value, 'All', ''])
    const updateState = event => setFilters([filters[0], event.target.value, ''])
    const updateSearch = event => setFilters([filters[0], filters[1], event.target.value])

    console.log(filters)
    return (
        <div id='filters' className='fr'>
            <div id="dropdowns" className='fr'>
                <select name="drop_power" id="drop_power" onChange={updatePower} value={filters[0]}>
                    <option value="mp">MP</option>
                    <option value="mla">MLA</option>
                </select>

                <select name="drop_state" id="drop_power" onChange={updateState} value={filters[1]}>
                    {
                        statesData.map((state, index) => {
                            return <option key={index} value={state}>{state}</option>
                        })
                    }
                </select>
            </div>
            <input type="text" placeholder='Search' onChange={updateSearch} value={filters[2]}/>
        </div>
    )
}

export default Filter