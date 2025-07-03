import Email from '@/domain/shared/email';
import { InMemoryUserRepository } from '../../../../test/repositories/in-memory-user-repository';
import { TokenSimulator } from '../../../../test/services/token';
import User from '../entities/user';
import { AuthUserUseCase } from './auth-user';
import { HashSimulator } from '../../../../test/services/hash-simulator';

let userRespository: InMemoryUserRepository;
let tokenRepository: TokenSimulator;
let hashRepository: HashSimulator;
let useCase: AuthUserUseCase;

describe('Auth User', () => {
  beforeEach(() => {
    userRespository = new InMemoryUserRepository();
    tokenRepository = new TokenSimulator();
    hashRepository = new HashSimulator();
    useCase = new AuthUserUseCase(
      userRespository,
      tokenRepository,
      hashRepository,
    );
  });

  test('Should authenticate an user', async () => {
    const hashedPassword = await hashRepository.hash('123456');

    const user = User.create({
      email: Email.create('gabriel@email.com'),
      name: 'Gabriel Teodoro',
      password: hashedPassword,
    });

    userRespository.items.push(user);

    const response = await useCase.handle({
      email: 'gabriel@email.com',
      password: '123456',
    });
    console.log(response);
    expect(response.isRight()).toBe(true);
    expect(response.value).toEqual({
      token: expect.any(String),
      user: expect.any(User),
    });
  });
});
