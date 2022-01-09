import Database from '@ioc:Adonis/Lucid/Database'
import { RoomFactory } from 'Database/factories'
import test from 'japa'
import AddAnswerToQuestionService from './AddAnswerToQuestionService'

test.group('AddAnswerToQuestionService', (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test('Add answer to question', async (assert) => {
    const answer = 'any answer'

    const room = await RoomFactory.with('questions', 1).create()
    const [question] = room.questions

    const answeredQuestion = await AddAnswerToQuestionService.execute(question.id, answer)

    assert.equal(answeredQuestion.answer, answer)
    assert.isTrue(answeredQuestion.isAnswered)
  })
})
