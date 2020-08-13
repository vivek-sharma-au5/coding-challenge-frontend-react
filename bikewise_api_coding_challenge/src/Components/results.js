import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getApiData } from "../Redux/actions/actions";
import Pagination from "react-js-pagination";

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      loading: true,
      show_no_res: false,
    };
  }
  componentDidMount() {
    this.props.getApiData(this.state.activePage);
    setTimeout(() => {
      this.setState({
        loading: false,
        show_no_res: false,
      });
    }, 1000);
  }

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
    this.props.getApiData(pageNumber);
  }

  render() {
    return (
      <div>
        {this.state.loading ? (
          <div className='col-2 offset-2'>Loading...</div>
        ) : (
          <div></div>
        )}

        {this.props.error ? (
          <div style={{ color: "red" }}>Ooops, something went wrong</div>
        ) : (
          <div></div>
        )}
        {this.props.bikes_data.length !== 0 ? (
          <div>
            <div className='col-2 offset-8'>
              <strong>Total - {this.props.bikes_data.length}</strong>
            </div>
            {this.props.bikes_data.map((ele, index) => (
              <div className='res-main' key={index}>
                <div className='res-image'>
                  {ele.media.image_url ? (
                    <div>
                      <img
                        src={ele.media.image_url}
                        alt=''
                        width='116'
                        height='116'
                      />
                    </div>
                  ) : (
                    <div>
                      {" "}
                      <img
                        src='https://directory.bodc.in/images/parish/parish_details/No_Image_Available.jpg'
                        alt=''
                        width='116'
                        height='116'
                      />
                    </div>
                  )}
                </div>
                <div className='col-8 res-details'>
                  <ul>
                    <li>
                      <h5 onClick={() => this.bikeInfo(ele.id)}>{ele.title}</h5>
                    </li>
                    <li>
                      <strong>Description - </strong>
                      {ele.description}
                    </li>

                    {this.props.oc_date.map((e, i) => {
                      if (ele.id === e.id) {
                        return (
                          <div key={i}>
                            <li>
                              <strong>Date of theft - </strong>
                              {e.occured_at}
                            </li>
                            <li>
                              <strong>Date of report - </strong>
                              {e.updated_at}
                            </li>
                          </div>
                        );
                      }
                    })}

                    <li>
                      <strong>Theft location - </strong>
                      {ele.address}
                    </li>
                  </ul>
                </div>
              </div>
            ))}
            <div className='pg-div mt-4'>
              <Pagination
                itemClass='page-item'
                linkClass='page-link'
                activePage={this.state.activePage}
                itemsCountPerPage={10}
                totalItemsCount={this.props.pages}
                pageRangeDisplayed={10}
                onChange={this.handlePageChange.bind(this)}
              />
            </div>
          </div>
        ) : (
          <div className='col-2 offset-2'>No Results</div>
        )}
      </div>
    );
  }
}

const getDataFromRedux = (state) => {
  console.log("data in component", state.bikewise.bikes_data);
  return {
    bikes_data: state.bikewise.bikes_data,
    oc_date: state.bikewise.oc_date,
    pages: state.bikewise.pages,
    error: state.bikewise.error,
  };
};

const giveActionsToRedux = (dispatch) => {
  return bindActionCreators({ getApiData }, dispatch);
};

export default connect(getDataFromRedux, giveActionsToRedux)(Results);
