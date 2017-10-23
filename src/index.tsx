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

// Back pocket
draw.path(
  'M0 0 ' +
  'v 88 h 63 v -88 ' +
  'h -20 a 10 10 0 0 1 -23 0 ' +
  'h -20 z')
  .fill('none')
  .stroke({ color: '#333', width: 1 })

// Top flap
draw.path(
  'M 0 0 ' +
  'v 37 h 63 v -37 ' +
  'a 8 8 -90 0 0 -8 -8 ' +
  'h -47 ' +
  'a 8 8 90 0 0 -8 8 z')
  .move(100, 0)
  .fill('none')
  .stroke({ color: '#333', width: 1 })
