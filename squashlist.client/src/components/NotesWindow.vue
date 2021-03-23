<template>
  <div class="note-window">
    BEEEBEBEBEBENAN
    <div>{{ note.body }}</div>{{ note.body }}
    <tr class="note-window">
      <th scope="row" v-if="note.creator">
        {{ note.body }}
      </th>

      <td v-if="note.creator">
        <img :src="note.creator.picture" alt="">
        {{ note.creator.name }}
      </td>

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
  name: 'NotesWindow',
  props: {
    note: { type: Object, required: true },
    bug: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      notes: computed(() => AppState.notes)
    })
    onMounted(() => {
      bugsService.getNotesById(props.bug._id)
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
