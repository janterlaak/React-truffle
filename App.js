

import React, { Component } from 'react';
import update from 'immutability-helper';
import {Form, FormGroup,FormControl,
        MenuItem, NavDropdown,Well,
        Button, ButtonToolbar,PageHeader,
        HelpBlock} from 'react-bootstrap';
import Web3 from 'web3';
import _ from 'lodash';
import wJson from '../truffle/build/contracts/Gewicht.json';
import nwork from '../truffle/truffle.js';
//import {artifactor, contract} from 'truffle-artifactor';
import contract from 'truffle-contract';


export default class App extends Component {
  constructor(){
    super();
    this.state = {items:[],
                  timer:0,
                  elapsed:0,
                  url:"https://api.thingspeak.com/channels/213189/fields/1.json?results=2&api_key=11NGSIK5IX6VYILL"
                }

////////////////////////////
var provider = new Web3.providers.HttpProvider("http://localhost:8545");
var web3 = new Web3.providers.HttpProvider("http://localhost:8545");

var Gewicht = contract(wJson);
  Gewicht.setProvider(provider);

  Gewicht.deployed().then(function(instance) {
  console.log(instance);
});

var doit;
Gewicht.deployed().then(function(instance){
  var doit = instance;
return doit.setValue(0);
}).then(function(result){
  // If this callback is called, the transaction was successfully processed.
  alert("SET Transaction successful!")
  console.log(result)
}).catch(function(e) {
   console.log('Set error')
})


var kilo;
Gewicht.deployed().then(function(instance) {
  kilo = instance;
  return kilo.getValue();
}).then(function(result) {
  // If this callback is called, the transaction was successfully processed.
  alert("CALL Transaction successful!")
  console.log(result)
}).catch(function(e) {
   console.log('error')
})


//var val1 = Gewicht.deployed().then(function(deployed) {return deployed.setval(1)});
//val1.then(function(success){console.log(success)});

//var val2 = MyContract.deployed().then(function(deployed) {return deployed.getval()});
//val2.then(function(success){console.log(success)});

//instance.setValue(5).then(function(result) {
  // result object contains import information about the transaction
//});

///////////////////////////////

              //   var ntw=Object.values(nwork.networks.development);
              //   var host=ntw[0]
              //   var port =ntw[1]
               //
              //   var web3 = new Web3();
              //     if(typeof web3 !== 'undefined')
              //       web3 = new Web3(web3.currentProvider);
              //     else
              //     var  web3 = new Web3(new Web3.providers.HttpProvider(`http://${host}:{port}`));
               //
              //   var  wContract = web3.eth.contract(wJson.abi).at(Object.values(wJson.networks)[(Object.values(wJson.networks).length) - 1].address);  //truffle file
               //
               //
              //  console.log(wContract)

        //  wContract.then(function(deployed) {return deployed.getval()})

                }

   componentDidMount(){

       // componentDidMount is called by react when the component
       // has been rendered on the page. We can set the interval here:
       this.timer = setInterval(this.tick, 1000);

   }

   componentWillMount(){
     fetch(this.state.url)
       .then( response => response.json() )
       .then( ({feeds: items}) => this.setState({items}))

       //var data = wContract.getval()
       //console.log(data)


   }

   componentWillUnmount (){

          // This method is called immediately before the component is removed
          // from the page and destroyed. We can clear the interval here:

          clearInterval(this.timer);
      }

   tick = () => {
       // This function is called every sec. It updates the
       // elapsed counter. Calling setState causes the component to be re-rendered
       fetch(this.state.url)
         .then( response => response.json() )
         .then( ({feeds: items}) => this.setState({items}))

       this.setState({elapsed: new Date() - this.props.start})

   }

    render() {

      //the inputfield contains the weight variable dubble, so array them and take last one
      let items = this.state.items;
      let gewicht = items.map(itemsmap => <h4>Gewicht = {Math.abs(itemsmap.field1)} kg</h4>);
      let elapsed = this.state.elapsed;

    return (

          <div>
            {gewicht[1]}
          </div>
        )
  }
}
