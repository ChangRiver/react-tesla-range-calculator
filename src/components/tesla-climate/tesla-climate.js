import React from 'react';
import classNames from 'classnames';
import './tesla-climate.css';

class TeslaClimate extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      checked: false
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      checked: !this.state.checked
    });
    this.props.onChangeValue(!this.state.checked);
  }

  render() {
    let CLASS = classNames({
      'tesla-climate__item': true,
      'tesla-heat': !this.props.limit,
      'tesla-climate__item--active': this.state.checked
    });

    return (
      <div>
        <label className={ CLASS }>
          <p>{ this.props.limit ? 'ac' : 'heat' } { this.state.checked ? 'on' : 'off' }</p>
          <i className="tesla-climate__icon"></i>
          <input
            type="checkbox"
            name="climate"
            checked={this.state.checked}
            onClick={this.handleChange}
           />
        </label>
      </div>
    )
  }
}

export default TeslaClimate