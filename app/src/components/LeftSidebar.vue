<script lang="ts" setup>
import { useLeftSidebar } from '@/stores/leftSidebar'
// import { useGlobalState } from '@/stores/globalState';
// import { onMounted, onUnmounted, ref } from 'vue';
import Button from '../components/ComponentButton.vue'

// const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const leftSidebar = useLeftSidebar()
// const globalState = useGlobalState();
const emit = defineEmits(['editToggle'])

function editToggle() {
    emit('editToggle', 'leftSidebar')
}
// var sidebarState = "";

// async function onResize() {
//     sidebarState = window.matchMedia('(max-width: 640px)').matches ? 'small' : sidebarState;
//     sidebarState = window.matchMedia('(min-width: 768px)').matches ? 'medium' : sidebarState;
//     sidebarState = window.matchMedia('(min-width: 1024px)').matches ? 'desktop' : sidebarState;
//     sidebarState = window.matchMedia('(min-width: 1280px)').matches ? 'wide' : sidebarState;
    
//     switch (sidebarState) {
//         case "small":
//             leftSidebar.toggleClose();
//             break;;
//         case "medium":
//             leftSidebar.toggleSmall();
//             break;;
//         case "desktop":
//             leftSidebar.toggleBig();
//             break;;
//         case "wide":
//             leftSidebar.toggleBig();
//             break;;
//         default:
//             leftSidebar.toggleSmall();
//             break;;
//     }
// }

// onMounted(() => {
//     onResize();
//     // window.addEventListener('resize', onResize, { passive: true });
// });

// onUnmounted(() => {
//     // window.removeEventListener('resize', onResize);
// });
</script>

<template>
    <div v-show="leftSidebar.localState.enabled" class="sidebar">
        <div class="sidebar-button" @click="leftSidebar._toggle">
            <div v-if="leftSidebar.localState.open">
                <font-awesome-icon :icon="['fas', 'caret-left']" />
            </div>
            <div v-else>
                <font-awesome-icon :icon="['fas', 'caret-right']" />
            </div>
        </div>
        <div :class="leftSidebar.localState.open ? 'sidebar-main open' : 'sidebar-main closed'" class="sidebar-main">
            <div class="sidebar-main-controls">
                <Button icon-left="sliders" tooltip="Edit Sidebar" @buttonClick="editToggle" color="mauve" type="solid" size="medium"/>
            </div>
            <div class="sidebar-main-bulk">bulk</div>
        </div>
    </div>
    <!-- <div v-if="leftSidebar.localState.open" v-show="leftSidebar.localState.enabled" class="sidebar-left1">
        <div class="toggle" @click="leftSidebar._toggle">
            <font-awesome-icon :icon="['fas', 'chevron-left']" />
        </div>

        <div class="sidebar-item-group">Item Group 1</div>
        <div class="sidebar-item" title="Item 1">
            <font-awesome-icon :icon="['fab', 'vuejs']" />
            <div>Item 1</div>
        </div>
        <div class="sidebar-item" title="Item 2">
            <font-awesome-icon :icon="['fab', 'vuejs']" />
            <div>Item 2</div>
        </div>
        <div class="sidebar-item-group">Item Group 2</div>
        <div class="sidebar-item" title="Item 1">
            <font-awesome-icon :icon="['fab', 'vuejs']" />
            <div>Item 1</div>
        </div>
        <div class="sidebar-item" title="Item 2">
            <font-awesome-icon :icon="['fab', 'vuejs']" />
            <div>Item 2</div>
        </div>

        <div class="controls">
            <a>1</a>
        </div>

    </div>
    <div v-else v-show="leftSidebar.localState.enabled" class="sidebar-left closed">
        <div class="toggle" @click="leftSidebar._toggle">
            <font-awesome-icon :icon="['fas', 'chevron-right']" />
        </div>

        <div class="sidebar-item-group"></div>
        <div class="sidebar-item" title="Item 1">
            <font-awesome-icon :icon="['fab', 'vuejs']" />
        </div>
        <div class="sidebar-item" title="Item 2">
            <font-awesome-icon :icon="['fab', 'vuejs']" />
        </div>
        <div class="sidebar-item-group"></div>
        <div class="sidebar-item" title="Item 1">
            <font-awesome-icon :icon="['fab', 'vuejs']" />
        </div>
        <div class="sidebar-item" title="Item 2">
            <font-awesome-icon :icon="['fab', 'vuejs']" />
        </div>

        <div class="controls">
            <a>1</a>
        </div>
    </div> -->
</template>

<style lang="scss" scoped>
    @import '../assets/base.scss';

    svg {
        width: 1em; height: 1em;
        margin: 0; padding: 0;
        display: flex; position: relative;
        justify-content: center; align-items: center;
    }

    .sidebar {
        margin: 0; padding: 0;
        display: flex; position: relative;
        flex-direction: row;
        background: $mantle; color: inherit;
        flex-grow: 1;

        .sidebar-main {
            margin: 0; padding: 0;
            display: flex; position: relative;
            flex-direction: column;
            flex-grow: 1;
            width: 16em;
            overflow: hidden;

            .sidebar-main-controls {
                margin: 0; padding: 0;
                display: flex; position: relative;
                flex-direction: row;
                justify-content: end; align-items: center;
                background: $crust; color: inherit;
            }

            .sidebar-main-bulk {
                margin: 0; padding: 1em;
                display: flex; position: relative;
                flex-direction: column;
                background: transparent; color: inherit;
                flex-grow: 1;
            }

            &.closed {
                width: 0;
                transition: width 100ms ease-in-out;
            }

            &.open {
                transition: width 200ms ease-in-out;
            }
        }

        .sidebar-button {
            margin: 0; padding: 0 calc($global-padding / 2);
            display: flex; position: relative;
            flex-direction: column;
            justify-content: center; align-items: center;
            width: 1em; max-width: 1em;

            background: $crust; color: $mauve;

            svg {
                width: 1.2em; height: 1.2em;
            }

            &:hover {
                cursor: pointer;
            }
        }
    }

    // svg {
    //     width: 1em; height: 1em;
    //     margin: 0; padding: 0;
    //     display: flex; position: relative;
    //     justify-content: center; align-items: center;
    // }

    // .sidebar {
    //     margin: 0; padding: 0;
    //     display: flex; position: relative;

    //     flex-direction: column;
    //     flex-grow: 1;

    //     width: 16em; max-width: 16em;
    // }
    // .sidebar-left {
    //     margin: 0; padding: 0;
    //     display: flex; position: relative;

    //     flex-direction: column;
    //     flex-grow: 1;

    //     width: 16em; max-width: 16em;

    //     background: $mantle; color: inherit;

    //     animation: open 0.05s linear;

    //     .toggle {
    //         margin: 0; padding: $global-padding;
    //         display: flex; position: relative;

    //         flex-direction: row;
    //         justify-content: start; align-items: center;

    //         &:hover {
    //             cursor: pointer;
    //             color: $mauve;
    //         }
    //     }

    //     .sidebar-item-group {
    //         margin: 0; padding: $global-padding;
    //         border-bottom: 2px dashed $surface0;
    //         color: $subtext0;
    //         text-transform: uppercase;
    //     }

    //     .sidebar-item {
    //         margin: 0; padding: calc($global-padding / 2) $global-padding;
    //         display: flex; position: relative;

    //         flex-direction: row;
    //         justify-content: start; align-items: center;
    //         gap: calc($global-padding / 2);

    //         &:hover {
    //             background: $mauve; color: $mantle;
    //             cursor: pointer;
    //         }
    //     }

    //     .controls {
    //         margin: 0; padding: 0;
    //         display: flex; position: relative;

    //         flex-direction: row;
    //         gap: calc($global-padding / 2);
    //         justify-content: start; align-items: center;
    //         justify-self: end;

    //         background: transparent; color: inherit;

    //         a {
    //             margin: 0; padding: calc($global-padding / 2) $global-padding;
    //             display: flex; position: relative;
    //             flex-direction: row;
    //             justify-content: center; align-items: center;
    //             background: $crust;
    //         }
    //     }

    //     &.closed {
    //         width: 3em;
    //         animation: close 0.1s linear;

    //         .toggle {
    //             &:hover {
    //                 color: $mauve;
    //             }
    //         }

    //         .sidebar-item-group {
    //             margin: 0; padding: 0;
    //         }

    //         .sidebar-item {
    //             margin: 0; padding: $global-padding;
    //         }
    //     }
    // }

    // @keyframes close {
    //     from {
    //         width: 12em;
    //     }

    //     to {
    //         width: 3em;
    //     }
    // }

    // @keyframes open {
    //     from {
    //         width: 3em;
    //     }

    //     to {
    //         width: 12em;
    //     }
    // }
</style>