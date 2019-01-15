import axios from "axios";
import { action, observable } from "mobx";
class DataManager {
  // constructor(date1, date2, handleResponse) {
  //   this.startdate = date1;
  //   this.enddate = date2;
  //   this.handleResponse = handleResponse;
  // }
  @observable start_date: null;
  @observable end_date: null;
  @observable data = [];
  @observable state = "pending";
  @action
  fetchData() {
    let moment = require("moment");
    this.end_date = moment()
      .subtract(1, "days")
      .format("YYYY-MM-DD");
    this.start_date = moment()
      .subtract(10, "days")
      .format("YYYY-MM-DD");
    axios
      .get(
        `https://api.nasa.gov/planetary/apod?api_key=YPnh5fLrnPlqbVeCN86tba4qEEqrh9DrlLgkphhS&start_date=${
          this.start_date
        }&end_date=${this.end_date}`
      )
      .then(
        response => {
          const responsedata = response.data;
          this.data = responsedata;
          this.state = "done";
        },
        error => {
          console.log(error);
        }
      );
  }
  @action
  fetchMoreData() {
    console.log("Called fetch more data");
    let previousstartdate = this.start_date;
    let moment = require("moment");
    let enddate = moment(`${previousstartdate}`)
      .subtract(1, "days")
      .format("YYYY-MM-DD");
    let startdate = moment(`${enddate}`)
      .subtract(9, "days")
      .format("YYYY-MM-DD");
    axios
      .get(
        `https://api.nasa.gov/planetary/apod?api_key=YPnh5fLrnPlqbVeCN86tba4qEEqrh9DrlLgkphhS&start_date=${startdate}&end_date=${enddate}`
      )
      .then(
        response => {
          const responsedata = response.data;
          this.data = this.data.concat(responsedata);
        },
        error => {
          console.log(error);
        }
      );
    this.start_date = startdate;
  }
}

let Apidatamanager = new DataManager();
export default Apidatamanager;
