import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { Link } from 'react-router-dom';
import { selectSection  } from '../../actions';
import { matchPath } from "react-router";
import TopMenu from '../../components/topMenu';
import BottomSection from '../../components/bottomSection';
import {Image} from 'react-bootstrap';

class Section extends Component {
  constructor(){
    super();
    this.state = {sectionId:'root'};
  }

  componentDidMount(){
    this.props.history.listen(this.matchUrl);
    this.matchUrl();
  }

  matchUrl = (location, action) => {
    const match = matchPath(window.location.pathname, {
      path: "/menu/section/:id",
      exact: true,
      strict: false
    });
    if (match && match.params.id != this.state.sectionId)
      selectSection(this.props.dispatch, match.params.id, this.props.sessions, this.props.items);      
  }

  componentDidUpdate(){
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  render() {
    const { name, sectionItems } = this.props;
    return (
      <div className="section-page d-flex flex-column h-100">
        <TopMenu/>
        <div className="container section-items">
          <div className="row middle-section">
          {sectionItems.map(i =>(
            <div className="col-4" key={i._id}>
              <div className={"card card-section"}>
                <div className="card-body">
                  <div className="image-container">
                    <Image className="section-image" src={"/images/" + i.image.asset._ref}/>
                  </div>
                  <h6 className="card-title">{i.name.en}</h6>
                </div>
              </div>
            </div>
            ))}
          </div>
        </div>
        <BottomSection/>
      </div>
    );
  }
}

const mapStateToProps = ({ menuState }) => {
  return { sections: menuState.sections,
    items : menuState.items,
    selectedSection: menuState.selectedSection,
    sectionItems : menuState.sectionItems };
};

export default connect(mapStateToProps)(Section);
