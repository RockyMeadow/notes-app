<script setup lang="ts">
import NotesList from './NotesList.vue';
import NoteEditor from './NoteEditor.vue';
import NoteHeader from './NoteHeader.vue';
import useNotes from '@/composables/useNotes';

const { fetchNotes } = useNotes();

await fetchNotes();
</script>
<template>
  <div class="h-screen flex flex-col">
    <note-header></note-header>

    <div class="h-full flex">
      <aside>
        <div class="flex flex-col w-56">
          <div class="flex flex-col p-2 overflow-y-auto">
            <notes-list></notes-list>
          </div>
        </div>
      </aside>
      <div class="flex flex-col flex-1 border-l border-r">
        <note-editor></note-editor>
      </div>
    </div>
  </div>
</template>
