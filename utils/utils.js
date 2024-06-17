import data from "../data/db.js";

const idIncrement = (users) => {
  if (users.length !== 0) return users.at(-1).id + 1;
  return 1;
};

export default idIncrement;
