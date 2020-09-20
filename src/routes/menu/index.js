import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {Image} from 'react-bootstrap';
import { matchPath } from "react-router";
import TopMenu from '../../components/topMenu';
import BottomSection from '../../components/bottom/bottom';
import { IoIosArrowDroprightCircle } from 'react-icons/io';


class Menu extends Component {
  constructor(){
    super();
    this.state = {section:'root'};
  }

  componentWillMount(){
    const match = matchPath(window.location.pathname, {
      path: "/menu/:section",
      exact: true,
      strict: false
    });
    if(match)
      this.setState({section:match.params.section});
  }

  render()
  {

    return (
      <div className="menu-page d-flex flex-column h-100">
        <TopMenu/>
        <div className="menu-items">
          <div className="row middle-section">
              {this.props.sections.map((m) => {
                return (
                  <div className="col-4" key={m._id}>
                    <div className={"card card-section"}>
                      <div className="card-body">
                        <Link to={"/menu/section/"+m._id} onClick={()=>this.setState({section_id:m._id})}>
                          <div className="image-container">
                            <Image className="section-image" src={"/images/" + m.image.asset._ref}/>
                          </div>
                          <div className="d-flex justify-content-start h-4">
                            <h5 className="card-title w-50 tx-lf mg04">{m.name.en}</h5>
                          </div>
                          <div className="d-flex justify-content-end">
                            <IoIosArrowDroprightCircle className="card-go-ico" size="3em" />
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                  )
              })}
          </div>
        </div>
        <BottomSection/>
      </div>
    );
  }
}

const mapStateToProps = ({ menuState }) => {
	return { sections : menuState.sections };
};

export default connect(mapStateToProps)(Menu);
