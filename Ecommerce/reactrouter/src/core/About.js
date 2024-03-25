import React from 'react'
import Base from './Base'

const About = () => {
  return (
    <Base>
      <>
        <div className="container row mx-auto d-flex" style={{marginBottom:"100px"}}>
          <div className="col-6">
            <img src="Images/ecommerceabt.png" alt='' width="650px" height="450px" style={{background:"rgb(255, 255, 255, 0.08)"}} />
          </div>
          <div className="col-6" style={{ padding: 60, textAlign: "center" }}>
            <h1>About US</h1>
            <label style={{ fontSize: 22, marginTop: 10 }}>
              Teams around the world invent on behalf of our customers every day to
              meet their desire for lower prices, better selection, and convenient
              services. One way we guarantee a wide selection of products and services
              for customers is by creating India-specific programs to support the
              thousands of small and medium businesses in India that sell on our
              business site.
            </label>
          </div>
        </div>
        <div className="container row mx-auto d-flex mt-4">
          <div className="col-6" style={{ padding: 80, textAlign: "center" }}>
            <h1>Our Journey</h1>
            <label style={{ fontSize: 22, marginTop: 10 }}>
              Empowers small and medium-sized businesses to reach millions of
              customers with a number of programmes that help boost their revenue,
              reach, and productivity. We remain committed to introducing new tools,
              technology, and innovation to help unleash the entrepreneurial spirit of
              Indian businesses.
            </label>
          </div>
          <div className="col-6" style={{ position: "static" }}>
            <img src="Images/about.jpg" alt="" width="650px" height="450px" />
          </div>
        </div>
      </>

    </Base>
  )
}

export default About
