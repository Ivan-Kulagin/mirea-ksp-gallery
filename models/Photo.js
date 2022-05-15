const {Schema, model, Types} = require('mongoose')

const schema = new Schema({
  name: {type: String, required: true},
  description: {type: String, required: false},
  image: {type: String},
  date: {type: Date, default: Date.now},
  public: {type: Boolean, default: false, required: true},
  owner: {type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Photo', schema)
