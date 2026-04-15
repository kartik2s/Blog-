import express from "express"
import axios from "axios"

const app = express();
const port = 3000;
const API_URL = "http://localhost:4000";

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/posts`);
    res.render("index.ejs", { posts: response.data });
  } catch (error) {
    res.status(500).json({ message: "error fetching posts" });
  }
});

app.get("/new", (req, res) => {
  res.render("modify.ejs", { heading: "new post", submit: "create post" });
});

app.get("/edit/id", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/posts/${req.params.id}`);
    res.render("modify.ejs", { posts: response.data, heading: "edit post", submit: "update post" });
  } catch (error) {
    res.status(500).json({message: "error fetching posts"});
  }
});

app.post("/api/posts", async(req, res) =>{
  try {
    const response = await axios.post(`${API_URL}/posts`, req.body);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({message: "error fetching posts"});
  }
});

app.post("/api/posts/id", async(req, res) =>{
  try {
    const response = await axios.patch(`${API_URL}/posts/${req.params.id}`, req.body);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({message: "error updating posts"});
  }
});

app.get("/api/posts/delete/id", async(req, res) => {
  try {
    const response = await axios.delete(`${API_URL}/posts/${req.params.id}`);
    res.redirect("/");
  } catch (error) {
    res.status(500).json({message: "error deleting post"});
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});