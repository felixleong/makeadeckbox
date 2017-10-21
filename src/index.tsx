import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { Hello } from './components/Hello'

// Set up the page
let component = document.createElement('div')
document.body.appendChild(component)

// Render the content
ReactDOM.render(
  <Hello compiler="Typescript" framework="React" />,
  component
)
