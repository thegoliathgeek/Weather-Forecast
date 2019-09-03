import React, {Component} from "react";
import './View.scss';

interface State {
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
}

export default class View extends Component<{ months: Array<string>, prevData: any }> {
    state: State = {
        data: this.props.prevData
    };

    render() {
        return (<div>
            <h1>Hello</h1>
            {JSON.stringify(this.state.data)}
        </div>);
    }
}
