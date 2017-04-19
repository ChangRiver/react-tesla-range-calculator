import React, { Component } from 'react';
import TeslaBatteryService from '../../service/tesla-battery.service';
import './tesla-battery.css';

import TeslaCar from '../tesla-car/tesla-car';
import TeslaStats from '../tesla-stats/tesla-stats';
import TeslaCounter from '../tesla-counter/tesla-counter';
import TeslaClimate from '../tesla-climate/tesla-climate';
import TeslaWheels from '../tesla-wheels/tesla-wheels';

class TeslaBattery extends Component {
  constructor(props) {
    super(props);

    this.state = {
      models: null,
      stats: [],
      config: {
        speed: 55,
        temperature: 20,
        climate: true,
        wheels: 19
      },
      tab: null
    };
    this.onChangeSpeed = this.onChangeSpeed.bind(this);
    this.onChangeTemperature = this.onChangeTemperature.bind(this);
    this.onChangeClimate = this.onChangeClimate.bind(this);
    this.onChangeWheels = this.onChangeWheels.bind(this);
  }

  results = ['60', '60D', '75', '75D', '90D', 'P100D'];

  componentDidMount() {

    this.getModels().then(models => {
      this.setState({
        models: models
      });

      console.log('models state', this.state.models);

      this.setState({
        stats: this.calculateStats(this.results, this.state.config)
      });
      console.log('stats ', this.state.stats);
    });
  }

  getModels() {
    return new Promise((resolve) => {
      const data = new TeslaBatteryService().getModelData();
      resolve(data);
    })
  }

  calculateStats(models, value) {
    return models.map(model => {
      const { speed, temperature, climate, wheels } = value;
      const miles = this.state.models[model][wheels][climate ? 'on' : 'off'].speed[speed][temperature];

      return {
        model,
        miles
      }
    })
  }

  onChangeSpeed(newVal) {
    this.setState({
      config: Object.assign(this.state.config, { speed: newVal }),
      stats: this.calculateStats(this.results, this.state.config)
    });
  }

  onChangeTemperature(newVal) {
    this.setState({
      config: Object.assign(this.state.config, { temperature: newVal }),
      stats: this.calculateStats(this.results, this.state.config)
    });
  }

  onChangeClimate(newVal) {
    this.setState({
      config: Object.assign(this.state.config, { climate: newVal }),
      stats: this.calculateStats(this.results, this.state.config)
    });
  }

  onChangeWheels(newVal) {
    this.setState({
      tab: newVal,
      config: Object.assign(this.state.config, { wheels: newVal }),
      stats: this.calculateStats(this.results, this.state.config)
    });
  }

  render() {
    const title = 'Range Per Charge';
    return (
      <form className="tesla-battery">
        <h1>{ title }</h1>
        <TeslaCar wheelsize={this.state.config.wheels}></TeslaCar>
        <div className="tesla-stats">
          <ul>
            {
              this.state.stats.map((stat, index) => {
                return <TeslaStats model={stat.model} miles={stat.miles} key={index}></TeslaStats>
              })
            }
          </ul>
        </div>
        <div className="tesla-controls cf">
          <TeslaCounter
            title="Speed"
            unit="mph"
            value={this.state.config.speed}
            step="5"
            min="45"
            max="70" onChangeValue={this.onChangeSpeed}>
          </TeslaCounter>
          <TeslaCounter
            title="Outside Temperature"
            unit="°"
            value={this.state.config.temperature}
            step="10"
            min="-10"
            max="40" onChangeValue={this.onChangeTemperature}>
          </TeslaCounter>
          <div className="tesla-climate cf">
            <TeslaClimate
              limit={this.state.config.temperature > 10} onChangeValue={this.onChangeClimate}>
            </TeslaClimate>
          </div>
          <TeslaWheels tab={this.state.tab} onChangeValue={this.onChangeWheels}></TeslaWheels>
        </div>
        <div className="tesla-battery__notice">
          <p>
            The actual amount of range that you experience will vary based
            on your particular use conditions. See how particular use conditions
            may affect your range in our simulation model.
          </p>
          <p>
            Vehicle range may vary depending on the vehicle configuration,
            battery age and condition, driving style and operating, environmental
            and climate conditions.
          </p>
        </div>
      </form>
    )
  }
}

export default TeslaBattery