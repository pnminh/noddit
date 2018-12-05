import { getConnection } from 'typeorm';

import { User } from './../../src/db/entity/User';
import { UserRepository } from './../../src/repositories/UserRepository';

const env = process.env.NODE_ENV || 'development';
describe('User', () => {
  let user: User;
  let userRepository: UserRepository = new UserRepository();
  beforeEach(async done => {done()});
  afterEach(async () => {
    await getConnection(env)
      .getRepository(User)
      .createQueryBuilder()
      .delete()
      .from(User)
      .where('id is not null')
      .execute();
  });
  describe('#create()', () => {
    // #2
    it('should create a User object with a valid email and password', async done => {
      try {
        let testedUser = await userRepository.create(
          new User('user@example.com', '1234567890')
        );
        expect(testedUser.email).toBe('user@example.com');
        expect(testedUser.id).toBeTruthy();
        done();
      } catch (err) {
        console.log(err);
        done();
      }
    });

    // #3
    it('should not create a user with invalid email or password', async done => {
      let testedErr;
      try {
        await userRepository.create(
          new User(`It's-a me, Mario!`, '1234567890')
        );
      } catch (err) {
        console.log(err);
        testedErr = err;
      }
      expect(testedErr.message).toContain('must be correctly formatted');
      done();
    });

    it('should not create a user with an email already taken', async done => {
      let testedErr;
      await userRepository.create(new User('user@example.com', '1234567890'));
      try {
        await userRepository.create(new User('user@example.com', '1234567890'));
      } catch (err) {
        console.log(err);
        testedErr = err;
      }
      expect(testedErr).toBeTruthy();
      done();
    });
  });
});
