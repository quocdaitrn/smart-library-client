import React,{Component} from 'react';
import SearchBox from '../../common/SearchBox';
import Settings from '../../repositories/Settings';

export default class  Banner extends Component {
    constructor(props){
        super(props);
        this.state = {
            background: null
        }
    }

    componentDidMount(){
        Settings.get().then((res) => {
            this.setState({
                background:res.data.background
            })
        })
    }

  render(){
    var style = {
        backgroundSize:'cover',
    };
    if(this.state.background){
        style = {
            backgroundSize: 'cover',
            backgroundImage: `url(${this.state.background})`
        }
    }
    return <section style={style} className="slider home-banner d-flex align-items-center">
        <div className="container">
            <div className="row d-flex justify-content-center">
                <div className="col-md-12">
                    <div className="slider-title_box">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="slider-content_wrap">
                                    <h1 className="title-banner">Khám khá kho tàng tri thức nhân loại</h1>
                                    <h5>Tại thư viện thông minh Smart Library</h5>
                                </div>
                            </div>
                        </div>
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-9">
                                <div className="btn-group" role="group" aria-label="Basic example">
                                    <SearchBox position={'banner'}></SearchBox>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  }
}