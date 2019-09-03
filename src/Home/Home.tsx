
import React, {Component} from "react";
import  './Home.css';

const convertToDate: any = (epoch: number,months: any) => {
    const d = new Date(0);
    d.setUTCSeconds(epoch);
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()} : (${d.getHours()} hrs)`;
};

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

export default class Home extends Component<{months:Array<string>}> {
    constructor(props: any) {
        super(props);
        callApi(this);
    }
    public static propTypes = {};

    state = {
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
            <div>
                {
                    this.state.data ?
                        <div>
                            <div>
                            <h2 style={{'textAlign':'center'}} className="alert alert-primary">Current</h2>
                                <div className='table-responsive'>
                                    <table className='table table-bordered'>
                                        <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Humidity</th>
                                            <th>Summary</th>
                                            <th>Temperature</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>{convertToDate(this.state.data.currently.time,this.props.months)}</td>
                                            <td>{this.state.data.currently.humidity}</td>
                                            <td>{this.state.data.currently.summary}</td>
                                            <td>{this.state.data.currently.temperature} &#8457;</td>
                                        </tr>
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                            <h2 style={{'textAlign':'center'}} className="alert alert-primary">Hourly</h2>
                            <div className='table-responsive'>
                                <table className='table table-bordered'>
                                <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Humidity</th>
                                    <th>Summary</th>
                                    <th>Temperature</th>
                                </tr>
                                </thead>
                                    <tbody>
                            {
                                this.state.data.hourly.data.map((val: any, key1) => {
                                    return <tr key={key1}>

                                        <td>{convertToDate(val.time,this.props.months)}</td>
                                        <td>{val.humidity}</td>
                                        <td>{val.summary}</td>
                                        <td>{val.temperature} &#x2109;</td>
                                    </tr>
                                })
                            }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        : null
                }
            </div>
        </div>);
    }

}
