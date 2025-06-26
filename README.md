# Simulador de Bonificaciones

Aplicación web que permite simular la aplicación de bonificaciones para pedidos, demostrando la lógica de cálculo y la integración entre backend y frontend.

## 🚀 Tecnologías Utilizadas

### Backend
- **NestJS** - Framework de Node.js para construir aplicaciones del lado del servidor
- **TypeScript** - Lenguaje de programación tipado
- **Class Validator** - Validación de DTOs
- **CORS** - Configuración para permitir peticiones desde el frontend

### Frontend
- **Vue 3** - Framework progresivo de JavaScript
- **Composition API** - API de composición de Vue 3
- **Tailwind CSS** - Framework de CSS para estilos
- **Fetch API** - Para realizar peticiones HTTP al backend

### Herramientas de Desarrollo
- **Concurrently** - Para ejecutar múltiples comandos simultáneamente
- **TypeScript** - Lenguaje de programación tipado para el backend

## 📋 Prerrequisitos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- **Node.js** (versión 16 o superior)
- **npm** (viene incluido con Node.js)
- **NestJS CLI** (opcional, pero recomendado):
  ```bash
  npm install -g @nestjs/cli
  ```
- **Vue CLI** (opcional, pero recomendado):
  ```bash
  npm install -g @vue/cli
  ```

## 🛠️ Instalación y Configuración

### Instalación Completa (Método Recomendado)

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/silverblade34/prueba-technologies.git
   cd technologies
   ```

2. **Instalar todas las dependencias:**
   ```bash
   npm run install:all
   ```
   Este comando instalará las dependencias del proyecto raíz, backend y frontend automáticamente.

3. **Ejecutar la aplicación completa:**
   ```bash
   npm run dev
   ```
   Este comando levantará simultáneamente:
   - Backend (NestJS) en: `http://localhost:3000`
   - Frontend (Vue 3) en: `http://localhost:8080`

### Instalación Manual (Alternativa)

Si prefieres instalar por separado:

1. **Instalar dependencias del proyecto raíz:**
   ```bash
   npm install
   ```

2. **Instalar dependencias del backend:**
   ```bash
   cd backend
   npm install
   cd ..
   ```

3. **Instalar dependencias del frontend:**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

4. **Ejecutar la aplicación:**
   ```bash
   npm run dev
   ```

## 🚀 Scripts Disponibles

- **`npm run dev`** - Ejecuta frontend y backend simultáneamente en modo desarrollo
- **`npm run start`** - Alias de `npm run dev`
- **`npm run backend`** - Ejecuta solo el backend (NestJS)
- **`npm run frontend`** - Ejecuta solo el frontend (Vue 3)
- **`npm run install:all`** - Instala dependencias en todos los proyectos
- **`npm run build:all`** - Construye backend y frontend para producción
- **`npm run clean`** - Limpia todos los node_modules

1. **Agregar Productos:**
   - Ingresa el código del producto
   - Selecciona el grupo (JUGOS, AGUA, GASEOSAS, OTROS)
   - Especifica la cantidad
   - Haz clic en "Agregar"

2. **Simular Bonificación:**
   - Una vez agregados los productos, haz clic en "Simular Bonificación"
   - El sistema calculará las bonificaciones según las reglas establecidas

3. **Ver Resultados:**
   - Los productos bonificados se mostrarán con sus respectivas cantidades
   - Solo se consideran productos del grupo "JUGOS"

## 🧮 Lógica de Bonificación

### Reglas de Negocio

1. **Filtrado por Grupo:**
   - Solo los productos del grupo "JUGOS" califican para bonificación
   - Los demás grupos (AGUA, GASEOSAS, OTROS) no generan bonificaciones

2. **Cálculo de Bonificación:**
   - Por cada **10 unidades** compradas del grupo JUGOS → **2 unidades** de bonificación
   - Se utiliza `Math.floor()` para evitar bonificaciones fraccionarias

3. **Distribución Proporcional:**
   - La bonificación total se distribuye proporcionalmente entre todos los productos de JUGOS
   - La proporción se calcula: `cantidad_producto / total_unidades_jugos`
   - El último producto recibe cualquier bonificación restante para asegurar exactitud

### Ejemplo de Cálculo

```javascript
// Entrada
[
  { "codigo": "PROD_A", "grupo": "JUGOS", "cantidad": 12 },
  { "codigo": "PROD_B", "grupo": "JUGOS", "cantidad": 8 },
  { "codigo": "PROD_C", "grupo": "AGUA", "cantidad": 5 }
]

// Proceso
// 1. Filtrar solo JUGOS: PROD_A (12) + PROD_B (8) = 20 unidades
// 2. Bonificación total: Math.floor(20/10) * 2 = 4 unidades
// 3. Distribución proporcional:
//    - PROD_A: (12/20) * 4 = 2.4 → 2 unidades
//    - PROD_B: (8/20) * 4 = 1.6 → 2 unidades (ajuste final)

// Salida
[
  { "codigo": "PROD_A", "bonificacion": 2 },
  { "codigo": "PROD_B", "bonificacion": 2 }
]
```

## 🏗️ Estructura del Proyecto

```
technologies/
├── backend/                     # API NestJS
│   ├── src/
│   │   ├── modules/
│   │   │   └── bonificacion/
│   │   │       ├── dto/
│   │   │       │   ├── simular-bonificacion.dto.ts
│   │   │       │   └── bonificacion-response.dto.ts
│   │   │       ├── bonificacion.controller.ts
│   │   │       ├── bonificacion.service.ts
│   │   │       └── bonificacion.module.ts
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── package.json
│   └── tsconfig.json
├── frontend/                    # Aplicación Vue 3
│   ├── src/
│   │   ├── components/
│   │   ├── App.vue
│   │   └── main.js
│   ├── package.json
│   └── vue.config.js
├── package.json                 # Configuración raíz con scripts concurrently
└── README.md
```

## 🔗 API Endpoints

### POST /bonificacion/simular

Simula la aplicación de bonificaciones para un conjunto de productos.

**Request Body:**
```json
[
  {
    "codigo": "string",
    "grupo": "JUGOS" | "AGUA" | "GASEOSAS" | "OTROS",
    "cantidad": number
  }
]
```

**Response:**
```json
[
  {
    "codigo": "string",
    "bonificacion": number
  }
]
```

**Códigos de Estado:**
- `200 OK` - Simulación exitosa
- `400 Bad Request` - Datos de entrada inválidos
- `500 Internal Server Error` - Error interno del servidor

## 🧪 Casos de Prueba

### Caso 1: Bonificación Exitosa
```javascript
// Entrada
[
  { "codigo": "PROD_A", "grupo": "JUGOS", "cantidad": 15 },
  { "codigo": "PROD_B", "grupo": "JUGOS", "cantidad": 5 }
]

// Resultado esperado
[
  { "codigo": "PROD_A", "bonificacion": 3 },
  { "codigo": "PROD_B", "bonificacion": 1 }
]
```

### Caso 2: Sin Bonificación (Menos de 10 unidades)
```javascript
// Entrada
[
  { "codigo": "PROD_A", "grupo": "JUGOS", "cantidad": 5 }
]

// Resultado esperado
[
  { "codigo": "PROD_A", "bonificacion": 0 }
]
```

### Caso 3: Sin Productos de JUGOS
```javascript
// Entrada
[
  { "codigo": "PROD_A", "grupo": "AGUA", "cantidad": 20 }
]

// Resultado esperado
[]
```

## 🚨 Manejo de Errores

- **Validación de entrada:** Se validan los DTOs usando class-validator
- **Códigos duplicados:** El frontend previene la adición de productos con códigos duplicados
- **Errores de red:** Se muestran mensajes de error apropiados en la interfaz
- **Estados de carga:** Indicadores visuales durante las operaciones asíncronas

## 🔧 Configuración Adicional

### CORS
El backend está configurado para aceptar peticiones desde `http://localhost:8080` (puerto por defecto de Vue CLI).

### Puertos por Defecto
- **Backend (NestJS):** `http://localhost:3000`
- **Frontend (Vue 3):** `http://localhost:8080`
