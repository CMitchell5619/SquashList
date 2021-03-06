import { api } from './AxiosService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { bugsService } from './BugsService'
import { Note } from '../Models/Note'

class NotesService {
  async getByBugId(bugId) {
    try {
      const res = await api.get('api/bugs/' + bugId + '/notes')
      AppState.notes = res.data.map(n => new Note(n))
      bugsService.getNotesById(bugId)
    } catch (err) {
      logger.error(err)
    }
  }

  async createNote(newNote, bugId) {
    try {
      newNote.bug = bugId
      await api.post('api/notes', newNote)
      this.getByBugId(bugId)
    } catch (error) {
      logger.error(error)
    }
  }

  async edit(note) {
    try {
      await api.put('api/notes/' + note.id, note)
    } catch (err) {
      logger.error(err)
    }
  }

  async deleteNote(note, bugId) {
    try {
      await api.delete('api/notes/' + note._id)
      this.getByBugId(bugId)
    } catch (error) {

    }
  }

  getDate(id) {
    const bug = AppState.bugs.find(b => b.id === id)
    if (bug) {
      const date = bug.createdAt
      const updatedDate = new Date(date)
      const year = updatedDate.getFullYear()
      const month = (this.fixLowNumber(updatedDate.getMonth() + 1))
      const day = this.fixLowNumber(updatedDate.getDate())
      const hour = this.fixLowNumber(updatedDate.getHours())
      const minute = this.fixLowNumber(updatedDate.getMinutes())
      const newDate = `${month}-${day}-${year} ${hour}:${minute}`
      return newDate
    }

    return 0
  }

  fixLowNumber(n) {
    return (n < 10 ? '0' : '') + n
  }
}
export const notesService = new NotesService()
