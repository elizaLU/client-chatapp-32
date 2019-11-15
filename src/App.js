// import React, { Component } from 'react';
// import superagent from 'superagent'


// export default class App extends Component {
//   //dont use stream inside componentDidMount, to use it elsewhere
//   state = {
//     rooms: ['fake'],
//     value: ''
//   }
//   stream = new EventSource(
//     "http://localhost:4000/stream"
//   )

//   componentDidMount = () => {
//     //don't use function keyword, it will breat this.
//     this.stream.onmessage = (event) => {
//       const { data } = event
//       //also you have to parse it before checking if it's an array
//       const parsed = JSON.parse(data)
//       //if logic setup to check if sthg is an array
//       if (Array.isArray(parsed)) {
//         console.log('array test')
//         this.setState({ rooms: parsed })
//       } else {
//         console.log('array test')
//         const rooms = [
//           ...this.state.rooms,
//           parsed
//         ]
//         this.setState({ rooms })
//       }
//       console.log(parsed)
//     }
//   }
//   onChange = e => {
//     const { value } = e.target
//     console.log("value ", value)
//     this.setState({ value })
//   }
//   onSubmit = e => {
//     e.preventDefault()
//     const { value } = this.state
//     //send it to some url:
//     const url = 'http://localhost:4000/rooms'

//     superagent
//       .post(url)
//       .send({ message: value })
//     //.then(res => console.log("response from post: ", res))
//   }
//   reset = () => {
//     this.setState({ value: "" });
//   };

//   render() {
//     const list = this
//       .state
//       .rooms
//       .map((message, index) =>
//         <p key={index}>
//           {message}
//         </p>)

//     return <div>
//       <form onSubmit={this.onSubmit}>
//         < input type='text' onChange={this.onChange} />
//         <button type='button'>SEND</button>
//       </form>
//       <div>{list}</div>
//     </div>

//   }
// }

import React, { Component, Fragment } from 'react'
import { Route } from "react-router-dom"
import Room from './Rooms'
export default class App extends Component {

  render() {

    return <Fragment>
      <Route path='/' component={Room} exact />
    </Fragment>
  }
}
