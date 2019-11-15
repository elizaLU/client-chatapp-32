import React, { Component } from 'react';


export default class App extends Component {
  //dont use stream inside componentDidMount, to use it elsewhere
  stream = new EventSource(
    "http://localhost:4000/stream"
  )

  componentDidMount = () => {
    this.stream.onmessage = function (event) {
      const { data } = event
      console.log(data)
    }
  }

  render() {
    return <div>hello</div>
  }

}

