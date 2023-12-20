const { model, Schema } = require("mongoose");

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
      unique: [true, "Duplicated email.."],
    },
    phone: {
      type: String,
      required: [true, "Set phone number for contact"],
      unique: [true, "Duplicated phone.."],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Contact = model("Contact", contactSchema);

module.exports = Contact;
