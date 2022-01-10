import Room from 'App/Models/Room'
import Factory from '@ioc:Adonis/Lucid/Factory'
import Question from 'App/Models/Question'

export const QuestionFactory = Factory.define(Question, ({ faker }) => {
  return {
    content: faker.lorem.words(100),
    likes: 0,
  }
}).build()

export const RoomFactory = Factory.define(Room, ({ faker }) => {
  return {
    name: faker.name.title(),
    isOpen: true,
  }
})
  .relation('questions', () => QuestionFactory)
  .build()
