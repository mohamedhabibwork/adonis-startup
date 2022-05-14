import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { UserFactory } from 'Database/factories'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await UserFactory.merge({
      email: 'admin@app.com',
      password: '123456789',
      username: 'admin',
    }).create()

    await UserFactory.merge({
      email: 'user@app.com',
      password: '123456789',
      username: 'user',
    }).create()
  }
}
