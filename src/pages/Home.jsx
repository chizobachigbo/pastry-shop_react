import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="landing-page">
      <div className="hero">
        <img src="hero_img.jpg" alt="hero image"></img>
          <div className="intro">
            <h1>Welcome to Dennie's Bakery</h1>
            <Link className="btn" to="/shop">
              shop now
            </Link>
          </div>
      </div>

      <div className="aboutUs section">
        <div className="aboutUs__def">
          <h2>About Us</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
            semper diam at erat pulvinar, at pulvinar felis blandit. Vestibulum
            volutpat tellus diam, consequat gravida libero rhoncus ut. Maecenas
            imperdiet felis nisi, fringilla luctus felis hendrerit sit amet.
          </p>
          <Link type="button" className="btn welcome__explore" to="/shop">
            Shop Pastry
          </Link>
        </div>
        <img src="about_us_img.jpg" alt="Pastry display"></img>
      </div>
    </div>
  );
}
