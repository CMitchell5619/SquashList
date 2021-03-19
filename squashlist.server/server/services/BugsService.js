import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BugsService {
  async find(query = {}) {
    const bugs = await dbContext.Bugs.find(query).populate('creator', 'name picture email')
    return bugs
  }

  async getById(id) {
    const bug = await dbContext.Bugs.findById(id).populate('creator', 'name picture email')
    if (!bug) {
      throw new BadRequest('Invalid Id')
    }
    return bug
  }

  async create(newBug) {
    return await dbContext.Bugs.create(newBug)
  }

  async edit(bugId, editedBug) {
    return await dbContext.Bugs.findByIdAndUpdate(bugId, editedBug, { new: true })
  }

  async delete(id) {
    const deleted = await dbContext.Bugs.findByIdAndUpdate(id, { closed: true }, { new: true })
    if (!deleted) {
      throw new BadRequest('InvalidId')
    }
  }
}

export const bugsService = new BugsService()
