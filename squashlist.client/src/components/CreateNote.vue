<template>
  <div class="create-comment">
    <!-- Modal is called in BugDetailsPage -->
    <div class="modal createNoteModal" :id="'createNoteModal'" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-title bg-dark text-center text-light">
            <h3>
              Notes
            </h3>
          </div>
          <div class="modal-body bg-dark">
            <form action="submit">
              <!-- Inputs -->
              <div class="p-2">
                <input type="text"
                       name="noteBody"
                       class="form-control p-3 bg-secondary text-light"
                       placeholder="Note"
                       aria-describedby="helpId"
                       v-model="state.newNote.body"
                />
              </div>
              <!-- End Inputs -->

              <button type="button" class="btn btn-danger" @click="createNote()">
                Create
              </button>
            </form>
          </div>
          <div class="modal-footer bg-dark">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { logger } from '../utils/Logger'
import { notesService } from '../services/NotesService'

export default {
  name: 'CreateNote',
  props: {
    bug: { type: Object, required: true }
  },
  setup() {
    const state = reactive({
      newNote: {}
    })
    return {
      state,
      async createNote() {
        try {
          await notesService.createNote(state.newNote)
        } catch (error) {
          logger.error(error)
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
