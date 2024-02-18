import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        outDir: 'build',
    },
    //base: "/sudoku-react/", // needed for deployment that's not on the domains root path
    plugins: [react()],
})
