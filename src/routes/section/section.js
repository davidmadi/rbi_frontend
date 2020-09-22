import React, { Component } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { selectSection } from '../../actions/actions';
import { matchPath } from "react-router";
import TopMenu from '../../components/topMenu';
import BottomSection from '../../components/bottom/bottom';
import { Image } from 'react-bootstrap';

  //componentDidUpdate() {
  //  document.body.scrollTop = 0; // For Safari
  //  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  //}

const Section = (props) => {
  let {id} = useParams();
  if (!props.sections || !props.items || !props.sectionItems)
    selectSection(props.dispatch, id, props.sections, props.items);
  else if (id !== props.selectedSection)
    selectSection(props.dispatch, id, props.sections, props.items);

  return (
    <div className="section-page d-flex flex-column h-100">
      <TopMenu />
      <div className="section-items">
        <div className="row middle-section">
          {props.sectionItems.map(i => (
            <div className="col-4 no-pd" key={i._id}>
              <div className={"card card-section"}>
                <div className="card-body">
                  <div className="image-container">
                    <Image className="section-image" src={"/images/" + i.image.asset._ref} />
                  </div>
                  <h5 className="card-title">{i.name.en}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomSection />
    </div>
  );
}

const mapStateToProps = ({ menuState }) => {
  return {
    sections: menuState.sections,
    items: menuState.items,
    selectedSection: menuState.selectedSection,
    sectionItems: menuState.sectionItems
  };
};

export default connect(mapStateToProps)(Section);
//export default connect(mapStateToProps)(Section);
