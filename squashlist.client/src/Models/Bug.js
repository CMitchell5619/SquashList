export class Bug {
  constructor(data) {
    this.id = data.id || data._id
    this.title = data.title
    this.description = data.description
    this.closed = data.closed
    this.creator = data.creator
    this.creatorId = data.creatorId
    this.createdAt = data.createdAt
    this.updatedAt = data.updatedAt
  }
}
