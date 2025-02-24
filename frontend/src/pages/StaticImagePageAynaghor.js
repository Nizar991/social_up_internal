import { useState, useEffect } from 'react';
import { useNavigate, useLocation  } from "react-router-dom";
import { auth } from "../firebase/firebaseConfig";
import { Link } from "react-router-dom";
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { BACKEND_URL } from "../config";  // Import backend URL
import "../styles/StaticImagePageAynaghor.css";

const StaticImagePageAynaghor = () => {
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
    console.log("Fetching data for page:", pageName);
    const fetchData = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/lines?page=${pageName}`);
        const data = await res.json();
        console.log("Fetched lines:", data);  
        setInputFields(data);
      } catch (err) {
        console.error("Error fetching lines:", err);
      }
    };

    fetchData(); 

    // return () => {};
  }, [pageName]); 

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
        const page = pageName;  

        const requestBody = {
            text: newText,
            page: page,  
        };

        // console.log("Submitting text:", newText);
        // console.log("Submitting page:", page);

        if (editIndex === null) {
            // Adding new text
            const response = await fetch(`${BACKEND_URL}/api/lines`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody), 
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
                body: JSON.stringify({ text: newText, page: page }),  // Include page here as well
            });

            setInputFields(updatedFields);
        }

        setShowModal(false);
        setNewText("");
    } else {
        console.log("Text is empty, cannot submit");
    }
};

  return (
    <div className="staticimage-background-aynaghor">
      <button className="name-logo-btn-aynaghor" onClick={() => navigate("/homepage")}>
        Social up Internal Team - Aynaghor
      </button>
      <h1 className="staticimage-title-aynaghor">Static Images</h1>

      <div className="add-link-container-aynaghor">
        <button className="add-links-btn-aynaghor" onClick={handleAddInput}>
          Add Link(s)
        </button>
      </div>

      <div className="input-stack-aynaghor">
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
      </div>

      {showModal && (
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
      )}





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
