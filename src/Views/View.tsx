import React,{Component} from "react";
import './View.css';

interface State {
    data:{}
}
export default class View extends Component<{months:Array<string>,prevData:Object}>{
    state={
      data: this.props.prevData
    };
    render(){
        return (<div>
            {JSON.stringify(this.state.data,undefined,2)}
        </div>);
}
}
