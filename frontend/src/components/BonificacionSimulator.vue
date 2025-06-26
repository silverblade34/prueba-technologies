<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <div class="bg-white p-6 rounded-lg shadow">
      <h2 class="text-xl font-bold mb-4 text-gray-800">Agregar Productos</h2>
      <form @submit.prevent="agregarProducto" class="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Código:</label>
          <input 
            v-model="nuevoProducto.codigo" 
            type="text" 
            required 
            placeholder="PROD_A"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Grupo:</label>
          <select v-model="nuevoProducto.grupo" required class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="">Seleccionar</option>
            <option value="JUGOS">JUGOS</option>
            <option value="AGUA">AGUA</option>
            <option value="GASEOSAS">GASEOSAS</option>
            <option value="OTROS">OTROS</option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Cantidad:</label>
          <input 
            v-model.number="nuevoProducto.cantidad" 
            type="number" 
            min="1" 
            required 
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md font-medium">
          Agregar
        </button>
      </form>
    </div>

    <div v-if="productos.length > 0" class="bg-white p-6 rounded-lg shadow">
      <h2 class="text-xl font-bold mb-4 text-gray-800">Productos en el Pedido</h2>
      <div class="space-y-2 mb-4">
        <div 
          v-for="(producto, index) in productos" 
          :key="index" 
          class="flex justify-between items-center p-3 bg-gray-50 rounded-md"
        >
          <span><strong>{{ producto.codigo }}</strong> - {{ producto.grupo }} - Cantidad: {{ producto.cantidad }}</span>
          <button 
            @click="eliminarProducto(index)" 
            class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
          >
            Eliminar
          </button>
        </div>
      </div>
      
      <div class="flex gap-3">
        <button 
          @click="simularBonificacion" 
          :disabled="loading"
          class="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-6 py-2 rounded-md font-medium"
        >
          {{ loading ? 'Simulando...' : 'Simular Bonificación' }}
        </button>
        <button 
          @click="limpiarTodo" 
          class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-md font-medium"
        >
          Limpiar Todo
        </button>
      </div>
    </div>

    <div v-if="bonificaciones.length > 0" class="bg-white p-6 rounded-lg shadow">
      <h2 class="text-xl font-bold mb-4 text-gray-800">Resultados de Bonificación</h2>
      <div class="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
        <p class="text-blue-800"><strong>Solo productos del grupo "JUGOS" califican</strong></p>
        <p class="text-blue-700">Por cada 10 unidades de jugos → 2 unidades de bonificación</p>
      </div>
      
      <div class="space-y-2">
        <div 
          v-for="bonificacion in bonificaciones" 
          :key="bonificacion.codigo"
          class="flex justify-between items-center p-4 bg-green-50 border border-green-200 rounded-md"
        >
          <span class="font-bold text-green-800">{{ bonificacion.codigo }}</span>
          <span class="text-green-700 font-medium">
            Bonificación: {{ bonificacion.bonificacion }} unidades
          </span>
        </div>
      </div>
    </div>

    <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
      <strong>Error:</strong> {{ error }}
    </div>

    <div v-if="simulacionRealizada && bonificaciones.length === 0" class="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-md">
      No se generaron bonificaciones. Necesitas al menos 10 unidades del grupo "JUGOS".
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'

export default {
  name: 'BonificacionSimulator',
  setup() {
    const productos = ref([])
    const bonificaciones = ref([])
    const loading = ref(false)
    const error = ref('')
    const simulacionRealizada = ref(false)
    
    const nuevoProducto = reactive({
      codigo: '',
      grupo: '',
      cantidad: 1
    })

    const agregarProducto = () => {
      if (productos.value.some(p => p.codigo === nuevoProducto.codigo)) {
        error.value = 'Ya existe un producto con ese código'
        return
      }

      productos.value.push({
        codigo: nuevoProducto.codigo,
        grupo: nuevoProducto.grupo,
        cantidad: nuevoProducto.cantidad
      })

      nuevoProducto.codigo = ''
      nuevoProducto.grupo = ''
      nuevoProducto.cantidad = 1
      
      error.value = ''
      
      bonificaciones.value = []
      simulacionRealizada.value = false
    }

    const eliminarProducto = (index) => {
      productos.value.splice(index, 1)
      bonificaciones.value = []
      simulacionRealizada.value = false
    }

    const limpiarTodo = () => {
      productos.value = []
      bonificaciones.value = []
      error.value = ''
      simulacionRealizada.value = false
    }

    const simularBonificacion = async () => {
      loading.value = true
      error.value = ''
      
      try {
        const response = await fetch('http://localhost:3000/bonificacion/simular', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productos.value)
        })

        if (!response.ok) {
          throw new Error(`Error del servidor: ${response.status}`)
        }

        const resultado = await response.json()
        bonificaciones.value = resultado
        simulacionRealizada.value = true
        
      } catch (err) {
        error.value = `Error al simular bonificación: ${err.message}`
        console.error('Error:', err)
      } finally {
        loading.value = false
      }
    }

    return {
      productos,
      bonificaciones,
      loading,
      error,
      simulacionRealizada,
      nuevoProducto,
      agregarProducto,
      eliminarProducto,
      limpiarTodo,
      simularBonificacion
    }
  }
}
</script>