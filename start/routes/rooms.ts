import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/:slug', 'RoomsController.show')
  Route.post('/', 'RoomsController.store')
  Route.post('/:id', 'RoomsController.close')
}).prefix('/rooms')
