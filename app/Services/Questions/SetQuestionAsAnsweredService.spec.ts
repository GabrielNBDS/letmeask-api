import Database from '@ioc:Adonis/Lucid/Database'
import { RoomFactory } from 'Database/factories'
import test from 'japa'
import SetQuestionAsAnsweredService from './SetQuestionAsAnsweredService'

test.group('SetQuestionAsAnsweredService', (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test('Set question as answered', async (assert) => {
    const room = await RoomFactory.with('questions', 1).create()

    const answeredQuestion = await SetQuestionAsAnsweredService.execute(room.questions[0].id)

    assert.isTrue(answeredQuestion.isAnswered)
  })
})
