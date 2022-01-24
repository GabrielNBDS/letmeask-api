import Question from 'App/Models/Question'
import Room from 'App/Models/Room'

class IndexQuestionsService {
  public static async execute(slug: string, loadAnswered: boolean = false, page: number = 1) {
    const room = await Room.findByOrFail('slug', slug)

    const questionsQuery = Question.query()

    questionsQuery.where('room_id', '=', room.id)
    questionsQuery.select('id', 'truncated', 'user_id')
    questionsQuery.preload('user')

    if (loadAnswered) {
      questionsQuery.where('is_answered', true)
    } else {
      questionsQuery.where('is_answered', false)
    }

    const questions = await questionsQuery.paginate(page, 10)

    return questions.serialize()
  }
}

export default IndexQuestionsService
