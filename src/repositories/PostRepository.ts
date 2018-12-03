import { getConnection, Repository, Connection } from 'typeorm';

import { RepositoryConfig } from '../config/RepositoryConfig';
import { Post } from '../db/entity/Post';

export class PostRepository {
  postRepository: Repository<Post>;
  initialize = async () => {
    if (!this.postRepository) {
      let connection: Connection = await RepositoryConfig.setup();
      this.postRepository = connection.getRepository(Post);
    }
  };
  getAll = async (): Promise<Post[]> => {
    await this.initialize();
    return this.postRepository.find();
  };
  getById = async (id: number): Promise<Post> => {
    await this.initialize();
    return this.postRepository.findOne(id);
  };
  save = async (post: Post): Promise<Post> => {
    await this.initialize();
    return this.postRepository.save(post);
  };
  create = async (post: Post): Promise<Post> => {
    if (post.id) {
      let topic = await this.getById(post.id);
      if (topic) {
        throw Error('Topic already exists');
      }
    }
    return this.save(post);
  };
}
