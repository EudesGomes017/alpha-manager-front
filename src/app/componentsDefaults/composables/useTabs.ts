import { inject, provide, ref, type Ref } from 'vue'

const TabsSymbol = Symbol()

export function provideTabs(defaultValue: string) {
    const currentTab = ref(defaultValue)

    provide(TabsSymbol, currentTab)

    return { currentTab }
}

export function useTabs(): Ref<string> {
    const currentTab = inject<Ref<string>>(TabsSymbol)
    if (!currentTab) {
        throw new Error('useTabs must be used within a <Tabs> component.')
    }
    return currentTab
}
