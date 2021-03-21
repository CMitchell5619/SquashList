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
      AppState.bugs[newBug].push(res.data)
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

  async deleteActiveBug(id) {
    try {
      await api.delete('api/bugs/' + id)
    } catch (error) {
      logger.error(error)
    }
  }

  async deleteBug(bug) {
    await api.delete('api/bugs/' + bug.id)
  }
}

export const bugsService = new BugsService()
