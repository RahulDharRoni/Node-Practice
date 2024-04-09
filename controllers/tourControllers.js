const fs = require("fs");

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../data/tours.json`));

//1.1 TOURS HANDLER
exports.getAllTourData = (req, res) => {
  res.status(200).json({
    status: "successful",
    result: tours.length,
    data: {
      tours,
    },
  });
};

exports.getSpecificTourDate = (req, res) => {
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

exports.postTourData = (req, res) => {
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

exports.updateTourData = (req, res) => {
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

exports.deleteTourData = (req, res) => {
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
