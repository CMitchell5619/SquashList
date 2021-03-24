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
            <button @click="state.filterOpen = !state.filterOpen">
              Status
            </button>
          </th>
          <th scope="col">
            Last Modified
          </th>
        </tr>
      </thead>
      <!-- BODY START -->
      <tbody v-if="state.filterOpen">
        <tr v-for="bug in state.bugs"
            :key="bug.id"
            :bug="bug"
            class="pointer"
            data-toggle="modal"
            :data-target="'#bugDetails' + bug.id"
        >
          <router-link :to="{ name: 'BugDetails', params: {id: bug.id}}">
            <th scope="row">
              {{ bug.title }}
            </th>
          </router-link>
          <td>{{ bug.creator.name }}</td>
          <td v-if="bug.closed == false">
            Open
          </td>
          <td v-else class="text-muted">
            Closed
          </td>
          <td>{{ getBugDate(bug._id) }}</td>
        </tr>
      </tbody>

      <tbody v-else>
        <tr v-for="bug in state.openBugs"
            :key="bug.id"
            :bug="bug"
            class="pointer"
            data-toggle="modal"
            :data-target="'#bugDetails' + bug.id"
        >
          <router-link :to="{ name: 'BugDetails', params: {id: bug.id}}">
            <th scope="row">
              {{ bug.title }}
            </th>
          </router-link>
          <td>{{ bug.creator.name }}</td>
          <td v-if="bug.closed == false">
            Open
          </td>
          <td v-else class="text-muted">
            Closed
          </td>
          <td>{{ getBugDate(bug._id) }}</td>
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
      bugs: computed(() => AppState.bugs),
      openBugs: computed(() => AppState.bugs.filter((b) => b.closed === false)),
      filterOpen: true
    })
    onMounted(() => {
      bugsService.getAllBugs()
    })
    return {
      state,
      getBugDate(id) {
        return bugsService.getBugDate(id)
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
