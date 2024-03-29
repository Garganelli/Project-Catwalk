import React from 'react';
import ArrowMarkerBar from './ArrowMarkerBar.jsx';

function  Comfort(props) {
  return (
    <div>
    <div className="comfort">Comfort</div>
    <ArrowMarkerBar value={props.comfort}/>
    <div className="sizeRating">
      <div className="poor">Poor</div>
      <div className="perfect1">Perfect</div>
    </div>
  </div>
  )
}

export default Comfort;