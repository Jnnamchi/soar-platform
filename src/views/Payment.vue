<template>
  <div class="payment-page">
    <div class="payment-window">
      <label
        style="
          position: relative;
          left: 145px;
          font-size: 26px;
          font-weight: 500;
        "
        >$</label
      >
      <input
        ref="input"
        data-symbol="$"
        type="number"
        min="3"
        max="10000"
        v-model="amount"
        class="payment-input"
      />
      <button
        :disabled="buttonDisabled"
        @click="paymentSubmittedCallback"
        class="payment-submit"
      >
        Make a payment
        <span v-if="buttonDisabled" class="lds-dual-ring"></span>
      </button>
    </div>
    <div v-if="redirected === 'success'" class="payment-success">
      <div class="success-inner">
        <h1 class="success-message">Payment succeeded</h1>
        <div class="dummy-positioning d-flex">
          <div class="success-icon">
            <div class="success-icon__tip"></div>
            <div class="success-icon__long"></div>
          </div>
          <button class="success-redirect" @click="goToPayment">Ok</button>
        </div>
      </div>
    </div>
    <div v-if="redirected === 'error'" class="payment-success">
      <div class="error-inner">
        <h1 class="success-message">Payment unsussesful :(</h1>
        <div class="circle-border"></div>
        <div class="circle">
          <div class="error"></div>
        </div>
        <button class="success-redirect" @click="goToPayment">Ok</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getServerUrl } from "@/requests/requests";
import axios from "axios";
import { getCurrentUserId } from "../firebase/firebase";
import router from "../router/index";

export default {
  name: "PaymentPage",
  mounted() {
    this.$refs.input.focus();
    let urlParams = new URLSearchParams(window.location.search);
    setTimeout(() => {
      if (urlParams.has("success")) this.redirected = "success";
      else if (urlParams.has("error")) this.redirected = "error";
    }, 1000);
  },
  data() {
    return {
      amount: 3,
      success_url: "http://localhost:8080/payment?success",
      cancel_url: "http://localhost:8080/payment?error",
      created_by: getCurrentUserId(),
      company_id: "",
      redirected: "",
      buttonDisabled: false,
    };
  },
  methods: {
    async paymentSubmittedCallback() {
      if (this.amount < 3) {
        alert("You can't pay less than 3$ and more than 9999$");
      } else {
        const url = getServerUrl();
        const body = {
          amount: this.amount,
          success_url: this.success_url,
          cancel_url: this.cancel_url,
          created_by: this.created_by,
          company_id: this.company_id,
        };
        this.buttonDisabled = true;
        const response = await axios.post(url + "/payment/checkout", body);
        this.buttonDisabled = false;
        window.open(response.data.checkout_url, "_self");
      }
    },
    goToPayment() {
      router.push("/payment");
    },
  },
  watch: {
    amount(newAmount) {
      if (newAmount > 9999) {
        this.amount = 9999;
      }
    },
  },
};
</script>


<style lang="scss">
.payment-page {
  display: flex;
  justify-content: center;
  margin-top: 50px;
  position: relative;
}
.payment-window {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 450px;
  height: 200px;
  border: 1px solid rgb(190, 190, 190);
  background-color: rgb(219, 219, 219);
  -webkit-box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
  -moz-box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
}
.payment-input {
  padding: 12px;
  font-size: 22px;
  padding-left: 12px;
  padding-right: 35px;
  outline: none;
  border: 1px solid #42b983;
}

.payment-input::-webkit-outer-spin-button,
.payment-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.payment-submit {
  display: flex;
  background-color: #42b983;
  padding: 5px 10px 5px 20px;
  outline: none;
  color: #fff;
  font-size: 20px;
  align-items: center;
  justify-content: space-between;
  border: 1px solid transparent;
  height: 52px;
  width: 220px;
  cursor: pointer;
  &:hover {
    background-color: #ffffff;
    color: #42b983;
    border: 1px solid #42b983;
    transition: border 0.3s, background-color 0.3s, color 0.3s;
  }
}

.dummy-positioning {
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
}

.payment-success {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
}

.success-inner,
.error-inner {
  margin: auto;
  background-color: white;
  border-radius: 12px;
  height: 200px;
  min-width: 300px;
  padding: 20px;
  position: relative;
  -webkit-box-shadow: 0px 0px 8px 0px rgba(0, 255, 52, 1);
  -moz-box-shadow: 0px 0px 8px 0px rgba(0, 255, 52, 1);
  box-shadow: 0px 0px 8px 0px rgba(0, 255, 52, 1);
  button {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
  }
}

.error-inner {
  -webkit-box-shadow: 0px 0px 8px 0px #f86;
  -moz-box-shadow: 0px 0px 8px 0px #f86;
  box-shadow: 0px 0px 8px 0px #f86;
}

.success-message {
  font-size: 22px;
  margin-bottom: 10px;
}
.success-redirect {
  padding: 5px 20px;
  align-self: center;
  background-color: #42b983;
  color: #fff;
  outline: none;
  font-size: 20px;
  text-transform: uppercase;
  border: 1px solid transparent;
  &:hover {
    background-color: #fff;
    color: #42b983;
    border: 1px solid #42b983;
    transition: background-color 0.3s, color 0.3s, border 0.3s;
  }
}

// The icon specifics
// Variables
$green: #4cc93f;
$icon-base-size: 10px;

// Structure
.success-icon {
  display: inline-block;
  width: 8em;
  height: 8em;
  font-size: $icon-base-size;
  border-radius: 50%;
  border: 4px solid lighten($green, 20%);
  background-color: #fff;
  position: relative;
  overflow: hidden;
  transform-origin: center;
  animation: showSuccess 180ms ease-in-out;
  transform: scale(1);
}

// Elements
.success-icon {
  &__tip,
  &__long {
    display: block;
    position: absolute;
    height: 4px;
    background-color: lighten($green, 20%);
    border-radius: 10px;
  }

  &__tip {
    width: 2.4em;
    top: 4.3em;
    left: 1.4em;
    transform: rotate(45deg);
    animation: tipInPlace 300ms ease-in-out;
    animation-fill-mode: forwards;
    animation-delay: 180ms;
    visibility: hidden;
  }

  &__long {
    width: 4em;
    transform: rotate(-45deg);
    top: 3.7em;
    left: 2.75em;
    animation: longInPlace 140ms ease-in-out;
    animation-fill-mode: forwards;
    visibility: hidden;
    animation-delay: 300ms + 140ms;
  }
}

@keyframes showSuccess {
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
}

@keyframes tipInPlace {
  from {
    width: 0em;
    top: 0em;
    left: -1.6em;
  }
  to {
    width: 2.4em;
    top: 4.3em;
    left: 1.4em;
    visibility: visible;
  }
}

@keyframes longInPlace {
  from {
    width: 0em;
    top: 5.1em;
    left: 3.2em;
  }
  to {
    width: 4em;
    top: 3.7em;
    left: 2.75em;
    visibility: visible;
  }
}

$color-red: #f86;
$circle-size: 60px;
.circle,
.circle-border {
  width: $circle-size;
  height: $circle-size;
  border-radius: 50%;
}

.circle {
  z-index: 1;
  position: relative;
  background: white;
  transform: scale(0.9);
  animation: success-anim 700ms ease;
  margin: 0 auto;
}

.circle-border {
  background: $color-red;
  left: 50%;
  z-index: 0;
  position: absolute;
  transform: translateX(-50%);
}

@keyframes success-anim {
  0% {
    transform: scale(0);
  }
  30% {
    transform: scale(0);
  }
  100% {
    transform: scale(0.9);
  }
}

.error::before,
.error::after {
  content: "";
  display: block;
  height: 4px;
  background: $color-red;
  position: absolute;
}

.error::before {
  width: 40px;
  top: 48%;
  left: 16%;
  transform: rotateZ(50deg);
}

.error::after {
  width: 40px;
  top: 48%;
  left: 16%;
  transform: rotateZ(-50deg);
}

button:disabled,
button[disabled] {
  background-color: #cccccc;
  cursor: not-allowed !important;
  &:hover {
    background-color: #cccccc;
    color: white;
    border: 1px solid transparent;
  }
}

.lds-dual-ring {
  display: inline-block;
  width: 40px;
  height: 40px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 16px;
  height: 16px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #fff;
  border-color: #fff transparent #fff transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
