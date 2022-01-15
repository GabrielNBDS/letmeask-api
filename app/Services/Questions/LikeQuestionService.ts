import Question from 'App/Models/Question'

class LikeQuestionService {
  public static async execute(question: Question) {
    question.likes += 1

    await question.save()

    return question
  }
}

export default LikeQuestionService
