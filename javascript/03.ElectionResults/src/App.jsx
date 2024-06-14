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
import Footer from './components/Footer'

export default function App() {

  const stateData = json_full_mps.map(x => Object.keys(x)[0])
  const stateData_mla = Object.entries(json_full_mla).map(([key, value]) => key)
  const [filter_power, setFilter_power] = useState('mp'); // mp or mla
  const [filter_state, setFilter_state] = useState('All'); // 29 states and 7 UTs
  const [filter_state_mla, setFilter_state_mla] = useState('All');

  let display_data = null
  let tranformed_mps = transform_mp(json_full_mps)

  const base_data = filter_power == 'mp' ? tranformed_mps : json_full_mla

  if (filter_power == 'mp') {
    const filteredData = filter_data_mp(base_data, filter_state)
    const flatData = flatten_data_mp(filteredData)
    display_data = get_display_data_mp(flatData)
    display_data = filter_state == 'All' ? display_data : display_data.sort((a,b) => a["data_const_number"] - b["data_const_number"])
  } else {
    const filterDataMla = filter_state_mla == 'All' ? json_full_mla : Object.entries(json_full_mla).filter(([key, value]) => key == filter_state_mla)
    // const sortedDataMla =  sortObjectOfArrays(filterDataMla)
    const flatDataMla = flatten_data_mla(filterDataMla)
    display_data = get_display_data_mp(flatDataMla)
    display_data = filter_state_mla == 'All' ? display_data : display_data.sort((a,b) => a["data_const_number"] - b["data_const_number"])
  }

  const display_states = filter_power == 'mp' ? stateData : stateData_mla
  const display_filter_state = filter_power == 'mp' ? filter_state : filter_state_mla
  const display_setFilterFunc = filter_power == 'mp' ? setFilter_state : setFilter_state_mla

  console.log(`Selections are - Power: ${filter_power}, State: ${display_filter_state}`)

  return (
    <>
      <Header />
      <Filter data={display_states} fitlerForState={display_filter_state} setFilterFotState={display_setFilterFunc} filterForPower={filter_power} setFilterForPower={setFilter_power} />
      <Data data={display_data} />
      <Footer />
    </>
  )
}


function flatten_data_mla(json_data) {
  let flat_mla = Object.entries(json_data).reduce((avalue, [bkey, bvalue]) => avalue.concat(bvalue), [])
  return flat_mla
}

function filter_data_mp(json_data, stateName) {
  if (stateName == "All") {
    return json_data
  } else {
    return json_data.filter(x => Object.keys(x)[0] == stateName)
  }
}

function flatten_data_mp(json_data) {
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


function get_display_data_mp(json_data) {
  const display_data_arr = json_data.reduce((a, b) => a.concat(b), []).reduce((a, b) => a.concat(b), [])

  // console.log(display_data_arr)
  return display_data_arr
}

function sortObjectOfArrays(obj) {
  const newObj = obj;

  Object.keys(newObj).forEach(key => {
    newObj[key].sort((a, b) => {
      return a["data_const_number"] - b["data_const_number"]
    });
  });
  console.log(newObj)
  console.log(newObj)
  return newObj
}

function capitalizeWords(string) {
  return string.split(/(?<=\.|\s)/).map(word => {
    if (word.trim() === '') return word; // Preserve empty strings (e.g., between parenthesis)
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join('');
}

function transform_mp(data) {
  const newData = data.map(state => {
    const newState = {};
    Object.entries(state).forEach(([stateName, constituencies]) => {
      newState[stateName] = constituencies.map(each => {
        return Object.entries(each).reduce((acc, [key, value]) => {
          acc[key] = capitalizeWords(value);
          return acc;
        }, {});
      });
    });
    return newState;
  });

  console.log(newData);
  return newData
}