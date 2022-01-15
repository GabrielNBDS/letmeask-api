import Database from '@ioc:Adonis/Lucid/Database'
import Question from 'App/Models/Question'
import { UserFactory } from 'Database/factories'
import test from 'japa'
import CreateQuestionService from './CreateQuestionService'
import faker from 'faker'
import CustomError from 'App/Utils/CustomError'

test.group('CreateQuestionService', (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test('Create Question', async (assert) => {
    const user = await UserFactory.with('rooms', 1).create()

    const question = await CreateQuestionService.execute(
      user.rooms[0],
      user,
      faker.lorem.words(100)
    )

    assert.instanceOf(question, Question)
  })

  test('Truncate content', async (assert) => {
    const user = await UserFactory.with('rooms', 1).create()

    const question = await CreateQuestionService.execute(
      user.rooms[0],
      user,
      faker.lorem.words(100)
    )

    assert.equal(question.truncated.length, 180)
  })

  test('Initial likes value is equal to 0', async (assert) => {
    const user = await UserFactory.with('rooms', 1).create()

    const question = await CreateQuestionService.execute(
      user.rooms[0],
      user,
      faker.lorem.words(100)
    )

    assert.equal(question.likes, 0)
  })

  test("Can't add question to closed room", async (assert) => {
    assert.plan(2) // asserts that catch block is executed

    const user = await UserFactory.with('rooms', 1).create()

    user.rooms[0].isOpen = false
    await user.rooms[0].save()

    try {
      await CreateQuestionService.execute(user.rooms[0], user, faker.lorem.words(100))
    } catch (error) {
      assert.instanceOf(error, CustomError)
      assert.equal(error.message, 'Room is closed')
    }
  })
})
