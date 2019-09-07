import React, {Component} from "react";
import './View.scss';


const getTimeZone:any =(ob:any,lat:number,long:number)=>{
  const url:string =   `https://cors-anywhere.herokuapp.com/http://api.timezonedb.com/v2.1/get-time-zone?key=EP2XKFDTYLWD&format=json&by=position&lat=${lat}&lng=${long}`;
   fetch(url).then(res=>{
       res.json().then(jsn=>{
          console.log(jsn.zoneName);
          ob.setState({name: jsn.zoneName});
      }).catch(jsnErr=>{
            console.log("JSON Error Time Zone : "+jsnErr.message);
      });
  }).catch(err=>{
      console.log('Time zone fetch error : '+err.message);
  });

};
const callApi: any = (ob: any,lat: number=13.339168,long:number=77.113998) => {

    return fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/ded211a3d6cf32db932883277e961ab4/${lat},${long}`).then(res => {
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
    state = {
        name:"",
        latitude1:0,
        longitude2:0,
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
    constructor(props: any) {
        super(props);
        callApi(this);

    }
    componentDidMount(): void {
        setTimeout(()=>{
            getTimeZone(this,this.state.data.latitude,this.state.data.longitude);
        },2000);
    }

    onChangeLat(event: React.FormEvent<HTMLInputElement>){
        event.preventDefault();
        this.setState({latitude1: event.currentTarget.value});
    }

    onChangeLong(event: React.FormEvent<HTMLInputElement>){
        event.preventDefault();
        this.setState({longitude2: event.currentTarget.value});
    }


    render() {
        return (<div>

            <div className='containerMine'>
                <div>
                    <label htmlFor="LAT">Latitude</label>
                    <input id="LAT" type="text" onChange={this.onChangeLat}/>
                    <label htmlFor="LONG">Longitude</label>
                    <input id="LONG" type="text" onChange={this.onChangeLong}/>
                    <button onClick={()=> callApi(this.state.latitude1,this.state.longitude2)}>Submit</button>
                </div>
                <div className='weather-container'>
                    <div className='data-cont'>
                        <p>Current temperature: <span>{this.state.data.currently.temperature} &#x2109;</span></p>
                        {this.state.name}
                    </div>
                </div>

            </div>
        </div>);
    }
}
