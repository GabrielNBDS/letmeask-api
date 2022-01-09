import Database from '@ioc:Adonis/Lucid/Database'
import { RoomFactory } from 'Database/factories'
import test from 'japa'
import ShowRoomService from './ShowRoomService'

test.group('ShowRoomService', (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test('Show Room', async (assert) => {
    const room = await RoomFactory.create()

    const roomToBeShow = await ShowRoomService.execute(room.slug)

    assert.equal(room.id, roomToBeShow.id)
  })
})
