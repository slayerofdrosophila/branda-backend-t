const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Schema to describe a ship.
 */
let VehicleSchema = new Schema({
  make: {
    type: String
  },
  model: {
    type: String
  },
  model_year: {
    type: Number
  },
  mpg_range: {
    value: {type: Number},
    unit: {type: String, default: "mpg"}
  },
  odometer_miles: {
    value: {type: Number},
    unit: {type: String, default: "miles"}
  },
  engine_type: {
    type: String
  },
  display_name: {
    type: String
  },
  vin: {
    type: Number
  }
});

let Vehicle = mongoose.model("Vehicle", VehicleSchema);
module.exports = Vehicle;