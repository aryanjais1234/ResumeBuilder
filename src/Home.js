import React, { useState, useEffect, useRef } from 'react';
import './Home.css';
import { ModeEditOutlineOutlined } from '@mui/icons-material';
import Sortable from 'sortablejs';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Switch from './Switch';
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { purple } from "@mui/material/colors";


function Home() {
  const initialSections = [
    {
      name: 'Profile Summary',
      message: 'This is the profile summary section.'
    },
    {
      name: 'Academic and Cocurricular Achievements',
      message: 'These are the academic and cocurricular achievements.'
    },
    {
      name: 'Summer Internship Experience',
      message: 'This is the summer internship experience section.'
    },
    {
      name: 'Work Experience',
      message: 'This is the work experience section.'
    },
    {
      name: 'Projects',
      message: 'This is the projects section.'
    },
    {
      name: 'Certifications',
      message: 'This is the certifications section.'
    },
    {
      name: 'Leadership Positions',
      message: 'These are the leadership positions.'
    },
    {
      name: 'Extracurricular',
      message: 'This is the extracurricular section.'
    },
    {
      name: 'Education',
      message: 'This is the education section.'
    }
  ];

  const [sections, setSections] = useState(initialSections);
  const [editMode, setEditMode] = useState(Array(initialSections.length).fill(false));
  const [editedSections, setEditedSections] = useState([...initialSections]);
  const dragAreaRef = useRef(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [hoveredSectionMessage, setHoveredSectionMessage] = useState('');

  useEffect(() => {
    if (dragAreaRef.current) {
      Sortable.create(dragAreaRef.current, {
        animation: 150,
        onEnd: handleDragEnd
      });
    }
  }, []);

  const handleEditClick = (index) => {
    const updatedEditMode = [...editMode];
    updatedEditMode[index] = true;
    setEditMode(updatedEditMode);
  };

  const handleSaveClick = (index) => {
    const updatedEditMode = [...editMode];
    updatedEditMode[index] = false;
    setEditMode(updatedEditMode);
    const updatedSections = [...sections];
    updatedSections[index].name = editedSections[index].name;
    updatedSections[index].message = editedSections[index].message;
    setSections(updatedSections);
  };

  const handleInputChange = (index, event) => {
    const updatedSections = [...editedSections];
    updatedSections[index].name = event.target.value;
    setEditedSections(updatedSections);
  };

  const handleSectionClick = (index) => {
    if (!editMode[index]) {
      setSelectedSection(index);
    }
  };

  

  const handleSectionHover = (index) => {
    if (!editMode[index]) {
      const message = sections[index].message;
      setHoveredSectionMessage(message);
    }
  };

  const handleBoxClose = (event) => {
    event.stopPropagation();
    setSelectedSection(null);
  };

  const handleDragEnd = (event) => {
    const { oldIndex, newIndex } = event;
    if (oldIndex === newIndex) return;

    const updatedSections = Array.from(sections);
    const [removed] = updatedSections.splice(oldIndex, 1);
    updatedSections.splice(newIndex, 0, removed);

    const updatedEditMode = Array.from(editMode);
    const [removedEditMode] = updatedEditMode.splice(oldIndex, 1);
    updatedEditMode.splice(newIndex, 0, removedEditMode);

    const updatedEditedSections = Array.from(editedSections);
    const [removedEdited] = updatedEditedSections.splice(oldIndex, 1);
    updatedEditedSections.splice(newIndex, 0, removedEdited);

    setSections(updatedSections);
    setEditMode(updatedEditMode);
    setEditedSections(updatedEditedSections);
  };

  

  const ColorButton = styled(Button)(({ theme }) => ({
	color: theme.palette.getContrastText(purple[500]),
	backgroundColor: purple[500],
	textTransform: "none",
	"&:hover": {
		backgroundColor: purple[700],
	},
}));

  return (
    <>
    <div className="section">
      <h2>Select your Section</h2>
      <div className="drag-area" ref={dragAreaRef}>
        {sections.map((section, index) => (
          <div key={index} className="section-item">
            <div className="drag-button">
              <i className="fa fa-bars drag"></i>
            </div>
            <div
              className="section-text"
              onMouseEnter={() => handleSectionHover(index)}
              onClick={() => handleSectionClick(index)}
            >
              <span className="section-icon">
                <InfoOutlinedIcon />
              </span>
              {editMode[index] ? (
                <input
                  type="text"
                  value={editedSections[index].name}
                  onChange={(event) => handleInputChange(index, event)}
                  />
              ) : (
                <span>{section.name}</span>
              )}
              {selectedSection === index && (
                <div className="message-box">
                  <p>{hoveredSectionMessage}</p>
                  <button className="box-close" onClick={handleBoxClose}>
                    Close
                  </button>
                </div>
              )}
            </div>
            <div className="section-buttons">
              {editMode[index] ? (
                  <button className="save" onClick={() => handleSaveClick(index)}>
                  Save
                </button>
              ) : (
                  <button className="edit" onClick={() => handleEditClick(index)}>
                  <ModeEditOutlineOutlined />
                </button>
              )}
              <Switch /> {/* Add the Switch component here */}
            </div>
          </div>
        ))}
      </div>
    </div>
			<ColorButton
				variant="contained"
				style={{ paddingLeft: "10%", paddingRight: "10%",marginLeft:"37%" }}
			>
				Save and Next
			</ColorButton>
                  </>
  );
}

export default Home;
