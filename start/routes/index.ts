import Route from '@ioc:Adonis/Core/Route'

import './rooms'

Route.get('/', async () => {
  return { hello: 'world' }
})
