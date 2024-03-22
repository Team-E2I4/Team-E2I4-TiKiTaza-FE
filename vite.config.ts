import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import mkcert from 'vite-plugin-mkcert';
import fs from 'fs'
// https://vitejs.dev/config/
export default defineConfig(({command})=>{
  return {plugins: [react(), mkcert(),{
    name: 'build-script',
        buildStart() {
          if (command === 'build') {
            const isDevelopment = process.env.NODE_ENV === 'development';
            const packageManager = isDevelopment ? 'yarn@4.1.0' : undefined;

            const packageJsonPath = './package.json';
            const packageJson = require(packageJsonPath);

            packageJson.packageManager = packageManager;

            // 변경된 package.json 파일을 저장합니다.
            fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
          }}
  }],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },}
});
