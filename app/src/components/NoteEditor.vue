<script setup lang="ts">
import useNotes from '@/composables/useNotes';
import dayjs from 'dayjs';
import { computed, ref } from 'vue';

const { notes, currentIndex, saveCurrentNote } = useNotes();
const note = computed(() => notes.value[currentIndex.value]);
const showCreationDate = ref(false);
const creationDate = computed(() => dayjs(note.value.inserted_at).format('MMMM D, YYYY h:mm A'));
const modificationDate = computed(() => dayjs(note.value.updated_at).format('MMMM D, YYYY h:mm A'));
</script>

<template>
  <div v-if="note" class="p-5 flex flex-col h-full">
    <button class="focus:outline-none" @click="saveCurrentNote()">Save</button>
    <div
      v-if="note.updated_at"
      class="flex justify-center items-center text-slate-400"
      @click="showCreationDate = !showCreationDate"
    >
      <span>{{ showCreationDate ? `Created at ${creationDate}` : modificationDate }}</span>
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
