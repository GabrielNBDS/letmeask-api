import Database from '@ioc:Adonis/Lucid/Database'
import Question from 'App/Models/Question'
import { RoomFactory } from 'Database/factories'
import test from 'japa'
import ShowQuestionService from './ShowQuestionService'

test.group('ShowQuestionService', (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test('Show question', async (assert) => {
    const room = await RoomFactory.with('questions', 1).create()

    const question = await ShowQuestionService.execute(room.questions[0].id)

    assert.instanceOf(question, Question)
    assert.equal(question.id, room.questions[0].id)
  })
})
