import React, { useState } from "react";

const Auth = ({ onLogin }) => {
  const [mode, setMode] = useState("login"); // toggle: 'login' or 'signup'
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = () => {
    if (!username || !password) return setMessage("Enter both fields.");
    const users = JSON.parse(localStorage.getItem("users") || "{}");
    if (users[username]) {
      setMessage("Username exists.");
    } else {
      users[username] = { username, password };
      localStorage.setItem("users", JSON.stringify(users));
      setMessage("Signup success. You can login now.");
      setMode("login");
    }
  };

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users") || "{}");
    if (users[username]?.password === password) {
      onLogin({ username });
    } else {
      setMessage("Invalid credentials.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "360px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "16px" }}>
        {mode === "login" ? "Login" : "Sign Up"}
      </h2>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "8px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "12px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />

      <button
        onClick={mode === "login" ? handleLogin : handleSignup}
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "8px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        {mode === "login" ? "Login" : "Sign Up"}
      </button>

      <p style={{ textAlign: "center" }}>
        {mode === "login" ? "Don't have an account?" : "Have an account?"}{" "}
        <button
          style={{
            color: "#007BFF",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => {
            setMode(mode === "login" ? "signup" : "login");
            setMessage("");
          }}
        >
          {mode === "login" ? "Sign Up" : "Login"}
        </button>
      </p>

      {message && (
        <p style={{ color: "red", textAlign: "center" }}>{message}</p>
      )}
    </div>
  );
};

export default Auth;
