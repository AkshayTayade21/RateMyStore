import authService from "./auth.service.js";

export default class AuthController{
   
    async register(req, res) {
    try {
      const { name, email, password, address } = req.body;

      const newUser = await authService.registerUser({
        name,
        email,
        password,
        address,
      });

      res.status(201).json({
        message: "User registered successfully",
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          address: newUser.address,
          role: newUser.role,
        },
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }


    async login(req, res) {
    try {
      const { email, password } = req.body;

      const result = await authService.loginUser({ email, password });

      res.status(200).json({
        message: "Login successful",
        ...result,
      });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  async updatePassword(req, res) {
  try {
    const userId = req.user.id;

    const { currentPassword, newPassword } = req.body;

    await authService.updatePassword(userId, currentPassword, newPassword);

    res.status(200).json({
      message: "Password updated successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      message: err.message,
    });
  }
}

  async logout(req, res) {
    return res.status(200).json({
      message: "Logout successful",
    });
  }

}