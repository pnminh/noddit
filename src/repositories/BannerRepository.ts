import { Repository } from 'typeorm';

import { RepositoryConfig } from './../config/RepositoryConfig';
import { Banner } from './../db/entity/Banner';

export class BannerRepository {
  bannerRepository: Repository<Banner>;
  async initialize() {
    if (!this.bannerRepository) {
      const connection = await RepositoryConfig.setup();
      this.bannerRepository = connection.getRepository(Banner);
    }
  }
  async getAll(): Promise<Banner[]> {
    await this.initialize();
    return this.bannerRepository.find();
  }
  async getById(id: number): Promise<Banner> {
    await this.initialize();
    return this.bannerRepository.findOne(id);
  }
}
