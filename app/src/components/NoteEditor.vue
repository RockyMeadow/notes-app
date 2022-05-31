<script setup lang="ts">
import useNotes from '@/composables/useNotes';
import dayjs from 'dayjs';
import { computed } from 'vue';

const { notes, currentIndex, addNote, updateNote } = useNotes();
const note = computed(() => notes.value[currentIndex.value]);
const creationDate = computed(() => dayjs(note.value.inserted_at).format('MMMM D, YYYY h:mm A'));

function save() {
  return note.value.id ? updateNote(note.value) : addNote(note.value);
}
</script>

<template>
  <div v-if="note" class="p-5 flex flex-col h-full">
    <button class="focus:outline-none" @click="save()">Save</button>
    <div v-if="note.inserted_at" class="flex justify-center items-center text-slate-400">
      <span>{{ creationDate }}</span>
    </div>
    <input
      v-model="note.title"
      type="text"
      class="flex-0 focus:outline-none text-xl font-bold mb-5"
      placeholder="Title"
    />
    <textarea v-model="note.content" class="flex-1 focus:outline-none" placeholder="Content"></textarea>
  </div>
</template>
