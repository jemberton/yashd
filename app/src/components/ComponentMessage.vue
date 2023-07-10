<script lang="ts" setup>
import { useGlobalState } from '@/stores/globalState'
import { useMessages } from '@/stores/messages'

const globalState = useGlobalState()
const messages = useMessages()

const DEFAULT_TIMEOUT = 5000

interface Message {
  title: String,
  message: String,
  priority: String,
  icon: String,
  _id: String,
  timeout: number,
  timeoutID: number
}

defineProps({
    title: String,
    icon: String,
    message: String,
    priority: String,
    _id: String,
    timeout: Number,
    timeoutID: Number
})
</script>

<template>
    <div :class="'message ' + priority" @pointerenter="messages._pauseTimeout(timeoutID ? timeoutID : 0)" @pointerleave="messages._resumeTimeout(_id ? _id : '', timeout ? timeout : 0)">
        <div v-show="icon !== ''" class="icon">
            <font-awesome-icon :icon="['fas', icon]" />
        </div>
        <div class="details">
            <div class="title">{{ title }}</div>
            <div v-show="message !== ''" class="msg">{{ message }}</div>
        </div>
        <div class="close" @click="messages.delMessage(_id ? _id : '')">
            <font-awesome-icon :icon="['fas', 'circle-xmark']" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import '../assets/base.scss';

.message {
    margin: 0; padding: 0;
    display: flex; position: relative;
    flex-direction: row;
    border-radius: calc($global-border-radius * 2);
    font-size: 0.9em;
    border: 2px solid $subtext1;
    justify-content: start; align-items: center;
    max-width: 30em; width: 30em;

    background: $base; color: $subtext1;

    &:hover {
        .close { color: $surface1; }
    }

    &.info {
        border-color: $blue;
        color: $blue;
    }

    &.success {
        border-color: $green;
        color: $green;
    }

    &.warning {
        border-color: $yellow;
        color: $yellow;
    }

    &.error {
        border-color: $red;
        color: $red;
    }

    .icon {
        margin: 0; padding: calc($global-padding / 3);
        padding-right: 0;
        display: flex; position: relative;
        flex-direction: column;
        font-size: 3em;
    }

    .details {
        margin: 0; padding: $global-padding;
        display: flex; position: relative;
        flex-direction: column;
        flex-grow: 1;
        justify-content: center; align-items: start;
        gap: calc($global-padding / 2);

        .title {
            margin: 0; padding: 0;
            display: flex; position: relative;
            flex-direction: row;
            font-weight: bold;
            text-transform: uppercase;
        }

        .msg {
            margin: 0; padding: 0;
            display: flex; position: relative;
            flex-direction: column;
            color: $text;
        }
    }

    .close {
        margin: 0; padding: calc($global-padding / 2);
        padding-left: 0;
        display: flex; position: relative;
        flex-direction: column;
        font-size: 2em;
        color: transparent;

        &:hover {
            cursor: pointer;
            color: $red;
        }
    }
}

</style>../stores/messages