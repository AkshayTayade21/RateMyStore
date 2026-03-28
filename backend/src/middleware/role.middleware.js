const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    try {
      const user = req.user;

      
      if (!user || !allowedRoles.includes(user.role)) {
        console.log(user);
        return res.status(403).json({
          message: "Access denied",
        });
      }

      next();
    } catch (err) {
      return res.status(500).json({
        message: "Server error",
      });
    }
  };
};

export default roleMiddleware;