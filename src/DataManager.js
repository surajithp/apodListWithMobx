import axios from "axios";
class DataManager {
  constructor(date1, date2, handleResponse) {
    this.startdate = date1;
    this.enddate = date2;
    this.handleResponse = handleResponse;
  }
  getdata() {
    axios
      .get(
        `https://api.nasa.gov/planetary/apod?api_key=YPnh5fLrnPlqbVeCN86tba4qEEqrh9DrlLgkphhS&start_date=${
          this.startdate
        }&end_date=${this.enddate}`
      )
      .then(response => this.handleResponse(response))
      .catch(err => console.log(err));
  }
}

let Apidatamanager = new DataManager();
export default Apidatamanager;
