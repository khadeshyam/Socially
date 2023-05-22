import { useState, useContext } from "react";
import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { Link,useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import { WbSunnyOutlined } from "@mui/icons-material";

const Navbar = () => {
  const [searchValue, setSearchValue] = useState(JSON.parse(localStorage.getItem("searchValue")) || "");
  const { toggle,darkMode } = useContext(DarkModeContext);
  const {currentUser} = useContext(AuthContext);
  const navigate = useNavigate();


  const handleChange = (e) => {
    localStorage.setItem("searchValue",JSON.stringify(e.target.value));
    setSearchValue(e.target.value);
  }
  const handleClear = (e) => {
    localStorage.setItem("searchValue",JSON.stringify(""));
    setSearchValue("");
  }


  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Socially</span>
        </Link>
        <HomeOutlinedIcon onClick={()=>navigate('/')}/>
        {darkMode ?<WbSunnyOutlined onClick={() => toggle()}/>: <DarkModeOutlinedIcon onClick={() => toggle()} />}
        <GridViewOutlinedIcon />
        <div className="search">
          <SearchOutlinedIcon />
          <input
            placeholder="Search"
            value={searchValue}
            onChange={handleChange}
          />
          {searchValue && <CloseIcon onClick={() => handleClear()} />}
        </div>
      </div>
      <div className="right">
        <PersonOutlineOutlinedIcon />
        <EmailOutlinedIcon />
        <NotificationsOutlinedIcon />
        <div className="user">
          <img
            src={currentUser.profilePic}
            alt=""
          />
          <span>{currentUser.username}</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
