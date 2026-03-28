import adminService from "./admin.service.js";

export default class AdminController {
  async getDashboard(req, res) {
    try {
      const data = await adminService.getDashboard();

      res.status(200).json({
        message: "Dashboard data",
        data,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }

  async createUser(req,res){
    try {
      const { name, email, password, address, role } = req.body;

    const user = await adminService.createUser({
      name,
      email,
      password,
      address,
      role,
    });

    res.status(201).json({message: "User created successfully",user});
    } catch (err) {
      res.status(400).json({message: err.message,});
    }
  }

  async getUsers(req, res) {
  try {
    const filters = req.query;

    const users = await adminService.getUsers(filters);

    res.status(200).json({
      message: "Users fetched successfully",
      users,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

async getStores(req, res) {
  try {
    const filters = req.query;
    const stores = await adminService.getStores(filters);

    res.status(200).json({
      message: "Stores fetched successfully",
      stores,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

async getUserDetails(req, res) {
  try {
    const { id } = req.params;
    const user = await adminService.getUserDetails(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User details fetched successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
}

}