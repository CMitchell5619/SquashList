<template>
  <div class="bug-details-page container">
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
      <div class="col-10">
        Reported By: {{ state.activeBug.creator.name }}
      </div>
      <div class="col-2">
        Status {{ state.activeBug.closed }}
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        {{ state.activeBug.description }}
      </div>
    </div>
    <div class="row">
      <div class="col-3">
        Close Button
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row">
      <div class="col-4">
        <h3>
          Notes
        </h3>
      </div>
    </div>
    <div class="row">
      Notes Table
    </div>
    <div class="row justify-content-right">
      <div class="col-4">
        Add Notes Button
      </div>
    </div>
  </div>
  <AddComment />
</template>

<script>
import { reactive, computed } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'BugDetailsPage',
  props: {
    bug: { type: Object, required: true }
  },
  setup() {
    const state = reactive({
      activeBug: computed(() => AppState.activeBug),
      user: computed(() => AppState.user)
    })
    return {
      state
    }
  },
  components: {}
}
</script>

<style lang="scss" scoped>

</style>
