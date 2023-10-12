import { BsFillCartFill } from "react-icons/bs";
import { BsTrashFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import pastryList from "../pastries.json";
import FormatPrice from "../helpers/FormatPrice";

export default function Wishlist({
  cartSelection,
  setCartSelection,
  wishlistSelection,
  setWishlistSelection,
}) {
  const deleteWish = (e) => {
    const pastryClicked = parseFloat(e.currentTarget.id);
    setWishlistSelection(
      wishlistSelection.filter((wishItem) => wishItem.id !== pastryClicked)
    );
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
    setWishlistSelection(
      wishlistSelection.filter((wishItem) => wishItem.id !== pastryClicked)
    );
  };

  const emptyWishList = () => {
    setWishlistSelection([]);
  };

  return (
    <div className="wishlist">
      <div
        className="wishlist--items"
        style={{ display: wishlistSelection.length !== 0 ? "block" : "none" }}
      >
        <h2 className="heading">Wishlist</h2>
        <div className="wishlist__headers">
          <span className="wishlist__header">Product</span>
          <span className="wishlist__header">Description</span>
          <span className="wishlist__header">Pastry</span>
          <span className="wishlist__header">Price</span>
          <span className="wishlist__header">Cart</span>
          <span className="wishlist__header">Trash</span>
        </div>
        <div className="wishlist__pastries">
          {wishlistSelection.map((wish) => (
            <div className="wishlist__pastry" key={wish.id}>
              <img
                className="pastry__image"
                src={wish.img}
                alt={wish.description}
              ></img>
              <p className="pastry__description">{wish.description}</p>
              <p className="pastry__product">{wish.product}</p>
              <p className="pastry__price prices">
                {<FormatPrice price={wish.price} />}
              </p>
              <span className="cart" id={wish.id} onClick={addToCart}>
                <BsFillCartFill />
              </span>
              <span className="trash" id={wish.id} onClick={deleteWish}>
                <BsTrashFill />
              </span>
            </div>
          ))}
        </div>
        <div className="emptyStorage">
          <button className="btn" type="button" onClick={emptyWishList}>
            Empty Wishlist
          </button>
        </div>
      </div>
      <div
        className="empty"
        style={{ display: wishlistSelection.length === 0 ? "flex" : "none" }}
      >
        <h2>There are no items in your wishlist</h2>
        <Link to="/shop" className="btn" type="button">
          Shop Pastry
        </Link>
      </div>
    </div>
  );
}
