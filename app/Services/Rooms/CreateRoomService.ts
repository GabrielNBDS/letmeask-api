import User from 'App/Models/User'

class CreateRoomService {
  public static async execute(name: string, user: User) {
    const room = await user.related('rooms').create({ name, isOpen: true })

    return room
  }
}

export default CreateRoomService
