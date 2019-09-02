import React,{useState} from 'react';
import{BrowserRouter as Router , Route} from 'react-router-dom';
import Home from "./Home/Home";

const App: React.FC = () => {
    const [months1] = useState([
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
    ]);
  return (
   <Router>
       <Route exact path='/' months={months1} component={()=> <Home months={months1}> </Home>}/>
   </Router>
  );
};

export default App;
