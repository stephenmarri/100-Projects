import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './my_styles.css'
import './App.css'
import Header from './components/Header'
import Filter from './components/Filter'
import Data from './components/Data'
import { data } from './assets/eci_loksabha_data.js';

export default function App() {
  return (
    <>
      <Header />
      <Filter />
      <Data data={data} />
    </>
  )
}