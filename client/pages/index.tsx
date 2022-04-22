import type { NextPage } from 'next'
import HomeLayout from '../components/HomePage/HomeLayout/HomeLayout'
import AboutUs from '../components/HomePage/AboutUs/AboutUs'
import CallToAction from '../components/HomePage/CallToAction/CallToAction'
import Plans from '../components/HomePage/Plans/Plans'
import Services from '../components/HomePage/Services/Services'
import Testimonials from '../components/HomePage/Testimonials/Testimonials'
import Welcome from '../components/HomePage/Welcome/Welcome'
import { ReactElement } from 'react'

const Home = () => {
  return (
    <>
      <Welcome />
      <Services />
      <AboutUs />
      <Plans />
      <Testimonials />
      <CallToAction />
    </>
  )
}

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <HomeLayout>
      {page}
    </HomeLayout>
  )
}

export default Home
