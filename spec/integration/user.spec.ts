import { User } from './../../src/db/entity/User';
import { UserRepository } from './../../src/repositories/UserRepository';
import StartServer from '../../src/StartServer';
import {} from 'jasmine';
import * as request from 'request';
import { getConnection } from 'typeorm';
const base = `http://localhost:${process.env.PORT || 3000}/users`;
const startServer = StartServer;
const env = process.env.NODE_ENV || 'development';
describe('routes : users', () => {
  let userRepository: UserRepository = new UserRepository();
  beforeEach(done => {
    done();
  });
  afterAll(async () => {
    await getConnection(env)
      .getRepository(User)
      .createQueryBuilder()
      .delete()
      .from(User)
      .where('id is not null')
      .execute();
  });
  describe('GET /users/sign_up', () => {
    it('should render a view with a sign up form', done => {
      request.get(`${base}/sign_up`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain('Sign up');
        done();
      });
    });
  });
  describe('POST /users', () => {
    // #1
    it('should create a new user with valid values and redirect', async done => {
      const options = {
        url: base,
        form: {
          email: 'user@example.com',
          password: '1234567890'
        }
      };

      request.post(options, async (err, res, body) => {
        // #2
        let testedUser = await userRepository.getByEmail('user@example.com');
        console.log(testedUser);
        expect(testedUser).not.toBeNull();
        expect(testedUser.email).toBe('user@example.com');
        expect(testedUser.id).toBeTruthy();
        done();
      });
    });

    // #3
    it('should not create a new user with invalid attributes and redirect', async done => {
      request.post(
        {
          url: base,
          form: {
            email: 'no',
            password: '123456789'
          }
        },
        async (err, res, body) => {
          let testedUser = await userRepository.getByEmail('no');
          expect(testedUser).toBeFalsy();
          done();
        }
      );
    });
  });
  describe('GET /users/sign_in', () => {
    it('should render a view with a sign in form', done => {
      request.get(`${base}/sign_in`, (err, res, body) => {
        expect(err).toBeNull();
        expect(body).toContain('Sign in');
        done();
      });
    });
  });
});
