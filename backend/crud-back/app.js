const express = require ("express");
const dotenv = require ("dotenv");
const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "./data/tours-simple.json");

//load env

dotenv.config();
const port = process.env.PORT;

//create server
//expreso serveris i kuri viska junksime
const app = express();

//convers incoming json data to js object and puts it to req.bod (isparsina objektus)
//middleware

app.use(express.json());
//nuskaityti duomenis is api
const tours = JSON.parse(fs.readFileSync(dir));
// console.log(tours);

// endpointas ir metodas


app.get("/api/v1/tours", (req, res)=>{
    //reqestas kas ateina i serva ir response ka issiunciame atgal
    res.status(200).json({
        //gali buti fail arba error
        status: "success",
        data: tours,
        result: tours.length,
    });
res.send("Uzklausa gavome");
});

app.get("/api/v1/tours/:id", (req, res) => {

    const id = +req.params.id;
const tour = tours.find((tour)=>{
    return tour.id === id;
    
});
    if(!tour){
        return res.status(404).json({
            status: "fail",
            message: "Invalid ID",
        });
        
    }
    res.status(200).json({
        status: "success",
        data: tour,
    });
    });


    app.post("/api/v1/tours", (req, res) => {
        console.log(req.body);


const newID = tours[tours.length - 1].id + 1;
const newTour = {
id: newID,
...req.body,
};
tours.push(newTour);

fs.writeFile(dir, JSON.stringify(tours), (err) => {
    if (err) {
    return res.status(500).json({
    status: "fail",
    message: "Error writing file",
    });
}
res.status(201).json({
    status: "success",
    data: newTour,
});
});
});


//paleisti app node app
app.listen(port, ()=>{
    console.log(`App running on port ${port}`);
    
})




