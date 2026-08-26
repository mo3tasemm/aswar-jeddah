/**
 * Admin Home Sections API Service Layer
 * Live Endpoints:
 * 1. GET    /api/v1/admin/home-sections
 * 2. POST   /api/v1/admin/home-sections
 * 3. PUT    /api/v1/admin/home-sections/{id}
 * 4. DELETE /api/v1/admin/home-sections/{id}
 * 5. POST   /api/v1/admin/home-sections/reorder
 */

import { useApi } from './api'
import type { HomeSectionItem } from './homeSectionApiService'

export interface AdminHomeSectionPayload {
  type: string
  is_active?: boolean | number
  sort_order?: number
  data?: Record<string, any>
}

export const adminHomeSectionsApiService = {
  /**
   * Fetch all home sections for the admin panel
   */
  async getSections(): Promise<HomeSectionItem[]> {
    const api = useApi()
    const res = await api.get<any>('/api/v1/admin/home-sections')
    
    let rawList: any[] = []
    if (Array.isArray(res)) {
      rawList = res
    } else if (res && Array.isArray(res.data)) {
      rawList = res.data
    } else if (res && res.data && Array.isArray(res.data.sections)) {
      rawList = res.data.sections
    } else if (res && res.data && Array.isArray(res.data.data)) {
      rawList = res.data.data
    } else if (res && Array.isArray(res.sections)) {
      rawList = res.sections
    }

    return rawList.map((sec: any, index: number) => {
      let sectionData = sec.data
      if (typeof sectionData === 'string') {
        try {
          sectionData = JSON.parse(sectionData)
        } catch (e) {
          sectionData = {}
        }
      }

      const realId = sec.id !== undefined && sec.id !== null 
        ? sec.id 
        : (sec.section_id !== undefined && sec.section_id !== null ? sec.section_id : (sec._id || null))

      const realType = sec.type || (sectionData && sectionData.type) || 'hero_slider'

      return {
        ...sec,
        id: realId,
        type: realType,
        sort_order: sec.sort_order !== undefined ? Number(sec.sort_order) : index + 1,
        is_active: sec.is_active !== undefined ? (sec.is_active === 1 || sec.is_active === true || sec.is_active === '1' ? 1 : 0) : 1,
        data: sectionData || {}
      }
    }).sort((a: any, b: any) => (a.sort_order || 0) - (b.sort_order || 0))
  },

  /**
   * Create a new section
   */
  async createSection(payload: AdminHomeSectionPayload): Promise<HomeSectionItem> {
    const api = useApi()
    const res = await api.post<any>('/api/v1/admin/home-sections', {
      type: payload.type,
      is_active: payload.is_active !== undefined ? (payload.is_active ? 1 : 0) : 1,
      sort_order: payload.sort_order || 1,
      data: payload.data || {}
    })

    let createdItem: any = res
    if (res && res.data && typeof res.data === 'object' && !Array.isArray(res.data)) {
      createdItem = res.data.section || res.data
    } else if (res && res.section && typeof res.section === 'object') {
      createdItem = res.section
    }

    return createdItem
  },

  /**
   * Update an existing section
   */
  async updateSection(id: string | number, payload: Partial<AdminHomeSectionPayload>): Promise<any> {
    const api = useApi()
    const body: any = {}
    if (payload.type !== undefined) body.type = payload.type
    if (payload.is_active !== undefined) body.is_active = payload.is_active ? 1 : 0
    if (payload.sort_order !== undefined) body.sort_order = payload.sort_order
    if (payload.data !== undefined) body.data = payload.data

    return await api.put<any>(`/api/v1/admin/home-sections/${id}`, body)
  },

  /**
   * Save or Update a section (Auto-determines POST vs PUT based on database ID)
   */
  async saveOrUpdateSection(id: string | number | undefined | null, payload: AdminHomeSectionPayload): Promise<any> {
    const isTempOrMissingId = !id || (typeof id === 'string' && (id.startsWith('sec-') || isNaN(Number(id))))
    if (isTempOrMissingId) {
      return await this.createSection(payload)
    } else {
      return await this.updateSection(id, payload)
    }
  },

  /**
   * Delete a section
   */
  async deleteSection(id: string | number): Promise<any> {
    const api = useApi()
    return await api.delete<any>(`/api/v1/admin/home-sections/${id}`)
  },

  /**
   * Reorder sections
   */
  async reorderSections(orderedIds: (string | number)[] | { id: string | number; sort_order: number }[]): Promise<any> {
    const api = useApi()
    // Filter only valid real IDs to avoid sending temp IDs to reorder
    const validSections = Array.isArray(orderedIds) && typeof orderedIds[0] === 'object'
      ? (orderedIds as any[]).filter(item => item.id && !(typeof item.id === 'string' && item.id.startsWith('sec-')))
      : (orderedIds as (string | number)[]).filter(id => id && !(typeof id === 'string' && id.startsWith('sec-'))).map((id, index) => ({ id, sort_order: index + 1 }))

    const ids = validSections.map(s => s.id)

    if (ids.length === 0) return { status: true }

    return await api.post<any>('/api/v1/admin/home-sections/reorder', {
      ids,
      sections: validSections
    })
  }
}
