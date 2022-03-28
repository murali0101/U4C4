const app = require("./index");
const connect = require("./configs/db");

app.listen(5600, async () => {
  try {
    await connect();
    console.log("listening port 5600...");
  } catch (error) {
    console.log("error:", error);
  }
});
