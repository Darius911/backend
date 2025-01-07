const express = require ("express");
const dotenv = require ("dotenv");
const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "./data/data.json");

dotenv.config();
const port = process.env.PORT;

const app = express();

app.use(express.json());

const tours = JSON.parse(fs.readFileSync(dir));

app.get("/api/v1/alpha", (req, res)=>{
  //reqestas kas ateina i serva ir response ka issiunciame atgal
  res.status(200).json({
      //gali buti fail arba error
      status: "success",
      data: tours,
      
  });
res.send("Uzklausa gavome");
});

app.get("/api/v1/alpha/:id", (req, res) => {

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



  app.put("/api/v1/alpha/:id", (req, res) => {
    const id = +req.params.id;
    const updatedTour = req.body;
  
    const tourIndex = tours.findIndex((tour) => tour.id === id);
    if (tourIndex !== -1) {
      tours[tourIndex] = { ...tours[tourIndex], ...updatedTour };
  
      fs.writeFileSync(dir, JSON.stringify(tours, null, 2));
  
      res.status(200).json({
        status: "success",
        data: tours[tourIndex],
      });
    } else {
      res.status(404).json({
        status: "fail",
        message: "Tour not found",
      });
    }
  });

  app.post("/api/v1/alpha", (req, res) => {
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

app.delete("/api/v1/alpha/:id", (req, res) => {
  const id = +req.params.id;

  const tourIndex = tours.findIndex((tour) => tour.id === id);
  if (tourIndex !== -1) {
    const deletedTour = tours.splice(tourIndex, 1);

    fs.writeFileSync(dir, JSON.stringify(tours, null, 2));

    res.status(204).json({
      status: "success",
      data: null,
    });
  } else {
    res.status(404).json({
      status: "fail",
      message: "Tour not found",
    });
  }
});
  



app.listen(port, ()=>{
  console.log(`App running on port ${port}`);
  
})