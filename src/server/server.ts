import app from "../app";
import "dotenv/config";

const PORT = process.env.PORT || 3000;

console.log(process.env.DATABASE_URL);

app.listen(PORT, () => {
  console.log("Server started on port " + PORT);
});
