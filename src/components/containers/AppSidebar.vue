<template>
  <div class="app-sidebar">
    <img class="logo" src="@/assets/img/icons/icon-soarline-logo.svg" />

    <div class="nav">
      <div class="nav-item active">
        <img src="@/assets/img/icons/icon-dashbpard.svg" alt="" class="icon" />
        <span class="text">Dashboard</span>
      </div>
      <div class="nav-item">
        <img src="@/assets/img/icons/icon-modules.svg" alt="" class="icon" />
        <span class="text">Modules</span>
      </div>
      <div class="nav-item">
        <img src="@/assets/img/icons/icon-team.svg" alt="" class="icon" />
        <span class="text">Teams</span>
      </div>
    </div>

    <div class="empty"></div>

    <div class="tasks">
      <p class="title">Let's get you started!</p>
      <p class="text">
        Complete these tasks below to complete you setup. If you need help just
        hit the (i) for more info
      </p>

      <div v-for="task of tasks" :key="task.id" class="task">
        <p class="name">{{ task.title }}</p>
        <div class="range">
          <div
            class="value"
            :style="{
              width: task.value + '%',
            }"
          ></div>
        </div>
        <img src="@/assets/img/icons/icon-task.svg" alt="" class="icon" />
      </div>
    </div>

    <div class="sidebar-bottom">
      <p class="title">Need more help?</p>
      <p class="text">
        Watch our oboarding video to get you started as quickly as possible
      </p>

      <div class="video-wrapper">
        <img src="@/assets/img/images/man.jpg" alt="" class="video" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class AppSidebar extends Vue {
  tasks = [
    {
      id: 1,
      title: 'Get Started 1/3 completed',
      value: 33,
    },
    {
      id: 2,
      title: 'Add team members',
      value: 0,
    },
    {
      id: 3,
      title: 'Create a module',
      value: 0,
    },
    {
      id: 4,
      title: 'Assign team to a Module',
      value: 0,
    },
  ]
}
</script>

<style lang="scss" scoped>
.app-sidebar {
  background-color: #fafbfc;
  display: flex;
  flex-direction: column;
  align-items: center;

  .logo {
    display: block;
    margin: 20px auto;
  }

  .nav {
    width: 213px;

    .nav-item {
      display: flex;
      margin-bottom: 3px;
      align-items: center;
      height: 44px;
      border-radius: 3px;
      font-size: 14px;
      cursor: pointer;

      .icon {
        width: 24px;
        height: 24px;
        margin-left: 12px;
        margin-right: 4px;
      }

      &:hover {
        background-color: #7abfff;
      }

      &.active {
        color: #fff;
        background-color: #0052cc;
      }
    }
  }

  .empty {
    flex: 1;
  }

  .tasks {
    padding: 20px;
    font-size: 11px;

    .title {
      margin-bottom: 10px;
      font-weight: 700;
      color: #6554c0;
    }
    .text {
      margin-bottom: 20px;
      color: #505f79;
    }

    .task {
      position: relative;
      margin-bottom: 13px;
      .name {
        margin-bottom: 4px;
      }

      .range {
        position: relative;
        width: 180px;
        height: 6px;
        border-radius: 3px;
        background-color: #ebecf0;

        .value {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          border-radius: 3px;
          background-color: #36b37e;
        }
      }

      .icon {
        position: absolute;
        top: 0;
        left: 175px;
      }
    }
  }

  .sidebar-bottom {
    width: 100%;
    padding: 20px;
    color: #fff;
    border-bottom-right-radius: 16px;
    background-color: #6554c0;

    .title {
      margin-bottom: 10px;
      font-size: 11px;
      font-weight: 700;
    }

    .text {
      margin-bottom: 10px;
      font-size: 11px;
    }

    .video-wrapper {
      height: 97px;
      display: flex;
      align-items: center;
      border-radius: 8px;
      overflow: hidden;

      .video {
        width: 100%;
        height: auto;
      }
    }
  }
}
</style>
