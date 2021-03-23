import { api } from './AxiosService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'

class NotesService {
  async getByBugId(bugId) {
    try {
      const res = await api.get('api/bugs/' + bugId + '/notes')
      AppState.notes[bugId] = res.data
    } catch (err) {
      logger.error(err)
    }
  }

  async createNote(newNote) {
    try {
      const res = await api.post('api/notes', newNote)
      console.log(res.data)
      AppState.notes[newNote.bug].push(res.data)
      return res.data._id
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

  async deleteNotes(note) {
    try {
      await api.delete('api/notes/' + note._id)
      this.getAllNotesById(note.bug)
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
