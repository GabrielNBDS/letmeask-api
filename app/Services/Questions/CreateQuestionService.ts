import Room from 'App/Models/Room'

class CreateQuestionService {
  public static async execute(slug: string, content: string) {
    const room = await Room.findByOrFail('slug', slug)

    const question = await room.related('questions').create({ content, likes: 0 })

    return question
  }
}

export default CreateQuestionService
