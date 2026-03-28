import bcrypt from "bcrypt";
import AdminRepository from "./admin.repository.js";

const adminRepository = new AdminRepository();

class AdminService {
  async getDashboard() {
    return await adminRepository.getCounts();
  }

async createUser(userData) {
  const hashedPassword = await bcrypt.hash(userData.password, 10);
  console.log(userData);
   console.log(hashedPassword);
   
  return await adminRepository.createUser({
    ...userData,
    password: hashedPassword,
  });
}

async getUsers(filters) {
  return await adminRepository.getAllUsers(filters);
}

async getStores(filters) {
  return await adminRepository.getAllStores(filters);
}

async getUserDetails(id) {
  return await adminRepository.getUserDetails(id);
}

}

export default new AdminService();