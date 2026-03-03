<script setup lang="ts">
  import { ref, computed, inject } from 'vue';
  import type { Ref } from 'vue';
  import type { CustomerData } from '@/types/customer';

  const customer = inject<Ref<CustomerData>>('customer')!;

  const geleverdNietBetaaldOpen = ref(true);
  const gereserveerdKredietOpen = ref(true);
  const kredietIngeplandOpen = ref(true);
  const kredietAankomendeOpen = ref(true);

  const geleverdNietBetaaldTotaal = computed(() =>
    customer.value.geleverdNietBetaald.reduce((s, i) => s + i.waarde, 0)
  );
  const vervaldatumOverschreden = computed(() =>
    customer.value.geleverdNietBetaald
      .filter((i) => i.vervaldatumOverschreden)
      .reduce((s, i) => s + i.waarde, 0)
  );
  const gereserveerdKredietTotaal = computed(() =>
    customer.value.gereserveerdKredietItems.reduce((s, i) => s + i.waarde, 0)
  );
  const kredietIngeplandTotaal = computed(() =>
    customer.value.kredietIngepland.reduce((s, i) => s + i.waarde, 0)
  );
  const kredietAankomendeTotal = computed(() =>
    customer.value.kredietAankomend.reduce((s, i) => s + i.waarde, 0)
  );
  const kredietResterend = computed(
    () =>
      customer.value.kredietlimiet -
      geleverdNietBetaaldTotaal.value -
      gereserveerdKredietTotaal.value
  );
</script>

<template>
  <div class="tab-scroll">
    <!-- Summary overview -->
    <div class="view-card">
      <div class="view-card-hdr">
        <span class="view-card-title">Overzicht</span>
      </div>
      <div class="kred-summary">
        <div class="kred-summary-col">
          <div class="kred-summary-hdr">Kredietlimiet overzicht</div>
          <div class="kred-sum-row">
            <span>Kredietlimiet</span>
            <span>€ {{ customer.kredietlimiet.toFixed(2) }}</span>
          </div>
          <div class="kred-sum-row">
            <span>Geleverd maar niet betaald</span>
            <span>€ {{ geleverdNietBetaaldTotaal.toFixed(2) }}</span>
          </div>
          <div class="kred-sum-row">
            <span>Gereserveerd krediet</span>
            <span>€ {{ gereserveerdKredietTotaal.toFixed(2) }}</span>
          </div>
          <div class="kred-sum-row kred-sum-row--total">
            <span>Krediet resterend</span>
            <span>€ {{ kredietResterend.toFixed(2) }}</span>
          </div>
        </div>
        <div class="kred-summary-sep" />
        <div class="kred-summary-col">
          <div class="kred-summary-hdr">Aankomende leveringen</div>
          <div class="kred-sum-row">
            <span>Ingeplande leveringen</span>
            <span>€ {{ kredietIngeplandTotaal.toFixed(2) }}</span>
          </div>
          <div class="kred-sum-row">
            <span>Aankomende leveringen</span>
            <span>€ {{ kredietAankomendeTotal.toFixed(2) }}</span>
          </div>
        </div>
        <div class="kred-summary-sep" />
        <div class="kred-summary-col">
          <div class="kred-summary-hdr">Bestellingen overzicht</div>
          <div class="kred-sum-row">
            <span>Gefactureerd</span>
            <span>€ {{ geleverdNietBetaaldTotaal.toFixed(2) }}</span>
          </div>
          <div class="kred-sum-row kred-sum-row--warn">
            <span>Vervaldatum overschreden</span>
            <span>€ {{ vervaldatumOverschreden.toFixed(2) }}</span>
          </div>
          <div class="kred-sum-row kred-sum-row--total">
            <span>Krediet resterend</span>
            <span>€ {{ kredietResterend.toFixed(2) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Geleverd maar niet betaald -->
    <div id="kred-geleverd" class="view-card">
      <div class="view-card-hdr">
        <div class="flex items-center gap-2">
          <span class="view-card-title">Geleverd maar niet betaald</span>
          <span class="kort-count-badge">{{ customer.geleverdNietBetaald.length }}</span>
        </div>
        <Button
          :icon="geleverdNietBetaaldOpen ? 'pi pi-chevron-up' : 'pi pi-chevron-down'"
          size="small"
          severity="secondary"
          text
          @click="geleverdNietBetaaldOpen = !geleverdNietBetaaldOpen"
        />
      </div>
      <Transition name="card-fade">
        <div v-if="geleverdNietBetaaldOpen">
          <DataTable :value="customer.geleverdNietBetaald" class="ce-table">
            <template #empty><span class="table-empty">Geen resultaten gevonden</span></template>
            <Column field="levering" header="Levering" />
            <Column field="factuurnummer" header="Factuurnummer" />
            <Column field="factuurdatum" header="Factuurdatum" />
            <Column field="vervaldatum" header="Vervaldatum" />
            <Column field="waarde" header="Waarde" body-class="col-right">
              <template #body="{ data }">€ {{ data.waarde.toFixed(2) }}</template>
            </Column>
            <template #footer>
              <div class="kred-table-footer">
                <div class="kred-footer-row">
                  <span>Totaal</span>
                  <span>€ {{ geleverdNietBetaaldTotaal.toFixed(2) }}</span>
                </div>
                <div class="kred-footer-row kred-footer-row--warn">
                  <span>Vervaldatum overschreden</span>
                  <span>€ {{ vervaldatumOverschreden.toFixed(2) }}</span>
                </div>
              </div>
            </template>
          </DataTable>
        </div>
      </Transition>
    </div>

    <!-- Gereserveerd krediet -->
    <div id="kred-gereserveerd" class="view-card">
      <div class="view-card-hdr">
        <div class="flex items-center gap-2">
          <span class="view-card-title">Gereserveerd krediet</span>
          <span class="kort-count-badge">{{ customer.gereserveerdKredietItems.length }}</span>
        </div>
        <Button
          :icon="gereserveerdKredietOpen ? 'pi pi-chevron-up' : 'pi pi-chevron-down'"
          size="small"
          severity="secondary"
          text
          @click="gereserveerdKredietOpen = !gereserveerdKredietOpen"
        />
      </div>
      <Transition name="card-fade">
        <div v-if="gereserveerdKredietOpen">
          <DataTable :value="customer.gereserveerdKredietItems" class="ce-table">
            <template #empty><span class="table-empty">Geen resultaten gevonden</span></template>
            <Column field="levering" header="Levering" />
            <Column field="status" header="Status" />
            <Column field="dropshipping" header="Dropshipping">
              <template #body="{ data }">
                <i
                  :class="
                    data.dropshipping
                      ? 'pi pi-check text-green-500'
                      : 'pi pi-minus text-surface-300'
                  "
                />
              </template>
            </Column>
            <Column field="ingeplandeDatum" header="Ingeplande datum" />
            <Column field="waarde" header="Waarde" body-class="col-right">
              <template #body="{ data }">€ {{ data.waarde.toFixed(2) }}</template>
            </Column>
            <template #footer>
              <div class="kred-table-footer">
                <div class="kred-footer-row">
                  <span>Totaal</span>
                  <span>€ {{ gereserveerdKredietTotaal.toFixed(2) }}</span>
                </div>
              </div>
            </template>
          </DataTable>
        </div>
      </Transition>
    </div>

    <!-- Ingeplande leveringen -->
    <div id="kred-ingepland" class="view-card">
      <div class="view-card-hdr">
        <div class="flex items-center gap-2">
          <span class="view-card-title">Ingeplande leveringen</span>
          <span class="kort-count-badge">{{ customer.kredietIngepland.length }}</span>
        </div>
        <Button
          :icon="kredietIngeplandOpen ? 'pi pi-chevron-up' : 'pi pi-chevron-down'"
          size="small"
          severity="secondary"
          text
          @click="kredietIngeplandOpen = !kredietIngeplandOpen"
        />
      </div>
      <Transition name="card-fade">
        <div v-if="kredietIngeplandOpen">
          <DataTable :value="customer.kredietIngepland" class="ce-table">
            <template #empty><span class="table-empty">Geen resultaten gevonden</span></template>
            <Column field="levering" header="Levering" />
            <Column field="status" header="Status" />
            <Column field="voltooid" header="Voltooid">
              <template #body="{ data }">
                <i
                  :class="
                    data.voltooid ? 'pi pi-check text-green-500' : 'pi pi-minus text-surface-300'
                  "
                />
              </template>
            </Column>
            <Column field="ingeplandeDatum" header="Ingeplande datum" />
            <Column field="waarde" header="Waarde" body-class="col-right">
              <template #body="{ data }">€ {{ data.waarde.toFixed(2) }}</template>
            </Column>
            <template #footer>
              <div class="kred-table-footer">
                <div class="kred-footer-row">
                  <span>Totaal</span>
                  <span>€ {{ kredietIngeplandTotaal.toFixed(2) }}</span>
                </div>
              </div>
            </template>
          </DataTable>
        </div>
      </Transition>
    </div>

    <!-- Aankomende leveringen -->
    <div id="kred-aankomend" class="view-card">
      <div class="view-card-hdr">
        <div class="flex items-center gap-2">
          <span class="view-card-title">Aankomende leveringen</span>
          <span class="kort-count-badge">{{ customer.kredietAankomend.length }}</span>
        </div>
        <Button
          :icon="kredietAankomendeOpen ? 'pi pi-chevron-up' : 'pi pi-chevron-down'"
          size="small"
          severity="secondary"
          text
          @click="kredietAankomendeOpen = !kredietAankomendeOpen"
        />
      </div>
      <Transition name="card-fade">
        <div v-if="kredietAankomendeOpen">
          <DataTable :value="customer.kredietAankomend" class="ce-table">
            <template #empty><span class="table-empty">Geen resultaten gevonden</span></template>
            <Column field="levering" header="Levering" />
            <Column field="ingeplandeDatum" header="Ingeplande datum" />
            <Column field="waarde" header="Waarde" body-class="col-right">
              <template #body="{ data }">€ {{ data.waarde.toFixed(2) }}</template>
            </Column>
            <template #footer>
              <div class="kred-table-footer">
                <div class="kred-footer-row">
                  <span>Totaal</span>
                  <span>€ {{ kredietAankomendeTotal.toFixed(2) }}</span>
                </div>
              </div>
            </template>
          </DataTable>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
  .kred-summary {
    display: grid;
    grid-template-columns: 1fr auto 1fr auto 1fr;
    padding: 1.25rem;
    gap: 0;
  }
  .kred-summary-sep {
    width: 1px;
    background: var(--p-gray-100);
    margin: 0 1.5rem;
  }
  .kred-summary-hdr {
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--p-surface-400);
    margin-bottom: 0.75rem;
  }
  .kred-sum-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.8125rem;
    color: var(--p-surface-600);
    padding: 0.25rem 0;
    border-bottom: 1px solid var(--p-gray-100);
  }
  .kred-sum-row:last-child {
    border-bottom: none;
  }
  .kred-sum-row--total {
    font-weight: 600;
    color: var(--p-surface-800);
    margin-top: 0.125rem;
  }
  .kred-sum-row--warn span:last-child {
    color: var(--p-red-500);
  }
  .kred-table-footer {
    padding: 0.625rem 1rem;
  }
  .kred-footer-row {
    display: flex;
    justify-content: space-between;
    font-size: 0.8125rem;
    color: var(--p-surface-600);
    padding: 0.1rem 0;
  }
  .kred-footer-row:first-child {
    font-weight: 600;
    color: var(--p-surface-800);
  }
  .kred-footer-row--warn {
    color: var(--p-red-500) !important;
    font-weight: 500;
  }
</style>
