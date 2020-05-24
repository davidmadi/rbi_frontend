import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadSections, loadMenu } from '../../actions';
import {Image} from 'react-bootstrap';
import { matchPath } from "react-router";

class BottomSection extends Component {
  constructor(){
    super();
    this.state = {section_id:'root'};
  }

  componentWillMount(){
    const match = matchPath(window.location.pathname, {
      path: "/menu/section/:id",
      exact: true,
      strict: false
    });
    if(match)
      this.setState({section_id:match.params.id});
  }

  componentDidMount(){
    if (!this.props.sections.length){
      loadSections(this.props.dispatch);
      loadMenu(this.props.dispatch);
    }
  }

  render()
  {
    var isRootClass = (this.state.section_id == "root") ? " selected" : "";

    return (
      <div className="container">
        <div className="d-flex flex-row top-section">
            <div className={"card card-section"+isRootClass} key={"root"}>
              <div className="card-body">
                <Link to={"/menu/root"} onClick={()=>this.setState({section_id:"root"})}>
                  <Image className="section-image" key={"root"} src={"/images/bk_logo.png"}/>
                  <h6 className="card-title">Menu</h6>
                </Link>
              </div>
            </div>
            {this.props.sections.map((m) => {
              var selectedClass = m._id == this.state.section_id ? " selected" : "";
              return (
              <div className={"card card-section"+selectedClass} key={m._id}>
                <div className="card-body">
                  <Link to={"/menu/section/"+m._id} onClick={()=>this.setState({section_id:m._id})}>
                    <Image className="section-image" key={m._id} src={"/images/" + m.carouselImage.asset._ref}/>
                    <h6 className="card-title">{m.name.en}</h6>
                  </Link>
                </div>
              </div>)
            })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ menuState }) => {
	return { sections : menuState.sections };
};

export default connect(mapStateToProps)(BottomSection);
