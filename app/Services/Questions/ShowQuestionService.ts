import Question from 'App/Models/Question'

class ShowQuestionService {
  public static async execute(id: number) {
    const question = await Question.findOrFail(id)

    return question
  }
}

export default ShowQuestionService
