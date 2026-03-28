import ownerService from "./owner.service.js";

export default class OwnerController {
  async getDashboard(req, res) {
    try {
      const ownerId = req.user.id;
      const data = await ownerService.getDashboard(ownerId);

      res.status(200).json({
        message: "Owner dashboard data fetched successfully",
        data,
      });
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  }
}