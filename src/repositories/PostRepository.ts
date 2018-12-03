import { Connection, Repository } from 'typeorm';

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
  getByTopicId = async (topicId: number): Promise<Post[]> => {
    await this.initialize();
    return this.postRepository
      .createQueryBuilder('post')
      .where('post.topicId = :topicId', { topicId: topicId })
      .getMany();
  };
  getById = async (id: number): Promise<Post> => {
    await this.initialize();
    return this.postRepository.findOne(id);
  };
  getByTitle = async (title: string): Promise<Post> => {
    await this.initialize();
    return this.postRepository.findOne({ where: { title: title } });
  };
  save = async (post: Post): Promise<Post> => {
    await this.initialize();
    return this.postRepository.save(post);
  };
  create = async (post: Post): Promise<Post> => {
    if (post.id) {
      console.log(`postId is ${post.id}`);
      let topic = await this.getById(post.id);
      if (topic) {
        throw Error('Topic already exists');
      }
    }
    return this.save(post);
  };
  delete = async (id: number) => {
    await this.initialize();
    return this.postRepository.delete(id);
  };
  update = async (postToUpdate: Post) => {
    await this.initialize();
    let post = await this.postRepository.findOne(postToUpdate.id);
    post.title = postToUpdate.title;
    post.body = postToUpdate.body;
    if (postToUpdate.topic) {
      post.topic = postToUpdate.topic;
    }
    return this.postRepository.save(post);
  };
}
