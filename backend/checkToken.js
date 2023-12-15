const User = require('./models/User');

const checkToken = async (req, res, next) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
  
    try {
      const user = await User.findOne({ token });
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid token' });
      }
  
      req.user = user;
      next();
    } catch (error) {
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  module.exports = checkToken;
  