import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";
import { Link } from "react-router-dom";
import "../styles/HomePage.css";

const HomePage = () => {
  const navigate = useNavigate();
  

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleLogoClick = () => {
    navigate("/homepage");
  };

  return (
    <div className="homepage-background">
      <button className="name-logo-btn" onClick={handleLogoClick}>
        Social up Internal Team
      </button>
      <div className="homepage-container">
        {/* Clients Dropdown */}
        <div className="client group">
          <button className="client-btn">CLIENTS</button>
          <div className="dropdown-menu">
            <ul>


              <li className="nested-group">
                  Aynaghor
                  <div className="sub-dropdown">
                    <ul>
                      <li>
                        <a href="https://docs.google.com/spreadsheets/d/1bA2KnZS-BNojICiAmR-J5WzZMw75a5Wxz-MskdqllNg/edit?gid=1408711553#gid=1408711553" target="_blank" rel="noopener noreferrer" className="dropdown-link">Image Raw File</a>
                      </li>
                      <li>Monthly Calender</li>
                      <li>
                        <Link to="/static-images-aynaghor" className="dropdown-link">Static Images</Link>
                      </li>
                    </ul>
                  </div>
              </li>


              <li className="nested-group">
                Pinx Sutton
                <div className="sub-dropdown">
                    <ul>
                      <li>
                        <a href="https://docs.google.com/spreadsheets/d/1bA2KnZS-BNojICiAmR-J5WzZMw75a5Wxz-MskdqllNg/edit?gid=126335980#gid=126335980" target="_blank" rel="noopener noreferrer" className="dropdown-link">Image Raw File</a>
                      </li>
                      <li>
                        <a href="https://docs.google.com/spreadsheets/d/1buytpwuum9vRTvQFcsErhPnbbKH0EumP7Kdg355zgg0/edit?gid=1236969051#gid=1236969051" target="_blank" rel="noopener noreferrer" className="dropdown-link">Monthly Calender</a>
                      </li>
                      <li>
                        <Link to="/static-images-pinx" className="dropdown-link">Static Images</Link>
                      </li>
                    </ul>
                  </div>
              </li>


              <li className="nested-group">
                ACE FM
                <div className="sub-dropdown">
                    <ul>
                      <li>
                        <a href="https://docs.google.com/spreadsheets/d/1bA2KnZS-BNojICiAmR-J5WzZMw75a5Wxz-MskdqllNg/edit?gid=561127280#gid=561127280" target="_blank" rel="noopener noreferrer" className="dropdown-link">Image Raw File</a>
                      </li>
                      <li>
                        <a href="https://docs.google.com/spreadsheets/d/1buytpwuum9vRTvQFcsErhPnbbKH0EumP7Kdg355zgg0/edit?gid=745352648#gid=745352648" target="_blank" rel="noopener noreferrer" className="dropdown-link">Monthly Calender</a>
                      </li>
                      <li>
                        <Link to="/static-images-ace" className="dropdown-link">Static Images</Link>
                      </li>
                    </ul>
                  </div>
              </li>


            </ul>
          </div>
        </div>

        {/* Logout Button */}
        <button className="logout-btn" onClick={handleLogout}>
          LOGOUT
        </button>
      </div>
    </div>
  );
};

export default HomePage;
