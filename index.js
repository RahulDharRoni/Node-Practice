const fs = require("fs");
const express = require("express");
var morgan = require("morgan");
const app = express();


//middleware 
app.use(morgan("dev"));
app.use(express.json());


app.use((req, res, next) => {
  console.log("Hello from the middleware");
  next();
});

app.use((req, res, next) => {
  req.requestTime= new Date().toISOString()
  next();
});

const tours = JSON.parse(fs.readFileSync(`${__dirname}/data/tours.json`));

const getAllData = (req, res) => {
  res.status(200).json({
    status: "successful",
    result: tours.length,
    data: {
      tours,
    },
  });
};

const getSpecificDate = (req, res) => {
  const _id = req.params.id * 1; //need to convert the id string to number
  const findId = tours.find((tour) => tour.id === _id);

  if (!findId) {
    return res.status(404).json({
      status: "successful",
      message: "NOt Found!",
    });
  }
  res.status(200).json({
    status: "successful",
    data: {
      findId,
    },
  });
};

const postData = (req, res) => {
  const newID = tours[tours.length - 1].id + 1;
  // Give a ID number
  const assignNewId = Object.assign({ id: newID }, req.body);
  // assign the ID key valu with post data
  tours.push(assignNewId);
  //push the data to the in the file directory with json.parse
  fs.writeFile(`${__dirname}/data/tours.json`, JSON.stringify(tours), (err) => {
    //if error then show error, status and message
    if (err) {
      console.error(err);
      return res.status(500).json({
        status: "error",
        message: "An error occurred while saving the data.",
      });
    }
    res.status(201).json({
      status: "success",
      data: {
        tour: assignNewId,
      },
    });
  });
};

const updateData = (req, res) => {
  const _id = req.params.id * 1;

  if (_id > tours.length) {
    return res.status(404).json({
      status: "Not Successful!!",
      message: "NOt Found!",
    });
  }
  res.status(200).json({
    status: "successful",
    data: {
      tour: "patch request successfully done !",
    },
  });
};

const deleteData = (req, res) => {
  const _id = req.params.id * 1;

  if (_id > tours.length) {
    return res.status(404).json({
      status: "Delete Not Successful!!",
      message: "Delete Not Successful!",
    });
  }
  res.status(200).json({
    status: "successful",
    data: {
      tour: "Delete Operation Successful!!",
    },
  });
};

// app.get("/api/tours", getAllData);
// app.get("/api/tours/:id", getSpecificDate);
// app.post("/api/tours", postData);
// app.patch("/api/tour/:id", updateData);
// app.delete("/api/tour/:id", deleteData);

app.route("/api/tours").get(getAllData).post(postData);
app
  .route("/api/tours/:id")
  .get(getSpecificDate)
  .patch(updateData)
  .delete(deleteData);

const port = 5000;
app.listen(port, () => {
  console.log("Listen successfully");
});
