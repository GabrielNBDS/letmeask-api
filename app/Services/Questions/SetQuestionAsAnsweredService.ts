import Question from 'App/Models/Question'

class SetQuestionAsAnsweredService {
  public static async execute(id: number) {
    const question = await Question.findOrFail(id)

    question.isAnswered = true

    await question.save()

    return question
  }
}

export default SetQuestionAsAnsweredService
