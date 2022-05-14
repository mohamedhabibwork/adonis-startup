import User from 'App/Models/User'
import Factory from '@ioc:Adonis/Lucid/Factory'

export const UserFactory = Factory.define(User, ({ faker }) => ({
  avatarUrl: faker.internet.avatar(),
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(8),
})).build()
