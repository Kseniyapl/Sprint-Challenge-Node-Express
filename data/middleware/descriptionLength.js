//Custom Middleware

module.exports = (req, res, next) => {
  const action = req.body;
  const { description } = action;

   if (description.length <= 128) {
    req.body.description = description;
    next();
  } else {
    res.status(400).json({ message: "Up to 128 characters long, required!" });
  }
};