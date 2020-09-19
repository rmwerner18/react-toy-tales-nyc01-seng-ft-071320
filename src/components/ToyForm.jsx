import React, { Component } from 'react';

class ToyForm extends Component {
  state = {
    name: "",
    image: "",
  }

  changeHandler = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    return (
      <div className="container">
        <form className="add-toy-form" onSubmit={this.props.submitHandler}>
          <h3>Create a toy!</h3>
          <input type="text" name="name" value={this.state.name} onChange={this.changeHandler} placeholder="Enter a toy's name..." className="input-text"/>
          <br/>
          <input type="text" name="image" value={this.state.image} onChange={this.changeHandler} placeholder="Enter a toy's image URL..." className="input-text"/>
          <br/>
          <input type="submit" name="submit" value="Create New Toy" className="submit"/>
        </form>
      </div>
    );
  }

}

export default ToyForm;
