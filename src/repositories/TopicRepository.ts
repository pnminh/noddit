import { Repository } from 'typeorm';

import { RepositoryConfig } from './../config/RepositoryConfig';
import { Topic } from './../db/entity/Topic';

export class TopicRepository {
  TopicRepository: Repository<Topic>;
  initialize = async () => {
    if (!this.TopicRepository) {
      const connection = await RepositoryConfig.setup();
      this.TopicRepository = connection.getRepository(Topic);
    }
  };
  getAll = async (): Promise<Topic[]> => {
    await this.initialize();
    return this.TopicRepository.find();
  };
  getById = async (id: number): Promise<Topic> => {
    await this.initialize();
    return this.TopicRepository.findOne(id);
  };
}
