import products from "./db";

import { useState, useEffect } from "react";

const ProductGrid = () => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [total, setTotal] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [discountedTotal, setDiscountedTotal] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setCart(storedCart);
    setUser(storedUser);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
    setTotal(totalPrice);
    applyDiscount(coupon);
  }, [cart]);

  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
  };

  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const applyDiscount = (code) => {
    if (code === "Shayan Shah") {
      setDiscountedTotal(total * 0.5);
    } else {
      setDiscountedTotal(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  if (!user) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h2>You are not logged in</h2>
        <a href="/login">Go to Login Page</a>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <h2
          style={{
            margin: "10px",
            backgroundColor: "aliceblue",
            padding: "10px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Welcome {user.username}
        </h2>
        <div style={{ display: "flex", alignItems: "center", margin: "10px" }}>
          <button
            className="cart"
            onClick={toggleCart}
            style={{ marginRight: "10px", padding: "10px", cursor: "pointer" }}
          >
            🛒 Cart <span className="cart-item">{cart.length}</span>
          </button>
          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {/* Cart Popup */}
      {isCartOpen && (
        <div
          style={{
            position: "fixed",
            top: "80px",
            right: "20px",
            backgroundColor: "#fff",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            width: "300px",
            maxHeight: "80vh",
            overflowY: "auto",
            zIndex: 999,
          }}
        >
          <h3>Your Cart</h3>
          {cart.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#f9f9f9",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "6px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "50px",
                  height: "50px",
                  objectFit: "cover",
                  borderRadius: "4px",
                  marginRight: "10px",
                }}
              />
              <div style={{ flex: "1" }}>
                <div style={{ fontWeight: "bold" }}>{item.name}</div>
                <div>${item.price}</div>
              </div>
              <button
                onClick={() => removeFromCart(index)}
                style={{
                  marginLeft: "10px",
                  backgroundColor: "red",
                  color: "white",
                  border: "none",
                  padding: "6px 10px",
                  cursor: "pointer",
                  borderRadius: "4px",
                }}
              >
                Remove
              </button>
            </div>
          ))}
          <div>
            <input
              type="text"
              placeholder="Enter Coupon Code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              style={{ padding: "8px", width: "100%", marginBottom: "10px" }}
            />
            <button
              onClick={() => applyDiscount(coupon)}
              style={{ padding: "8px", width: "100%", marginBottom: "10px" }}
            >
              Apply Discount
            </button>
            <h4>
              Total: $
              {discountedTotal !== null
                ? discountedTotal.toFixed(2)
                : total.toFixed(2)}
            </h4>
          </div>
        </div>
      )}

      {/* Product Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "20px",
              textAlign: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              backgroundColor: "#fff",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{ maxWidth: "100%", height: "200px", objectFit: "cover" }}
            />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p style={{ fontWeight: "bold" }}>${product.price}</p>
            <button
              onClick={() => addToCart(product)}
              style={{
                marginTop: "10px",
                padding: "10px",
                backgroundColor: "green",
                color: "white",
                border: "none",
                cursor: "pointer",
                borderRadius: "6px",
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
