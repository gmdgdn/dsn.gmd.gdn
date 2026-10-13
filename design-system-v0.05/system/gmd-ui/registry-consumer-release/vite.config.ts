import {resolve} from "node:path"
import {defineConfig} from "vite"
import react from "@vitejs/plugin-react"
import tailwind from "@tailwindcss/vite"
export default defineConfig({base:"./",plugins:[react(),tailwind()],resolve:{alias:{"@":resolve(import.meta.dirname,"src")}}})
