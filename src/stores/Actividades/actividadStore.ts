// src/stores/activitiesStore.ts
import { defineStore } from 'pinia'
import type { Actividad } from '@/types/Actividad'
import ActividadesService from '@/services/actividades/ActividadesService'

interface ActivitiesState {
  activities: Actividad[]
  loading: boolean
  error: string | null
}

export const actividadStore = defineStore('activities', {
  state: (): ActivitiesState => ({
    activities: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchAllActivities(token: string, active?: boolean) {
      this.loading = true
      this.error = null

      try {
        // Llama al servicio con el parámetro `active`
        const response = await ActividadesService.getAllActivities(token, 20, 0, 'ASC', active)
        this.activities = response // Asigna la respuesta al estado activities
        console.log('Activities fetched successfully:', response)
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Error fetching activities'
        console.error('Error fetching activities:', error)
      } finally {
        this.loading = false
      }
    }
  },

  getters: {
    getActivities: (state) => state.activities,
    isLoading: (state) => state.loading,
    getError: (state) => state.error
  }
})
