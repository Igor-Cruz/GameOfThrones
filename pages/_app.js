import React, { useEffect, useState } from 'react'
import '../styles/globals.css'
import Header from '../components/Header'

import Footer from '../components/Footer'
import ReactModal from 'react-modal'



function MyApp({ Component, pageProps }) {

  const [itens, setItens] = useState([])
  const [itensPerPage, setItensParPage] = useState(20)
  const [currentPage, setCurrentPage] = useState(0)

  const pages = Math.ceil(itens.length / itensPerPage)

  const startIndex = currentPage * itensPerPage

  const endIndex = startIndex + itensPerPage
  const currentIndex = itens.slice(startIndex, endIndex)

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('https://thronesapi.com/api/v2/Characters')
        .then(response => response.json())
        .then(data => data)

      setItens(result)
    }
    fetchData()
  }, [])

  return (
    <div >
      <Header />

      <div className='container mx-auto text-center py-8'>
        {currentIndex.map(item => {
          return <div className=' border-solid border-2 border-gray-600 p-2 m-3 text-black bg-white bold hover:bg-gray-700 cursor-grab rounded-3xl'>
            <span className='p-2'>{item.firstName}</span>
            <span>{item.lastName}</span>

            <button className='p-2 text-gray bold'> + </button>




          </div>
        })}
      </div>
      <div>
        {Array.from(Array(pages), (item, index) => {
          return <button className=' p-2 border-solid border-2 border-gray-600 m-2 bold  text-black bg-white bold hover:bg-gray-700 cursor-grab' value={index} onClick={(e) => setCurrentPage(Number(e.target.value))}>{index + 1}</button>
        })}
      </div>
      <div className='container mx-auto'>
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  )

}

export default MyApp
