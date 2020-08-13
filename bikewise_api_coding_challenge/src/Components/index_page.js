import React from "react";
import "../App.css";
// import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Pagination from "react-js-pagination";
import { searchData } from "../Redux/actions/actions";

class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      toValue: new Date(),
      fromValue: new Date(),
      query: "",
      toDate: "",
      fromDate: "",
    };
  }
  componentDidMount() {}
  handleQuery = (event) => {
    this.setState({
      query: event.target.value,
    });
  };

  handleFromDate = (event) => {
    const data = Math.floor(event.getTime() / 1000);
    console.log(data, event);
    this.setState({
      fromDate: data,
      fromValue: event,
    });
  };
  handleToDate = (event) => {
    const data = Math.floor(event.getTime() / 1000);
    console.log(data, event);
    this.setState({
      toDate: data,
      toValue: event,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      query: this.state.query,
      to: this.state.toDate,
      from: this.state.fromDate,
    };
    this.props.searchData(data);
  };

  render() {
    return (
      <div>
        <div className=' main-info '>
          <div className='col-1 offset-1 pl-3'>
            <img
              src='https://www.berlin.de/converjon/?ts=1579764187&width=50&height=75&mime=image%2Fpng&url=https%3A%2F%2Fwww.berlin.de%2Fpolizei%2F_assets%2Fpolizeistern_gold_50x75px.png%3Fts%3D1579764187.png'
              alt=''
              width='60'
            />
          </div>
          <div className='col-6 pl-0'>
            <h1>Police Department of Berlin</h1>
            <h4>Stolen Bykes</h4>
          </div>
        </div>
        <br />
        <form onSubmit={this.handleSubmit}>
          <div class='row'>
            <div class='col-sm-2 offset-1'>
              <input
                type='text'
                className='form-control form-control-sm'
                placeholder='Search case discriptions'
                onChange={this.handleQuery}
              />
            </div>
            <div className='col-2 date-picker'>
              <label className='mr-2 mt-1'>
                <strong>From</strong>
              </label>
              <DatePicker
                selected={this.state.fromValue}
                onChange={this.handleFromDate}
              />
            </div>
            <div className='col-2 date-picker'>
              <label className='mx-3 mt-1'>
                <strong>To</strong>
              </label>
              <DatePicker
                selected={this.state.toValue}
                onChange={this.handleToDate}
              />
            </div>
            <div className='col-2 ml-5'>
              <button className='btn btn-outline-dark btn-sm mt-0'>
                Find Cases
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const getDataFromRedux = (state) => {
  return {};
};

const giveActionsToRedux = (dispatch) => {
  return bindActionCreators({ searchData }, dispatch);
};

export default connect(getDataFromRedux, giveActionsToRedux)(Index);
