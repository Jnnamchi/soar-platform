<template>
  <div>
    <h3>User:</h3>
    <p v-if="user.first_name">name: {{ user.first_name }}</p>
    <p v-if="user.email">email: {{ user.email }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class EmptyHome extends Vue {
  user = {
    id: '',
    email: '',
    first_name: '',
  }

  mounted() {
    this.getUserInfo()
  }

  async getUserInfo() {
    try {
      const res = await this.$store.dispatch('moduleAuth/onGetUserInfo')

      console.log('res: ', res)

      this.user = res.data
    } catch (error) {
      throw Error()
    }
  }
}
</script>
