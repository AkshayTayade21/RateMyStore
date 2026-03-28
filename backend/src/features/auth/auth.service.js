import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import authRepository from "./auth.repository.js";


class AuthService{
      async registerUser(userData) {
    const { name, email, password, address } = userData;

    const existingUser = await authRepository.findUserByEmail(email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await authRepository.createUser({
      name,
      email,
      password: hashedPassword,
      address,
      role: "user",
    });

    return newUser;
  }
 

    async loginUser(userData) {
    const { email, password } = userData;

    const user = await authRepository.findUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }

    async updatePassword(userId, currentPassword, newPassword) {
    const user = await authRepository.findUserById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      throw new Error("Current password is wrong");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = await authRepository.updatePassword(userId, hashedPassword);

    return updatedUser;
  }
}

const authService = new AuthService();

export default authService;