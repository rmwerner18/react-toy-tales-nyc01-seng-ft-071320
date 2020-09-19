import React from 'react';
import './App.css';

import Header from './components/Header'
import ToyForm from './components/ToyForm'
import ToyContainer from './components/ToyContainer'

class App extends React.Component {

  state = {
    display: false,
    loaded: false,
    toys: []
  }

  handleClick = () => {
    let newBoolean = !this.state.display
    this.setState({
      display: newBoolean
    })
  }

  componentDidMount = () => {
    fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(toys => {
      this.setState({
        loaded: true,
        toys: toys
      })
    })
  }

  submitHandler = (e) => {
    e.preventDefault()
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'accepts': 'application/json'
      },
      body: JSON.stringify({
        name: e.target.name.value,
        image: e.target.image.value,
        likes: 0
      })
    })
    .then(resp => resp.json())
    .then(toy => {
      this.setState(previousState => ({
        toys: [...previousState.toys, toy]
      }))
    })
  }

  likeListener = (toy) => {
    fetch('http://localhost:3000/toys/' + toy.id, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'accepts': 'application/json'
      },
      body: JSON.stringify({
        likes: toy.likes + 1
      })
    })
    .then(resp => resp.json())
    .then(likedToy => {
      let newArray = this.state.toys
      let toy = newArray.find(toy => toy.id === likedToy.id)
      toy.likes += 1
      this.setState({toys: newArray})
    })
  }

  donateListener = (deletedToy) => {
    let newArray = this.state.toys
    let index = newArray.findIndex(toy => toy.id === deletedToy.id)
    newArray.splice(index, 1)
    this.setState({toys: newArray})
    fetch('http://localhost:3000/toys/' + deletedToy.id, {
      method: 'DELETE'
    })
  }

  render() {
    return this.state.loaded === false
    ? 
    <h1>Loading...</h1>
    :
    <>
      <Header/>
      { this.state.display
          ?
        <ToyForm submitHandler={this.submitHandler} />
          :
        null
      }
      <div className="buttonContainer">
        <button onClick={this.handleClick}> Add a Toy </button>
      </div>
      <ToyContainer toys={this.state.toys} likeListener={this.likeListener} donateListener={this.donateListener}/>
    </>
  }
}
  



export default App;
