<script setup lang="ts">
// import { ref } from 'vue';

defineProps({
    iconLeft: String,
    buttonText: String,
    iconRight: String,
    href: String,
    tooltip: String,
    color: String,
    size: String,
    type: String
});

const emit = defineEmits(['buttonClick']);

function buttonClick() {
    emit('buttonClick');
}

</script>

<template>
    <a 
        :href="href" 
        class="Button" 
        :class="[
            color,
            size,
            type
        ]" 
        :title="tooltip" 
        @click="buttonClick"
    >
        <div v-if="iconLeft" class="iconLeft">
            <font-awesome-icon :icon="['fas', iconLeft]" />
        </div>
        <div v-if="buttonText" class="buttonText">{{ buttonText }}</div>
        <div v-if="iconRight" class="iconRight">
            <font-awesome-icon :icon="['fas', iconRight]" />
        </div>
    </a>
</template>

<style lang="scss" scoped>
@import '../assets/base.scss';

.Button {
    margin: calc($global-padding / 2); padding: calc($global-padding / 3);
    display: flex; position: relative;
    flex-direction: row;
    gap: 0.5em;
    justify-content: center; align-items: center;
    border-radius: $global-border-radius;
    text-decoration: none;

    &:hover { cursor: pointer; }

    &.xsmall { font-size: 0.6em; padding: calc($global-padding / 3); }
    &.small { font-size: 0.8em; padding: calc($global-padding / 3); }
    &.medium { font-size: 0.9em; padding: calc($global-padding / 3); }
    &.large { font-size: 1.1em; padding: calc($global-padding / 2); }
    &.xlarge { font-size: 1.3em; padding: calc($global-padding / 2); }

    &.outline {
        border: 2px solid transparent;
        &.blue { color: $blue; &:hover { border-color: $blue; } }
        &.mauve { color: $mauve; &:hover { border-color: $mauve; } }
        &.red { color: $red; &:hover { border-color: $red; } }
        &.pink { color: $pink; &:hover { border-color: $pink; } }
        &.green { color: $green; &:hover { border-color: $green; } }
        &.yellow { color: $yellow; &:hover { border-color: $yellow; } }
    }

    &.solid {
        background: $mantle; color: $text;
        &.blue { color: $blue; &:hover { background: $blue; color: $mantle; } }
        &.mauve { color: $mauve; &:hover { background: $mauve; color: $mantle; } }
        &.red { color: $red; &:hover { background: $red; color: $mantle; } }
        &.pink { color: $pink; &:hover { background: $pink; color: $mantle; } }
        &.green { color: $green; &:hover { background: $green; color: $mantle; } }
        &.yellow { color: $yellow; &:hover { background: $yellow; color: $mantle; } }
    }

    &.inverted {
        background: $base; color: $text;
        &.blue { background: $blue; color: $mantle; &:hover { background: $blue; color: $mantle; } }
        &.mauve { background: $mauve; color: $mantle; &:hover { background: $mauve; color: $mantle; } }
        &.red { background: $red; color: $mantle; &:hover { background: $red; color: $mantle; } }
        &.pink { background: $pink; color: $mantle; &:hover { background: $pink; color: $mantle; } }
        &.green { background: $green; color: $mantle; &:hover { background: $green; color: $mantle; } }
        &.yellow { background: $yellow; color: $mantle; &:hover { background: $yellow; color: $mantle; } }
    }

    .iconLeft {
        margin: 0; padding: 0;
        font-size: 1em;
        line-height: 1em;
    }

    .buttonText {
        font-size: 1em;
        text-transform: uppercase;
        font-weight: bold;
    }

    .iconRight {
        margin: 0; padding: 0;
        font-size: 1em;
        line-height: 1em;
    }
}
</style>