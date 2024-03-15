import {defineConfig, externalizeDepsPlugin} from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import {createSvgIconsPlugin} from 'vite-plugin-svg-icons'
import {resolve} from "path"

export default defineConfig({
    main: {
        plugins: [externalizeDepsPlugin()]
    },
    preload: {
        plugins: [externalizeDepsPlugin()]
    },
    renderer: {
        resolve: {
            alias: {
                '@': resolve(__dirname, 'src/renderer/src')
            }
        },
        server: {
            proxy: {
                "/calculator": {
                    target: "http://localhost:8081",
                    changeOrigin: true
                }
            }
        },
        plugins: [
            vue(),
            // svg插件配置 vite-plugin-svg-icons
            createSvgIconsPlugin({
                iconDirs: [resolve(process.cwd(), 'src/renderer/src/assets/icons')],
                symbolId: "icon-[name]", // symbol的id
                inject: "body-first", // 插入的位置
                customDomId: "__svg__icons__dom__" // svg的id
            })
        ],
    }
})
