import Room from 'App/Models/Room'
import User from 'App/Models/User'
import CustomError from 'App/Utils/CustomError'

class CreateQuestionService {
  public static async execute(room: Room, user: User, content: string) {
    if (!room.isOpen) {
      throw new CustomError('Room is closed')
    }

    const question = await room.related('questions').create({ content, likes: 0, userId: user.id })

    return question
  }
}

export default CreateQuestionService
