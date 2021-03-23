export class Note {
  constructor(data) {
    this.id = data.id || data._id
    this.body = data.body
    this.bug = data.bug
    this.creator = data.creator
    this.creatorId = data.creatorId
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
  }
}
