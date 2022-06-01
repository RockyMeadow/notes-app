<script setup lang="ts">
import useNotes from '@/composables/useNotes';
import Note from '@/types/Note';
import dayjs from 'dayjs';
import { computed } from 'vue';

const { notes, currentIndex, selectNote } = useNotes();
const orderedNotes = computed(() =>
  [...notes.value].sort((a: Note, b: Note) => {
    if (dayjs(a.updated_at).isAfter(dayjs(b.updated_at))) return -1;

    return 1;
  })
);
</script>

<template>
  <div v-if="notes.length">
    <div
      v-for="note in orderedNotes"
      :key="note.id"
      class="flex flex-col px-6 py-2 my-2 hover:bg-gray-200 rounded-xl"
      :class="{ 'bg-gray-200': notes[currentIndex]?.id === note.id }"
      @click="selectNote(note)"
    >
      <span class="max-w-full text-xl font-bold text-black text-ellipsis truncate overflow-x-hidden ...">{{
        note.title || 'New note'
      }}</span>
      <div class="flex flex-row">
        <span class="flex-1">{{ dayjs(note.updated_at).format('hh:mm a') }}</span>
        <span class="flex-1 text-slate-500 text-ellipsis overflow-hidden ...">{{
          note.content.split(/\n| /g)[0]
        }}</span>
      </div>
    </div>
  </div>
  <div v-else class="text-slate-400 flex justify-center items-center h-full text-lg">No notes</div>
</template>
