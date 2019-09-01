import React, {Component} from "react";
import * as request from 'request';

interface State {
    data: {}
}

const convertToDate: any = (epoch: number) => {
    const d = new Date(0);
    d.setUTCSeconds(epoch);
    return d.toTimeString();
};

const callApi: any = (ob: any) => {
    return fetch('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/ded211a3d6cf32db932883277e961ab4/13.339168,77.113998').then(res => {
        return res.json().then(jsn => {
            console.log(jsn);
            // @ts-ignore
            ob.setState({data: jsn});
        }).catch(e => {
            console.log('JSON Error : ' + e.message);
        });

    }).catch(err => {
        console.log('Fetch Error : ' + err.message);
    });
};

export default class Home extends Component {
    componentDidMount(): void {
        callApi(this);
    }

    state = {
        data: {
            latitude: '',
            longitude: '',
            currently: {
                "time": 1567362776,
                "summary": "Overcast",
                "icon": "cloudy",
                "nearestStormDistance": 0,
                "precipIntensity": 0.0002,
                "precipProbability": 0.05,
                "precipType": "rain",
                "temperature": 70.83,
                "apparentTemperature": 71.87,
                "dewPoint": 67.95,
                "humidity": 0.91,
                "pressure": 1009.35,
                "windSpeed": 10.03,
                "windGust": 22.56,
                "windBearing": 239,
                "cloudCover": 1,
                "uvIndex": 0,
                "visibility": 10,
                "ozone": 261.8
            },
            "hourly": {
                "summary": "",
                "icon": "",
                "data": []
            },
            "daily": {
                "summary": "",
                "icon": "",
                "data": []
            }
        }
    };

    render() {
        // @ts-ignore
        return (<div>
            <div>
                <h3>Current</h3>
                <div>
                    {
                        this.state.data ?
                            <div>
                                <p>{this.state.data.latitude}</p>
                                <p>{this.state.data.longitude}</p>
                                <h2>Hourly</h2>
                                {
                                    this.state.data.hourly.data.map((val: any, key1) => {
                                        return <p key={key1}>{convertToDate(val.time)}</p>
                                    })
                                }
                            </div>
                            : null
                    }
                </div>
            </div>
        </div>);
    }
}
