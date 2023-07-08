<script lang="ts" setup>
    import { useRightSidebar } from '@/stores/rightSidebar'
    const rightSidebar = useRightSidebar()
</script>


<template>
    <div class="user-controls">
        <div class="button" title="Notifications">
            <font-awesome-icon :icon="['fas', 'bell']" />
        </div>
        <div class="button" title="Settings" @click="rightSidebar.toggleEnable()">
            <font-awesome-icon :icon="['fas', 'gear']" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import '../assets/base.scss';

    .user-controls {
        margin: 0; padding: 0;
        display: flex; position: relative;

        flex-direction: row;
        justify-content: center; align-items: center;

        .button {
            margin: 0; padding: $global-padding ;
            display: flex; position: relative;

            border-bottom: 2px solid transparent;

            &:hover {
                border-color: $mauve; color: $mauve;
                cursor: pointer;
            }
        }
    }
</style>