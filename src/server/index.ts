import express from "express";

const app = express();

app.use(express.static("public"));
app.use(express.static("dist/client"));
app.use(express.static("node_modules/react/umd"));
app.use(express.static("node_modules/react-dom/umd"));

app.listen(3000, () => console.log("Listening on port 3000..."));