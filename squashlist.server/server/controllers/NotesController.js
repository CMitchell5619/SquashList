import { Auth0Provider } from '@bcwdev/auth0provider'
import BaseController from '../utils/BaseController'
import { notesService } from '../services/NotesService'
import { logger } from '../utils/Logger'

export class NotesController extends BaseController {
  constructor() {
    super('api/notes')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getAll)
      .get('/:id', this.getById)
      .put('/:id', this.edit)
      .post('', this.create)
      .delete('/:id', this.delete)
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      res.send(await notesService.create(req.body))
    } catch (error) {
      next(error)
    }
  }

  async getAll(req, res, next) {
    try {
      const notes = await notesService.getAll()
      res.send(notes)
    } catch (err) {
      next(err)
    }
  }

  async getById(req, res, next) {
    try {
      res.send(await notesService.getById(req.params.id))
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      const note = await notesService.edit(req.params.id, req.body)
      res.send(note)
    } catch (err) {
      next(err)
    }
  }

  async delete(req, res, next) {
    try {
      const note = await notesService.delete(req.params.id, req.userInfo.id)
      res.send(note)
    } catch (err) {
      next(err)
    }
  }
}
