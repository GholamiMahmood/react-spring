import React, { useState } from 'react';
import Select from 'react-select';
import './nav-bar.css';

const MyDropdown = () => {
  const options = [    
    { value: 'option1', label: 'Categorie', path: '/categorie'  },
    { value: 'option2', label: 'MonPanier' , path: '/monpanier'  }
  ];
  const colorStyles = {
    control: (styles, { isFocused, isHovered }) => ({
      ...styles,
      color: "white",
      backgroundColor: "rgb(196, 196, 226)",
      borderColor:  "rgb(196, 196, 226)",
      "&:hover": {
        backgroundColor: "rgb(196, 196, 226)",
        borderColor: "rgb(196, 196, 226)"
      },
      "&:focus": {
        backgroundColor: "rgb(196, 196, 226)",
        borderColor: "rgb(196, 196, 226)"
      }
    }),
    placeholder: (styles) => ({
      ...styles,
      color: "white",
      borderColor: "rgb(196, 196, 226)",
      cursor: "pointer"
      
    }),
    singleValue: (styles) => ({
      ...styles,
      color: "white",
      borderColor: "rgb(196, 196, 226)",
      
    })
  };
    

  

  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    // pour configuration de page
    if (selectedOption && selectedOption.path) {
        window.location.href = selectedOption.path;
      }
    
  };

  return (
    
    <Select 
      options={options}
      value={selectedOption}
      onChange={handleSelectChange}
      styles={colorStyles}
      placeholder={<span className="dropdown">Achats</span>}
      
    />
    
  );
};

export { MyDropdown };
