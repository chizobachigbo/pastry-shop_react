import React from "react";
import pastryList from "../pastries.json";
import { BsFillCartPlusFill } from "react-icons/bs";
import { BsFillHeartFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import FormatPrice from "../helpers/FormatPrice";

export default function Shop({
  cartSelection,
  setCartSelection,
  wishlistSelection,
  setWishlistSelection,
}) {
  const subNavigation = [
    { id: "all" },
    { id: "cakes" },
    { id: "cupcakes" },
    { id: "croissants" },
    { id: "doughnuts" },
  ];

  const [input, setInput] = useState("");
  const [pastries, setPastries] = useState(pastryList);

  useEffect(() => {
    if (input === "") {
      setPastries(pastryList);
    }
  }, [input]);

  const sortSearch = (e) => {
    setInput(e.target.value.toLowerCase());
    setPastries(
      pastryList.map((pastry) => {
        const pastrySorting = pastry.product.includes(input);
        if (pastrySorting !== true) {
          return {
            ...pastry,
            isVisible: false,
          };
        } else {
          return pastry;
        }
      })
    );
  };

  const submitSearch = () => {
    const pastrySorted = pastries.filter(
      (pastry) => pastry.product === input || pastry.productPlural === input
    );
    setPastries(pastrySorted);
  };

  const keyDownHandler = (e) => {
    if (e.key === "Enter") {
      submitSearch();
    }
  };

  const subNavSearch = (e) => {
    const nav = e.target.innerText.toLowerCase();
    subNavigation.map((subNav) => {
      if (nav === subNav.id) {
        setPastries(
          pastryList.filter((pastry) => pastry.productPlural === subNav.id)
        );
      } else if (nav === "all") {
        setPastries(pastryList);
      }
    });
  };

  const addToCart = (e) => {
    const pastryClicked = parseFloat(e.currentTarget.id);
    pastryList.map((pastry) => {
      if (pastryClicked === pastry.id) {
        if (cartSelection.length === 0) {
          setCartSelection([
            ...cartSelection,
            {
              quantity: 1,
              id: pastry.id,
              img: pastry.img,
              price: pastry.price,
              total: pastry.price,
              product: pastry.product,
              description: pastry.description,
            },
          ]);
        } else {
          if (cartSelection.some((item) => item.id === pastryClicked)) {
            alert("This item has been added to cart");
            return;
          } else {
            setCartSelection([
              ...cartSelection,
              {
                quantity: 1,
                id: pastry.id,
                img: pastry.img,
                price: pastry.price,
                total: pastry.price,
                product: pastry.product,
                description: pastry.description,
              },
            ]);
          }
        }
      }
    });
  };

  const addToWishlist = (e) => {
    const pastryClicked = parseFloat(e.currentTarget.id);
    pastryList.map((pastry) => {
      if (pastryClicked === pastry.id) {
        if (wishlistSelection.length === 0) {
          setWishlistSelection([
            ...wishlistSelection,
            {
              id: pastry.id,
              img: pastry.img,
              price: pastry.price,
              product: pastry.product,
              description: pastry.description,
            },
          ]);
        } else {
          if (wishlistSelection.some((item) => item.id === pastryClicked)) {
            alert("This item has been added to wishlist");
            return;
          } else {
            setWishlistSelection([
              ...wishlistSelection,
              {
                id: pastry.id,
                img: pastry.img,
                price: pastry.price,
                product: pastry.product,
                description: pastry.description,
              },
            ]);
          }
        }
      }
    });
  };

  return (
    <div className="shopPastry">
      <h2 className="heading">Shop Pastry</h2>
      <div className="shopPastry__heading">
        <div className="search-pastry">
          <div className="search__input">
            <input
              type="search"
              placeholder="search e.g cakes, cupcakes"
              onChange={sortSearch}
              onKeyDown={keyDownHandler}
              value={input}
            ></input>
          </div>
          <button onClick={submitSearch}>Search</button>
        </div>
        <div className="sub-nav">
          {subNavigation.map((subNav) => (
            <button
              key={subNav.id}
              className="subNav"
              value={subNav.id}
              onClick={subNavSearch}
            >
              {subNav.id}
            </button>
          ))}
        </div>
      </div>
      <div className="pastries section">
        {pastries.map((pastry) => (
          <div
            className="pastry"
            key={pastry.id}
            style={{ display: pastry.isVisible !== true ? "none" : "block" }}
          >
            <div className="pastry__image">
              <img
                className="img__container"
                src={pastry.img}
                alt={pastry.description}
              ></img>
              <span className="store__cart" onClick={addToCart} id={pastry.id}>
                <BsFillCartPlusFill />
              </span>
              <span
                className="store__wishlist"
                onClick={addToWishlist}
                id={pastry.id}
              >
                <BsFillHeartFill />
              </span>
            </div>
            <div className="pastry__info">
              <div className="pastry--description d-flex justify-content-center p-0">
                <p className="pastry__description m-0 py-1">
                  {pastry.description}
                </p>
              </div>
              <div className="pastry--cost d-flex justify-content-between">
                <p className="pastry__product col-md-6 w-25">
                  {pastry.product}
                </p>
                <p className="pastry__price prices col-md-6 w-auto">
                  <strong>{<FormatPrice price={pastry.price} />}</strong>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
