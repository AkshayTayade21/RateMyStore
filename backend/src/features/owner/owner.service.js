import OwnerRepository from "./owner.repository.js";

const ownerRepository = new OwnerRepository();

class OwnerService {
  async getDashboard(ownerId) {
    const averageRatings = await ownerRepository.getOwnerAverageRatings(ownerId);
    const ratedUsers = await ownerRepository.getRatedUsers(ownerId);

    return {
      averageRatings,
      ratedUsers,
    };
  }
}

export default new OwnerService();