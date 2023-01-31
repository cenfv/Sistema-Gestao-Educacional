exports.checkAdminPrivilege = async (req, res, next) => {
  try {
    if (req.auth?.role === 1){
      next();
    }
    else {
      return res.status(401).json({
        msg: "Unauthorized",
      });
    }
  } catch (err) {
    console.log(err);
  }
};
