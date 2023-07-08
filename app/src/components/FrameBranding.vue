<script lang="ts" setup>
    import { useLeftSidebar } from '@/stores/leftSidebar'
    const leftSidebar = useLeftSidebar()
</script>

<template>
    <div class="branding" @click="leftSidebar._enableToggle()">
        <font-awesome-icon :icon="['fas', 'gauge-high']" />
        <span>YASHD</span>
    </div>
</template>

<style lang="scss" scoped>
    @import '../assets/base.scss';

    .branding {
        margin: 0; padding: $global-padding;
        display: flex; position: relative;

        flex-direction: row;
        justify-content: center; align-items: center;
        gap: calc($global-padding / 2);

        svg {
            width: 1.5em; height: 1.5em;
            line-height: 1em;
        }

        span {
            font-size: 1.5em;
            line-height: 1em;
        }

        &:hover {
            cursor: pointer;
            color: $blue;
        }
    }
</style>