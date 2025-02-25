import { useState, useEffect } from 'react';
import axios from 'axios';


import { useNavigate } from "react-router-dom";


import { auth } from "../firebase/firebaseConfig";
import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { BACKEND_URL } from "../config";  
import "../styles/StaticImagePageAynaghor.css";


const StaticImagePageAynaghor = () => {
  const [lines, setLines] = useState([]); // Store lines from the backend
  const [newText, setNewText] = useState(''); // Store text from the popup form
  const [popupVisible, setPopupVisible] = useState(false); // Manage popup visibility

  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  

  // Fetch lines when the component mounts
  useEffect(() => {
    const fetchLines = async () => {
      try {
          const response = await axios.get(`${BACKEND_URL}/api/lines?pageName=Aynaghor`);
          setLines(response.data);
      } catch (error) {
          console.error('Error fetching lines:', error);
      }
  };

  fetchLines();
  }, []); // Empty dependency array means this runs once when the component mounts

// Handle submitting a new line (post request)
  const handleSubmit = async () => {
    if (!newText.trim()) {
        alert('Please enter some text');
        return;
    }

    try {
        await axios.post(`${BACKEND_URL}/api/lines`, { text: newText, pageName: 'Aynaghor' });
        setLines(prevLines => [...prevLines, { text: newText, pageName: 'Aynaghor' }]);
        setNewText(''); // Clear the text area
        setPopupVisible(false); // Close the popup
    } catch (error) {
        console.error('Error submitting new line:', error);
    }
  };

  // Handle text change in the popup
  const handleTextChange = (e) => {
    setNewText(e.target.value);
  };

  // Toggle popup visibility
  const togglePopup = () => {
      setPopupVisible(!popupVisible);
  };



  // const handleAddInput = () => {
  //   setShowModal(true);
  //   setNewText("");
  //   setEditIndex(null);
  // };

  // const handleEditInput = (index) => {
  //   setShowModal(true);
  //   setNewText(inputFields[index].text);
  //   setEditIndex(index);
  // };

  // const handleDelete = async (id, index) => {
  //   try {
  //     const response = await fetch(`${BACKEND_URL}/api/lines/${id}`, {
  //       method: "DELETE",
  //     });

  //     if (response.ok) {
  //       // Remove the deleted line from the inputFields state
  //       const updatedFields = [...inputFields];
  //       updatedFields.splice(index, 1); // Remove the element at the specified index
  //       setInputFields(updatedFields);
  //     } else {
  //       console.error("Error deleting line:", await response.json());
  //     }
  //   } catch (err) {
  //     console.error("Error deleting line:", err);
  //   }
  // };

  

  return (

    <div className="staticimage-background-aynaghor">

      <button className="name-logo-btn-aynaghor" onClick={() => navigate("/homepage")}>
        Social up Internal Team - Aynaghor
      </button>


      <h1 className="staticimage-title-aynaghor">Static Images</h1>


      <div className="add-link-container-aynaghor">

        <button className="add-links-btn-aynaghor" onClick={togglePopup}>
          Add Link(s)
        </button>

        {popupVisible && 
        (
                <div className="popup">
                    <textarea value={newText} onChange={handleTextChange} placeholder="Enter your text" />
                    <button onClick={handleSubmit}>Submit</button>
                    <button onClick={togglePopup}>Cancel</button>
                </div>
        )}

      </div>



      <div>
        {lines.length === 0 ? (
            <p>No data found</p>
        ) : (
            lines.map((line, index) => (
                <div key={index}>
                    <textarea defaultValue={line.text} readOnly />
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            ))
        )}
      </div>

      {/* <div className="input-stack-aynaghor">
        {inputFields.map((input, index) => (
          <div key={input._id} className="input-container-aynaghor">
            <textarea
              className="input-box-aynaghor"
              value={input.text}
              readOnly
              rows={4}
            />

            <button onClick={() => handleEditInput(index)} className="edit-btn-aynaghor">
              Edit
            </button>

            <button onClick={() => handleDelete(input._id, index)} className="delete-btn-aynaghor">
              Delete
            </button>

          </div>
        ))}
      </div> */}

      {/* {showModal && (
        <div className="modal-aynaghor">
          <div className="modal-content-aynaghor">
            <textarea
              className="textarea-modal-aynaghor"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              rows={4}
            />
            <div className="modal-actions-aynaghor">
              <button onClick={() => setShowModal(false)} className="cancel-btn-aynaghor">
                Cancel
              </button>
              <button onClick={handleSubmit} className="submit-btn-aynaghor">
                Submit
              </button>
            </div>
          </div>
        </div>
      )} */}





      {/* Clients Dropdown */}
      <div className="staticimage-container-aynaghor">
        <div className="client-group-aynaghor">
          <button className="client-btn-aynaghor">CLIENTS</button>
          <div className="dropdown-menu-aynaghor">
            <ul>
              <li className="nested-group-aynaghor">
                Aynaghor
                <div className="sub-dropdown-aynaghor">
                  <ul>
                    <li>
                      <a href="https://docs.google.com/spreadsheets/d/1bA2KnZS-BNojICiAmR-J5WzZMw75a5Wxz-MskdqllNg/edit?gid=1408711553#gid=1408711553"
                        target="_blank" rel="noopener noreferrer" className="dropdown-link-aynaghor">Image Raw File</a>
                    </li>
                    <li>Monthly Calendar</li>
                  </ul>
                </div>
              </li>
              <li className="nested-group-aynaghor">Pinx Sutton
                <div className="sub-dropdown-aynaghor">
                  <ul>
                    <li>
                      <a href="https://docs.google.com/spreadsheets/d/1bA2KnZS-BNojICiAmR-J5WzZMw75a5Wxz-MskdqllNg/edit?gid=126335980#gid=126335980"
                        target="_blank" rel="noopener noreferrer" className="dropdown-link-aynaghor">Image Raw File</a>
                    </li>
                    <li>
                      <a href="https://docs.google.com/spreadsheets/d/1buytpwuum9vRTvQFcsErhPnbbKH0EumP7Kdg355zgg0/edit?gid=1236969051#gid=1236969051"
                        target="_blank" rel="noopener noreferrer" className="dropdown-link-aynaghor">Monthly Calendar</a>
                    </li>
                    <li>
                      <Link to="/static-images-pinx" className="dropdown-link-aynaghor">Static Images</Link>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="nested-group-aynaghor">ACE FM
                <div className="sub-dropdown-aynaghor">
                  <ul>
                    <li>
                      <a href="https://docs.google.com/spreadsheets/d/1bA2KnZS-BNojICiAmR-J5WzZMw75a5Wxz-MskdqllNg/edit?gid=561127280#gid=561127280"
                        target="_blank" rel="noopener noreferrer" className="dropdown-link-aynaghor">Image Raw File</a>
                    </li>
                    <li>
                      <a href="https://docs.google.com/spreadsheets/d/1buytpwuum9vRTvQFcsErhPnbbKH0EumP7Kdg355zgg0/edit?gid=745352648#gid=745352648"
                        target="_blank" rel="noopener noreferrer" className="dropdown-link-aynaghor">Monthly Calendar</a>
                    </li>
                    <li>
                      <Link to="/static-images-ace" className="dropdown-link-aynaghor">Static Images</Link>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <button className="logout-btn-aynaghor" onClick={handleLogout}>
          LOGOUT
        </button>
      </div>

      <div className="social-icons-aynaghor">
        <a href="https://www.linkedin.com/in/nizar-ahmed/" target="_blank" rel="noopener noreferrer" className="icon-link-aynaghor">
          <FaLinkedin />
        </a>
        <a href="https://github.com/Nizar991" target="_blank" rel="noopener noreferrer" className="icon-link-aynaghor">
          <FaGithub />
        </a>
      </div>
    </div>
  );
};

export default StaticImagePageAynaghor;
