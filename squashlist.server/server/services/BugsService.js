import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class BugsService {
  async getAll() {
    const bugs = await dbContext.Bug.find().populate('creator', 'name picture email')
    return bugs
  }

  // async getAll(query = {}) {
  //   const bugs = await dbContext.Bugs.find(query).populate('creator', 'name picture email')
  //   return bugs
  // }

  async getById(id) {
    const bug = await dbContext.Bug.findById(id).populate('creator', 'name picture email')
    if (!bug) {
      throw new BadRequest('Invalid Id')
    }
    return bug
  }

  async create(newBug) {
    return await dbContext.Bug.create(newBug)
  }

  async edit(bugId, editedBug, userId) {
    const bug = await this.getById(bugId)
    if (bug.closed) {
      throw new BadRequest('Bug is already closed')
    }
    if (bug.creatorId !== userId) {
      throw new BadRequest('Not your bug, bruh')
    }
    return await dbContext.Bug.findByIdAndUpdate({ _id: bugId, closed: false }, editedBug, { new: true })
  }

  async delete(id) {
    const deleted = await dbContext.Bug.findByIdAndUpdate({ _id: id }, { closed: true }, { new: true })
    if (!deleted) {
      throw new BadRequest('InvalidId')
    }
  }
}

export const bugsService = new BugsService()
