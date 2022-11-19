<template>
  <div class="team">
    <p class="members-count">No team members</p>
    <AppButton @click.native="openAddMemberForm" class="add-user"
      >Add new member</AppButton
    >

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
  display: flex;
  align-items: center;

  .add-user {
    width: max-content;
    padding: 0 10px;
    margin-left: 20px;
  }
}
</style>
