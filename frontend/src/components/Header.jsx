import React from "react";
import HighlightIcon from "@mui/icons-material/Highlight";
import axios from "axios";
import "./Header.css";
const API_URL = "http://localhost:4000";

const handleLogout = async () => {
  try {
    const response = await axios.get(`${API_URL}/logout`);
    alert(response.data.message);
    window.location.reload();
  } catch (err) {
    console.error('Logout failed', err);
  }
};


function Header(props) {
  return (
    <header>
      <h1>
        <HighlightIcon />
        Agrotech
      </h1>
      <p className="headerp1">{props.uname}</p>
      <button onClick={handleLogout}>Log Out</button>
    </header>
  );
}

export default Header;
