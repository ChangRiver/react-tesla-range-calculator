import React from 'react';
import './tesla-stats.css';

const TeslaStats = props => {
  return (
    <li>
      <div className={"tesla-stats-icon tesla-stats-icon--" + props.model.toLowerCase()}></div>
      <p>{ props.miles }</p>
    </li>
  )
};

export default TeslaStats;