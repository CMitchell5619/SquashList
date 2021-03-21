<template>
  <div class="create-bug">
    <!-- Modal is called in NavBar -->
    <div class="modal createBugModal" :id="'createBugModal'" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-title">
            <h3 class="text-center">
              Report Bug
            </h3>
          </div>
          <div class="modal-body">
            <form action="submit">
              <!-- Inputs -->
              <div class="p-2">
                <input type="text"
                       name="bugTitle"
                       class="form-control p-3"
                       placeholder="Title"
                       aria-describedby="helpId"
                       v-model="state.newBug.title"
                />
              </div>
              <div class="p-3">
                <input type="text"
                       name="bugDescription"
                       class="form-control p-3"
                       placeholder="Description"
                       aria-describedby="helpId"
                       v-model="state.newBug.description"
                />
              </div>
              <!-- End Inputs -->

              <button type="button" class="btn btn-danger" @click="createBug()">
                Create
              </button>
            </form>
          </div>
          <div class="modal-footer">
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
import { bugsService } from '../services/BugsService'

export default {
  name: 'CreateBug',
  setup() {
    const state = reactive({
      newBug: {}
    })
    return {
      state,
      async createBug() {
        try {
          await bugsService.createBug(state.newBug)
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
