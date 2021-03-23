<template>
  <div class="note-window">
    <tr class="note-window">
      <th scope="row">
        {{ note.body }}
      </th>

      <td>{{ note.creator.name }}{{ note.creator.picture }}</td>

      <!-- <td>{{ getNoteDate(note._id) }}</td> -->
      <!-- <NoteDetails :note="note" /> -->
    </tr>
  </div>
</template>

<script>
import { reactive, computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { notesService } from '../services/NotesService'
import { bugsService } from '../services/BugsService'

export default {
  name: 'NoteWindow',
  props: {
    note: { type: Object, required: true },
    bug: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      notes: computed(() => AppState.notes)
    })
    onMounted(() => {
      bugsService.getNotesById(props.bug.id)
    })
    return {
      state,
      getNoteDate(id) {
        return notesService.getNoteDate(id)
      }
    }
  },
  components: {
  }
}
</script>

<style lang="scss" scoped>
a {
    color: #ffffff;
    text-decoration: none;
    background-color: transparent;
}

</style>
