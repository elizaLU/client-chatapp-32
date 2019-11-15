// import React, { Component } from 'react';
// import superagent from 'superagent'


// export default class App extends Component {
//   //dont use stream inside componentDidMount, to use it elsewhere
//   state = {
//     messages: ['fake'],
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
//         this.setState({ messages: parsed })
//       } else {
//         console.log('array test')
//         const messages = [
//           ...this.state.messages,
//           parsed
//         ]
//         this.setState({ messages })
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
//     const url = 'http://localhost:4000/messages'

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
//       .messages
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

import React, { Component } from 'react'
import superagent from 'superagent'

export default class App extends Component {
  state = {
    messages: [],
    value: ''
  }

  stream = new EventSource(
    'http://localhost:4000/stream'
  )

  componentDidMount = () => {
    this.stream.onmessage = (event) => {
      // Destructure the data (what was passed to stream.send)
      const { data } = event

      // Convert the serialized string back into JavaScript data
      const parsed = JSON.parse(data)

      // Check the sent data is an array
      if (Array.isArray(parsed)) {
        // If it is, *we assume it contains ALL messages*,
        // and replace the full list in the state
        this.setState({
          messages: parsed
        })
      } else {
        // If it is not, *we assume it is a single message*,
        // and add it at the end of the list
        const messages = [
          ...this.state.messages,
          parsed
        ]

        // We replace the old list with the extended list
        this.setState({ messages })
      }
    }
  }

  onChange = (event) => {
    const { value } = event.target

    this.setState({ value })
  }

  onSubmit = (event) => {
    event.preventDefault()

    const { value } = this.state

    const url = 'http://localhost:4000/messages'

    superagent
      .post(url)
      .send({ message: value })
      .then(response => {
        console.log(
          'response test:', response
        )
      })
  }

  reset = () => {
    this.setState({ value: '' })
  }

  render() {
    const list = this
      .state
      .messages
      .map((message, index) => <p
        key={index}
      >
        {message}
      </p>)

    return <div>
      <form onSubmit={this.onSubmit}>
        <input
          type='text'
          value={this.state.value}
          onChange={this.onChange}
        />

        <button
          type='button'
          onClick={this.reset}
        >
          Reset
        </button>

        <button>Submit</button>
      </form>

      {list}
    </div>
  }
}
