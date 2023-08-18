import mongoose, { Document, Schema } from "mongoose";
import { ContactType } from "../types/user";

const contactSchema = new Schema<ContactType>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  textMessage: { type: String, required: true },
});

const ContactModel = mongoose.model<ContactType>("Contact", contactSchema);

export default ContactModel;
