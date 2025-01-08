const express = require ("express");
const dotenv = require ("dotenv");
const app = express();




app.get("/api/v1/add/:num1/:num2", (req, res) =>{
    const num1 = parseInt(req.params.num1);
    const num2 = parseInt(req.params.num2);
    const addition = (num1 + num2);
    res.send(`${addition}`)
});

app.get("/api/v1/sub/:num1/:num2", (req, res) =>{
    const num1 = parseInt(req.params.num1);
    const num2 = parseInt(req.params.num2);
    const subtraction = (num1 - num2);
    res.send(`${subtraction}`)
});

app.get("/api/v1/sub/:num1/:num2", (req, res) =>{
    const num1 = parseInt(req.params.num1);
    const num2 = parseInt(req.params.num2);
    const subtraction = (num1 - num2);
    res.send(`${subtraction}`)
});

app.get("/api/v1/mult/:num1/:num2", (req, res) =>{
    const num1 = parseInt(req.params.num1);
    const num2 = parseInt(req.params.num2);
    const  multiplication = (num1 * num2);
    res.send(`${ multiplication}`)
});

app.get("/api/v1/div/:num1/:num2", (req, res) =>{
    const num1 = parseInt(req.params.num1);
    const num2 = parseInt(req.params.num2);
    const division = (num1 / num2);
    res.send(`${division}`)
});



dotenv.config();
const port = process.env.PORT;
app.listen(port, ()=>{
    console.log(`App running on port ${port}`);
    
});