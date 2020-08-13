let initialState = {
  bikes_data: [],
  data_response: [],
  oc_date: [],
  results: [],
  pages: [],
  currentPage: 1,
  error: false,
};

function appReducerFunction(state = initialState, action) {
  let stateCopy = JSON.parse(JSON.stringify(state));

  switch (action.type) {
    case "GET_API_DATA":
      console.log("data in reducer", action.payload[0].occurred_at);

      if (action.payload) {
        var filteredResults = action.payload.filter(
          (ele) => ele.description !== ""
        );
      }
      stateCopy.bikes_data = action.payload;

      var time_date = [];
      filteredResults.forEach((el) => {
        const newDate = new Date(el.occurred_at).toString();
        const occurred = newDate.split(" ").splice(0, 5).join(" ");
        const newDate2 = new Date(el.updated_at).toString();
        const updated = newDate2.split(" ").splice(0, 5).join(" ");
        time_date.push({
          occured_at: occurred,
          updated_at: updated,
          id: el.id,
        });
      });
      stateCopy.oc_date = time_date;

      const pageLinks = [];
      const pageNo1 = action.payload.length % 10;
      for (let i = 1; i <= action.payload.length; i++) {
        pageLinks.push(i);
      }
      stateCopy.pages = stateCopy.bikes_data.length;
      console.log("FLR", pageNo1);

      return stateCopy;

    case "SEARCH_DATA":
      console.log("data in reducer", action.payload.length);

      if (action.payload) {
        var filteredResults = action.payload.filter(
          (ele) => ele.description !== ""
        );
      }
      stateCopy.bikes_data = filteredResults;

      var time_date = [];
      filteredResults.forEach((el) => {
        const newDate = new Date(el.occurred_at).toString();
        const occurred = newDate.split(" ").splice(0, 5).join(" ");
        const newDate2 = new Date(el.updated_at).toString();
        const updated = newDate2.split(" ").splice(0, 5).join(" ");
        time_date.push({
          occured_at: occurred,
          updated_at: updated,
          id: el.id,
        });
      });
      stateCopy.oc_date = time_date;
      const pageLinks1 = [];
      const pageNo = action.payload.length % 10;
      for (let i = 1; i <= action.payload.length; i++) {
        pageLinks1.push(i);
      }
      stateCopy.pages = stateCopy.bikes_data.length;

      console.log("FLR", stateCopy.oc_date);

      return stateCopy;

    case "ERROR":
      stateCopy.error = true;
      return stateCopy;

    default:
      return stateCopy;
  }
}

export default appReducerFunction;
