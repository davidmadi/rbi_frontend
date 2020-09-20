import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadAll } from '../../actions/actions';

class Home extends Component {

  componentDidMount(){
    if(!this.props.mainLoaded)
      loadAll(this.props.dispatch);
  }

  unloadedHome = ()=>{
    return (
      <div className="d-flex flex-column justify-content-md-center h-100 home">
        <div className="p-2 h-50"></div>
        <div className="p-2">
          <div className="d-flex justify-content-center">
            <span type="button" className="btn btn-primary">LOADING...</span>
          </div>
        </div>
      </div>
    );
    
  }

  loadedHome = ()=>{
    return (
      <div className="d-flex flex-column justify-content-md-center h-100 home">
        <div className="p-2 h-50"></div>
        <div className="p-2">
          <div className="d-flex justify-content-center">
            <Link to="/menu/root">
              <span type="button" className="btn btn-primary">LET'S EAT</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  render(){
    if(this.props.mainLoaded)
      return this.loadedHome();
    else
      return this.unloadedHome();
  }

}

const mapStateToProps = ({ menuState }) => {
	return { mainLoaded : menuState.mainLoaded };
};

export default connect(mapStateToProps)(Home);
