import mongoose from 'mongoose'
import BugsSchema from '../models/Bug'
import NotesSchema from '../models/Note'
import AccountSchema from '../models/Account'

class DbContext {
  Bugs = mongoose.model('Bugs', BugsSchema);
  Account = mongoose.model('Account', AccountSchema);
  Notes = mongoose.model('Notes', NotesSchema)
}

export const dbContext = new DbContext()
