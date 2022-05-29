<script setup lang="ts">
import useNotes from './composables/useNotes';
import supabase from './clients/supabase';

const { notes, getNotes } = useNotes(supabase);

getNotes();
</script>

<template>
  <div v-for="note in notes" :key="note.id">
    <span>{{ note.title }}</span>
    <span>{{ note.content }}</span>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
