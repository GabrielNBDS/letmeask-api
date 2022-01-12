import Room from 'App/Models/Room'
import CustomError from 'App/Utils/CustomError'

class CreateQuestionService {
  public static async execute(slug: string, content: string) {
    const room = await Room.findByOrFail('slug', slug)

    if (!room.isOpen) {
      throw new CustomError('Room is closed')
    }

    const question = await room.related('questions').create({ content, likes: 0 })

    return question
  }
}

export default CreateQuestionService
