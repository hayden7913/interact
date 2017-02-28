import React from 'react'
import { render } from 'react-dom'
import Interactive from '../../src/Interactable'

function roundToNearest(x, dx) {  
    const sign = dx / Math.abs(dx);
    if(dx < 10) return x + 10 * sign;
    if(dx >= 10) return Math.round(x/10)*10; 
}

const state = {
  dx: 0
}

const handleSlowMovement = (mousePositionChange, axis, step, initialValue) => {
  const delta = `d${axis}`;
  let result = initialValue;
    console.log(mousePositionChange, delta, step, initialValue)
  if (mousePositionChange > 0) {
    state[delta] += mousePositionChange;
    
    if (state[delta] >= step) {
      result += step;
      state[delta] = 0;
    }
  } else {
    state[delta] += mousePositionChange;

    if (state[delta] <= -step) {
      result -= step;
      state[delta] = 0;
    }
  }
    
  return result; 
}

/*console.log(handleSmallChange(event.dx, state.dx, 10, 0), state.dx);
console.log(handleSmallChange(event.dx, state.dx, 10, 3), state.dx);  
console.log(handleSmallChange(event.dx, state.dx, 10, 7), state.dx); */

const draggableOptions = {
  
  onmove: event => {
    const target = event.target
    // keep the dragged position in the data-x/data-y attributes
    let x = (parseFloat(target.getAttribute('data-x')) || 0);
    let y = (parseFloat(target.getAttribute('data-y')) || 0);
    const step = 50
    
    if (Math.abs(event.dx) < step) {
      console.log("result", handleSlowMovement(event.dx, 'x', 10, x))
      x += handleSlowMovement(event.dx, state.dx, 10, x)
      console.log('x value', x)
        /*if (event.dx > 0) {
          state.dx += event.dx
          
          if (state.dx >= step) {
            x += step;
            state.dx = 0;
          }
        } else if (event.dx < 0) {
          state.dx += event.dx
          console.log(event.dx)
          if (state.dx <= -step) {
            x -= step;
            state.dx = 0;
          }
        }*/
    } else {
       x += event.dx;
    }
  
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