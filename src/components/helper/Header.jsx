import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Logo from "../../assets/logo.png";

function Header() {
  const navigate = useNavigate();
  const [searchItem, setSearchItem] = useState("");
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [isHidden, setIsHidden] = useState(false);

  function goToSearchPage(e) {
    e.preventDefault();
    navigate(`/search?searchItem=${searchItem}`);
  }
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > lastScrollTop) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      setLastScrollTop(scrollTop);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);
  return (
    <header
      style={{
        position: "fixed",
        top: isHidden ? "-100px" : "0px",
        transition: "top 0.3s",
      }}
    >
      <div className="nav-container">
        <span id="logo">
          <Link to={"/"}>
            <img src={Logo} alt="Logo" />
          </Link>
        </span>
        <nav>
          <form onSubmit={goToSearchPage}>
            <input
              type="text"
              placeholder="Search..."
              id="searchBar"
              onChange={(e) => setSearchItem(e.target.value)}
            />
            <button type="submit" id="searchBtn" onClick={goToSearchPage}>
              <i className="bx bx-search"></i>
            </button>
          </form>
        </nav>
      </div>
    </header>
  );
}

export default Header;
