<script lang="ts" setup>
    import { useRightSidebar } from '@/stores/rightSidebar'
    const rightSidebar = useRightSidebar()
</script>

<template>
    <div v-if="rightSidebar.enabled" class="sidebar-right">
        _right sidebar_
    </div>
</template>

<style lang="scss" scoped>
    @import '../assets/base.scss';

    svg {
        width: 1em; height: 1em;
        margin: 0; padding: 0;
        display: flex; position: relative;
        justify-content: center; align-items: center;
    }

    .sidebar-right {
        margin: 0; padding: 0;
        right: 0px;
        display: flex; position: absolute;

        flex-direction: column;
        flex-grow: 1;

        width: 16em; max-width: 16em;
        height: 100%;

        background: $crust; color: inherit;

        animation: open 0.05s linear;
        z-index: 9;

        transition: width 100ms ease-in-out;

        &::after {
            content: '';
            position: absolute;
            left: -0.5em;
            width: 0.5em; height: 100%;
            z-index: 1;
            background: black;
            opacity: 0.6;
        }

        .toggle {
            margin: 0; padding: $global-padding;
            display: flex; position: relative;

            flex-direction: row;
            justify-content: start; align-items: center;

            &:hover {
                cursor: pointer;
                color: $mauve;
            }
        }

        .sidebar-item-group {
            margin: 0; padding: $global-padding;
            border-bottom: 2px dashed $surface0;
            color: $subtext0;
            text-transform: uppercase;
        }

        .sidebar-item {
            margin: 0; padding: calc($global-padding / 2) $global-padding;
            display: flex; position: relative;

            flex-direction: row;
            justify-content: start; align-items: center;
            gap: calc($global-padding / 2);

            &:hover {
                background: $mauve; color: $mantle;
                cursor: pointer;
            }
        }

        &.closed {
            width: 3em;
            // animation: close 0.1s linear;
            transition: width 200ms ease-in-out;

            .toggle {
                &:hover {
                    color: $mauve;
                }
            }

            .sidebar-item-group {
                margin: 0; padding: 0;
            }

            .sidebar-item {
                margin: 0; padding: $global-padding;
            }
        }
    }

    @keyframes close {
        from {
            width: 12em;
        }

        to {
            width: 3em;
        }
    }

    @keyframes open {
        from {
            width: 3em;
        }

        to {
            width: 12em;
        }
    }
</style>