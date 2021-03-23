import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'

class NotesService {
  async getAll(bugId) {
    const notes = await dbContext.Note.find(bugId).populate('creator', 'name picture email')
    return notes
  }

  // async getAll(query = {}) {
  //   const notes = await dbContext.Notes.find(query).populate('creator', 'name picture email')
  //   return notes
  // }

  async getById(id) {
    const note = await dbContext.Note.findById(id).populate('creator', 'name picture email')
    if (!note) {
      throw new BadRequest('Invalid Id')
    }
    return note
  }

  async create(newNote) {
    return await dbContext.Note.create(newNote)
  }

  async edit(noteId, editedNote, userId) {
    const note = await this.getById(noteId)
    if (note.creatorId !== userId) {
      throw new BadRequest('Not your note, bruh')
    }
    return await dbContext.Note.findByIdAndUpdate(noteId, editedNote, { new: true })
  }

  async delete(id, creatorId) {
    const res = await dbContext.Note.findOneAndDelete({ _id: id, creatorId: creatorId })
    return res
  }
}

export const notesService = new NotesService()
