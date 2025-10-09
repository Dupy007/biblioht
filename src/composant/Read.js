import React, { Component } from "react";

export default class Readviewerr extends Component {
  constructor(props) {
		super(props);
	  }
  render() {
    return (
      <div className='container'>
        <iframe  className='container'
        src={require('../data/'+this.props.location.aboutProps.path)}>
        </iframe>
    </div>
    );
  }
}
