import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { bugsService } from '../services/BugsService'
import { notesService } from '../services/NotesService'

export class BugsController extends BaseController {
  constructor() {
    super('api/bugs')
    this.router
    // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .get('/:bugId/notes', this.getNotesByBugId)
      .get('', this.getAll)
      .get('/:id', this.getById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .delete('/:id', this.delete)
      .post('', this.create)
      .put('/:id', this.edit)
  }

  async create(req, res, next) {
    try {
      // NOTE NEVER TRUST THE CLIENT TO ADD THE CREATOR ID
      req.body.creatorId = req.userInfo.id
      res.send(await bugsService.create(req.body))
    } catch (error) {
      next(error)
    }
  }

  async getAll(req, res, next) {
    try {
      // req.query.user = req.params.user
      res.send(await bugsService.getAll())
    } catch (error) {
      next(error)
    }
  }

  async getById(req, res, next) {
    try {
      res.send(await bugsService.getById(req.params.id))
    } catch (error) {
      next(error)
    }
  }

  async getNotesByBugId(req, res, next) {
    try {
      const notes = await notesService.getAll({ bug: req.params.bugId })
      res.send(notes)
    } catch (err) {
      next(err)
    }
  }

  async delete(req, res, next) {
    try {
      res.send(await bugsService.delete(req.params.id))
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      delete req.body.closed
      const editedBug = await bugsService.edit(req.params.id, req.body, req.userInfo.id)
      res.send(editedBug)
    } catch (err) {
      next(err)
    }
  }
}
