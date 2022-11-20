<template>
  <div class="container">
    <p class="title">New team member</p>

    <div class="invite">
      <div class="sibtitle">Invite team members</div>
      <p class="text">
        You can allow you team members to join with your unique join link to
        your organization. Just copy and share the link below for you team
        members to sign up.
      </p>
      <div class="join">
        <AppInput class="invite-input" :value="joinLink" :disabled="true" />
        <AppButton @click.native="copy" class="invite-button">{{
          isLinkCopied ? 'Copied' : 'Copy Invite Link'
        }}</AppButton>
      </div>
    </div>

    <div v-if="!errorText && inviteStep === 1" class="form">
      <p class="subtitle">Add team members</p>
      <p class="text">
        Its as easy as filling in their information and we will send them a
        email link to complete their profile and create a password
      </p>

      <div class="input-wrapper">
        <p class="input-info">First name</p>
        <AppInput
          class="form__input"
          :placeholder="'First name'"
          v-model="form.first_name"
        />
      </div>

      <div class="input-wrapper">
        <p class="input-info">Last name</p>
        <AppInput
          class="form__input"
          :placeholder="'Last name'"
          v-model="form.last_name"
        />
      </div>

      <div class="input-wrapper">
        <p class="input-info">Email address</p>
        <AppInput
          class="form__input"
          :placeholder="'Email address'"
          v-model="form.email"
          :status="emailValidationInfo"
        />
      </div>

      <div class="input-wrapper">
        <p class="input-info">Compnay Division</p>
        <AppInput
          class="form__input"
          :placeholder="'Compnay Division'"
          v-model="form.company_division"
        />
      </div>

      <div class="buttons-wrapper">
        <AppButton class="cancel" @click.native="cancel">Cancel</AppButton>
        <AppButton class="submit" @click.native="submit" :isLoading="isLoading"
          >Add New Member</AppButton
        >
      </div>
    </div>

    <div v-if="!errorText && inviteStep === 2" class="success">
      <InfoSuccess :text="'You\'ve added your team member'" />
      <AppButton class="success-button" @click.native="cancel">Ok</AppButton>
    </div>

    <InfoError v-if="errorText" :text="errorText" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import AppButton from '@/components/UI/AppButton.vue'
import AppInput from '@/components/UI/AppInput.vue'
import InfoError from '@/components/info/InfoError.vue'
import { writeTextToClipboard } from '@/utils/clipboard'
import { checkEmailValidation } from '@/utils/validation'
import { convertErrorToString } from '@/utils/convert'
import InfoSuccess from '../info/InfoSuccess.vue'

const NewTeamMemberFormProps = Vue.extend({
  props: {
    hideFormCb: Function,
    // reset: Boolean,
  },
})

@Component({
  components: {
    AppButton,
    AppInput,
    InfoSuccess,
    InfoError,
  },
  // watch: {
  //   $props: {
  //     handler: function () {
  //       this.resetForm()
  //     },
  //     deep: true,
  //   },
  // },
})
export default class NewTeamMemberForm extends NewTeamMemberFormProps {
  inviteStep = 1
  joinLink = 'https://site-name/invite=?no-actual-route'
  isLinkCopied = false
  form = {
    first_name: '',
    last_name: '',
    email: '',
    company_division: '',
  }
  emailValidationInfo = {
    type: '',
    text: '',
  }
  isLoading = false
  errorText = ''

  @Prop()
  reset!: Boolean

  @Watch('reset', { immediate: true })
  resetChanged() {
    this.resetForm()
  }

  copy() {
    writeTextToClipboard(this.joinLink)
    this.isLinkCopied = true
  }

  cancel() {
    this.resetForm()
    this.hideFormCb()
  }

  resetForm() {
    this.form = {
      first_name: '',
      last_name: '',
      email: '',
      company_division: '',
    }
    this.inviteStep = 1
  }

  async submit() {
    this.emailValidation()

    const validationSuccess = !this.emailValidationInfo.type
    if (validationSuccess) {
      this.isLoading = true
      try {
        const res = await this.$store.dispatch(
          'Signup/inviteParticipantAction',
          this.form
        )
        if (res && res.status === 204) {
          this.inviteStep = 2
        }
      } catch (error) {
        this.errorText = convertErrorToString(error)
      } finally {
        this.isLoading = false
      }
    }
  }

  emailValidation() {
    const isEmailValid = checkEmailValidation(this.form.email.trim())
    if (!isEmailValid) {
      this.emailValidationInfo = {
        type: 'error',
        text: "Email wasn't validated",
      }
    } else {
      this.emailValidationInfo = {
        type: '',
        text: '',
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 420px;

  .title {
    margin-bottom: 20px;
    padding-bottom: 8px;
    border-bottom: 1px solid #c1c7d0;
    font-size: 20px;
    line-height: 24px;
    color: #505f79;
  }

  .subtitle {
    margin-bottom: 7px;
    font-size: 14px;
    font-weight: 600;
  }

  .text {
    margin-bottom: 16px;
    font-size: 14px;
    color: #505f79;
  }

  .invite {
    padding-bottom: 30px;
    margin-bottom: 30px;
    border-bottom: 1px solid #c1c7d0;
    .join {
      display: grid;
      grid-template-columns: 280px 130px;
      justify-content: space-between;

      .invite-button {
        height: 100%;
      }
    }
  }

  .form {
    .input-wrapper {
      margin-bottom: 17px;
      .input-info {
        margin-bottom: 5px;
        font-size: 14px;
        font-weight: 700;
      }
    }

    .buttons-wrapper {
      display: grid;
      height: 40px;
      grid-template-columns: repeat(2, max-content);
      justify-content: space-between;

      .cancel {
        height: 100%;
        padding: 12px 17px;
        background-color: transparent;
        color: #42526e;

        &:hover {
          background-color: #f3f3f3;
          color: #1f2c41;
        }
      }
      .submit {
        height: 100%;
        padding: 12px 53px;
      }
    }
  }

  .success {
    &-button {
      display: block;
      margin-top: 10px;
      padding: 0 20px;
      margin-left: auto;
      width: max-content;
    }
  }
}
</style>
