import { CustomValidationError } from './../utils/ValidationUtils';
import { Connection, Repository } from 'typeorm';

import { RepositoryConfig } from '../config/RepositoryConfig';
import { User } from '../db/entity/User';
import * as bcrypt from 'bcryptjs';
export class UserRepository {
  userRepository: Repository<User>;
  initialize = async () => {
    if (!this.userRepository) {
      let connection: Connection = await RepositoryConfig.setup();
      this.userRepository = connection.getRepository(User);
    }
  };
  getAll = async (): Promise<User[]> => {
    await this.initialize();
    return this.userRepository.find();
  };
  getById = async (id: number): Promise<User> => {
    await this.initialize();
    return this.userRepository.findOne(id);
  };
  getByEmail = async (email: string): Promise<User> => {
    await this.initialize();
    return this.userRepository.findOne({ where: { email: email } });
  };
  create = async (user: User): Promise<User> => {
    await this.initialize();
    let validationErrors: CustomValidationError[] = user.validate();
    if (validationErrors && validationErrors.length > 0) {
      throw new Error(`Validation failed:${validationErrors[0].msg}`);
    }
    let testedUser = await this.getByEmail(user.email);
    if (testedUser) {
      throw new Error('email already exists');
    }
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(user.password, salt);
    return this.userRepository.save(user);
  };
  delete = async (id: number) => {
    await this.initialize();
    return this.userRepository.delete(id);
  };
  update = async (userToUpdate: User) => {
    await this.initialize();
    this.userRepository
      .createQueryBuilder()
      .update(User)
      .set({ title: userToUpdate.email, description: userToUpdate.password })
      .where('id = :id', { id: userToUpdate.id })
      .execute();
  };
}
