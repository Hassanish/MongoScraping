var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var NoteSchema = new Schema({
  title: String,
  body: {
    type: String
  },
  article: {
    type: Schema.Types.ObjectId,
    ref: "Headline"
  }
});
var Note = mongoose.model("Note", NoteSchema);

module.exports = Note;
