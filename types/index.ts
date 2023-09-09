import { Message, User } from '@prisma/client';

export type TUserWithChat = User & {
  conversations: TConverstation[]
}

export type TConverstation = {
  id: string
  messages: Message[];
  users: User[]
}