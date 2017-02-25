import React, { Component } from 'react';

export default class App extends Component {
  constructor(){
    super();
    this.state = {items:[]}

  }

componentWillMount(){
  //fetch( 'http://swapi.co/api/people/?format=json' )

  fetch( 'https://api.thingspeak.com/channels/213189/fields/1.json?results=2&api_key=11NGSIK5IX6VYILL' )
    .then( response => response.json() )
    .then( ({feeds: items}) => this.setState({items}))


}

    render() {
      let items = this.state.items;

      const gewicht = items.map(itemsmap =>  <Person key={itemsmap.entry_id} person={itemsmap} />)

    return (

          <div>
            {gewicht[1]}
          </div>
        )
  }
}

//create a component for rendering items.name
//{items.map(itemsmap =>  <Person key={itemsmap.entry_id} person={itemsmap} />)}
const Person = (props) => (
  <h4>Gewichtt = {Math.abs(props.person.field1)}</h4>
  )
