<template>
  <div class="bug-window">
    <table class="table table-striped table-hover table-dark">
      <thead>
        <tr>
          <th scope="col">
            Title
          </th>
          <th scope="col">
            Reported By
          </th>
          <th scope="col">
            Status
          </th>
          <th scope="col">
            Last Modified
          </th>
        </tr>
      </thead>
      <!-- BODY START -->
      <tbody>
        <tr v-for="bug in state.bugs" :key="bug.id" :bug="bug">
          <th scope="row">
            {{ bug.title }}
          </th>
          <td>{{ bug.creator.name }}</td>
          <td>{{ bug.closed }}</td>
          <td>{{ bug.updatedAt }}</td>
        </tr>
        <tr>
          <th scope="row">
            2
          </th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">
            3
          </th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
      <!-- BODY END -->
    </table>
  </div>
</template>

<script>
import { reactive, computed, onMounted } from 'vue'
import { AppState } from '../AppState'
import { bugsService } from '../services/BugsService'

export default {
  name: 'BugWindow',
  setup() {
    const state = reactive({
      bugs: computed(() => AppState.bugs)
    })
    onMounted(() => {
      bugsService.getAllBugs()
    })
    return {
      state,
      bugsService.
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
