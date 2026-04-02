import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import Note from '../components/Note'
import NoteModel from '../components/NoteModel'

function Home() {
  return (
    <>
    <NoteModel title={'Create Note'}/>
    <div className='container-fluid'>
        <div className='row'>
            <div className='col-lg-2 col-md-2 min-vh-100 shadow'>
                <Sidebar></Sidebar>
            </div>
            <div className='col-lg-10 col-md-10'>
                <Navbar></Navbar>
                <div className='mt-3 mx-5'>
                    <h1 className='fs-2 fw-bold'>NOTES</h1>
                </div>
                <div className='row mt-4 mx-5'>
                    <div className='col-md-4 col-lg-4 mb-5'>
                        <Note></Note>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Home
