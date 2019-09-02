import React, {Component} from "react";
import  './Home.css';
const convertToDate: any = (epoch: number,months: any) => {
    const d = new Date(0);
    d.setUTCSeconds(epoch);
    return d.getDate().toString()+" "+months[d.getMonth()]+" "+d.getFullYear();
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
interface Mon {
    months: any
}

export default class Home extends Component<{months:any}> {
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
        return (<div>
            <div>
                {
                    this.state.data ?
                        <div>
                            <div>
                            <h2 style={{'textAlign':'center'}} className="alert alert-primary">Current</h2>
                            </div>
                                <p>Time : {convertToDate(this.state.data.currently.time,this.props.months)}</p>
                            <p>{this.state.data.latitude}</p>
                            <p>{this.state.data.longitude}</p>
                            <h2 style={{'textAlign':'center'}} className="alert alert-primary">Hourly</h2>
                            <div className='table-responsive'>
                                <table className='table table-bordered'>
                                <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Humidity</th>
                                </tr>
                                </thead>
                                    <tbody>
                            {
                                this.state.data.hourly.data.map((val: any, key1) => {
                                    return <tr key={key1}>

                                        <td>{convertToDate(val.time,this.props.months)}</td>
                                        <td>{val.humidity}</td>
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
