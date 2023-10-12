import { BsFillHeartFill } from "react-icons/bs";
import { BsTrashFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { BiChevronDown } from "react-icons/bi";
import { BiChevronUp } from "react-icons/bi";
import pastryList from "../pastries.json";
import FormatPrice from "../helpers/FormatPrice";
import { useState, useEffect } from "react";

export default function Cart({
  cartSelection,
  setCartSelection,
  wishlistSelection,
  setWishlistSelection,
}) {
  const itemCount = (e) => {
    const pastryClicked = parseFloat(e.currentTarget.id);
    const cartQuantity = e.target.id === "decrease" ? -1 : 1;
    setCartSelection(
      cartSelection.map((pastry) => {
        if (pastry.id === pastryClicked) {
          const newQuantity = Math.max(
            1,
            Math.min(100, Number(pastry.quantity) + cartQuantity)
          );

          const newTotal = parseFloat(pastry.price) * parseFloat(newQuantity);

          return {
            ...pastry,
            quantity: newQuantity,
            total: newTotal,
          };
        }
        return pastry;
      })
    );
  };

  const setQuantity = (e) => {
    const pastryId = parseFloat(e.target.id);
    const typedInput = e.target.value;
    let newInput = 1;

    if (isNaN(typedInput)) {
      newInput = 1;
      alert("Quantity must be in numbers");
    } else if (typedInput <= -1) {
      newInput = 1;
      alert("The minimum item limit is 1");
    } else if (typedInput >= 101) {
      newInput = 100;
      alert("The maximum item limit is 100");
    } else {
      newInput = typedInput;
    }

    setCartSelection(
      cartSelection.map((pastry) => {
        if (pastry.id === pastryId) {
          const newTotal = parseFloat(pastry.price) * parseFloat(newInput);
          return {
            ...pastry,
            quantity: newInput,
            total: newTotal,
          };
        }
        return pastry;
      })
    );
  };

  const deleteCart = (e) => {
    const pastryClicked = parseFloat(e.currentTarget.id);
    setCartSelection(
      cartSelection.filter((cartItem) => cartItem.id !== pastryClicked)
    );
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
    setCartSelection(
      cartSelection.filter((cartItem) => cartItem.id !== pastryClicked)
    );
  };

  const [subTotal, setSubTotal] = useState();
  const [grandTotal, setGrandTotal] = useState();
  const shipping = 30;

  useEffect(() => {
    if (cartSelection.length > 0) {
      if (cartSelection.length === 1) {
        cartSelection.map((pastry) => {
          setSubTotal(pastry.price);
        });
      } else {
        setSubTotal(
          cartSelection.reduce(function (a, b) {
            return a.total + b.total;
          })
        );
      }
    }
  }, [cartSelection]);

  useEffect(() => {
    setGrandTotal(shipping + subTotal);
  }, [subTotal]);

  const checkoutCart = () => {
    setCartSelection([]);
  };

  return (
    <div className="cart">
      <div
        className="cart--items"
        style={{ display: cartSelection.length !== 0 ? "block" : "none" }}
      >
        <h2 className="heading">Cart</h2>
        <div className="cart__pastries">
          {cartSelection.map((cart) => (
            <div className="cart__card card-path" key={cart.id}>
              <img src={cart.img} alt={cart.description}></img>
              <div className="cart__info">
                <div className="cart__details">
                  <div className="cart__description">
                    <p className="pastry__description">{cart.description}</p>
                  </div>
                  <div className="cart__product">
                    <p className="pastry__product">{cart.product}</p>
                  </div>
                  <div className="cart__price">
                    <p className="pastry__price prices">
                      {<FormatPrice price={cart.price} />}
                    </p>
                  </div>
                </div>

                <div className="cart__quantity">
                  <div className="total--price">
                    <p className=" total__price prices">
                      {<FormatPrice price={cart.total} />}
                    </p>
                  </div>
                  <div className="cart__counter">
                    <div
                      className="item__decrease count"
                      id={cart.id}
                      onClick={itemCount}
                    >
                      <BiChevronDown className="item__quantity" id="decrease" />
                    </div>
                    <input
                      className="cart__input"
                      type="text"
                      id={cart.id}
                      value={cart.quantity}
                      onChange={setQuantity}
                      min="0"
                      max="100"
                    ></input>
                    <div
                      className="item__increase count"
                      id={cart.id}
                      value="increase"
                      onClick={itemCount}
                    >
                      <BiChevronUp className="item__quantity" id="increase" />
                    </div>
                  </div>
                  <div className="delete-wishlist">
                    <div
                      className="cart__delete"
                      id={cart.id}
                      onClick={deleteCart}
                    >
                      <BsTrashFill className="cart__trash" />
                    </div>
                    <div
                      className="cart__wish"
                      id={cart.id}
                      onClick={addToWishlist}
                    >
                      <BsFillHeartFill className="cart__wishlist" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="checkout">
          <div className="checkout--body">
            <div className=" checkout__card ">
              <div className="cart--subtotal checkout-value">
                subtotal
                <span className="cart__subtotal prices">
                  {<FormatPrice price={subTotal} />}
                </span>
              </div>
              <div className=" cart__shipping checkout-value">
                Shipping
                <span className="shipping prices">
                  {<FormatPrice price={shipping} />}
                </span>
              </div>
              <div className=" cart--grandtotal checkout-value">
                Grand Total
                <span className="cart__grandtotal prices">
                  {<FormatPrice price={grandTotal} />}
                </span>
              </div>
            </div>
            <div className="checkout__btn">
              <button href="#" onClick={checkoutCart}>
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="empty"
        style={{ display: cartSelection.length === 0 ? "flex" : "none" }}
      >
        <h2>There are no items in your cart</h2>
        <Link to="/shop" className="btn" type="button">
          Shop Pastry
        </Link>
      </div>
    </div>
  );
}
