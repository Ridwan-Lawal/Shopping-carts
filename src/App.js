import { useState } from "react";
import productsLists from "./data.json";

export default function App() {
  return (
    <div>
      <Container />
    </div>
  );
}

function Container() {
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  function handleCartOpen() {
    setCartIsOpen((status) => !status);
  }

  function handleAddToCart(product) {
    setCartItems((curProducts) => [...curProducts, product]);
  }

  function handleDeleteFromCart(id) {
    setCartItems((curProducts) =>
      curProducts.filter((product) => product.id !== id)
    );
  }

  return (
    <div className="flex ">
      <div className="w-full   ">
        <Header onCartOpen={handleCartOpen} cartItems={cartItems} />
        <Main productsLists={productsLists} onAddToCart={handleAddToCart} />
      </div>
      <CartBlock
        cartIsOpen={cartIsOpen}
        cartItems={cartItems}
        onCartOpen={handleCartOpen}
        onDeleteFromCart={handleDeleteFromCart}
      />
    </div>
  );
}

function Header({ onCartOpen, cartItems }) {
  return (
    <header className="px-6  bg-white shadow-md pt-4 h-fit  flex justify-between">
      <h1 className="text-3xl font-medium  text-gray-800">Product List</h1>
      <CartImage onCartOpen={onCartOpen} cartItems={cartItems} />
    </header>
  );
}

function CartImage({ onCartOpen, cartItems }) {
  return (
    <div onClick={onCartOpen} className="h-fit cursor-pointer w-fit">
      <img src="/cart.png" alt="" />
      <p className="border py-[1px] px-[8.5px] bg-red-600 relative bottom-3.5 left-3 text-white font-medium w-fit rounded-full">
        {cartItems.length}
      </p>
    </div>
  );
}

function CartBlock({ cartIsOpen, cartItems, onCartOpen, onDeleteFromCart }) {
  return (
    <div
      className={`bg-gray-950 pt-4 transition-all right-0  flex flex-col  justify-between h-screen ${
        cartIsOpen ? "w-[45%]" : "w-0"
      } transition-all overflow-hidden duration-300 `}
    >
      <div className="fixed pt-3 flex flex-col top-0  w-[31%]  justify-between h-screen bg-gray-950">
        <div>
          <h2 className="text-white text-4xl px-3">Cart</h2>
          <div className="even:bg-gray-900 odd:bg-gray-700 mt-4">
            {cartItems.map((product) => (
              <CartProductCard
                product={product}
                key={product.id}
                onDeleteFromCart={onDeleteFromCart}
              />
            ))}
          </div>
        </div>

        {/*  */}
        <aside className="flex ">
          <CartButtons
            bgColor="bg-blue-100"
            text="Close"
            onClick={onCartOpen}
          />
        </aside>
      </div>
    </div>
  );
}

function CartProductCard({ product, onDeleteFromCart }) {
  const [productQuantity, setProductQuantity] = useState(1);

  function handleQuantityIncreament() {
    setProductQuantity((curQuantity) => curQuantity + 1);
  }

  function handleQuantityDecreament() {
    setProductQuantity((curQuantity) =>
      curQuantity > 1 ? curQuantity - 1 : curQuantity
    );
  }

  return (
    <div className=" px-3 py-1.5 w-full flex items-center justify-between gap-4">
      <CartImageHeaderPrice
        productImage={product.image}
        productName={product.name}
        productPrice={product.price}
        productQuantity={productQuantity}
      />
      <CartProductQuantityCounter
        productQuantity={productQuantity}
        onQuantityIncreament={handleQuantityIncreament}
        onQuantityDecreament={handleQuantityDecreament}
        onClick={() => onDeleteFromCart(product.id)}
      />
    </div>
  );
}

function CartImageHeaderPrice({
  productImage,
  productName,
  productPrice,
  productQuantity,
}) {
  const productPriceperQuantity = productPrice * productQuantity;

  const priceToNgn = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  })
    .format(productPriceperQuantity)
    .split(".")[0];
  return (
    <div className="flex justify-between  w-[70%] items-center">
      <img src={productImage} alt="" className="w-[40px]" />
      <h2 className="text-white max-w-[100px] font-medium">{productName}</h2>
      <p className="text-white font-medium">{priceToNgn}</p>
    </div>
  );
}

function CartProductQuantityCounter({
  productQuantity,
  onQuantityIncreament,
  onQuantityDecreament,
  onClick,
}) {
  return (
    <div className="flex items-center  w-[30%] justify-between  pl-3 gap-4">
      <div className="flex items-center gap-2">
        <img
          onClick={onQuantityDecreament}
          src="/arrow-88-24.png"
          className="bg-white p-1 w-[17px] cursor-pointer h-[17px] rounded-full "
          alt="lt"
        />
        <p className="text-white font-medium">{productQuantity}</p>
        <img
          onClick={onQuantityIncreament}
          src="/arrow-24-24.png"
          className="bg-white cursor-pointer p-1 w-[17px] h-[17px] rounded-full "
          alt="gt"
        />
      </div>
      <p
        onClick={onClick}
        className="text-white cursor-pointer pb-2 self-center font-bold text-2xl "
      >
        &times;
      </p>
    </div>
  );
}

function CartButtons({ bgColor, text, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`${bgColor}  px-8 w-full py-2 font-medium rounded- text-gray-800`}
    >
      {text}
    </button>
  );
}

function Main({ productsLists, onAddToCart }) {
  return (
    <div className="grid grid-cols-1 max-w-md md:max-w-5xl mt-4 mx-auto gap-6 justify-items-center md:grid-cols-3 ">
      {productsLists.map((product) => (
        <ProductCard
          product={product}
          key={product.id}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="mt-5 px-8  text-center space-y-5 py-8 shadow-xl rounded-2xl">
      <ProductImage image={product.image} />
      <div className="text-center space-y-3">
        <Heading productName={product?.name} />
        <Price productPrice={product?.price} />
        <Button onClick={() => onAddToCart(product)} />
      </div>
    </div>
  );
}

function ProductImage({ image }) {
  return (
    <div>
      <img src={image} alt="img" className=" max-w-[250px] mx-auto" />
    </div>
  );
}

function Heading({ productName }) {
  return (
    <div>
      <h2 className="text-2xl font-medium">{productName}</h2>
    </div>
  );
}

function Price({ productPrice }) {
  const priceToNgn = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  })
    .format(productPrice)
    .split(".")[0];

  return <p className="text-lg tracking-[7px] font-medium">{priceToNgn}</p>;
}

function Button({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="py-2 px-4 hover:scale-105 hover:bg-gray-100 hover:text-gray-700 hover:shadow-xl transition-all rounded-3xl bg-black text-white font-medium "
    >
      Add To Cart
    </button>
  );
}

// start adding state
// start from the Add to cart button
// create a state for the Carts(an Array)
// use the Carts state Array to compute
// the amount of item in the Cart on the Cart logo using .length()
