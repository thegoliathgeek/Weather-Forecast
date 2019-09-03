import React,{useState,useEffect} from 'react';
import{BrowserRouter as Router , Route} from 'react-router-dom';
import Home from "./Home/Home";
import View from "./Views/View";

const App: React.FC = () => {
    const [months1] = useState([
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ]);
    const [data,updateData] = useState({});
    useEffect(()=>{
        console.log("Go ON");
        fetch('https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/ded211a3d6cf32db932883277e961ab4/13.339168,77.113998').then(res=>{
            res.json().then(jsn=>{
                updateData(jsn);
            }).catch(ee=>{
                console.log("JSON Error : "+ee.message);
            });
        }).catch(eer=>{
            console.log(eer.message);
        });
    },[]);
  return (
   <Router>
       <Route exact path='/' component={()=> <Home months={months1}> </Home>}/>
       <Route path='/view' component={()=> <View prevData={data} months={months1}/>}/>
   </Router>
  );
};

export default App;
