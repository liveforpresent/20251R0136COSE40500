import { CommandHandler } from '@nestjs/cqrs';
import { CreateUserCommand } from './create.command';

@CommandHandler(CreateUserCommand)
export class CreateUserHandler {}
