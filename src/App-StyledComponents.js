import React, { Component } from 'react'
import styled from 'styled-components'
import './App.css'
import Person from './Person/Person'

const StyledButton = styled.button`
  background-color: ${props => props.alt ? 'salmon' : 'green'};
  color: white;
  font: inherit;
  border: 1px solid #ccc;
  padding: 8px;
  cursor: pointer;
  transition: .2s ease;
  &:hover {
    background-color: ${props => props.alt ? 'pink' : 'lightgreen'};
    color: black;
`

class App extends Component {
  state = {
    persons: [
      { id:'asd1', name: 'Max', age: 28 },
      { id:'asd2', name: 'Manu', age: 29 },
      { id:'asd3', name: 'Lisa', age: 22 }
    ],
    otherState: 'some other value',
    showPersons: false
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice()
    const persons = [...this.state.persons]
    persons.splice(personIndex, 1)
    this.setState({persons: persons})
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id
    })

    const person = {
      ...this.state.persons[personIndex]
    }

    // const person = Object.assign({}, this.state.persons[personIndex])

    person.name = event.target.value

    const persons = [...this.state.persons]
    persons[personIndex] = person

    this.setState({persons: persons})
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons
    this.setState({showPersons: !doesShow})
  }

  render() {
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid #ccc',
      padding: '8px',
      cursor: 'pointer',
      transition: '.2s ease',
      ':hover':{
        backgroundColor: 'lightGreen',
        color: 'black',
      }
    }

    let persons = null
    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person 
              click={() => this.deletePersonHandler(index)}
              name={person.name} 
              age={person.age}
              key={person.id}
              changed={(event) => this.nameChangedHandler(event, person.id)} />
          })}
        </div>
      );
      // style.backgroundColor = 'salmon'
      // style[':hover'] = {
      //   backgroundColor: 'pink',
      //   color: 'black',
      // }
    }

    const classes = []
    if(this.state.persons.length <= 2){
      classes.push('red')
    }
    if(this.state.persons.length <= 1){
      classes.push('bold')
    }

    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p className={classes.join(' ')}>This is really working!</p>
        <StyledButton 
          alt={this.state.showPersons}
          onClick={this.togglePersonsHandler}>Toggle Persons</StyledButton>
        {persons}       
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?!!'))
  }
}

export default App;