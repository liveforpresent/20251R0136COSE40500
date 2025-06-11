import { CommandHandler } from '@nestjs/cqrs';
import { DeleteUserCommand } from './delete.command';

@CommandHandler(DeleteUserCommand)
export class DeleteUserHandler {}
