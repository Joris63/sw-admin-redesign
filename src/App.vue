<script setup lang="ts">
  import Navigation from './components/navigation/Navigation.vue';
  import NavigationTopBar from './components/navigation/NavigationTopBar.vue';
</script>

<template>
  <div class="flex h-screen overflow-hidden">
    <Navigation />
    <div class="w-full flex flex-col">
      <NavigationTopBar />
      <main class="flex-1 overflow-auto p-5 flex flex-col">
        <Card
          class="min-h-full shrink-0"
          :pt="{
            body: { class: 'grow flex flex-col' },
            content: { class: 'grow flex flex-col' },
          }"
        >
          <template #content>
            <RouterView />
          </template>
        </Card>
      </main>
    </div>
  </div>
</template>
