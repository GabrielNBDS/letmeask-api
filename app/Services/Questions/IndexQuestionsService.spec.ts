import Database from '@ioc:Adonis/Lucid/Database'
import { RoomFactory } from 'Database/factories'
import test from 'japa'
import IndexQuestionsService from './IndexQuestionsService'

test.group('IndexQuestionsService', (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test('Index questions', async (assert) => {
    const room = await RoomFactory.with('questions', 5).create()

    const { data: questions } = await IndexQuestionsService.execute(room.slug)

    assert.hasAllKeys(questions[0], ['id', 'truncated'])
  })

  test('Index answered questions', async (assert) => {
    const room = await RoomFactory.with('questions', 5).create()

    room.questions[0].isAnswered = true
    await room.questions[0].save()

    const { data } = await IndexQuestionsService.execute(room.slug, true)

    const [question] = data

    assert.hasAllKeys(question, ['id', 'truncated'])
    assert.equal(question.id, room.questions[0].id)
  })
})
