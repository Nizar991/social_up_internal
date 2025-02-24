import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";
import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { BACKEND_URL } from "../config";  // Import backend URL
import "../styles/StaticImagePagePinx.css";

const StaticImagePagePinx = () => {
  const [inputFields, setInputFields] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newText, setNewText] = useState("");  
  const [editIndex, setEditIndex] = useState(null); 

  const navigate = useNavigate();
  const location = useLocation();  // To get the current route
  const pageName = location.pathname.split('/').pop(); // Dynamically extract the page name
  
  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  // Fetch data based on the dynamic page name
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/lines?page=${pageName}`);
        const data = await res.json();
        setInputFields(data);
      } catch (err) {
        console.error("Error fetching lines:", err);
      }
    };

    fetchData(); // Fetch data when the page component mounts

    return () => {};
  }, [pageName]); // Trigger fetch when the pageName changes

  const handleAddInput = () => {
    setShowModal(true);
    setNewText("");
    setEditIndex(null);
  };

  const handleEditInput = (index) => {
    setShowModal(true);
    setNewText(inputFields[index].text);
    setEditIndex(index);
  };

  const handleDelete = async (id, index) => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/lines/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove the deleted line from the inputFields state
        const updatedFields = [...inputFields];
        updatedFields.splice(index, 1); // Remove the element at the specified index
        setInputFields(updatedFields);
      } else {
        console.error("Error deleting line:", await response.json());
      }
    } catch (err) {
      console.error("Error deleting line:", err);
    }
  };

  const handleSubmit = async () => {
    if (newText.trim() !== "") {
      if (editIndex === null) {
        // Adding new text
        const response = await fetch(`${BACKEND_URL}/api/lines`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: newText, page: pageName }), // Pass the dynamic page name here
        });

        if (response.ok) {
          const savedLine = await response.json();
          setInputFields([...inputFields, savedLine]);
        } else {
          console.error("Error on POST:", await response.json());
        }
      } else {
        // Updating existing text
        const updatedFields = [...inputFields];
        const id = updatedFields[editIndex]._id;
        updatedFields[editIndex].text = newText;

        await fetch(`${BACKEND_URL}/api/lines/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: newText }),
        });

        setInputFields(updatedFields);
      }

      setShowModal(false);
      setNewText("");
    }
  };

  return (
    <div className="staticimage-background-pinx">
      <button className="name-logo-btn-pinx" onClick={() => navigate("/homepage")}>
        Social up Internal Team - Pinx
      </button>
      <h1 className="staticimage-title-pinx">Static Images</h1>

      <div className="add-link-container-pinx">
        <button className="add-links-btn-pinx" onClick={handleAddInput}>
          Add Link(s)
        </button>
      </div>

      <div className="input-stack-pinx">
        {inputFields.map((input, index) => (
          <div key={input._id} className="input-container-pinx">
            <textarea
              className="input-box-pinx"
              value={input.text}
              readOnly
              rows={4}
            />
            <button onClick={() => handleEditInput(index)} className="edit-btn-pinx">
              Edit
            </button>
            <button onClick={() => handleDelete(input._id, index)} className="delete-btn-pinx">
              Delete
            </button>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-pinx">
          <div className="modal-content-pinx">
            <textarea
              className="textarea-modal-pinx"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              rows={4}
            />
            <div className="modal-actions-pinx">
              <button onClick={() => setShowModal(false)} className="cancel-btn-pinx">
                Cancel
              </button>
              <button onClick={handleSubmit} className="submit-btn-pinx">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}







      {/* Clients Dropdown */}
      <div className="staticimage-container-pinx">
        <div className="client-group-pinx">
          <button className="client-btn-pinx">CLIENTS</button>
          <div className="dropdown-menu-pinx">
            <ul>
              <li className="nested-group-pinx">
                Aynaghor
                <div className="sub-dropdown-pinx">
                  <ul>
                    <li>
                      <a href="https://docs.google.com/spreadsheets/d/1bA2KnZS-BNojICiAmR-J5WzZMw75a5Wxz-MskdqllNg/edit?gid=1408711553#gid=1408711553"
                         target="_blank" rel="noopener noreferrer" className="dropdown-link-pinx">Image Raw File</a>
                    </li>
                    <li>Monthly Calendar</li>
                    <li>
                      <Link to="/static-images-aynaghor" className="dropdown-link-pinx">Static Images</Link>
                    </li>
                  </ul>
                </div>
              </li>

              <li className="nested-group-pinx">Pinx Sutton
                <div className="sub-dropdown-pinx">
                  <ul>
                    <li>
                      <a href="https://docs.google.com/spreadsheets/d/1bA2KnZS-BNojICiAmR-J5WzZMw75a5Wxz-MskdqllNg/edit?gid=126335980#gid=126335980"
                         target="_blank" rel="noopener noreferrer" className="dropdown-link-pinx">Image Raw File</a>
                    </li>
                    <li>
                      <a href="https://docs.google.com/spreadsheets/d/1buytpwuum9vRTvQFcsErhPnbbKH0EumP7Kdg355zgg0/edit?gid=1236969051#gid=1236969051"
                         target="_blank" rel="noopener noreferrer" className="dropdown-link-pinx">Monthly Calendar</a>
                    </li>
                    
                  </ul>
                </div>
              </li>

              <li className="nested-group-pinx">ACE FM
                <div className="sub-dropdown-pinx">
                  <ul>
                    <li>
                      <a href="https://docs.google.com/spreadsheets/d/1bA2KnZS-BNojICiAmR-J5WzZMw75a5Wxz-MskdqllNg/edit?gid=561127280#gid=561127280"
                         target="_blank" rel="noopener noreferrer" className="dropdown-link-pinx">Image Raw File</a>
                    </li>
                    <li>
                      <a href="https://docs.google.com/spreadsheets/d/1buytpwuum9vRTvQFcsErhPnbbKH0EumP7Kdg355zgg0/edit?gid=745352648#gid=745352648"
                         target="_blank" rel="noopener noreferrer" className="dropdown-link-pinx">Monthly Calendar</a>
                    </li>
                    <li>
                      <Link to="/static-images-ace" className="dropdown-link-pinx">Static Images</Link>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <button className="logout-btn-pinx" onClick={handleLogout}>
          LOGOUT
        </button>
      </div>

      <div className="social-icons-pinx">
        <a href="https://www.linkedin.com/in/nizar-ahmed/" target="_blank" rel="noopener noreferrer" className="icon-link-pinx">
          <FaLinkedin />
        </a>
        <a href="https://github.com/Nizar991" target="_blank" rel="noopener noreferrer" className="icon-link-pinx">
          <FaGithub />
        </a>
      </div>
    </div>
  );
};

export default StaticImagePagePinx;
