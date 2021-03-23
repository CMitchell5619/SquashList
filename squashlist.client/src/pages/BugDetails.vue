<template>
  <div class="bug-details container text-light">
    <div class="row">
      <div class="col-3">
        Title
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <h1>
          {{ state.activeBug.title }}
        </h1>
      </div>
    </div>
    <div class="row justify-content-between">
      <div class="col-10" v-if="state.activeBug.creator">
        Reported By: {{ state.activeBug.creator.name }}
      </div>
      <div class="col-2" v-if="state.activeBug.closed == false">
        Status: Open
      </div>
      <div class="col-2" v-else>
        Status: Closed
      </div>
    </div>
    <div class="row">
      <div class="col-12 min-vw-50 min-vh-50 border border-light">
        {{ state.activeBug.description }}
      </div>
    </div>
    <div class="row justify-content-end">
      <div class="col-3" v-show="state.activeBug.closed == false">
        <button class="btn btn-primary">
          Edit
        </button>
      </div>
      <div class="col-3" v-show="state.activeBug.closed == false">
        <button type="button"
                class="btn btn-danger"
                @click="deleteActiveBug"
        >
          Close
        </button>
      </div>
    </div>
    <div class="row">
      <div class="col-4">
        <h3>
          Notes
        </h3>
        <div class="col-4">
          <button type="button" class="btn btn-dark" data-toggle="modal" data-target="#createNoteModal">
            Create Note
          </button>
          <CreateNote :bug="state.activeBug" />
        </div>
      </div>
      <div class="row">
        <div class="note-window">
          <table class="table table-striped table-hover table-dark">
            <thead>
              <tr>
                <th scope="col">
                  Note
                </th>
                <th scope="col">
                  Reported By
                </th>
              </tr>
            </thead>
            <!-- BODY START -->
            <tbody>
              <p>noteswindowbelow</p>
              <NotesWindow v-for="note in state.notes" :key="note.id" :note="note" :bug="state.activeBug" />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router'
import { notesService } from '../services/NotesService'

export default {
  name: 'BugDetails',
  props: {
    bug: { type: Object, required: true }
  },

  setup() {
    const route = useRoute()
    const router = useRouter()
    const state = reactive({
      activeBug: computed(() => AppState.activeBug),
      user: computed(() => AppState.user),
      notes: computed(() => AppState.notes),
      newNote: {}
    })

    onBeforeRouteLeave(() => {
      AppState.activeBug = {}
    })

    onMounted(() => {
      bugsService.getBugById(route.params.id)
      bugsService.getNotesById(route.params.id)
    })

    return {
      state,
      async deleteActiveBug() {
        await bugsService.deleteActiveBug(AppState.activeBug.id)
        router.push({ name: 'Home' })
      },
      async createNote() {
        await notesService.createNote(state.newNote)
      }

    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
