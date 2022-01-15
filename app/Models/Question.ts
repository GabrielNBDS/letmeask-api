import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { string } from '@poppinss/utils/build/helpers'
import Room from './Room'

export default class Question extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public content: string

  @column()
  public truncated: string

  @column()
  public answer: string

  @column()
  public isAnswered: boolean

  @column()
  public likes: number

  @column()
  public roomId: number

  @belongsTo(() => Room)
  public room: BelongsTo<typeof Room>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static truncateContent(question: Question) {
    question.truncated = string.truncate(question.content, 177)
  }
}
