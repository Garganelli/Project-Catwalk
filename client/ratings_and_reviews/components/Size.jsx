import React from 'react';
import ArrowMarkerBar from './ArrowMarkerBar.jsx';

function Size(props) {
  return (
    <div>
      <div className="fit">Fit</div>
      <ArrowMarkerBar value={props.fit}/>
      <div className="sizeRating">
        <div className="tooSmall">Too small</div>
        <div className="perfect">Perfect</div>
        <div className="tooLarge">Too large</div>
      </div>
    </div>
  )
}

export default Size;