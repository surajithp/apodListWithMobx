import axios from "axios";
import { action, observable } from "mobx";
const Rx = require("rxjs/Rx");
class DataManager {
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
    Rx.Observable.from(
      axios.get(
        `https://api.nasa.gov/planetary/apod?api_key=YPnh5fLrnPlqbVeCN86tba4qEEqrh9DrlLgkphhS&start_date=${
          this.start_date
        }&end_date=${this.end_date}`
      )
    ).subscribe(val => (this.data = val.data.reverse()));
    this.state = "done";
  }
  @action
  fetchMoreData() {
    console.log("Called fetch more data");
    let previousstartdate = this.start_date;
    console.log(previousstartdate);
    let moment = require("moment");
    let enddate = moment(`${previousstartdate}`)
      .subtract(1, "days")
      .format("YYYY-MM-DD");
    console.log(enddate);
    let startdate = moment(`${enddate}`)
      .subtract(9, "days")
      .format("YYYY-MM-DD");
    console.log(startdate);
    Rx.Observable.from(
      axios.get(
        `https://api.nasa.gov/planetary/apod?api_key=YPnh5fLrnPlqbVeCN86tba4qEEqrh9DrlLgkphhS&start_date=${startdate}&end_date=${enddate}`
      )
    ).subscribe(val => (this.data = this.data.concat(val.data.reverse())));
    this.start_date = startdate;
  }
}

let Apidatamanager = new DataManager();
export default Apidatamanager;
