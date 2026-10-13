import { resolve } from "node:path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  base:"./",
  publicDir:false,
  plugins:[react(),tailwindcss()],
  resolve:{alias:{"@":resolve(import.meta.dirname,"./src")}},
  build:{outDir:"registry-dist/catalog",emptyOutDir:false,rolldownOptions:{input:"catalog.html"}},
})
