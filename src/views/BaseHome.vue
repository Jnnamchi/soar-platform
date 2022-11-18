<template>
  <div class="home">
    <h3>Admin:</h3>
    <p v-if="user.first_name">name: {{ user.first_name }}</p>
    <p v-if="user.email">email: {{ user.email }}</p>

    <AppButton class="remove" @click.native="remove">REMOVE USER</AppButton>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AppButton from '@/components/UI/AppButton.vue'

@Component({
  components: {
    AppButton,
  },
})
export default class BaseHome extends Vue {
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

  async remove() {
    console.log('remove user')
    try {
      const res = await this.$store.dispatch('moduleAuth/onRemoveUser', {
        id: this.user.id,
      })

      console.log('res: ', res)

      if (res && res.status === 204) {
        this.$store.dispatch('moduleAuth/onLogout')
        this.$router.push({ name: 'login' })
      }
    } catch (error) {
      throw Error()
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;

  .remove {
    // display: none;
    margin-top: auto;
    margin-left: auto;
    padding: 0 10px;
    width: max-content;
  }
}
</style>
