import Room from 'App/Models/Room'
import Factory from '@ioc:Adonis/Lucid/Factory'

export const RoomFactory = Factory.define(Room, ({ faker }) => {
  return {
    name: faker.name.title(),
    isOpen: true,
  }
}).build()
