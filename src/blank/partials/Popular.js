import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import SectionRepository from '../../repositories/SectionRepository';
import {
    Link,
    withRouter
} from 'react-router-dom';

class Poppular extends Component{
    size = 5;

    constructor(props){
        super(props);
    }

    state={
        PopularList:[]
    }

    componentDidMount(){
        var PopularList = [];
        SectionRepository.getPopularList().then((res) => {
            res.data.map((item, key) => {
                if ( key++ >= 5 ){
                   return;
                }
                item.image = `images/find-place${key}.jpg`
                PopularList.push(item);
            })
            this.setState({
                PopularList:PopularList
            })
        })
    }

    renderItem(item){
        return item? <div onClick={() => {
            this.props.history.push('sections?sid=' + item.id);
        }} className="find-place-img_wrap">
            <div className="grid">
                <figure className="effect-ruby">
                    <img src={item.image} className="img-fluid" alt="img13"/>
                    <figcaption>
                        <h5> {item.name} </h5>
                        <p> Địa điểm</p>
                    </figcaption>
                </figure>
            </div>
        </div>:'';
    }

    render(){
        var PopularList = this.state.PopularList;
        return <section className="main-block">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-5">
                        <div className="styled-heading">
                            <h3>Danh mục sách phổ biến</h3>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        {this.renderItem(PopularList[0])}
                    </div>
                    <div className="col-md-4">
                        <div className="row find-img-align">
                            <div className="col-md-12">
                                {this.renderItem(PopularList[1])}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                            {this.renderItem(PopularList[2])}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="row find-img-align">
                            <div className="col-md-12">
                            {this.renderItem(PopularList[3])}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                            {this.renderItem(PopularList[4])}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    }
}

export default withRouter(Poppular);