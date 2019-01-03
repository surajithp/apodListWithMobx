import axios from "axios";
class DataManager {
  // constructor(date1, date2, handleResponse) {
  //   this.startdate = date1;
  //   this.enddate = date2;
  //   this.handleResponse = handleResponse;
  // }
  getdata(startdate, enddate, successfn, failurefn) {
    axios
      .get(
        `https://api.nasa.gov/planetary/apod?api_key=YPnh5fLrnPlqbVeCN86tba4qEEqrh9DrlLgkphhS&start_date=${startdate}&end_date=${enddate}`
      )
      .then(response => successfn(response))
      .catch(err => failurefn(err));
  }
}

let Apidatamanager = new DataManager();
export default Apidatamanager;
