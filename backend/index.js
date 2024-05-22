const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const axios = require('axios')

const app = express();
const port = 3009;

app.use(bodyParser.json());
app.use(cors());
  
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: 'weldx@pg',
  port: 5432,
});

app.post('/adduser', async (req, res) => {
  try {
    const { name, username, email, pasword, role, address} = req.body;
    const client = await pool.connect();
  
    const result = await client.query('INSERT INTO next (name, username, email, pasword, role, address) VALUES ($1, $2, $3, $4, $5, $6)', [name, username, email, pasword, role, address]);
    client.release();
    res.status(201).send('Form data submitted successfully');
  } catch (error) {
    console.error('Error submitting form data:', error);
    res.status(500).send('Internal Server Error                                                                                                                                                                                                                                 ');
  }
});

app.post('/', async (req, res) => {
  try {
    const { email, pasword } = req.body;
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM next WHERE email = $1 AND pasword = $2', [email, pasword]);
    client.release();
    if (result.rows.length === 1) {
      res.status(200).send('Login successful');
    } else {
      res.status(401).send('Invalid email or password');
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.get('/data', (req, res, next) => {
	console.log("DATA:");
	pool.query('Select * from next')
		.then(nextData => {
			console.log(nextData.rows);
			res.send(nextData.rows);
		})
})

app.get('/data/id',async(req,res)=>{
  const {id} = req.params;
  
})

app.put('/data/:id', async (req, res) => {
  const { id } = req.params;
  const { name, username, email, pasword, role, address} = req.body;
  
  try {
      const client = await pool.connect();
      const result = await client.query('UPDATE next SET name=$1, username=$2, email=$3, pasword=$4, role=$5, address=$6 WHERE id=$7 RETURNING *', [name, username, email, pasword, role, address, id]);
      client.release();
      res.json(result.rows);
  } catch (err) {
      console.error('Failed to update', err);
      res.status(500).json({ message: "There is a problem updating data" });
  }
});

app.delete('/data/:id',async(req,res)=>{
  const {id} = req.params;
  try{
    const client = await pool.connect();
    const result = await client.query('DELETE FROM next WHERE id=$1',[id])
    console.log(result)
    res.status(200).json({message:"Deleted Successfully"})
  }catch(err){
    console.error("Occuring an error",err)
    res.status(404).json({message:"Internal server error"})
  }
})

app.get('/fetchdata', async (req, res) => {
  try {
    const response = await axios.get('https://server-for-quiver.onrender.com/todays_news_web');
    const data = response.data;
    res.json(data);
    console.log(data)
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);

});


// https://server-for-quiver.onrender.com/todays_news_web