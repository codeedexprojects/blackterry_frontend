import React from "react";
import banner from "/src/assets/Untitled.png";
import shirtdesign from "/src/assets/shirt.png";
import Header from "/src/Components/Header";
import Footer from "/src/Components/Footer";

function About() {
  return (
    <div>
      <Header />

      {/* Banner */}
      <div>
        <img
          src={banner}
          alt="Banner"
          className="img-fluid w-100"
          style={{ display: "block" }}
        />
      </div>

      {/* Text Section */}
      <div className="about-content " style={{ backgroundColor: "#D4CABCA3" }}>
        <div
          style={{ paddingTop: "50px", paddingBottom: "50px", padding: "50px" }}
        >
          <h1
            style={{
              maxWidth: "700px",

              fontSize: "clamp(1.5rem, 4vw, 2.2rem)",
            }}
          >
            Crafted with passion, Designed for everyone, Made to Inspire
          </h1>
          <p
            style={{
              marginBottom: "1rem",
              lineHeight: "1.6",
              color: "#333",
              letterSpacing: "2px",
              padding: "10px",
            }}
          >
            Welcome to Black Terry – a brand built by a dedicated team with a
            vision to create premium, accessible fashion that reflects
            individuality and authenticity.
          </p>
          <p
            style={{
              marginBottom: "1rem",
              lineHeight: "1.6",
              color: "#333",
              letterSpacing: "2px",
              padding: "10px",
            }}
          >
            At Black Terry, we believe in the power of bold expression and
            timeless style. Our designs embrace modern trends while staying true
            to classic aesthetics, ensuring each piece resonates with our
            dynamic and diverse community.
          </p>
          <p
            style={{
              marginBottom: "1rem",
              lineHeight: "1.6",
              color: "#333",
              letterSpacing: "2px",
              padding: "10px",
            }}
          >
            More than just clothing, we’re cultivating a movement—one that
            values quality, inclusivity, and creativity. Our collections are
            designed to make you feel confident, unique, and part of something
            bigger.
          </p>
          <h6
            style={{
              color: "#50311D",
              fontWeight: "600",
              letterSpacing: "2px",
              padding: "10px",
            }}
          >
            Express Yourself. Embrace Quality. Live BlackTerry.
          </h6>
        </div>
      </div>

      {/* Shirt Design Image */}
      <div className="my-4 d-flex justify-content-center">
        <img
          src={shirtdesign}
          alt="Shirt Design"
          className="img-fluid"
          style={{
            maxWidth: "300%",
            maxHeight: "500px", // You can adjust height as needed
            objectFit: "contain",
          }}
        />
      </div>
      <Footer />
    </div>
  );
}

export default About;
