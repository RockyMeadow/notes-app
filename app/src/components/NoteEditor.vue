<script setup lang="ts">
import useNotes from '@/composables/useNotes';
import dayjs from 'dayjs';
import { computed, ref, watch } from 'vue';
import { useDebounceFn } from '@vueuse/core';

let noteIdCache: number | undefined;
const { notes, currentIndex, saveCurrentNote } = useNotes();
const note = computed(() => notes.value[currentIndex.value]);
const showCreationDate = ref(false);
const creationDate = computed(() => dayjs(note.value.inserted_at).format('MMMM D, YYYY h:mm A'));
const modificationDate = computed(() => dayjs(note.value.updated_at).format('MMMM D, YYYY h:mm A'));
const debounceNoteUpdate = useDebounceFn(() => saveCurrentNote(), 400);

watch([() => note.value?.content, () => note.value?.title], () => {
  if (note.value?.id !== noteIdCache) {
    noteIdCache = note.value?.id;

    return;
  }

  debounceNoteUpdate();
});
</script>

<template>
  <div v-if="note" class="p-5 flex flex-col h-full">
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
