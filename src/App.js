import React, { Component } from 'react';
import './App.css';
import * as d3 from "d3";
import Child1 from './Child1.js';
import Child2 from './Child2.js';
import file from './tips.csv';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[]
    }
  }

  componentDidMount() {
    let arr = []
    d3.csv(file, (file_data) => {
      arr.push(file_data);
      this.setState({data:arr});
    });
  }

  render() {
    return (
      <div class='container'>
        <Child1
          data={this.state.data}
        />
        <Child2
          data={this.state.data}
        />
      </div>
    );
  }
}

export default App;
