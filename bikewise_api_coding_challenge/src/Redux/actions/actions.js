import axios from "axios";
export function getApiData(page) {
  return (dispatch) => {
    return axios({
      method: "get",
      url: `https://bikewise.org:443/api/v2/incidents?page=1&per_page=10&incident_type=theft&proximity=berlin&proximity_square=100`,
    })
      .then((res) => {
        console.log("api data", res);
        dispatch({
          type: "GET_API_DATA",
          payload: res.data.incidents,
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: "ERROR",
        });
      });
  };
}

export function searchData(data) {
  return (dispatch) => {
    return axios({
      method: "get",
      url: `https://bikewise.org:443/api/v2/incidents?page=1&per_page=10&occurred_before=${data.to}&occurred_after=${data.from}&incident_type=theft&proximity=berlin&query=${data.query}`,
    })
      .then((res) => {
        console.log("api data search", res.data);
        dispatch({
          type: "SEARCH_DATA",
          payload: res.data.incidents,
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: "ERROR",
        });
      });
  };
}
