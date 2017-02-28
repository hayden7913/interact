import React from 'react'
import { render } from 'react-dom'
import Interactive from '../../src/Interactable'

function roundToNearestDigit(inputValue, digit) {  
    return Math.round(inputValue / digit) * digit; 
}

const state = {
  dx: 0,
  dy: 0
}

const handleSlowMovement = (mousePositionChange, axis, step, initialValue) => {
  const delta = `d${axis}`;
    
  if (mousePositionChange > 0) {
    state[delta] += mousePositionChange;
    
    if (state[delta] >= step) {
      state[delta] = 0;
      return step;
    }
  } else {
    state[delta] += mousePositionChange;

    if (state[delta] <= -step) {
      state[delta] = 0;
      return -step;
      
    }
  }

  return 0; 
}

const draggableOptions = {
  
  snap
  
  onmove: event => {
    const target = event.target;
    // keep the dragged position in the data-x/data-y attributes
    let x = (parseFloat(target.getAttribute('data-x')) || 0);
    let y = (parseFloat(target.getAttribute('data-y')) || 0);
    const step = 1;
    
    
    
    x += drag Math.abs(event.dx) < step ? 
      handleSlowMovement(event.dx, 'x', step, x) 
      : 
      roundToNearestDigit(event.dx, step);
      
    y +=  Math.abs(event.dy) < step ? 
      handleSlowMovement(event.dy, 'y', step, y) 
      : 
      roundToNearestDigit(event.dy, step);
  
    
    
  /*  if (Math.abs(event.dx) < step) {
      const increment = handleSlowMovement(event.dx, 'x', step, x)
      console.log(increment)
      x += increment;
    } else {
       x += roundToNearestDigit(event.dx, step)
    }
    
    if (Math.abs(event.dy) < step) {
      const increment = handleSlowMovement(event.dy, 'y', step, y)
      console.log(increment)
      y += increment;
    } else {
       y += roundToNearestDigit(event.dy, step)
    }*/
  
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)'

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
  }
}

const example = (
  <div>
    <h2>Draggable</h2>
      <Interactive draggable draggableOptions={draggableOptions}>
        <svg>
          <rect width="200" height="200" fill="blue" />
        </svg>   
      </Interactive>
      
      <Interactive draggable draggableOptions={draggableOptions}>
        <svg>
          <rect width="200" height="200" fill="green
            " />
        </svg>   
      </Interactive>
  </div>
)

render(example, document.getElementById('container'));