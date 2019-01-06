import axios from "axios";
import { action, observable } from "mobx";
class DataManager {
  // constructor(date1, date2, handleResponse) {
  //   this.startdate = date1;
  //   this.enddate = date2;
  //   this.handleResponse = handleResponse;
  // }

  @observable data = [];
  @observable state = "pending";
  @action
  fetchData(startdate, enddate) {
    console.log(startdate)
    console.log(enddate)
    axios
      .get(
        `https://api.nasa.gov/planetary/apod?api_key=YPnh5fLrnPlqbVeCN86tba4qEEqrh9DrlLgkphhS&start_date=${startdate}&end_date=${enddate}`
      )
      .then(
        response => {
          console.log(response);
          const responsedata = response.data;
          this.data = responsedata;
          this.state = "done";
        },
        error => {
          console.log(error);
        }
      );
  }
}

let Apidatamanager = new DataManager();
export default Apidatamanager;
