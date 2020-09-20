import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadAll } from '../../actions/actions';

const UnloadedHome = ()=> {
  return (
    <div className="d-flex flex-column justify-content-md-center h-100 home">
      <div className="p-2 h-50"></div>
      <div className="p-2">
        <div className="d-flex justify-content-center">
          <span type="button" className="btn btn-primary">LOADING...</span>
        </div>
      </div>
    </div>
  )
};


const LoadedHome = ()=> {
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
)
};


class Home extends Component {

  componentDidMount(){
    if(!this.props.mainLoaded)
      loadAll(this.props.dispatch);
  }

  render(){
    if(this.props.mainLoaded)
      return <LoadedHome/>;
    else
      return <UnloadedHome/>;
  }

}

const mapStateToProps = ({ menuState }) => {
	return { mainLoaded : menuState.mainLoaded };
};

export default connect(mapStateToProps)(Home);
