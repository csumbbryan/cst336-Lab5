const express = require('express');
const app = express();
const pool = require("./dbPool.js");
app.set("view engine", "ejs");
app.use(express.static("public"));

//routes
app.get('/', async(req, res) => {
  let sql = `SELECT authorId, firstName, lastName
    FROM q_authors
    ORDER BY lastName`;
  let rows = await executeSQL(sql);
  let sql2 = `SELECT DISTINCT category
    FROM q_quotes
    ORDER BY category`
  let rows2 = await executeSQL(sql2);
  res.render('index', {"authors":rows, "categories": rows2});
});

app.get('/searchByKeyword', async (req, res) => {
  let userKeyword = req.query.keyword;
  console.log(userKeyword);
  let sql = `SELECT quote, authorId, firstName, lastName 
    FROM q_quotes 
    NATURAL JOIN q_authors
    WHERE quote LIKE ? `;
  let params = [`%${userKeyword}%`];
  let rows = await executeSQL(sql, params);
  res.render("results", {"quotes":rows});
});

app.get('/searchByAuthor', async (req, res) => {
  let userAuthorId = req.query.authorId;
  let sql = `SELECT quote, authorId, firstName, lastName
    FROM q_quotes
    NATURAL JOIN q_authors
    WHERE authorId = ? `;
  let params = [userAuthorId];
  let rows = await executeSQL(sql, params);
  res.render("results", {"quotes":rows});
});

app.get('/searchByCategory', async (req, res) => {
  let userCategory = req.query.category;
  let sql = `SELECT quote, authorId, firstName, lastName
    FROM q_quotes
    NATURAL JOIN q_authors
    WHERE category = ? `;
  let params = [userCategory];
  let rows = await executeSQL(sql, params);
  res.render("results", {"quotes":rows});
});

app.get('/searchByLikes', async (req, res) => {
  let userLow = req.query.lowLikes;
  let userHigh = req.query.highLikes;
  let sql = `SELECT quote, authorId, firstName, lastName
    FROM q_quotes
    NATURAL JOIN q_authors
    WHERE likes BETWEEN ? AND ? `;
  let params = [userLow, userHigh];
  let rows = await executeSQL(sql, params);
  res.render("results", {"quotes":rows});
});

app.get("/dbTest", async function(req, res) {
  let sql = "SELECT * FROM q_quotes";
  let rows = await executeSQL(sql);
  res.send(rows);
});

app.get('/api/author/:id', async (req, res) => {
  let authorId = req.params.id;
  let sql = `SELECT *
    FROM q_authors
    WHERE authorId = ? `;
  let rows = await executeSQL(sql, [authorId]);
  res.send(rows);
});

//functions
async function executeSQL(sql, params) {
  return new Promise (function(resolve, reject) {
    pool.query(sql, params, function (err, rows, fields) {
      if (err) throw err;
      resolve(rows);
    });
  });
}

app.listen(3000, () => {
  console.log('server started');
});