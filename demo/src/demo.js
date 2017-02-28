import React from 'react'
import { render } from 'react-dom'
import interact from 'interact.js'
import Interactive from '../../src/Interactable'

const draggableOptions = {
  snap: {
     targets: [
       interact.createSnapGrid({ x: 10, y: 10 })
     ],
     range: Infinity,
     relativePoints: [ { x: 0, y: 0 } ]
   },
   
   onmove: event => {
  
    const target = event.target
    // keep the dragged position in the data-x/data-y attributes
    const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy
    console.log(target)
    //console.log(parseFloat(target.getAttribute('data-x')), parseFloat(target.getAttribute('data-y')))
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
    
    
    
    <svg width="100%" height="1000" >
    <defs>
      <pattern id="cell" width="10" height="10" patternUnits="userSpaceOnUse">
        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#ADD8E6" strokeWidth="1"/>
      </pattern>
    </defs>
    <rect width="100%" height="1000" fill="url(#cell)" />
    <Interactive draggable draggableOptions={draggableOptions}>
        <rect id="test-box" width="500" height="100" fill="#00a072" />
    </Interactive>
    <Interactive draggable draggableOptions={draggableOptions}>
        <rect x="400" y="200" width="200" height="200" fill="#c70039" />
    </Interactive>

  </svg>

      
  </div>
)

render(example, document.getElementById('container'));