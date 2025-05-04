import type { Updater } from '@tanstack/vue-table'
import type { Ref } from 'vue'

export function valueUpdater<T, U extends Updater<T>>(updaterOrValue: U, ref: Ref<T>) {
  ref.value
    = typeof updaterOrValue === 'function'
      ? updaterOrValue(ref.value)
      : updaterOrValue
}
