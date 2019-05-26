import React, { Component } from 'react';
import { Icon, Button, Modal, notification } from 'antd';
import { makeLoan, getItemById } from '../../util/APIUtils';
import LoadingIndicator  from '../../common/LoadingIndicator';
import NotFound from '../../common/NotFound';
import ServerError from '../../common/ServerError';

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user : this.props.currentUser,
            isAuthenticated: this.props.isAuthenticated,
            item: null,
            isLoading: false,
            visibleBorrowModal: false,
            loadingModal: false,
        }

        this.loadItem = this.loadItem.bind(this);
    }

    loadItem(id) {
        this.setState({
            isLoading: true
        });

        getItemById(id)
        .then(response => {
            console.log(response);
            this.setState({
                item: response,
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

    showBorrowModal = () => {
        this.setState({
            visibleBorrowModal: true,
        });
    };

    handleOk = () => {
        this.setState({ loadingModal: true });
        const loanRequest = {
            userId: this.state.user.id,
            libItemId: this.state.item.id,
            borrowDate: this.getToday()
        };
        makeLoan(loanRequest)
        .then(response => {
            console.log(response);
            this.setState({ loadingModal: false, visibleBorrowModal: false });
            notification.success({
                message: 'SmartLib',
                description: "Yêu cầu thành công!",
            });          
        }).catch(error => {
            this.setState({ loadingModal: false, visibleBorrowModal: false });
            notification.error({
                message: 'SmartLib',
                description: error.message || 'Xin lỗi! Đã xảy ra lỗi. Vui lòng thử lại!'
            });
        });
    };

    handleCancel = () => {
        this.setState({ visibleBorrowModal: false });
    };

    componentDidMount() {
        const itemId = this.props.match.params.id;
        console.log(itemId);
        this.loadItem(itemId);
    }

    componentDidUpdate(nextProps) {
        if(this.props.match.params.id !== nextProps.match.params.id) {
            this.loadItem(nextProps.match.params.id);
        }        
    }

    render() {
        var today = this.getToday();

        if(this.state.isLoading) {
            return <LoadingIndicator />;
        }

        if(this.state.notFound) {
            return <NotFound />;
        }

        if(this.state.serverError) {
            return <ServerError />;
        }

        const { visibleBorrowModal, loadingModal } = this.state;
        return (
            <div className="container" style={{ marginTop: 50, marginBottom: 50 }}>
            { this.state.item ? (
                <div className="row thong_tin_ebook">
                    <div className="col-md-4 cover"> 
                        <img src={process.env.PUBLIC_URL + '/' + this.state.item.cover} className="img-thumbnail"
                        alt="Cinque Terre" width="304" height="236" />
                    </div>
                    <div className="col-md-8">
                        <a href="#">
                            <h1 className="ebook_title text-primary">{ this.state.item.title }</h1>
                        </a>
                        <h5 className="">Tác giả : { this.state.item.authors }</h5>
                        <h5 className="">Thể Loại :
                            <a href="#">
                                Tâm Lý - Kỹ Năng Sống
                            </a>
                        </h5>
                        { this.props.isAuthenticated == true ? (
                            <Button onClick={this.showBorrowModal} type="primary"><Icon type="import" /> Mượn</Button>
                          ) : ''
                        }
                        <Modal 
                            visible={visibleBorrowModal} 
                            title="Thông tin mượn sách" 
                            onOk={this.handleOk} 
                            onCancel={this.handleCancel} 
                            footer={[ 
                                <Button key="back" onClick={this.handleCancel}>
                                    Huỷ
                                </Button>,
                                <Button key="submit" type="primary" loading={loadingModal} onClick={this.handleOk}>
                                    Gửi
                                </Button>,
                            ]}>
                            <p>Tên sách: <b>{this.state.item.title}</b></p>
                            <p>Tên người mượn: <b>{this.state.user.name}</b></p>
                            <p>Ngày mượn: <b>{today}</b></p>
                        </Modal>
                    </div>
                </div>
            ) : null
            }
            </div>
        )
    }

    getToday() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        return today;
    }
}

export default Detail;