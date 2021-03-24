<template>
  <tr class="note-window">
    <th scope="row" v-if="note.creator">
      {{ note.body }}
    </th>

    <td v-if="note.creator">
      {{ note.creator.name }}
    </td>
    <td>
      <img :src="note.creator.picture" alt="">
    </td>
    <td type="button" class="close" @click="deleteNote" v-if="!bug.closed">
      &times;
    </td>

    <td v-else>
      Bug Closed
    </td>
  </tr>
</template>

<script>
import { reactive, computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'
import { notesService } from '../services/NotesService'
import { logger } from '../utils/Logger'

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
      bugsService.getNotesById(props.bug.id)
    })
    return {
      state,
      async deleteNote() {
        try {
          if (window.confirm('Are you sure? This cannot be undone!')) {
            await notesService.deleteNote(props.note)
          }
        } catch (error) {
          logger.error(error)
        }
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
