import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";
import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { BACKEND_URL } from "../config";  // Import backend URL
import "../styles/StaticImagePageAce.css";

const StaticImagePageAce = () => {
  const [inputFields, setInputFields] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [removeIndex, setRemoveIndex] = useState(null);

  const navigate = useNavigate();

  // Fetch lines from backend when the page loads
  useEffect(() => {
    fetch(`${BACKEND_URL}/api/lines/ace`)
      .then(res => res.json())
      .then(data => setInputFields(data))
      .catch(err => console.error("Error fetching lines:", err));
  }, []);

  // Add new line (Save to Backend)
  const handleAddInput = async () => {
    const newLine = { text: "", page: "ace" }; // Default empty line for Ace

    const response = await fetch(`${BACKEND_URL}/api/lines`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newLine),
    });

    if (response.ok) {
      const savedLine = await response.json();
      setInputFields([...inputFields, savedLine]);
    }
  };

  // Update line (Save to Backend)
  const handleInputChange = async (index, value) => {
    const updatedLines = [...inputFields];
    updatedLines[index].text = value;
    setInputFields(updatedLines);

    await fetch(`${BACKEND_URL}/api/lines/${updatedLines[index]._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: value }),
    });
  };

  // Remove input field (Delete from Backend)
  const handleRemoveInput = (index) => {
    setRemoveIndex(index);
    setShowModal(true);
  };

  const handleDeleteInput = async () => {
    const idToDelete = inputFields[removeIndex]._id;

    await fetch(`${BACKEND_URL}/api/lines/${idToDelete}`, {
      method: "DELETE",
    });

    setInputFields(inputFields.filter((_, index) => index !== removeIndex));
    setShowModal(false);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

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
    <div className="staticimage-background-ace">
      <button className="name-logo-btn-ace" onClick={handleLogoClick}>
        Social up Internal Team - Ace
      </button>
      <h1 className="staticimage-title-ace">Static Images</h1>
      
      <div className="add-link-container-ace">
        <button className="add-links-btn-ace" onClick={handleAddInput}>
          Add Link(s)
        </button>
      </div>

      <div className="input-stack-ace">
        {inputFields.map((input, index) => (
          <div key={input._id} className="input-container-ace">
            <textarea
              className="input-box-ace"
              value={input.text}
              onChange={(e) => handleInputChange(index, e.target.value)}
              rows={4}
            />
            <button onClick={() => handleRemoveInput(index)} className="remove-btn-ace">-</button>
            <button onClick={handleAddInput} className="add-btn-ace">+</button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-ace">
          <div className="modal-content-ace">
            <p>Are you sure you want to delete this link?</p>
            <button onClick={handleDeleteInput} className="delete-btn-ace">Yes</button>
            <button onClick={handleCancelDelete} className="cancel-btn-ace">No</button>
          </div>
        </div>
      )}

      <div className="staticimage-container-ace">
        {/* Clients Dropdown */}
        <div className="client-group-ace">
          <button className="client-btn-ace">CLIENTS</button>
          <div className="dropdown-menu-ace">
            <ul>
              <li className="nested-group-ace">Aynaghor
                <div className="sub-dropdown-ace">
                  <ul>
                    <li>
                      <a href="https://docs.google.com/spreadsheets/d/1bA2KnZS-BNojICiAmR-J5WzZMw75a5Wxz-MskdqllNg/edit?gid=1408711553#gid=1408711553" target="_blank" rel="noopener noreferrer" className="dropdown-link-ace">Image Raw File</a>
                    </li>
                    <li>Monthly Calendar</li>
                    <li>
                      <Link to="/static-images-aynaghor" className="dropdown-link-ace">Static Images</Link>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="nested-group-ace">Pinx Sutton
                <div className="sub-dropdown-ace">
                  <ul>
                    <li>
                      <a href="https://docs.google.com/spreadsheets/d/1bA2KnZS-BNojICiAmR-J5WzZMw75a5Wxz-MskdqllNg/edit?gid=126335980#gid=126335980" target="_blank" rel="noopener noreferrer" className="dropdown-link-ace">Image Raw File</a>
                    </li>
                    <li>
                      <a href="https://docs.google.com/spreadsheets/d/1buytpwuum9vRTvQFcsErhPnbbKH0EumP7Kdg355zgg0/edit?gid=1236969051#gid=1236969051" target="_blank" rel="noopener noreferrer" className="dropdown-link-ace">Monthly Calendar</a>
                    </li>
                    <li>
                      <Link to="/static-images-pinx" className="dropdown-link-ace">Static Images</Link>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="nested-group-ace">ACE FM
                <div className="sub-dropdown-ace">
                  <ul>
                    <li>
                      <a href="https://docs.google.com/spreadsheets/d/1bA2KnZS-BNojICiAmR-J5WzZMw75a5Wxz-MskdqllNg/edit?gid=561127280#gid=561127280" target="_blank" rel="noopener noreferrer" className="dropdown-link-ace">Image Raw File</a>
                    </li>
                    <li>
                      <a href="https://docs.google.com/spreadsheets/d/1buytpwuum9vRTvQFcsErhPnbbKH0EumP7Kdg355zgg0/edit?gid=745352648#gid=745352648" target="_blank" rel="noopener noreferrer" className="dropdown-link-ace">Monthly Calendar</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Logout Button */}
        <button className="logout-btn-ace" onClick={handleLogout}>
          LOGOUT
        </button>
      </div>

      <div className="social-icons-ace">
        <a
          href="https://www.linkedin.com/in/nizar-ahmed/"
          target="_blank" rel="noopener noreferrer" className="icon-link-ace">
          <FaLinkedin />
        </a>
        <a
          href="https://github.com/Nizar991"
          target="_blank" rel="noopener noreferrer" className="icon-link-ace">
          <FaGithub />
        </a>
      </div>
    </div>
  );
};

export default StaticImagePageAce;
