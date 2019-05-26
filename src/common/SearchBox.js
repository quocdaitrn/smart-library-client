import React, { Component } from 'react';
import SectionRepository from '../repositories/SectionRepository';
import { Input, Select } from 'antd';
import {
    withRouter
} from 'react-router-dom'

const Search = Input.Search;
const Option = Select.Option;
const queryString = require('query-string');
  
class SearchBox extends Component{
    position = 'header';

    constructor(props){
        super(props);
    }

    componentDidMount(){
        SectionRepository.getList().then((res) => {
            this.setState({
                SectionList: res.data
            })
        })
    }

    query = {

    };

    state = {
        section_id: 1,
        SectionList: []
    }

    handleSearch(keyword){
        var params = {
            keyword: keyword,
            sid: this.state.section_id
        };

        var search_url =  '/sections?' + Object.keys(params).map(key => key + '=' + params[key]).join('&');
        this.props.history.push(search_url);
    }

    render() {

        this.query = queryString.parseUrl(window.location.href).query;

        var SectionList = this.state.SectionList;
        var selectAfter = (
            <Select defaultValue={ this.query.sid } onChange={ (val) => { this.setState({ section_id: val }) } } defaultValue = "Tâm lý" style={{ width: 124 }}>
                { SectionList.map((item,key) => {
                    return <Option key={key} value={item.id}>{item.name}</Option>
                }) }
            </Select>
        );

        if(this.props.position == 'banner') {
            return (<Search
                size={'large'}
                placeholder="Bạn muốn xem sách gì?"
                onSearch={value => this.handleSearch(value)}
                enterButton="Tìm kiếm"
                className={'search-home'}
                style={{ display:'inline-block', verticalAlign:'middle' }}
                addonBefore={selectAfter}
            />
        )
        } else {
            return (<Search
                placeholder="Bạn muốn xem sách gì?"
                onSearch={value => this.handleSearch(value)}
                enterButton
                className={'search-home'}
                style={{ display:'inline-block',verticalAlign:'middle' }}
                addonBefore={selectAfter}
            />
        )
        }
    }
}

export default withRouter(SearchBox)