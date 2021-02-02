const express = require("express");
const app = express();

app.use(express.json());

const db = require("./models/index");
const userRoutes = require("./routes/UserRoutes");

app.use("/api", userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
