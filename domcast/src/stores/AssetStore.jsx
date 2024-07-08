import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const assetStore = create(
    persist(
        (set) => ({
        asset: {
            id: 0,
            type: 1,
            name: "",
            description: "",
            partNumber: 0,
            brand: "",
            supplier: "",
            supplierContact: "",
            quantity: 1,
            observations: "",
        },
        setAsset: (asset) => set({ asset }),
        resetAsset: () =>
            set({
            asset: {
                id: 0,
                type: 1,
                name: "",
                description: "",
                partNumber: 0,
                brand: "",
                supplier: "",
                supplierContact: "",
                quantity: 1,
                observations: "",
            },
            }),
        assets: [],
        setAssets: (assets) => set({ assets }),
        resetAssets: () => set({ assets: [] }),
        visibleRows: 1,
        setVisibleRows: (visibleRows) => set({ visibleRows }),
        resetVisibleRows: () => set({ visibleRows: 1 }),
        }),
        {
        name: "assetStore",
        getStorage: createJSONStorage(),
        }
    )

);