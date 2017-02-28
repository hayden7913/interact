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

/*console.log(handleSmallChange(event.dx, state.dx, 10, 0), state.dx);
console.log(handleSmallChange(event.dx, state.dx, 10, 3), state.dx);  
console.log(handleSmallChange(event.dx, state.dx, 10, 7), state.dx); */

const draggableOptions = {
  
  onmove: event => {
    const target = event.target;
    // keep the dragged position in the data-x/data-y attributes
    let x = (parseFloat(target.getAttribute('data-x')) || 0);
    let y = (parseFloat(target.getAttribute('data-y')) || 0);
    const step = 10
    
    if (Math.abs(event.dx) < step) {
      //  console.log("result", handleSlowMovement(event.dx, 'x', 10, x))
      const increment = handleSlowMovement(event.dx, 'x', step, x)
      console.log(increment)
      x += increment;
      // console.log('x value', x)
    } else {
       x += roundToNearestDigit(event.dx, step)
    }
    
    /*if (Math.abs(event.dy) < step) {
      // console.log("result", handleSlowMovement(event.dy, 'y', step, y))
      y += handleSlowMovement(event.dy, 'y', 10, y)
      // console.log('y value', y)
    } else {
       y += event.dy;
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