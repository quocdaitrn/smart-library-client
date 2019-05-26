import React, { Component } from 'react';
import {
    Link,
    withRouter
} from 'react-router-dom';

class Item extends Component{
    constructor(props){
        super(props);
    }

    clickHandle() {
        var item = this.props.data;
        this.props.history.push(`/items/${item.id}`);
    }

    render(){
        var item = this.props.data;
        return (
           <div onClick={() => { this.clickHandle() }} className="col-xs-6 col-md-3 col-sm-3 ebook"> 
                <a className="thumbnail"> 
                    <img src={`${item.cover}`} alt="Dám Ước Mơ" /> 
                </a>
                <h5 className="tieude text-center">
                    <a>
                        {item.title}
                    </a>
                </h5>
            </div>
        )
    }
}

export default withRouter(Item);