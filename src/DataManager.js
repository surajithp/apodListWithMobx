import axios from "axios";
import { action, observable } from "mobx";
import { AsyncStorage } from "react-native";
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
    const promise = Rx.Observable.from(
      axios.get(
        `https://api.nasa.gov/planetary/apod?api_key=YPnh5fLrnPlqbVeCN86tba4qEEqrh9DrlLgkphhS&start_date=${
          this.start_date
        }&end_date=${this.end_date}`
      )
    );
    const subscription = promise.subscribe(val => {
      this.storeData(val);
    });
  }

  storeData = async val => {
    console.log("Called Aysnc Storage set Property");
    try {
      await AsyncStorage.setItem("first10", JSON.stringify(val.data));
    } catch (error) {
      console.log(error);
    }
  };

  getData = async () => {
    console.log("Called Aysnc Storage get Property");
    try {
      const retrievedData = await AsyncStorage.getItem("first10");
      const itemsData = JSON.parse(retrievedData);
      this.data = itemsData.reverse();
      this.state = "done";
    } catch (error) {
      console.log(error);
    }
  };

  @action
  fetchMoreData() {
    let previousstartdate = this.start_date;
    let moment = require("moment");
    let enddate = moment(`${previousstartdate}`)
      .subtract(1, "days")
      .format("YYYY-MM-DD");
    console.log(enddate);
    let startdate = moment(`${enddate}`)
      .subtract(9, "days")
      .format("YYYY-MM-DD");
    const promise = Rx.Observable.from(
      axios.get(
        `https://api.nasa.gov/planetary/apod?api_key=YPnh5fLrnPlqbVeCN86tba4qEEqrh9DrlLgkphhS&start_date=${startdate}&end_date=${enddate}`
      )
    );
    const subscription = promise.subscribe(
      val => (this.data = this.data.concat(val.data.reverse()))
    );
    this.start_date = startdate;
  }
}

let Apidatamanager = new DataManager();
export default Apidatamanager;
