const errorHandler = (err, req, res, next) => {
  console.log(err);
  if (res.headersSent) {
    return next(err);
  }

  //getting error code from joi used for input validation
  if (err.isJoi) {
    return res.status(400).json({
      message:
        "the server cannot or will not process the request due to something that is perceived to be a client error",
    });
  }

  //getting status for syntax error or DB violations
  if (err.status === 400) {
    let errorString = JSON.stringify(err.message);
    if (errorString.includes("UniqueViolationError")) {
      return res.status(400).json(`email already in use`);
    } else if (errorString.includes("NoChange")) {
      return res
        .status(400)
        .json("Please make sure the Id for the task exists");
    } else {
      {
        return res.status(400).json(`There is an issue, The detail is logged`);
      }
    }
  }

  // user login error
  if (err.status === 401) {
    return res.status(401).json({
      message:
        "Unauthorized access, Please check email and password or please add authorization",
    });
  }

  //URL nor found error
  if (err.status === 404) {
    return res.status(404).json({ message: "This url is not found" });
  }

  //jwt authorization error
  if (err.status === 403) {
    return res.status(403).json({ message: "This access is forbidden" });
  }

  res.status(500).json({ message: "Internal Server Error" });
  res.status(422).json({ message: "Syntax error" });
};

module.exports = errorHandler;
