import { Inject, Injectable } from '@nestjs/common';
import { USER_COMMAND_REPOSITORY, UserCommandRepository } from '../../domain/user.command.repository';
import { User } from '../../domain/user';
import { CreateUserRequestDto } from './dto/create.request.dto';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_COMMAND_REPOSITORY)
    private readonly userCommandRepository: UserCommandRepository,
  ) {}

  async execute(reqDto: CreateUserRequestDto): Promise<void> {
    const { userId, email, role } = reqDto;
    const now = new Date();
    const user = User.create({
      id: userId,
      createdAt: now,
      updatedAt: now,
      email: email,
      role: role,
    });

    await this.userCommandRepository.save(user);
  }
}
