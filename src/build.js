import { execSync } from 'child_process'
import { existsSync, mkdirSync } from 'fs'

const distDir = '../dist'

if (!existsSync(distDir)) {
  console.log('📦 Creando el directorio dist...')
  mkdirSync(distDir, { recursive: true })

  console.log('⚙️ Compilando TypeScript...')
  try {
    execSync('npx tsc', { stdio: 'inherit' })
    console.log('✅ Compilación exitosa')
  } catch (error) {
    console.error('❌ Error en la compilación:', error)
    process.exit(1)
  }
} else {
  console.log('✅ El directorio dist ya existe. No es necesario compilar.')
}
