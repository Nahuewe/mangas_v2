# 📚 Mi Colección de Manga

Una aplicación moderna para gestionar tu biblioteca personal de manga, construida con **React + Vite** y **TanStack Query**.

## ✨ Características

- 📖 **Gestión completa de mangas** - Agregar, editar, eliminar y visualizar tu colección
- 👨‍🎨 **Gestión de autores y dibujantes** - Base de datos completa de creadores
- 🔍 **Búsqueda inteligente** - Encuentra autores y dibujantes rápidamente
- ➕ **Creación rápida** - Agrega nuevos autores/dibujantes desde el formulario de manga
- ✅ **Checkbox "Autor es dibujante"** - Para cuando la misma persona hace ambos roles
- 📊 **Estadísticas detalladas** - Visualiza tu progreso de lectura
- 🎨 **Interfaz moderna** - Diseño limpio con Tailwind CSS
- ⚡ **Rendimiento optimizado** - Powered by Vite y TanStack Query

## 🚀 Tecnologías

- **React 18** - Biblioteca de UI
- **Vite** - Build tool ultra-rápido
- **TanStack Query v5** - Gestión de estado del servidor
- **Tailwind CSS** - Framework de CSS utility-first
- **Lucide React** - Iconos modernos
- **ESLint** - Linting de código

## 📦 Instalación

\`\`\`bash
# Clonar el repositorio
git clone <tu-repo>
cd manga-collection-app

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de la build
npm run preview
\`\`\`

## 🔧 Configuración

Crea un archivo `.env` basado en `.env.example`:

\`\`\`env
VITE_API_URL=http://localhost:8000/api
\`\`\`

## 📁 Estructura del Proyecto

\`\`\`
src/
├── components/
│   ├── ui/                 # Componentes reutilizables
│   ├── manga/             # Componentes específicos de manga
│   ├── autores/           # Gestión de autores
│   ├── dibujantes/        # Gestión de dibujantes
│   └── MangaApp.jsx       # Componente principal
├── hooks/
│   └── useMangas.js       # Custom hooks con TanStack Query
├── lib/
│   └── api.js             # Funciones de API
└── main.jsx               # Punto de entrada
\`\`\`

## 🎯 Funcionalidades Principales

### Gestión de Mangas
- ✅ Crear, editar y eliminar mangas
- ✅ Upload de imágenes de portada
- ✅ Estados: Leído, Completado, Leyendo, En pausa, Abandonado
- ✅ Tomos totales (número específico, "en emisión" o "tomo único")
- ✅ Tracking de tomos comprados y leídos
- ✅ Sinopsis y metadatos

### Gestión de Autores y Dibujantes
- ✅ CRUD completo para autores y dibujantes
- ✅ Búsqueda en tiempo real
- ✅ Biografías opcionales
- ✅ Creación rápida desde formulario de manga

### Características Especiales
- ✅ **Checkbox "Autor es dibujante"** - Sincroniza automáticamente los campos
- ✅ **Búsqueda con autocompletado** - Encuentra o crea nuevos autores/dibujantes
- ✅ **Validaciones inteligentes** - Tomos leídos ≤ comprados ≤ totales
- ✅ **Estadísticas visuales** - Gráficos de progreso y distribución

## 🔄 Integración con Backend

La aplicación está preparada para conectarse con una API Laravel. Las funciones de API en `src/lib/api.js` incluyen:

- Endpoints para mangas, autores y dibujantes
- Gestión de errores
- Configuración de CORS
- Variables de entorno para diferentes ambientes

## 🎨 Personalización

### Colores
Modifica `tailwind.config.js` para cambiar la paleta de colores:

\`\`\`js
theme: {
  extend: {
    colors: {
      primary: {
        500: '#tu-color-principal',
        // ...
      }
    }
  }
}
\`\`\`

### Animaciones
Las animaciones personalizadas están en `src/index.css`:

\`\`\`css
.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}
\`\`\`

## 📱 Responsive Design

La aplicación es completamente responsive:
- 📱 **Mobile**: 1 columna
- 📱 **Tablet**: 2-3 columnas
- 🖥️ **Desktop**: 4+ columnas

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🙏 Agradecimientos

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TanStack Query](https://tanstack.com/query)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
