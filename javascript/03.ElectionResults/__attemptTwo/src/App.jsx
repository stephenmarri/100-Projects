import { useState, useMemo } from 'react'
import './App.css'
import Header from './componenets/Header'
import Filter from './componenets/Filter'
import Body from './componenets/Body'
import Footer from './componenets/Footer'
import json_mla from './assets/eci_mla.json'
import json_mp from './assets/eci_mp.json'

function App() {

  let transformed_mp = useMemo(() => convertMPtoMLA(json_mp), [json_mp])
  let flat_mp = useMemo(() => flattenData(transformed_mp), [transformed_mp])
  let flat_mla = useMemo(() => flattenData(json_mla), [json_mla])
  let states_mp = useMemo(() => getStateName(transformed_mp), [transformed_mp])
  let states_mla = useMemo(() => getStateName(json_mla), [json_mla])

  const [filters, setfilters] = useState(['mp', 'All', '']);

  let display_data = filters[0] == 'mp' ? flat_mp : flat_mla
  let display_states = filters[0] == 'mp' ? states_mp : states_mla
  if (filters[1] != 'All') display_data = sortData(filterState(display_data, filters[1]))
  if(filters[2] != '') display_data = searchData(display_data, filters[2])

  return (
    <>
      <Header />
      <Filter statesData={display_states} filters={filters} setFilters={setfilters} />
      <Body data={display_data} />
      <Footer />
    </>
  )
}

export default App

const convertMPtoMLA = (data) => {

  return data.reduce((acc, state) => {
    const stateName = Object.keys(state)[0]
    const constituncies = state[stateName]
    acc[stateName] = constituncies.map(x =>
      ({ ...x })
    )
    return acc
  }, {})
}

const flattenData = data => {
  return Object.entries(data).reduce((acc, [key, value]) => {
    const stateName = key
    const flat = value.map(x => {
      x["state"] = stateName
      return x
    })
    return acc.concat(flat)
  }, [])
}

const sortData = data => {
  return data.sort((a, b) => {
    return a.data_constituency.localeCompare(b.data_constituency);
  })
}

const filterState = (data, state) => {
  return data.filter(x => x.state == state)
}

const getStateName = data => {
  const stateNames = Object.entries(data).reduce((acc, [key, value]) => {
    return acc.concat(key)
  }, [])

  return ['All'].concat(stateNames)
}


const searchData = (data, searchTerm) => {
  return data.filter(x => x["data_leading_candidate"].toLowerCase().replace(/ /g,"").includes(searchTerm.toLowerCase().replace(/ /g,"")) || 
  x["data_constituency"].toLowerCase().replace(/ /g,"").includes(searchTerm.toLowerCase().replace(/ /g,"")) )
}