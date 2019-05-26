import React, { Component } from 'react';
import SectionRepository from '../repositories/SectionRepository';
import LoadingIndicator  from '../common/LoadingIndicator';
import Item from '../item/Item';
import NotFound from '../common/NotFound';
import './Section.css';
import ServerError from '../common/ServerError';
const queryString = require('query-string');

class Section extends Component {
    constructor(props) {
        super(props);
        this.state = {
            section: null,
            isLoading: false
        }

        this.query = queryString.parseUrl(window.location.href).query;
        this.loadSection = this.loadSection.bind(this);
    }

    loadSection(sid) {
        this.setState({
            isLoading: true
        });

        SectionRepository.get(sid).then((response) => {
            this.setState({
                section: response.data,
                isLoading: false
            });
        }).catch(error => {
            if(error.status === 404) {
                this.setState({
                    notFound: true,
                    isLoading: false
                });
            } else {
                this.setState({
                    serverError: true,
                    isLoading: false
                });        
            }
        });        
    }

    componentDidMount() {
        var sid = this.query.sid ? this.query.sid : 1;
        this.loadSection(sid);
    }

    render() {
        if(this.state.isLoading) {
            return <LoadingIndicator />;
        }

        if(this.state.notFound) {
            return <NotFound />;
        }

        if(this.state.serverError) {
            return <ServerError />;
        }

        return <section className="main-block-section">
            { this.state.section ? (
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-5">
                            <div className="styled-heading">
                                <h3>Sách {this.state.section.name}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="row" style={{ marginTop: 50 }}>
                        {this.state.section.items.map(function(item, key){
                            return <Item key={key} data={item}> </Item>
                        })}
                    </div>
                </div>
              ) : null
            }
        </section>
    }
}

export default Section;