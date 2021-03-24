import { api } from './AxiosService'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'

export default class BugsService {
  async getAllBugs() {
    try {
      const res = await api.get('api/bugs')
      console.log(res)
      AppState.bugs = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async createBug(newBug) {
    try {
      const res = await api.post('api/bugs', newBug)
      AppState.bugs.push(res.data)
      return res.data._id
    } catch (error) {
      logger.error(error)
    }
  }

  async getBugById(id) {
    try {
      const res = await api.get('api/bugs/' + id)
      logger.log(res)
      AppState.activeBug = res.data
    } catch (error) {
      logger.error(error)
    }
  }

  async getNotesById(id) {
    try {
      const res = await api.get('api/bugs/' + id + '/notes')
      AppState.notes = res.data
    } catch (err) {
      logger.error(err)
    }
  }

  async edit(editedBug) {
    try {
      await api.put('api/bugs/' + editedBug._id, editedBug)
    } catch (err) {
      logger.error(err)
    }
  }

  async deleteActiveBug(id) {
    try {
      const res = window.confirm('Do you want to close the bug? This cannot be changed.')
      if (!res) {
        return
      }
      await api.delete('api/bugs/' + id)
    } catch (error) {
      logger.error(error)
    }
  }

  async deleteBug(bug) {
    await api.delete('api/bugs/' + bug.id)
  }

  getBugDate(id) {
    const bug = AppState.bugs.find(b => b.id === id)
    if (bug) {
      const bugDate = bug.createdAt
      const updatedDate = new Date(bugDate)
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

export const bugsService = new BugsService()
