import React, {Component} from "react";
import './View.scss';

// 602dc18b5b6c4ca2928e944b4d35fd6f
// https://api.opencagedata.com/geocode/v1/json?q=13.339168+77.113998&key=602dc18b5b6c4ca2928e944b4d35fd6f

//TODO Fix getNames
const getNames: any = (lat: any="13.339168", long: any="77.113998", ob: any) => {
     return fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=602dc18b5b6c4ca2928e944b4d35fd6f`,{
         method: 'GET'
     }).then((e) => {
         return e.json().then(rt => {
            console.log(rt.results[0].components.county);
            ob.setState({name: rt.results[0].components.county});
            return {name: rt.results[0].components.county};
        }).catch(eee => {
            console.log("Json Error");
            console.log(eee.message);
        })
    }).catch((err) => {
        console.log("Fetch Error");
        console.log(err.message);
    });
};

const callApi: any = (ob: any) => {
    return fetch('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/ded211a3d6cf32db932883277e961ab4/13.339168,77.113998').then(res => {
        return res.json().then(jsn => {
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
    }
    componentDidMount(): void {
        callApi(this);

        getNames(this);
    }

    state = {
        name:"",
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
                        <p>Current temperature: <span>{this.state.data.currently.temperature} &#x2109;</span></p>
                        <p>{this.state.name}</p>
                    </div>
                </div>
            </div>
        </div>);
    }
}
