<template>
  <div class="team">
    <div class="team-intro">
      <p class="members-count">No team members</p>
      <AppButton
        v-if="$store.state.Auth.user.role === 'administrator'"
        @click.native="openAddMemberForm"
        class="add-user"
        >Add new member</AppButton
      >
    </div>

    <AppPopup v-model="openNewMemberPopup">
      <NewTeamMemberForm :hideFormCb="test" />
    </AppPopup>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AppButton from '../UI/AppButton.vue'
import AppPopup from '../UI/AppPopup.vue'
import NewTeamMemberForm from './NewTeamMemberForm.vue'

@Component({
  components: {
    AppButton,
    AppPopup,
    NewTeamMemberForm,
  },
})
export default class TeamMembers extends Vue {
  openNewMemberPopup = false

  openAddMemberForm() {
    this.openNewMemberPopup = true
  }

  test() {
    this.openNewMemberPopup = false
  }
}
</script>

<style lang="scss" scoped>
.team {
  &-intro {
    display: flex;
    align-items: center;
    height: 32px;
  }

  .add-user {
    width: max-content;
    padding: 0 10px;
    margin-left: 20px;
  }
}
</style>
