import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadAll } from '../../actions/actions';
import {Image} from 'react-bootstrap';
import { matchPath } from "react-router";

class TopMenu extends Component {
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
      loadAll(this.props.dispatch, this.props.sections, this.props.menus, this.props.items);
    }
  }

  componentDidUpdate(){
    if(this.props.sections){
      var idx = this.props.sections.findIndex(s => s._id === this.state.section_id);      
      if(idx > 4)
        this.refs.scrollDiv.scrollLeft = window.innerWidth;
    }
  }

  render()
  {
    var isRootClass = (this.state.section_id === "root") ? " selected" : "";

    return (
      <div className="d-flex flex-column topmenu">
        <div className="d-flex flex-row top-section" ref="scrollDiv">
            <div className={"card card-section"} key={"root"}>
              <div className="card-body">
                <Link to={"/menu/root"} onClick={()=>this.setState({section_id:"root"})}>
                  <Image className="section-image bktopleft" key={"root"} src={"/images/bk_logo.png"}/>
                  <h6 className={"card-title"+isRootClass}>Menu</h6>
                </Link>
                <div className={"line "+isRootClass}></div>
              </div>
            </div>
            {this.props.sections.map((m) => {
              var selectedClass = m._id === this.state.section_id ? " selected" : "";
              return (
              <div className={"card card-section"} key={m._id}>
                <div className="card-body">
                  <Link to={"/menu/section/"+m._id} onClick={()=>this.setState({section_id:m._id})}>
                    <Image className="section-image" key={m._id} src={"/images/" + m.carouselImage.asset._ref}/>
                    <h6 className={"card-title"+selectedClass}>{m.name.en}</h6>
                  </Link>
                  <div className={"line "+selectedClass}></div>
                </div>
              </div>)
            })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ menuState }) => {
  return menuState;
};

export default connect(mapStateToProps)(TopMenu);
