<template>
  <div class="add-comment">
    <div class="modal createCommentModal" :id="'createCommentModal'" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-title">
            <h3 class="text-center">
              Report Comment
            </h3>
          </div>
          <div class="modal-body">
            <form action="submit">
              <!-- Inputs -->
              <div class="p-2">
                <input type="text"
                       name="commentTitle"
                       class="form-control p-3"
                       placeholder="Title"
                       aria-describedby="helpId"
                       v-model="state.newComment.title"
                />
              </div>
              <div class="p-3">
                <input type="text"
                       name="commentDescription"
                       class="form-control p-3"
                       placeholder="Description"
                       aria-describedby="helpId"
                       v-model="state.newComment.description"
                />
              </div>
              <!-- End Inputs -->

              <button type="button" class="btn btn-danger" @click="createComment()">
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
// import { logger } from '../utils/Logger'
// import { commentsService } from '../services/CommentsService'

export default {
  name: 'CreateComment',
  setup() {
    const state = reactive({
      newComment: {}
    })
    return {
      state
      // async createComment() {
      //   try {
      //     await commentsService.createComment(state.newComment)
      //   } catch (error) {
      //     logger.error(error)
      //   }
      // }
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
