<script setup lang="ts">
import IconEdit from '~icons/ep/edit';
import IconDelete from '~icons/ep/delete';
import useNotes from '@/composables/useNotes';

const { addNewNote, removeCurrentNote } = useNotes();
</script>

<template>
  <nav class="border-b border-block-border">
    <div class="max-w-full px-4">
      <div class="flex items-center justify-between h-10">
        <div class="flex items-center">
          <button class="btn-icon">
            <icon-edit class="h-6 w-6 mr-6" @click="addNewNote"></icon-edit>
          </button>

          <button class="btn-icon">
            <icon-delete class="h-6 w-6" @click="removeCurrentNote"></icon-delete>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
