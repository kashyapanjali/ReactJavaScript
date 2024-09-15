import React from "react";
import "./Home.css";
import Product from "./Product";

function Home() {
  return (
    <div className="home">
      <div className="home_container">
        <img
          className="home_image"
          src="https://amazon-clone-with-stripe-payment.netlify.app/images/banner.jpg"
          alt="Amazon Clone promotional banner"
        />

        <div className="home_row">
          <Product
            id="49538098"
            title="The Lean Startup: How Today's Entrepreneurs Use Continuous Innovation to Create Radically Successful Businesses"
            price={29.99}
            image="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._AC_SY400_.jpg"
            rating={3}
          />
          <Product
            id="49538094"
            title="Kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with K-beater, Dough Hook and Whisk, 5 Litre Glass Bowl"
            price={239.0}
            rating={4}
            image="https://m.media-amazon.com/images/I/71+tbc5GkoL._AC_SX679_.jpg"
          />
        </div>

        <div className="home_row">
          <Product
            id="49538095"
            title="Fitbit Charge 4 Fitness and Activity Tracker with Built-in GPS, Heart Rate, Black"
            price={1999.99}
            rating={5}
            image="https://m.media-amazon.com/images/I/61sSwX2mo+L._AC_SY300_SX300_.jpg"
          />

          <Product
            id="49538096"
            title="Amazon Echo (3rd generation) | Smart speaker with Alexa, Charcoal Fabric"
            price={98.99}
            rating={4}
            image="https://m.media-amazon.com/images/I/51gxWE7MiXL._SY300_SX300_.jpg"
          />

          <Product
            id="49538097"
            title="New Apple iPad Pro (12.9-inch, Wi-Fi, 128GB) - Silver (4th Generation)"
            price={999.99}
            rating={5}
            image="https://m.media-amazon.com/images/I/61uA2UVnYWL._SX679_.jpg"
          />
        </div>

        <div className="home_row">
          <Product
            id="49538099"
            title="Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor"
            price={1999.99}
            rating={5}
            image="https://m.media-amazon.com/images/I/711uu1wZZ9L._AC_SL1500_.jpg"
          />

          <Product
            id="49538100"
            title="Dell 27-Inch UltraSharp U2720Q 4K Monitor"
            price={54999}
            rating={4}
            image="https://m.media-amazon.com/images/I/41jwu7JrOYL._SX300_SY300_QL70_FMwebp_.jpg"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
