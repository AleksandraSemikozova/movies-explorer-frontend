import React from 'react';
import './FlexContainer.css';

function FlexContainer(props) {
  return (
    <div className="flex-container">
{props.children}
    </div>
  );
}

export default FlexContainer;