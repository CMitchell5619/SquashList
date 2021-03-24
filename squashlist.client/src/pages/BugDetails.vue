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
    <div class="row justify-content-between align-items-end">
      <div class="col-2" v-if="state.activeBug.creator">
        Reported By: {{ state.activeBug.creator.name }}
      </div>
      <div class="col-2">
        <img :src="state.activeBug.creator.picture" alt="">
      </div>
      <div class="col-2" v-if="state.activeBug.closed == false">
        Status: Open
      </div>
      <div class="col-6" v-else>
        Status: Closed
      </div>
    </div>
    <div class="row p-4">
      <div class="col-12 border border-light p-5">
        <div class="card bg-dark">
          {{ state.activeBug.description }}
        </div>
      </div>
    </div>
    <div class="row mb-4 justify-content-end">
      <div class="col-2 text-center" v-show="state.activeBug.closed == false">
        <button class="btn btn-primary">
          Edit
        </button>
      </div>
      <div class="col-2" v-show="state.activeBug.closed == false">
        <button type="button"
                class="btn btn-danger"
                @click="deleteActiveBug"
        >
          Close
        </button>
      </div>
    </div>
    <div class="row p-3 mt-5 border border-light justify-content-between">
      <div class="col-8">
        <h3>
          Notes
        </h3>
      </div>
      <div class="col-4" v-if="!state.activeBug.closed">
        <button type="button" class="btn btn-secondary text-light" data-toggle="modal" data-target="#createNoteModal">
          Create Note
        </button>
        <CreateNote :bug="state.activeBug" />
      </div>
    </div>
    <div class="row justify-content-center mt-4">
      <table class="table table-striped table-hover table-dark">
        <thead>
          <tr>
            <th scope="col">
              Note
            </th>
            <th scope="col">
              Reported By
            </th>
            <th scope="col">
              Required Picture
            </th>
            <th scope="col">
              Delete
            </th>
          </tr>
        </thead>
        <!-- BODY START -->
        <tbody>
          <NotesWindow v-for="note in state.notes" :key="note.id" :note="note" :bug="state.activeBug" />
        </tbody>
      </table>
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
        await bugsService.getNotesById(route.params.id)
      }

    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
