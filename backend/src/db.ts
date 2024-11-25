import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const tagSchema = new Schema({
  tag: { type: String, required: true, unique: true },
});

const contentTypes = ["image", "video", "article", "audio"];

const contentSchema = new Schema({
  link: { type: String, required: true },
  type: { type: String, enum: contentTypes, required: true },
  title: { type: String, required: true },
  tags: [{ type: ObjectId, ref: "Tag" }],
  userId: { type: ObjectId, ref: "User", required: true },
});

const linkSchema = new Schema({
  hash: { type: String, required: true },
  userId: { type: ObjectId, ref: "User", required: true },
});

const User = mongoose.model("User", userSchema);
const Tag = mongoose.model("Tag", tagSchema);
const Content = mongoose.model("Content", contentSchema);
const Link = mongoose.model("Link", linkSchema);

export default {
  User,
  Tag,
  Content,
  Link,
};
