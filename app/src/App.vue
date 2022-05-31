<script setup lang="ts">
import NoteLayout from './components/NoteLayout.vue';
</script>

<template>
  <Suspense>
    <note-layout></note-layout>

    <template #fallback> Loading... </template>
  </Suspense>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
