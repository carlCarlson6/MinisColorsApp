import create from 'zustand'

export const enum SearchToDisplay {
    AllEquivalentPaints = "AllEquivalentPaints",
}

interface SearchPaintsState {
    allEquivalentPaintsSearchTerm: string,
    updateAllEquivalentPaintsSearchTerm: (newSearchTerm: string) => void
    searchToDisplay: SearchToDisplay|null,
    updateSearchToDisplay: (search: SearchToDisplay) => void,
}

export const useSearchPaintsStore = create<SearchPaintsState>((set) => ({
    allEquivalentPaintsSearchTerm: "",
    updateAllEquivalentPaintsSearchTerm: (searchTerm: string) => set(_ => ({allEquivalentPaintsSearchTerm: searchTerm })),
    searchToDisplay: null,
    updateSearchToDisplay: (search: SearchToDisplay) => set(_ => ({searchToDisplay: search}))
}));