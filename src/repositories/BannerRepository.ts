import { getConnection, Repository, Connection } from 'typeorm';

import { RepositoryConfig } from './../config/RepositoryConfig';
import { Banner } from './../db/entity/Banner';

export class BannerRepository {
  BannerRepository: Repository<Banner>;
  initialize = async () => {
    if (!this.BannerRepository) {
        let connection:Connection = await RepositoryConfig.setup();
      this.BannerRepository = connection.getRepository(Banner);
    }
  };
  getAll = async (): Promise<Banner[]> => {
    await this.initialize();
    return this.BannerRepository.find();
  };
  getById = async (id: number): Promise<Banner> => {
    await this.initialize();
    return this.BannerRepository.findOne(id);
  };
}
