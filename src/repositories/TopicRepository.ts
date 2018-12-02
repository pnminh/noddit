import { Repository, getConnection, Connection } from 'typeorm';

import { RepositoryConfig } from './../config/RepositoryConfig';
import { Topic } from './../db/entity/Topic';

export class TopicRepository {
  topicRepository: Repository<Topic>;

  initialize = async () => {
    if (!this.topicRepository) {
      let connection:Connection = await RepositoryConfig.setup();
      this.topicRepository = connection.getRepository(Topic);
    }
  };
  getAll = async (): Promise<Topic[]> => {
    await this.initialize();
    return this.topicRepository.find();
  };
  getById = async (id: number): Promise<Topic> => {
    await this.initialize();
    return this.topicRepository.findOne(id);
  };
  create = async (topic: Topic): Promise<Topic> => {
    await this.initialize();
    return this.topicRepository.save(topic);
  };
}
