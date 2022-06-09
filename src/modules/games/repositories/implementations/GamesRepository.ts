import { getRepository, Repository } from 'typeorm';

import { User } from '../../../users/entities/User';
import { Game } from '../../entities/Game';

import { IGamesRepository } from '../IGamesRepository';

export class GamesRepository implements IGamesRepository {
  private repository: Repository<Game>;

  constructor() {
    this.repository = getRepository(Game);
  }

  async findByTitleContaining(param: string): Promise<Game[]> {
    const game = this.repository
      .createQueryBuilder('games')
      .where('games.title ILIKE :param', { param: `%${param}%` })
      .getMany();
      return game;
  }

  async countAllGames(): Promise<[{ count: string }]> {
   const games = this.repository.query('SELECT COUNT(*) FROM games');
   return games
  }

  async findUsersByGameId(id: string): Promise<User[]> {
    const users = this.repository
      .createQueryBuilder('games')
      .relation(Game, 'users')
      .of(id)
      .loadMany();
      return users
  }
}
