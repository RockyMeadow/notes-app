<script setup lang="ts">
import useNotes from '@/composables/useNotes';
import dayjs from 'dayjs';

const { notes, currentIndex, selectNote } = useNotes();
</script>

<template>
  <div
    v-for="(note, index) in notes"
    :key="note.id"
    class="flex flex-col px-6 py-2 my-2 hover:bg-gray-200 rounded-xl"
    :class="{ 'bg-gray-200': currentIndex === index }"
    @click="selectNote(note)"
  >
    <span class="text-xl font-bold text-black text-ellipsis overflow-hidden ...">{{ note.title || 'New note' }}</span>
    <div class="flex flex-row">
      <span class="flex-1">{{ dayjs(note.inserted_at).format('hh:mm a') }}</span>
      <span class="flex-1 text-slate-500 text-ellipsis overflow-hidden ...">{{ note.content.split(/\n| /g)[0] }}</span>
    </div>
  </div>
</template>
