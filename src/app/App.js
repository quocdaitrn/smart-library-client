import React from 'react';
import './App.css';
import { Layout } from 'antd';
import { AppContext } from './context';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginVisible:false,
      signupVisible:false,
    };
  }
  render() {
    return (
      <Layout className="app-container">
        <AppContext.Provider value={this.state}>

        </AppContext.Provider>
      </Layout>
    );
  }
}

export default App;
