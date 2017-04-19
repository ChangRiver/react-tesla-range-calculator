import React, { Component } from 'react';
import './tesla-counter.css';

class TeslaCounter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnUp_disabled: false,
      btnDown_disabled: false
    };

    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  increment(e) {
    e.preventDefault();
    this.setState({
      btnDown_disabled: false
    });
    if(this.props.value < this.props.max) {
      this.props.onChangeValue(Number(this.props.value) + Number(this.props.step))
    }

    if(this.props.value >= this.props.max) {
      this.setState({
        btnUp_disabled: true
      })
    }
  }

  decrement(e) {
    e.preventDefault();
    this.setState({
      btnUp_disabled: false
    });
    if(this.props.value > this.props.min) {
      this.props.onChangeValue(Number(this.props.value) - Number(this.props.step))
    }

    if(this.props.value <= this.props.min) {
      this.setState({
        btnDown_disabled: true
      })
    }
  }

  render() {
    return (
      <div className="tesla-counter">
        <p className="tesla-counter__title">{this.props.title}</p>
        <div className="tesla-counter__container cf">
          <div className="tesla-counter__item">
            <p className="tesla-counter__number">
              {this.props.value}
              <span>{this.props.unit}</span>
            </p>
            <div className="tesla-counter__controls" tabIndex="-1">
              <button tabIndex="-1" onClick={this.increment} disabled={this.state.btnUp_disabled}></button>
              <button tabIndex="-1" onClick={this.decrement} disabled={this.state.btnDown_disabled}></button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TeslaCounter;