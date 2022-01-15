import Database from '@ioc:Adonis/Lucid/Database'
import { RoomFactory } from 'Database/factories'
import test from 'japa'
import CloseRoomService from './CloseRoomService'

test.group('CloseRoomService', (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test('Close room', async (assert) => {
    const room = await RoomFactory.create()

    const closedRoom = await CloseRoomService.execute(room)

    assert.isFalse(closedRoom.isOpen)
  })
})
