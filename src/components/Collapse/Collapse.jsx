import React, { useState } from 'react';
import './Collapse.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretLeft } from '@fortawesome/free-solid-svg-icons';
const Collapse = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleCollapse = () => {
    setIsOpen(!isOpen);

  };

  return (
    <div className='CollapseContainer'>
        
      <div className='CollapseHeaderContainer' style={{ cursor: 'pointer' }} onClick={toggleCollapse}>
        <div className="HeaderCollapse">
            <strong>{title}</strong>
        
        </div>
        
        <div className="CollapseIcon">
        <FontAwesomeIcon icon={!isOpen ?  faCaretLeft : faCaretDown}/>
        </div>
      </div>
      {isOpen && (
        <div style={{ marginTop: '10px' }}>
          {children}
        </div>
      )}
    </div>
  );
};

export default Collapse;
