import React from 'react'
import ReactDOM from 'react-dom'

const f = async () => {
  await new Promise((resolve) => {
    setTimeout(resolve, 200);
  })
}

ReactDOM.render(
  <div>Scentbird App</div>,
  document.getElementById('root')
)
