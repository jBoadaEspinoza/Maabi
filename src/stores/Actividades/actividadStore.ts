// src/stores/activitiesStore.ts
import { defineStore } from 'pinia'
import type { Actividad } from '@/types/Actividad'
import ActividadesService from '@/services/actividades/ActividadesService'

interface ActivitiesState {
  activities: Actividad[]
  loading: boolean
  error: string | null
  total: number

}

export const actividadStore = defineStore('activities', {
  state: (): ActivitiesState => ({
    activities: [],
    loading: false,
    error: null,
    total: 0

  }),

  actions: {
    async fetchAllActivities(
      token: string, 
      active?: boolean, 
      limit: number = 10, 
      skip: number = 0, 
      sort: 'ASC' | 'DESC' = 'ASC'
    ) {
      this.loading = true;
      this.error = null;
    
      try {
        // Call the service method with the necessary parameters
        const { activities, total } = await ActividadesService.getAllActivities(token, limit, skip, sort, active);
        
        // Update the store state with the fetched activities and total
        this.activities = activities;
        this.total = total;
        
        // Log success message if needed
        //console.log('Activities fetched successfully:', total);
      } catch (error: any) {
        // Capture and log any errors
        this.error = error.response?.data?.message || 'Error fetching activities';
        console.error('Error fetching activities:', error);
      } finally {
        // Ensure loading is set to false regardless of the outcome
        this.loading = false;
      }
    }
  },

  getters: {
    getActivities: (state) => state.activities,
    isLoading: (state) => state.loading,
    getError: (state) => state.error,
    getTotal: (state) => state.total // Agregado para acceder al total

  }
})
