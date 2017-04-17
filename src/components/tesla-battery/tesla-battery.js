import React, { Component } from 'react';
import TeslaBatteryService from '../../service/tesla-battery.service';
import './tesla-battery.css';

import TeslaCar from '../tesla-car/tesla-car';
import TeslaStats from '../tesla-stats/tesla-stats';

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
      }
    };
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