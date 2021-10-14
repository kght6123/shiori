<template>
  <button class="btn" type="button" @click="click">
    <slot></slot>
  </button>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'AtomsButton',
    emits: ['click'],
    setup(props, { /*attrs, slots,*/ emit }) {
      const click = (event: Event) => {
        console.log(event)
        // if (event.target instanceof HTMLButtonElement) {
        emit('click' /*event.target.value*/)
        // }
      }
      return { click }
    },
  })
</script>
