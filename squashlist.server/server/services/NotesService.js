import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class NotesService {
  async find(query = {}) {
    const notes = await dbContext.Notes.find(query).populate('creator', 'name picture email')
    return notes
  }

  async getById(id) {
    const note = await dbContext.Notes.findById(id).populate('creator', 'name picture email')
    if (!note) {
      throw new BadRequest('Invalid Id')
    }
    return note
  }

  async create(newNote) {
    return await dbContext.Notes.create(newNote)
  }

  async edit(noteId, editedNote) {
    return await dbContext.Notes.findByIdAndUpdate(noteId, editedNote, { new: true })
  }

  async delete(id) {
    const deleted = await dbContext.Notes.findByIdAndRemove(id, { new: true })
    if (!deleted) {
      throw new BadRequest('InvalidId')
    }
  }
}

export const notesService = new NotesService()
