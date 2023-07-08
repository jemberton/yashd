<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'

import FrameBranding from './components/FrameBranding.vue'
import FrameSearch from './components/FrameSearch.vue'
import FrameUserControls from './components/FrameUserControls.vue'

import LeftSidebar from './components/LeftSidebar.vue'
import RightSidebar from './components/RightSidebar.vue'

import { useLeftSidebar } from '@/stores/leftSidebar'
import { useGlobalState } from '@/stores/globalState'

const leftSidebar = useLeftSidebar()
let leftSidebarState = false
const globalState = useGlobalState()

const editToggle = (pageID: String) => {
  switch (pageID) {
    case "home":
      if (globalState.focused.middleCenter.value === true) {
        globalState.overlay = !globalState.overlay
        globalState.focused.middleCenter.value = !globalState.focused.middleCenter.value
        leftSidebar.localState.open = leftSidebarState
      } else {
        globalState.overlay = !globalState.overlay
        globalState.focused.middleCenter.value = !globalState.focused.middleCenter.value
        leftSidebarState = leftSidebar.localState.open
        leftSidebar.localState.open = false
      }
      break;
    case "leftSidebar":
      globalState.overlay = globalState.overlay === true ? false : true;
      globalState.focused.middleLeft.value = globalState.focused.middleLeft.value === true ? false : true;
      leftSidebarState = leftSidebar.localState.open
      break;
    default:
      globalState.overlay = false
      globalState.focused.topLeft.value = false
      globalState.focused.topCenter.value = false
      globalState.focused.topRight.value = false
      globalState.focused.middleLeft.value = false
      globalState.focused.middleCenter.value = false
      globalState.focused.middleRight.value = false
      globalState.focused.bottomLeft.value = false
      globalState.focused.bottomCenter.value = false
      globalState.focused.bottomRight.value = false
      leftSidebar.localState.open = leftSidebarState
      globalState.editor.open.value = false
      break;
  }
}

</script>

<template>  
  <div v-show="globalState.overlay" id="overlay" @click="editToggle('')"></div>
  <div id="messages">
    <div class="message">THIS IS A MESSAGE</div>
    <div class="message">THIS IS A MESSAGE</div>
  </div>
  <div id="frame">
    <div id="frame-top">
      <div id="frame-top-left" :class="globalState.focused.topLeft.value ? 'focused' : ''">
        <FrameBranding />
      </div>
      <div id="frame-top-center" :class="globalState.focused.topCenter.value ? 'focused' : ''">
        <FrameSearch />
      </div>
      <div id="frame-top-right" :class="globalState.focused.topRight.value ? 'focused' : ''">
        <FrameUserControls />
      </div>
    </div>
    <div id="frame-middle">
      <div id="frame-middle-left" :class="globalState.focused.middleLeft.value ? 'focused' : ''">
        <LeftSidebar @editToggle="editToggle"/>
      </div>
      <div id="frame-middle-center" :class="globalState.focused.middleCenter.value ? 'focused' : ''">
        <RouterView @editToggle="editToggle"/>
      </div>
      <div id="frame-middle-right" :class="globalState.focused.middleRight.value ? 'focused' : ''">
        <RightSidebar />
      </div>
    </div>
    <div v-if="globalState.rainbow" class="rainbow"></div>
    <div id="frame-bottom">
      <div id="frame-bottom-left" :class="globalState.focused.bottomLeft.value ? 'focused' : ''">
        <a href="https://github.com/jemberton/yashd" target="_blank" title="YASHD Project Page">
          <span>yashd</span>
          <font-awesome-icon :icon="['fab', 'github-alt']" />
        </a>
      </div>
      <div id="frame-bottom-center" :class="globalState.focused.bottomCenter.value ? 'focused' : ''">frame bottom center</div>
      <div id="frame-bottom-right" :class="globalState.focused.bottomRight.value ? 'focused' : ''">frame bottom right</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import './assets/base.scss';
  a {
    margin: 0; padding: calc($global-padding * 1.5);
    display: flex; position: relative;

    flex-direction: row;
    justify-content: center; align-items: center;
    gap: calc($global-padding / 2);

    color: $subtext0;
  }

  a:link, a:active, a:visited {
    color: inherit;
    text-decoration: none;
  }

  a:hover {
    color: $green;
  }

  .rainbow {
    margin: 0; padding: 4px;
    display: flex; position: relative;

    flex-direction: row;

    background: white;
    background-image: repeating-linear-gradient(to right,
      red 0%, red 7.14%,
      orange 7.14%, orange 14.29%,
      yellow 14.29%, yellow 21.43%,
      green 21.43%, green 28.57%,
      blue 28.57%, blue 35.71%,
      purple 35.71%, purple 42.86%,
      indigo 42.86%, indigo 50%,
      indigo 50%, indigo 57.14%,
      purple 57.14%, purple 64.29%,
      blue 64.29%, blue 71.43%,
      green 71.43%, green 78.57%,
      yellow 78.57%, yellow 85.71%,
      orange 85.71%, orange 92.86%,
      red 92.86%, red 100%
    );

    background-size: 100% 1em;
    background-repeat: no-repeat;

    &::after {
      content: '';
      background: rgba(0,0,0,0.2);
      position: absolute;
      top: 0; bottom: 0;
      left: 0; right: 0;
    }
  }
</style>
