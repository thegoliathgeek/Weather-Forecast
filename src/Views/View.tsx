import React, {Component} from "react";
import './View.scss';

const callApi: any = (ob: any) => {
    return fetch('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/ded211a3d6cf32db932883277e961ab4/13.339168,77.113998').then(res => {
        return res.json().then(jsn => {
            // console.log(jsn);
            // @ts-ignore
            ob.setState({data: jsn});
        }).catch(e => {
            console.log('JSON Error : ' + e.message);
        });

    }).catch(err => {
        console.log('Fetch Error : ' + err.message);
    });
};

export default class View extends Component<{ months: Array<string>, prevData: any }> {
    constructor(props: any) {
        super(props);
        callApi(this);
    }
    state= {
        data: {
            latitude: '',
            longitude: '',
            currently: {
                "time": 0,
                "summary": "",
                "icon": "",
                "nearestStormDistance": 0,
                "precipIntensity": 0,
                "precipProbability": 0,
                "precipType": "",
                "temperature": 0,
                "apparentTemperature": 0,
                "dewPoint": 0,
                "humidity": 0,
                "pressure": 0,
                "windSpeed": 0,
                "windGust": 0,
                "windBearing": 0,
                "cloudCover": 0,
                "uvIndex": 0,
                "visibility": 0,
                "ozone": 0
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
        return (<div>
            <div className='containerMine'>
              <div className='weather-container'>
                    <div className='data-cont'>
                        <p>{this.state.data.currently.temperature}</p>
                    </div>
              </div>
            </div>
        </div>);
    }
}
