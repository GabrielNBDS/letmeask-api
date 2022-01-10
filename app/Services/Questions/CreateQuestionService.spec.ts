import Database from '@ioc:Adonis/Lucid/Database'
import Question from 'App/Models/Question'
import { RoomFactory } from 'Database/factories'
import test from 'japa'
import CreateQuestionService from './CreateQuestionService'
import faker from 'faker'

test.group('CreateQuestionService', (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test('Create Question', async (assert) => {
    const room = await RoomFactory.create()

    const question = await CreateQuestionService.execute(room.slug, faker.lorem.words(100))

    assert.instanceOf(question, Question)
  })

  test('Truncate content', async (assert) => {
    const room = await RoomFactory.create()

    const question = await CreateQuestionService.execute(room.slug, faker.lorem.words(100))

    assert.equal(question.truncated.length, 180)
  })

  test('Initial likes value is equal to 0', async (assert) => {
    const room = await RoomFactory.create()

    const question = await CreateQuestionService.execute(room.slug, faker.lorem.words(100))

    assert.equal(question.likes, 0)
  })
})
