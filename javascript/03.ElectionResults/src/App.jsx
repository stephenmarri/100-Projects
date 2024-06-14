import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './my_styles.css'
import './App.css'
import Header from './components/Header'
import Filter from './components/Filter'
import Data from './components/Data'
import json_full_mps from './assets/eci_loksabha_data.json';
import json_full_mla from './assets/eci_mla_data.json';

export default function App() {

  const stateData = json_full_mps.map(x => Object.keys(x)[0])
  const [filter_power, setFilter_power] = useState('mp'); // mp or mla
  const [filter_state, setFilter_state] = useState('All'); // 29 states and 7 UTs


  console.log(`Curret filter: ${filter_state}`)
  console.log(`Curret power: ${filter_power}`)

  // Get Display data
    const filteredData = filter_data_mp(json_full_mps, filter_state)
    const flatData = flatten_data(filteredData)
    const display_data = get_display_data(flatData)  

  return (
    <>
      <Header />
      <Filter data={stateData} fitlerForState={filter_state} setFilterFotState={setFilter_state} />
      <Data data={display_data} />
    </>
  )
}



function filter_data_mp(json_data, stateName) {
  if (stateName == "All") {
    return json_data
  } else {
    return json_data.filter(x => Object.keys(x)[0] == stateName)
  }
}

function flatten_data(json_data) {
  let json_data_flat = json_data.map((states, index) => {
    return Object.entries(states).map(([stateName, constituencies]) => {
      return constituencies.map(x => {
        return {
          "data_const_number": x.data_const_number,
          "data_constituency": x.data_constituency,
          "data_leading_candidate": x.data_leading_candidate,
          "data_leading_party": x.data_leading_party
        }
      })
    })
  })
  return json_data_flat
}


function get_display_data(json_data) {
  const display_data_arr = json_data.reduce((a, b) => a.concat(b), []).reduce((a, b) => a.concat(b), [])

  // console.log(display_data_arr)
  return display_data_arr
}