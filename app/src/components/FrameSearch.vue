<script setup lang="ts">
import { ref } from 'vue';

let bonk = ref(false)
const search_query = ref("")

function googleSearch(query: String) {
    if (query !== "") {
        window.open('http://google.com/search?q=' + query)
    } else {
        bonk.value = true
        setTimeout(() => { bonk.value = false }, 300)
    }
}

function keyHandler(event: any) {
    if (event.key === "Enter") {
        googleSearch(search_query.value)
        search_query.value = ""
    }
}

function searchHandler(direction: String) {
    switch (direction) {
        case "in":
            window.addEventListener('keydown', keyHandler);
            break;
        default:
            window.removeEventListener('keydown', keyHandler);
    }
}
</script>

<template>
    <div class="search-container">
        <div class="searchbar" :class="bonk === true ? 'bonk' : ''">
            <input type="text" name="search_query" placeholder="Google ..." v-model="search_query" @focusin="searchHandler('in')" @focusout="searchHandler('out')"/>
            <button @click="googleSearch(search_query)" :class="bonk === true ? 'bonk' : ''">
                <font-awesome-icon :icon="['fas', 'magnifying-glass']" />
            </button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    @import '../assets/base.scss';

    .search-container {
        margin: 0; padding: 0;
        display: flex; position: relative;
        flex-direction: row;
        justify-content: center; align-items: center;

        flex-grow: 1;
    }

    .searchbar {
        margin: calc($global-padding / 2); padding: 0;
        display: flex; position: relative;

        flex-direction: row;
        flex-grow: 1;
        justify-content: center; align-items: center;

        max-width: 40%; min-width: 12em;

        border: 2px solid transparent;
        border-radius: $global-border-radius;

        &.bonk {
            animation: shakeNegative 200ms ease-in-out;
            animation-iteration-count: 1;
        }

        input[type="text"] {
            margin: 0; padding: calc($global-padding / 2);
            background: transparent; color: $surface1;
            border: 1px solid transparent;
            outline: none;
            font-family: $global-font-family;
            border-top-left-radius: $global-border-radius;
            border-bottom-left-radius: $global-border-radius;
            display: flex;
            flex-grow: 1;
            min-width: 10em;
        }

        button {
            margin: 0; padding: calc($global-padding / 2);
            background: transparent; color: $surface1;
            border: 1px solid transparent;

            border-radius: $global-border-radius;
        }

        &:focus-within {
            border: 2px solid $mauve;

            input[type="text"] {
                background: $base; color: $text;
                min-width: 10em;
            }

            button {
                background: $base; color: $mauve;
                border-radius: $global-border-radius;
                border-top-left-radius: 0;
                border-bottom-left-radius: 0;

                &:hover {
                    cursor: pointer;
                    background: $mauve; color: $mantle;
                    border-radius: calc($global-border-radius - 3px);
                    border-top-left-radius: 0;
                    border-bottom-left-radius: 0;

                    // &.bonk {
                    //     animation: flashSearchButton 3s ease-in-out;
                    //     animation-iteration-count: 1;
                    // }
                }
            }
        }
    }
</style>