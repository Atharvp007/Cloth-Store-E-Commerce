import React from 'react'
import Head from '../common/Head.jsx'
import Footer from '../common/footer.jsx'
import { Outlet } from 'react-router-dom'
function User() {
  return (
   <>
   {/*HEAD*/}
   <Head/>
   {/*MAIN*/}
   <main>
    <Outlet/>
   </main>
  
   <Footer/>
   </>
  )
}

export default User
