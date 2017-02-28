import React from 'react'
import { render } from 'react-dom'
import interact from 'interact.js'
import Interactive from '../../src/Interactable'

const draggableOptions = {
  snap: {
     targets: [
       interact.createSnapGrid({ x: 100, y: 100 })
     ],
     range: Infinity,
     relativePoints: [ { x: 0, y: 0 } ]
   },
   
   onmove: event => {
    const target = event.target
    // keep the dragged position in the data-x/data-y attributes
    const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

    // translate the element
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