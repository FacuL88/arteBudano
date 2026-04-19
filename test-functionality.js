// Script de prueba para verificar funcionalidades de la galería de arte
console.log('=== Test de Funcionalidades de Galería de Arte ===');

// Test 1: Verificar imports y módulos
try {
    console.log('1. Verificando imports...');
    
    // Verificar que el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', runTests);
    } else {
        runTests();
    }
} catch (error) {
    console.error('Error en imports:', error);
}

function runTests() {
    console.log('Ejecutando pruebas...');
    
    // Test 2: Verificar elementos del DOM
    testDOMElements();
    
    // Test 3: Verificar carrito
    testCartFunctionality();
    
    // Test 4: Verificar navegación
    testNavigation();
    
    // Test 5: Verificar galería
    testGalleryFunctionality();
}

function testDOMElements() {
    console.log('2. Verificando elementos del DOM...');
    
    const requiredElements = [
        'app',
        'headerId', 
        'mainId',
        'menuToggle'
    ];
    
    let missing = [];
    requiredElements.forEach(id => {
        const element = document.getElementById(id);
        if (!element) {
            missing.push(id);
        }
    });
    
    if (missing.length === 0) {
        console.log('   Todos los elementos del DOM encontrados');
    } else {
        console.error('   Elementos faltantes:', missing);
    }
}

function testCartFunctionality() {
    console.log('3. Verificando funcionalidad del carrito...');
    
    try {
        // Verificar que el objeto cart exista globalmente
        if (typeof cart !== 'undefined') {
            console.log('   Objeto carrito encontrado');
            
            // Test agregar item
            const testItem = {
                id: 999,
                name: 'Test Item',
                price: 1000,
                stock: 1
            };
            
            cart.addItem(testItem);
            console.log('   Item agregado al carrito');
            
            // Verificar que se guardó en localStorage
            const savedCart = localStorage.getItem('artGalleryCart');
            if (savedCart) {
                console.log('   Carrito guardado en localStorage');
            }
            
            // Limpiar test
            cart.removeItem(999);
            console.log('   Test item eliminado');
            
        } else {
            console.error('   Objeto carrito no encontrado');
        }
    } catch (error) {
        console.error('   Error en funcionalidad del carrito:', error);
    }
}

function testNavigation() {
    console.log('4. Verificando navegación...');
    
    try {
        // Verificar menú toggle
        const menuToggle = document.getElementById('menuToggle');
        const header = document.getElementById('headerId');
        
        if (menuToggle && header) {
            console.log('   Menú toggle encontrado');
            
            // Test click del menú
            menuToggle.click();
            setTimeout(() => {
                if (header.classList.contains('open')) {
                    console.log('   Menú se abre correctamente');
                    header.classList.remove('open');
                    header.classList.add('closed');
                } else {
                    console.error('   El menú no se abre');
                }
            }, 100);
        } else {
            console.error('   Elementos de navegación no encontrados');
        }
    } catch (error) {
        console.error('   Error en navegación:', error);
    }
}

function testGalleryFunctionality() {
    console.log('5. Verificando funcionalidad de galería...');
    
    try {
        // Verificar que existan las funciones globales
        const requiredFunctions = [
            'showArtDetail',
            'addToCartFromGallery'
        ];
        
        requiredFunctions.forEach(funcName => {
            if (typeof window[funcName] === 'function') {
                console.log(`   Función ${funcName} disponible`);
            } else {
                console.error(`   Función ${funcName} no disponible`);
            }
        });
        
        // Verificar items de galería
        const galleryItems = document.querySelectorAll('.item');
        console.log(`   ${galleryItems.length} items encontrados en galería`);
        
    } catch (error) {
        console.error('   Error en funcionalidad de galería:', error);
    }
}

// Test de errores comunes
function checkCommonErrors() {
    console.log('6. Verificando errores comunes...');
    
    // Verificar errores de JavaScript
    const errors = [];
    
    // Check for undefined variables
    if (typeof array === 'undefined') {
        errors.push('Variable "array" no definida');
    }
    
    if (typeof cart === 'undefined') {
        errors.push('Variable "cart" no definida');
    }
    
    // Check for missing event listeners
    const menuToggle = document.getElementById('menuToggle');
    if (menuToggle && menuToggle.onclick === null) {
        errors.push('Event listener del menú no configurado');
    }
    
    if (errors.length === 0) {
        console.log('   No se encontraron errores comunes');
    } else {
        console.error('   Errores encontrados:', errors);
    }
}

// Ejecutar test de errores comunes
setTimeout(checkCommonErrors, 500);

console.log('=== Fin de Tests ===');
