import React from 'react'

export default function Grid(props) {
  return (<svg width="100%" height="1000 ">
  <defs>
    <pattern id="cell" width="10" height="10" patternUnits="userSpaceOnUse">
      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#ADD8E6" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="100%" height="1000" fill="url(#cell)" />
</svg>);
}

Interactable.propTypes = {
  children: React.PropTypes.node.isRequired,
  draggable: React.PropTypes.bool,
  draggableOptions: React.PropTypes.object,
  resizable: React.PropTypes.bool,
  resizableOptions: React.PropTypes.object
}