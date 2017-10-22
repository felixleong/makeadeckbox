import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as SVG from 'svg.js'

import { Hello } from './components/Hello'

// Set up the page
let component = document.createElement('div')
document.body.appendChild(component)

// Render the content
ReactDOM.render(
  <Hello compiler="Typescript" framework="React" />,
  component
)

//-----

// Setting up the page (again)
component = document.createElement('div')
component.id = 'drawing'
document.body.appendChild(component)

// Draw some SVG
let draw = SVG('drawing')
let rect = draw.rect(100, 100).fill('#f06')
let rect2 = draw.rect(100, 100).move(100, 0).fill('#06f')
