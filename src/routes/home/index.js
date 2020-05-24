import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Home extends Component {
  render()
  {
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
}

const mapStateToProps = ({  }) => {
	return {  };
};

export default connect(mapStateToProps)(Home);
