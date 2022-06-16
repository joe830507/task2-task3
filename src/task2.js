const axios = require("axios");

const category = process.argv[2];
const limit = +process.argv[3];
const url = `https://api.publicapis.org/entries?Category=${category}`;

class EntriesHandler {
  constructor() {
    this.status;
    this.data;
  }
  async execute() {
    const { status, data } = await axios.get(url);
    this.status = status;
    this.data = data;
    this.handleResponse();
  }
  handleResponse() {
    if (this.status === 200) {
      this.handleEntries();
    }
    this.printResult();
  }
  compareString(itemA, itemB) {
    return itemB.API.localeCompare(itemA.API);
  }
  handleEntries() {
    if (this.data && this.data.count > 0) {
      this.data.entries = this.data.entries.sort(this.compareString);
      if (this.data.count > limit) {
        this.data.entries = this.data.entries.slice(0, limit);
      }
    }
  }
  printResult() {
    if (this.data.entries && this.data.entries.length > 0) {
      console.log(this.data.entries);
    } else {
      console.log("No results");
    }
  }
}

const entriesHandler = new EntriesHandler();
entriesHandler.execute();
