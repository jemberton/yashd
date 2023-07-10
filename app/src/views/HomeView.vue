<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Button from '../components/ComponentButton.vue'
import draggable from 'vuedraggable'
import { useGlobalState } from '@/stores/globalState'
import { useMessages } from '@/stores/messages'
import { v4 } from 'uuid'

const emit = defineEmits(['editToggle'])
const globalState = useGlobalState()
const messages = useMessages()

interface HomeItem {
  _id: String,
  title: String,
  url: String,
  target: String,
  description: String,
  icon: String,
  enabled: Boolean,
  order: Number
}

interface DeletedItem {
  _id: String
}

/**
 * ##################################################
 * # HomeView Variables
 * ##################################################
 */

let homeItems = ref([<HomeItem> {}])
let drag = false
let itemsDraggable = false
let deletedItems = ref([<DeletedItem> {}])
let newItem = ref(<HomeItem> {})
let editorTitleError = ref(false)
let editMode = ref("edit")

/**
 * ##################################################
 * # Utility Functions
 * ##################################################
 */

/**
 * #### Sets `newItem` to default values
 */
function _setNewItem() {
  newItem.value = {
    _id: "new_" + v4(),
    title: "",
    url: "",
    target: "_blank",
    description: "",
    icon: "/icons/generic.png",
    enabled: true,
    order: 0
  }
}

/**
 * ##################################################
 * # API Calls
 * ##################################################
 */

/**
 * #### Delete multiple `_id`s from the database via API call
 */
async function _deleteItems() {
  if (deletedItems.value.length > 0) {
    const res = await fetch('http://10.100.5.227:5172/api/deleteHomeItems', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(deletedItems.value)
    }).then(async res => {
      switch (res.status) {
        case 200:
          let resData = await res.json()
          if (resData.deletedCount === 1) {
            messages.addMessage({ title: "Item Deleted", message: `${ resData.deletedCount } item deleted.`, priority: "success", icon: "circle-info", _id: v4(), timeout: 5000, timeoutID: 0 })
          } else {
            messages.addMessage({ title: "Items Deleted", message: `${ resData.deletedCount } items deleted.`, priority: "success", icon: "circle-info", _id: v4(), timeout: 5000, timeoutID: 0 })
          }
          getHomeItems()
          break
        case 400:
          messages.addMessage({ title: "Error", message: "There was an error when trying to delete items. [400] Bad request", priority: "error", icon: "circle-xmark", _id: v4(), timeout: 0, timeoutID: 0 })
          break
        case 500:
          messages.addMessage({ title: "Error", message: "There was an error when trying to delete items. [500] Server failed", priority: "error", icon: "circle-xmark", _id: v4(), timeout: 0, timeoutID: 0 })
          break
        default:
          messages.addMessage({ title: "Error", message: "There was an error when trying to delete items. [?] Unknown response ", priority: "error", icon: "circle-xmark", _id: v4(), timeout: 0, timeoutID: 0 })
      }
    })
  }
}

async function _savePage() {
  emit('editToggle', 'home')
  itemsDraggable = false

  await _deleteItems()
  deletedItems.value = []

  const res = await fetch('http://10.100.5.227:5172/api/saveHomeItems', {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(homeItems.value)
  }).then(async res => {
    switch (res.status) {
        case 200:
          let resData = await res.json()
          if (resData.newItems > 1 ) {
            messages.addMessage({ title: "Page Saved", message: `${ resData.newItems } items added.`, priority: "success", icon: "circle-check", _id: v4(), timeout: 5000, timeoutID: 0 })
          } else if (resData.newItems === 1) {
            messages.addMessage({ title: "Page Saved", message: `${ resData.newItems } item added.`, priority: "success", icon: "circle-check", _id: v4(), timeout: 5000, timeoutID: 0 })
          } else {
            messages.addMessage({ title: "Page Saved", message: "", priority: "success", icon: "circle-check", _id: v4(), timeout: 5000, timeoutID: 0 })
          }
          break
        case 400:
          messages.addMessage({ title: "Error", message: "An error occurred when trying to save the page. [400] Bad request", priority: "error", icon: "circle-xmark", _id: v4(), timeout: 0, timeoutID: 0 })
          break
        case 500:
          messages.addMessage({ title: "Error", message: "An error occurred when trying to save the page. [500] Server fail", priority: "error", icon: "circle-xmark", _id: v4(), timeout: 0, timeoutID: 0 })
          break
        default:
          messages.addMessage({ title: "Error", message: "An error occurred when trying to save the page. [?] Unknown response", priority: "error", icon: "circle-xmark", _id: v4(), timeout: 0, timeoutID: 0 })
      }
  })

  getHomeItems()
}

/**
 * ##################################################
 * # HomeView Functions
 * ##################################################
 */

/**
* #### Add item to the delete queue
* @param itemID `<HomeItem>` `_id` to queue
*/
function _deleteItem(itemID: String) {
  if (itemID.slice(0,4) !== "new_") {
    deletedItems.value.push({ _id: itemID })
  }

  homeItems.value = homeItems.value.filter((e, i) => e._id !== itemID)
  messages.addMessage({ title: "Item Removed", message: "An item has been removed from the queue. Changes must be saved to persist.", priority: "warning", icon: "trash", _id: v4(), timeout: 5000, timeoutID: 0 })
}

/**
 * #### Adds HomeItem to editor queue.
 * *(Changes must be saved by user to commit)*
 */
function _addItem() {
  if (newItem.value.title === "") {
    editorTitleError.value = true
  } else {
    /**
     * TODO Validate the item and make sure we have what we need!
     */
    homeItems.value.push(newItem.value)
    messages.addMessage({ title: "Item Added", message: "A new item has been added to the queue. Changes must be saved to persist.", priority: "info", icon: "cubes-stacked", _id: v4(), timeout: 5000, timeoutID: 0 })
    editorTitleError.value = false
    _setNewItem()
    _closeEditor()
  }
}

async function _cancelPage() {
  emit('editToggle', 'home')
  itemsDraggable = !itemsDraggable
  deletedItems.value = []
  globalState.editor.open.value = false
  editorTitleError.value = false
  getHomeItems()
  messages.addMessage({ title: "Changes Not Saved", message: "", priority: "", icon: "circle-info", _id: v4(), timeout: 5000, timeoutID: 0 })
  //FIXME
}

/**
 * #### Saves changes made to one HomeItem.
 * *(Changes must be saved by user to commit)*
 */
function _saveItem() {
  /**
   * TODO Validate input data to form 
   */

  let newIndex = homeItems.value.findIndex(e => e._id === newItem.value._id)
  homeItems.value[newIndex] = newItem.value
  editorTitleError.value = false
  _setNewItem()
  _closeEditor()
}

/**
 * #### Filter `homeItems` > open the editor > and set edit mode to `edit`
 * @param _id `HomeItem` `_id`
 */
function _editItem(_id: String) {
  newItem.value = homeItems.value.filter((e, i) => e._id === _id)[0]
  globalState.editor.open.value = true
  editMode.value = 'edit'
}

/**
 * #### Close the HomeView editor and reset `newItem`
 */
function _closeEditor() {
  globalState.editor.open.value = false
  editorTitleError.value = false
  _setNewItem()
}

function _toggleEnabled(_id: String) {
  let thisItem = homeItems.value.filter((e, i) => e._id === _id)[0]
  thisItem.enabled = true
}

function _openItem(url: String="#", target: String="_blank") {
  window.open(url.toString(), target.toString())
}

/**
 * FIXME See below 
 * DEV ########################################################
 * DEV All below is the current "working" flow ... but needs
 * DEV to be integrated into the format above
 * DEV ########################################################
 */

async function getHomeItems() {
  const res = await fetch('http://10.100.5.227:5172/api/getHomeItems', {
    method: 'GET',
    headers: {},
  })

  const response = await res.json()
  const sortedItems = response.sort((a: HomeItem, b: HomeItem) => a.order > b.order)

  homeItems.value = sortedItems
}

function editPage() {
  emit('editToggle', 'home')
  itemsDraggable = globalState.focused.middleCenter.value
  editorTitleError.value = false
}

async function addNew() {
  // homeItems.value.push({ _id: "new_" + v4(), title: "New Widget", url: "#", target: "_blank", description: "A new unconfigured item", icon: "/icons/generic.png", enabled: true, order: 0 })
  globalState.editor.open.value = !globalState.editor.open.value
  editMode.value = 'add'
}

onMounted(() => {
  getHomeItems();
  deletedItems.value = []
  _setNewItem()
  editorTitleError.value = false
});
</script>

<template>
  <div class="editor-overlay" v-show="globalState.focused.middleCenter.value && globalState.editor.open.value">
    <div class="editor">
      <div class="editor-title">{{ editMode === 'edit' ? 'Edit Home Item' : 'Add Home Item' }}</div>
      <div class="editor-row">
        <div class="editor-row-key">Title</div>
        <div class="editor-row-value">
          <input type="text" name="newItemTitle" id="editor-newItemtitle" v-model="newItem.title" :class="editorTitleError ? 'error' : ''"/>
        </div>
      </div>
      <div class="editor-row bordered">
        <div class="editor-row-key">Description</div>
        <div class="editor-row-value">
          <input type="text" name="newItemDesc" id="editor-newItemDesc" v-model="newItem.description"/>
        </div>
      </div>
      <div class="editor-row">
        <div class="editor-row-key">URL</div>
        <div class="editor-row-value">
          <input type="text" name="newItemURL" id="editor-newItemURL" v-model="newItem.url" placeholder="https://www.google.com"/>
        </div>
      </div>
      <div class="editor-row">
        <div class="editor-row-key">Icon</div>
        <div class="editor-row-value">
          <input type="text" name="newItemIcon" id="editor-newItemIcon" v-model="newItem.icon" placeholder="/icons/generic.png"/>
        </div>
      </div>
      <div class="editor-row">
        <div class="editor-row-key">Target</div>
        <div class="editor-row-value">
          <input type="text" name="newItemTarget" id="editor-newItemTarget" v-model="newItem.target" placeholder="_blank/_self"/>
          <!-- <select v-model="newItem.target">
            <option disabled value="">Select Window Target</option>
            <option>_blank</option>
            <option>_self</option>
          </select> -->
        </div>
      </div>
      <div class="editor-row">
        <div class="editor-row-key">Enabled</div>
        <div class="editor-row-value">
          <input type="checkbox" name="newItemEnabled" id="editor-newItemEnabled" v-model="newItem.enabled"/>
        </div>
      </div>
      <div class="editor-buttons">
        <div class="editor-buttons-cancel" @click="_closeEditor()">Cancel</div>
        <div class="editor-buttons-save" @click="_saveItem()" v-show="editMode === 'edit'">Save</div>
        <div class="editor-buttons-save" @click="_addItem()" v-show="editMode === 'add'">Stage</div>
      </div>
    </div>
  </div>
  <div class="HomeView">
    <div class="HomeView-top">
      <Button v-show="globalState.focused.middleCenter.value" @buttonClick="addNew()" iconLeft="plus" tooltip="Add" size="large" color="green" type="solid" buttonText="Add"/>
      <div class="vertical-separator" v-show="globalState.focused.middleCenter.value"></div>
      <Button v-show="globalState.focused.middleCenter.value" @buttonClick="_savePage()" iconLeft="floppy-disk" tooltip="Save" size="large" color="mauve" type="solid" buttonText="Save"/>
      <Button v-show="globalState.focused.middleCenter.value" @buttonClick="_cancelPage()" iconLeft="ban" tooltip="Cancel" size="large" color="red" type="solid" buttonText="Cancel"/>
      <Button iconLeft="pen-to-square" @buttonClick="editPage()" tooltip="Edit" size="large" color="blue" type="solid" />
    </div>
    <div>
      <draggable
        v-model="homeItems"
        @start="drag=true"
        @end="drag=false"
        item-key="_id"
        class="homeItems"
        :disabled="itemsDraggable ? false : true"
        animation=200
        ghostClass="ghost"
      >
        <template #item="{element}" class="homeItems">
          <div v-show="globalState.focused.middleCenter.value ? true : element.enabled"  :class="element.enabled ? 'appCard' : 'appCard disabled'" :title="element.title">
            <div v-show="!element.enabled" class="appCard-disabled" title="Enable" @click="_toggleEnabled(element._id)">
              <font-awesome-icon :icon="['fas', 'eye-slash']" />
            </div>
            <div v-show="globalState.focused.middleCenter.value" class="appCard-delete" title="Delete" @click="_deleteItem(element._id)">
              <font-awesome-icon :icon="['fas', 'trash']" />
            </div>
            <div 
              v-if="globalState.focused.middleCenter.value ? true : element.enabled"
              :key="element._id"
              class="appCard-card"
              @click="globalState.focused.middleCenter.value ? _editItem(element._id) : _openItem(element.url, element.target)"
            >
              <div class="appCard-data">
                <img :src="element.icon" class="appCard-image">
                <div class="appCard-info">
                  <div class="appCard-info-title">{{ element.title }}</div>
                  <div class="appCard-info-desc">{{ element.description }}</div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </draggable>
      <div class="todo">Add Support for categories</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/base.scss';
.HomeView {
  margin: 0; padding: 0;
  display: flex; position: relative;
  flex-direction: column;
  flex-grow: 1;

  background: $base;

  .HomeView-top {
    margin: 0; padding: 0;
    display: flex; position: relative;
    flex-direction: row;
    justify-content: end; align-items: center;
    height: 3.75em;
    background: $mantle; color: $text;
  }
}

.homeItems {
  margin: 0; padding: $global-padding;
  display: flex; position: relative;
  flex-direction: row;
  flex-wrap: wrap;
  background: $surface0;
  gap: 1em;
  // display: grid; position: relative;
  // grid-template-columns: 1fr;

  .appCard {
    margin: 0; padding: 0;
    display: flex; position: relative;
    flex-direction: column;
    background: $crust; color: $text;
    border-radius: $global-border-radius;
    border: 2px solid $mantle;
    box-shadow: 0px 3px 3px 0px rgba(0,0,0,0.3);
    text-decoration: none;
    max-width: 22em; min-width: 22em;
    justify-content: center; align-items: start;

    @media screen and (max-width: 640px) {
      max-width: 6.5em; min-width: 6.5em;
    }

    .appCard-delete {
      margin: 0; padding: calc($global-padding / 2);
      display: flex; position: absolute;
      flex-direction: column;
      top: -0.5em; right: -0.5em;
      background: $mantle; color: $red;
      border-radius: 50%;
      border: 2px solid $red;
      z-index: 2;

      &:hover {
        background: $red;
        color: $mantle;
      }
    }

    .appCard-disabled {
      margin: 0; padding: calc($global-padding / 2);
      display: flex; position: absolute;
      flex-direction: column;
      top: -0.5em; right: 2.05em;
      background: $mantle; color: $blue;
      border-radius: 50%;
      border: 2px solid $blue;
      z-index: 2;

      &:hover {
        background: $blue;
        color: $mantle;
      }
    }

    .appCard-card {
      margin: 0; padding: calc($global-padding);
      display: flex; position: relative;
      justify-content: center; align-items: start;
      
      color: inherit;
    }

    .appCard-data {
      margin: 0; padding: 0;
      display: flex; position: relative;
      flex-direction: row;
      gap: calc($global-padding / 2);
      justify-content: center; align-items: center;
    }

    .appCard-image {
      margin: 0; padding: 0;
      display: flex; position: relative;
      flex-direction: column;
      max-width: 4em; max-height: 4em;
      width: 4em; height: 4em;
      justify-content: center; align-items: center;
    }

    .appCard-info {
      margin: 0; padding: calc($global-padding / 2);
      display: flex; position: relative;
      flex-direction: column;

      .appCard-info-title {
        text-transform: uppercase;
        font-weight: bold;
        color: $green;
      }

      .appCard-info-desc {
        font-size: 0.8em;
      }
    }

    @media screen and (max-width: 640px) {
      .appCard-info {
        display: none;
      }
    }

    &:hover {
      border-color: $blue;
      cursor: pointer;
    }

    &.disabled {
      .appCard-card {
        filter: grayscale(50) brightness(0.5);
      }
    }
  }
}

.editor-overlay {
  margin: 0; padding: 0;
  display: flex; position: absolute;
  flex-direction: column;
  justify-content: start; align-items: center;
  background: $mantle;
  top: 0; bottom: 0;
  left: 0; right: 0;
  z-index: 11;

  .editor {
    margin: 0; padding: 0;
    margin-top: calc($global-padding * 2);
    display: flex; position: relative;
    background: $crust; color: $text;
    flex-direction: column;
    // transform: translate(calc(100vw / 2 - 50%), calc(100vh / 2 - 100%));
    z-index: 12;
    border-radius: calc($global-border-radius * 2);
    box-shadow: $global-box-shadow;
    border: 2px solid $base;

    .editor-title {
      margin: 0; padding: $global-padding;
      margin-bottom: $global-padding;
      display: flex; position: relative;
      flex-direction: row;
      background: rgba(0,0,0,0.2); color: $green;
      font-weight: bold;
      justify-content: center; align-items: center;
      border-top-left-radius: calc($global-border-radius * 2);
      border-top-right-radius: calc($global-border-radius * 2);
      border-bottom: 2px solid rgba(0,0,0,0.1);
    }

    .editor-row {
      margin: 0; padding: 0;
      display: grid; position: relative;
      grid-template-columns: 1fr 2fr;
      grid-template-rows: auto;

      .editor-row-key {
        margin: 0; padding: calc($global-padding / 2) calc($global-padding / 2) calc($global-padding / 2) calc($global-padding * 2);
        display: flex; position: relative;
        flex-direction: row;
        justify-content: end; align-items: center;
        flex-grow: 1;
      }

      .editor-row-value {
        margin: 0; padding: calc($global-padding / 2) calc($global-padding * 2) calc($global-padding / 2) calc($global-padding / 2);
        display: flex; position: relative;
        flex-direction: row;
        justify-content: start; align-items: center;
        flex-grow: 1;

        input[type="text"] {
          margin: 0; padding: calc($global-padding / 1.5) calc($global-padding / 1.5);
          display: flex; position: relative;
          background: $mantle; color: $text;
          border: 2px solid rgba(0,0,0,0.5);
          outline: none;
          border-radius: $global-border-radius;
          width: 100%;
          box-shadow: inset 0px 0px 0px 1px $surface0;

          &::placeholder {
            color: $subtext1;
          }

          &:focus {
            border-color: $mauve;
            background: $base;
          }

          &.error {
            border-color: $red;
          }
        }

        input[type="checkbox"] {
          appearance: none;
          background-color: $base;
          font: inherit;
          width: 1.6em; height: 1.6em;
          border: 2px solid transparent;
          border-radius: $global-border-radius;
          display: grid;
          place-content: center;

          &::before {
            content: "";
            width: 1em; height: 1em;
            transform: scale(0);
            // box-shadow: inset 1em 1em $mauve;
            border-radius: calc($global-border-radius / 2);
            color: $mauve;
            background: transparent;

            transform-origin: bottom left;
          }

          &:checked {
            &::before {
              transform: scale(1);
              background: $mauve;
              transition: 120ms transform ease-in-out;
              clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
            }
          }

          &:focus {
            border-color: $mauve;
          }

          &:hover {
            cursor: pointer;
          }
        }

        select {
          margin: 0; padding: calc($global-padding / 1.5) calc($global-padding / 1.5);
          display: flex; position: relative;
          background: $mantle; color: $text;
          border: 2px solid rgba(0,0,0,0.5);
          outline: none;
          border-radius: $global-border-radius;
          width: 100%;
          box-shadow: inset 0px 0px 0px 1px $surface0;
        }
      }

      &.bordered {
        border-bottom: 2px solid $base;
        margin-bottom: calc($global-padding / 2);
        padding-bottom: calc($global-padding / 2);
      }
    } 

    .editor-buttons {
      margin: 0; padding: $global-padding calc($global-padding / 2);
      display: flex; position: relative;
      flex-direction: row;
      justify-content: center; align-items: center;
      gap: $global-padding;

      .editor-buttons-cancel {
        margin: 0; padding: 1em;
        background: transparent; color: $red;
        border-radius: $global-border-radius;

        &:hover {
          background: $red; color: $mantle;
        }
      }

      .editor-buttons-save {
        margin: 0; padding: 1em;
        background: transparent; color: $green;
        border-radius: $global-border-radius;

        &:hover {
          background: $green; color: $mantle;
        }
      }

      .editor-buttons-cancel, .editor-buttons-save {
        font-weight: bold;
        
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
}

.ghost {
  opacity: 0.5;
}

</style>
