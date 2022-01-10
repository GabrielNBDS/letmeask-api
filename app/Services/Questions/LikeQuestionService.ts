import Question from 'App/Models/Question'

class LikeQuestionService {
  public static async execute(id: number) {
    const question = await Question.findOrFail(id)

    question.likes += 1

    await question.save()

    return question
  }
}

export default LikeQuestionService
