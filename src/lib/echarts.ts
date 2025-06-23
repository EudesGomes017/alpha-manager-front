import type { App } from 'vue'
import { use } from 'echarts/core'
import { VChart } from 'vue-echarts'
import {
    CanvasRenderer
} from 'echarts/renderers'
import {
    BarChart,
    PieChart,
    LineChart
} from 'echarts/charts'
import {
    GridComponent,
    TooltipComponent
} from 'echarts/components'

export function setupECharts(app: App) {
    use([
        CanvasRenderer,
        BarChart,
        PieChart,
        LineChart,
        GridComponent,
        TooltipComponent
    ])

    app.component('VChart', VChart)
    app.component('BarChart', VChart)
    app.component('PieChart', VChart)
    app.component('LineChart', VChart)
}