import { useRef } from "react";
import Welcome from "../components/Welcome.jsx";
import AboutUs from "../components/AboutUs.jsx";
import Footer from "../components/Footer.jsx";
import Products from "../components/Products.jsx";
import Services from "../components/Services.jsx";
import Location from "../components/Location.jsx";


function HomePage(){
    const welcomeRef = useRef(null);
    const productsRef = useRef(null);
    const aboutRef = useRef(null);
    const footerRef = useRef(null);
    const serviceRef = useRef(null);
    const locationRef = useRef(null);
    return (
        <div style={{
          backgroundImage: 'url("")',
          backgroundSize: "cover",
          // backgroundColor: '#20B2AA',
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}>
          <section ref={welcomeRef} id="welcome">
            <Welcome />
          </section>

          <section ref={productsRef} id="products">
            <Products />
          </section>

          <section ref={aboutRef} id="about">
            <AboutUs />
          </section>

          <section ref={locationRef} id="location">
            <Location />
          </section>

          <section ref={serviceRef} id="services">
            <Services />
          </section>

          <section ref={footerRef} id="footer">
            <Footer />
          </section>
          
        </div>
      );
}

export default HomePage