import React from 'react';
import './tesla-car.css';

const TeslaCar = props => {
  return (
    <div className="tesla-car">
      <div className="tesla-wheels">
        <div className={ 'tesla-wheel tesla-wheel--front tesla-wheel--' + props.wheelsize }></div>
        <div className={ 'tesla-wheel tesla-wheel--rear tesla-wheel--' + props.wheelsize }></div>
      </div>
    </div>
  )
};

export default TeslaCar;