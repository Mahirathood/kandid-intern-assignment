import { create } from "zustand";

interface UIState {
  sidebarCollapsed: boolean;
  selectedLeadId: string | null;
  selectedCampaignId: string | null;
  searchQuery: string;
  filters: {
    status: string;
    campaign: string;
  };
  isLeadSheetOpen: boolean;

  toggleSidebar: () => void;
  setSelectedLead: (id: string | null) => void;
  openLeadSheet: () => void;
  closeLeadSheet: () => void;
  setSearchQuery: (query: string) => void;
  setFilters: (filters: { status?: string; campaign?: string }) => void;
  clearFilters: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarCollapsed: false,
  selectedLeadId: null,
  selectedCampaignId: null,
  searchQuery: "",
  filters: { status: "", campaign: "" },
  isLeadSheetOpen: false,

  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setSelectedLead: (id) => set({ selectedLeadId: id, isLeadSheetOpen: id !== null }),
  openLeadSheet: () => set({ isLeadSheetOpen: true }),
  closeLeadSheet: () => set({ isLeadSheetOpen: false }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),
  clearFilters: () =>
    set({
      searchQuery: "",
      filters: { status: "", campaign: "" },
    }),
}));
