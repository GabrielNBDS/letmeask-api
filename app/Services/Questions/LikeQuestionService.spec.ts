import Database from '@ioc:Adonis/Lucid/Database'
import { RoomFactory } from 'Database/factories'
import test from 'japa'
import LikeQuestionService from './LikeQuestionService'

test.group('LikeQuestionService', (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test('If can like a question', async (assert) => {
    const room = await RoomFactory.with('questions', 1).create()

    const [question] = room.questions

    const likedQuestion = await LikeQuestionService.execute(question.id)

    assert.equal(likedQuestion.id, 1)
  })
})
