import Database from '@ioc:Adonis/Lucid/Database'
import { QuestionFactory, RoomFactory, UserFactory } from 'Database/factories'
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
    const user = await UserFactory.create()
    const room = await RoomFactory.create()
    const question = await QuestionFactory.create()

    await question.related('user').associate(user)
    await question.related('room').associate(room)

    const { data: questions } = await IndexQuestionsService.execute(room.slug)

    assert.hasAllKeys(questions[0], ['id', 'truncated', 'userId', 'user'])
  })

  test('Index answered questions', async (assert) => {
    const user = await UserFactory.create()
    const room = await RoomFactory.create()
    const question = await QuestionFactory.create()

    await question.related('user').associate(user)
    await question.related('room').associate(room)

    question.isAnswered = true
    await question.save()

    const { data } = await IndexQuestionsService.execute(room.slug, true)

    const [foundQuestion] = data

    assert.hasAllKeys(foundQuestion, ['id', 'truncated', 'user', 'userId'])
    assert.equal(foundQuestion.id, question.id)
    assert.equal(foundQuestion.user.id, user.id)
  })
})
