import Question from 'App/Models/Question'

class AddAnswerToQuestionService {
  public static async execute(id: number, answer: string) {
    const question = await Question.findOrFail(id)

    question.isAnswered = true
    question.answer = answer

    await question.save()

    return question
  }
}

export default AddAnswerToQuestionService
