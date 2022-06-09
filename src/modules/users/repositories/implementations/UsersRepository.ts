import { getRepository, Repository } from 'typeorm';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User> {
    const user = this.repository.findOneOrFail({
      where: { id: user_id },
      relations: ['games'],
    });
    return user;

  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    const users = this.repository.query('SELECT * FROM users ORDER BY first_name'); 
    return users;
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[] | undefined> {
    const user = this.repository.query('SELECT * FROM users WHERE LOWER(first_name) LIKE LOWER($1) AND LOWER(last_name) LIKE LOWER($2)', [first_name, last_name]);
    return user;
  }
}
