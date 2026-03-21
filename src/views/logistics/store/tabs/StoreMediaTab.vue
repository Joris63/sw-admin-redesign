<script setup lang="ts">
import { ref } from 'vue';
import EditableCard from '@/components/EditableCard.vue';

interface StoreMedia {
  heroImage: string;
  overviewImage: string;
  atmosphereImages: string[];
  google360Tour: string;
  youtubeVideo: string;
  [key: string]: any;
}

const props = defineProps<{
  store: StoreMedia;
}>();

const isEditingContent = ref(false);

const heroInput = ref<HTMLInputElement | null>(null);
const overviewInput = ref<HTMLInputElement | null>(null);
const sfeerInputs: (HTMLInputElement | null)[] = [null, null, null, null];
const draggingField = ref<string | null>(null);

function applyImageFile(file: File | undefined, setter: (url: string) => void) {
  if (file?.type.startsWith('image/')) setter(URL.createObjectURL(file));
}
</script>

<template>
  <!-- Afbeeldingen & media -->
  <EditableCard v-model="isEditingContent" title="Afbeeldingen & media">
    <template #view>
      <div class="view-card-body">
        <div class="fr-row fr-row--top">
          <span class="fr-label">Hero afbeelding</span>
          <img :src="store.heroImage" class="content-img" alt="Hero" />
        </div>
        <div class="fr-row fr-row--top">
          <span class="fr-label">Overzicht afbeelding</span>
          <img :src="store.overviewImage" class="content-img" alt="Overzicht" />
        </div>
        <div v-for="(img, i) in store.atmosphereImages" :key="i" class="fr-row fr-row--top">
          <span class="fr-label">Sfeerimpressie {{ i + 1 }}</span>
          <img v-if="img" :src="img" class="content-img" :alt="`Sfeerimpressie ${i + 1}`" />
          <span v-else class="fr-empty">Geen afbeelding</span>
        </div>
        <div class="fr-row">
          <span class="fr-label">Google 360 Tour</span>
          <span :class="store.google360Tour ? 'fr-value' : 'fr-empty'">{{ store.google360Tour || '—' }}</span>
        </div>
        <div class="fr-row">
          <span class="fr-label">YouTube video</span>
          <span :class="store.youtubeVideo ? 'fr-value' : 'fr-empty'">{{ store.youtubeVideo || '—' }}</span>
        </div>
      </div>
    </template>
    <template #edit>
      <div class="view-card-body">
        <!-- Hero afbeelding -->
        <div class="fr-row fr-row--top">
          <label class="fr-label">Hero afbeelding</label>
          <div class="img-upload-field">
            <div
              v-if="!store.heroImage"
              class="img-drop-zone"
              :class="{ 'img-drop-zone--over': draggingField === 'hero' }"
              @click="heroInput?.click()"
              @dragover.prevent="draggingField = 'hero'"
              @dragleave="draggingField = null"
              @drop.prevent="
                (e: DragEvent) => {
                  draggingField = null;
                  applyImageFile(e.dataTransfer?.files?.[0], (url) => (store.heroImage = url));
                }
              "
            >
              <i class="pi pi-image" style="font-size: 1.75rem" />
              <span>Sleep een afbeelding hierheen</span>
              <button class="img-select-btn" @click.stop="heroInput?.click()">of selecteer een bestand</button>
            </div>
            <div v-else class="img-file-row">
              <img :src="store.heroImage" class="img-file-thumb" alt="Hero" />
              <div class="flex flex-col gap-1">
                <span class="text-sm font-medium text-surface-700">Hero afbeelding</span>
                <button class="img-select-btn" @click="heroInput?.click()">Vervangen</button>
              </div>
              <button class="img-remove-btn" style="margin-left: auto" @click="store.heroImage = ''">
                <i class="pi pi-times" />
              </button>
            </div>
            <input
              ref="heroInput"
              type="file"
              accept="image/*"
              class="hidden"
              @change="
                (e: Event) =>
                  applyImageFile(
                    (e.target as HTMLInputElement).files?.[0],
                    (url) => (store.heroImage = url)
                  )
              "
            />
          </div>
        </div>
        <!-- Overzicht afbeelding -->
        <div class="fr-row fr-row--top">
          <label class="fr-label">Overzicht afbeelding</label>
          <div class="img-upload-field">
            <div
              v-if="!store.overviewImage"
              class="img-drop-zone"
              :class="{ 'img-drop-zone--over': draggingField === 'overview' }"
              @click="overviewInput?.click()"
              @dragover.prevent="draggingField = 'overview'"
              @dragleave="draggingField = null"
              @drop.prevent="
                (e: DragEvent) => {
                  draggingField = null;
                  applyImageFile(e.dataTransfer?.files?.[0], (url) => (store.overviewImage = url));
                }
              "
            >
              <i class="pi pi-image" style="font-size: 1.75rem" />
              <span>Sleep een afbeelding hierheen</span>
              <button class="img-select-btn" @click.stop="overviewInput?.click()">of selecteer een bestand</button>
            </div>
            <div v-else class="img-file-row">
              <img :src="store.overviewImage" class="img-file-thumb" alt="Overzicht" />
              <div class="flex flex-col gap-1">
                <span class="text-sm font-medium text-surface-700">Overzicht afbeelding</span>
                <button class="img-select-btn" @click="overviewInput?.click()">Vervangen</button>
              </div>
              <button class="img-remove-btn" style="margin-left: auto" @click="store.overviewImage = ''">
                <i class="pi pi-times" />
              </button>
            </div>
            <input
              ref="overviewInput"
              type="file"
              accept="image/*"
              class="hidden"
              @change="
                (e: Event) =>
                  applyImageFile(
                    (e.target as HTMLInputElement).files?.[0],
                    (url) => (store.overviewImage = url)
                  )
              "
            />
          </div>
        </div>
        <!-- Atmosphere images -->
        <div v-for="(img, i) in store.atmosphereImages" :key="i" class="fr-row fr-row--top">
          <label class="fr-label">Sfeerimpressie {{ i + 1 }}</label>
          <div class="img-upload-field">
            <div
              v-if="!img"
              class="img-drop-zone"
              :class="{ 'img-drop-zone--over': draggingField === `atmosphere-${i}` }"
              @click="sfeerInputs[i]?.click()"
              @dragover.prevent="draggingField = `atmosphere-${i}`"
              @dragleave="draggingField = null"
              @drop.prevent="
                (e: DragEvent) => {
                  draggingField = null;
                  applyImageFile(e.dataTransfer?.files?.[0], (url) => (store.atmosphereImages[i] = url));
                }
              "
            >
              <i class="pi pi-image" style="font-size: 1.75rem" />
              <span>Sleep een afbeelding hierheen</span>
              <button class="img-select-btn" @click.stop="sfeerInputs[i]?.click()">of selecteer een bestand</button>
            </div>
            <div v-else class="img-file-row">
              <img :src="img" class="img-file-thumb" :alt="`Sfeerimpressie ${i + 1}`" />
              <div class="flex flex-col gap-1">
                <span class="text-sm font-medium text-surface-700">Sfeerimpressie {{ i + 1 }}</span>
                <button class="img-select-btn" @click="sfeerInputs[i]?.click()">Vervangen</button>
              </div>
              <button class="img-remove-btn" style="margin-left: auto" @click="store.atmosphereImages[i] = ''">
                <i class="pi pi-times" />
              </button>
            </div>
            <input
              :ref="
                (el) => {
                  if (el) sfeerInputs[i] = el as HTMLInputElement;
                }
              "
              type="file"
              accept="image/*"
              class="hidden"
              @change="
                (e: Event) =>
                  applyImageFile(
                    (e.target as HTMLInputElement).files?.[0],
                    (url) => (store.atmosphereImages[i] = url)
                  )
              "
            />
          </div>
        </div>
        <!-- Google 360 Tour -->
        <div class="fr-row">
          <label class="fr-label">Google 360 Tour</label>
          <InputText v-model="store.google360Tour" class="w-full" placeholder="Voer een code in" />
        </div>
        <!-- YouTube video -->
        <div class="fr-row">
          <label class="fr-label">YouTube video</label>
          <InputText v-model="store.youtubeVideo" class="w-full" placeholder="https://youtu.be/..." />
        </div>
      </div>
    </template>
  </EditableCard>
</template>

<style scoped>
.content-img {
  width: 100%;
  max-width: 28rem;
  height: auto;
  border-radius: 0.5rem;
  border: 1px solid var(--p-gray-200);
  display: block;
}

.img-upload-field {
  flex: 1;
  max-width: 28rem;
}
.img-drop-zone {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.375rem;
  padding: 1.75rem 1.5rem;
  border: 2px dashed var(--p-gray-200);
  border-radius: 0.5rem;
  cursor: pointer;
  color: var(--p-gray-400);
  font-size: 0.875rem;
  text-align: center;
  transition:
    border-color 0.15s,
    background 0.15s;
}
.img-drop-zone:hover,
.img-drop-zone--over {
  border-color: var(--p-primary-300);
  background: var(--p-primary-50);
}
.img-select-btn {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--p-primary-600);
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: color 0.1s;
}
.img-select-btn:hover {
  color: var(--p-primary-800);
  text-decoration: underline;
}
.img-file-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: var(--p-gray-50);
  border: 1px solid var(--p-gray-100);
  border-radius: 0.5rem;
}
.img-file-thumb {
  width: 4.5rem;
  height: 3rem;
  object-fit: cover;
  border-radius: 0.375rem;
  flex-shrink: 0;
  border: 1px solid var(--p-gray-200);
}
.img-remove-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.375rem;
  height: 1.375rem;
  border-radius: 0.25rem;
  background: none;
  border: none;
  color: var(--p-surface-400);
  cursor: pointer;
  font-size: 0.75rem;
  flex-shrink: 0;
  transition:
    background 0.1s,
    color 0.1s;
}
.img-remove-btn:hover {
  background: var(--p-red-50);
  color: var(--p-red-500);
}
</style>
