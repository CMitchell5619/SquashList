import mongoose from 'mongoose'
import BugSchema from '../models/Bug'
import AccountSchema from '../models/Account'

class DbContext {
  Bugs = mongoose.model('Bug', BugSchema);
  Account = mongoose.model('Account', AccountSchema);
}

export const dbContext = new DbContext()
