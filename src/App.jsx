import React, { useState, useEffect } from "react";
import Auth from "./Auth";
import ProductGrid from "./ProductGrid";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogin = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div>
      {!user ? (
        <Auth onLogin={handleLogin} />
      ) : (
        <ProductGrid username={user.username} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
