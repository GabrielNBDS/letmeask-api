import Database from '@ioc:Adonis/Lucid/Database'
import Room from 'App/Models/Room'
import { UserFactory } from 'Database/factories'
import test from 'japa'
import CreateRoomService from './CreateRoomService'

test.group('CreateRoomService', (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test('Create Room', async (assert) => {
    const user = await UserFactory.create()
    const name = 'any room name'

    const room = await CreateRoomService.execute(name, user)

    assert.instanceOf(room, Room)
    assert.equal(room.ownerId, user.id)
  })

  test('Rooms with same name have different slug', async (assert) => {
    const user = await UserFactory.create()
    const name = 'any room name'

    const firstRoom = await CreateRoomService.execute(name, user)
    const secondRoom = await CreateRoomService.execute(name, user)

    assert.equal(firstRoom.name, secondRoom.name)
    assert.notEqual(firstRoom.slug, secondRoom.slug)
  })
})
