<script lang="ts" setup>
import { useGlobalState } from '@/stores/globalState'

const globalState = useGlobalState()

console.log(globalState.messages)

</script>

<template>
    <div>ComponentMessage</div>
</template>