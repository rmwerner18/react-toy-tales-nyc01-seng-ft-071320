import React from 'react';
import ToyCard from './ToyCard'

class ToyContainer extends React.Component {

  state = {
    toys: []
  }

  toys = () => {
    return this.props.toys.map(toy => <ToyCard key={toy.id} toy={toy} likeListener={this.props.likeListener} donateListener={this.props.donateListener}/>)
  }
  
  render() {
    if (this.state.loaded === false) {
      return <h1>Loading...</h1>
    } else {
      return (
        <div id="toy-collection">
          {this.toys()}
        </div>
      )
    }
  }
}

export default ToyContainer;
