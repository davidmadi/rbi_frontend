import React, { Component } from 'react';
import { connect } from 'react-redux';
import { IoMdArrowDropright } from 'react-icons/io';
//import {Image} from 'react-bootstrap';

class BottomSection extends Component {
  constructor(){
    super();
  }

  render()
  {
    return (
      <div className="bottom-section">
        <div className="container mb-5">
          <div className="d-flex h-100 mt-5">
            <div className="p-2 flex-fill">
              <div className="">SEE TIPS & TRICKS</div>
              <div className="bold">NEED HELP!</div>            
            </div>
            <div className="p-2 flex-fill opacity-5">
              <div className="row text-right">
                <div className="col-7"></div>
                <div className="col-3"><span>TOTAL (0 ITEM):</span></div>
                <div className="col-2"><span>$0.00</span></div>
              </div>
              <div className="row text-right mt-2">
                <div className="col-7"></div>
                <div className="col-5">
                  <div className="btn btn-primary w-100 opacity-5">
                    <span className="text-light">CHECKOUT</span>
                    <IoMdArrowDropright className="card-go-ico text-light" size="3em" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ menuState }) => {
	return { sections : menuState.sections };
};

export default connect(mapStateToProps)(BottomSection);
