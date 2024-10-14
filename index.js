import express from 'express';
import morgan from 'morgan';
// import fetch from 'node-fetch';
import postsRouter from './routes/posts.js';
import usersRouter from './routes/users.js';
import commentsRouter from './routes/comments.js';
// import views from './views';
import path from 'path';


const app = express ();
const PORT = 1008;

// css file
app.use(express.static('public'));

// Set Pug view engine

app.set('view engine', 'pug');
app.set('views', path.join((process.cwd(), 'views')));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
// app.use('/api/posts', postsRouter);

// =======API Routes =====

app.use("/api/posts", postsRouter);
app.use("/api/users", usersRouter);
app.use("/api/comments", commentsRouter);

// =====Render posts as HTML====

app.get('/posts', async(req,res) =>{
  const posts = [];
  res.render('posts', {posts});
});

// form submission
app.post('/api/posts', async(req,res) => {
  const {title,body} = req.body;
  

  // REDIRECT to post page
  res.redirect('/posts');
  });

// ======== Routes
app.get("/", (req, res) => {
    res.send("ok");
  });


  
// Error middleware
app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  console.log(error);
    res.status(statusCode).json({
      error: {
        message: error.message || "Unexpected error",
        status: statusCode
      }
    })
  });
  
  app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));