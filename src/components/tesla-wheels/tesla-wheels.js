import React, {Component} from 'react';
import './tesla-wheels.css';

class TeslaWheels extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onChangeValue(e.target.value)
  }

  render() {
    const sizes = [19, 21];
    return (
      <div className="tesla-wheels-col">
        <p className="tesla-wheels-col__title">Wheels</p>
        <div className="tesla-wheels-col__container cf">
          {
            sizes.map((size, index) => {
              return (
                <label key={index} className={ this.props.tab === size.toString() ?  "selected tesla-wheels-col__item tesla-wheels-col__item--" + size : "tesla-wheels-col__item tesla-wheels-col__item--" + size }>
                  <input
                    type="radio"
                    name="wheelsize"
                    value={size}
                    onClick={this.handleChange}/>
                  <p>{ size }</p>
                </label>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default TeslaWheels;