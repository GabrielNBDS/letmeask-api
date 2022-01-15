import Question from 'App/Models/Question'

class SetQuestionAsAnsweredService {
  public static async execute(question: Question) {
    question.isAnswered = true

    await question.save()

    return question
  }
}

export default SetQuestionAsAnsweredService
