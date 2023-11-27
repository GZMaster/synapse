// import mongoose from "mongoose";

// const communitySchema = new mongoose.Schema({
//   id: {
//     type: String,
//     required: true,
//   },
//   username: {
//     type: String,
//     unique: true,
//     required: true,
//   },
//   name: {
//     type: String,
//     required: true,
//   },
//   image: String,
//   bio: String,
//   createdBy: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//   },
//   synapses: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "synapse",
//     },
//   ],
//   members: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//   ],
// });

// const Cohort =
//   mongoose.models.Cohort || mongoose.model("Cohort", communitySchema);

// export default Cohort;
