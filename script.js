// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // Función para imprimir/descargar PDF
    const printBtn = document.getElementById('printBtn');
    if (printBtn) {
        printBtn.addEventListener('click', function() {
            window.print();
        });
    }

    // Animación suave al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar todas las secciones para animaciones
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Efectos interactivos para las habilidades
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(2deg)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Efecto de hover para trabajos
    const jobs = document.querySelectorAll('.job');
    jobs.forEach(job => {
        job.addEventListener('mouseenter', function() {
            this.style.borderLeftWidth = '8px';
        });
        
        job.addEventListener('mouseleave', function() {
            this.style.borderLeftWidth = '4px';
        });
    });

    // Contador animado para años de experiencia
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        
        updateCounter();
    }

    // Efecto de escritura para el título
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Aplicar efecto de escritura al título principal
    const mainTitle = document.querySelector('.header-info h1');
    if (mainTitle) {
        const originalText = mainTitle.textContent;
        typeWriter(mainTitle, originalText, 80);
    }

    // Función para alternar la visibilidad de descripciones de trabajo
    function toggleJobDescription(jobElement) {
        const description = jobElement.querySelector('.job-description');
        if (description.style.display === 'none') {
            description.style.display = 'block';
            description.style.animation = 'fadeInUp 0.5s ease-out';
        } else {
            description.style.display = 'none';
        }
    }

    // Smooth scroll para navegación interna (si se agregan enlaces)
    function smoothScroll(target) {
        const element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    // Función para exportar a PDF con mejor formato
    function exportToPDF() {
        // Ocultar elementos que no deben aparecer en PDF
        const printBtn = document.querySelector('.print-btn');
        if (printBtn) {
            printBtn.style.display = 'none';
        }

        // Configurar estilos para impresión
        document.body.style.background = 'white';
        
        // Ejecutar impresión
        window.print();
        
        // Restaurar elementos después de la impresión
        setTimeout(() => {
            if (printBtn) {
                printBtn.style.display = 'flex';
            }
            document.body.style.background = '';
        }, 1000);
    }

    // Mejorar la función del botón de impresión
    if (printBtn) {
        printBtn.removeEventListener('click', function() {
            window.print();
        });
        
        printBtn.addEventListener('click', exportToPDF);
    }

    // Efecto parallax suave para el header
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('.header');
        if (header) {
            header.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });

    // Función para destacar secciones al hacer scroll
    function highlightActiveSection() {
        const sections = document.querySelectorAll('.section');
        const scrollPos = window.scrollY + window.innerHeight / 2;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPos >= sectionTop && scrollPos <= sectionTop + sectionHeight) {
                section.style.borderLeft = '4px solid #7c3aed';
                section.style.paddingLeft = '20px';
                section.style.transition = 'all 0.3s ease';
            } else {
                section.style.borderLeft = 'none';
                section.style.paddingLeft = '0';
            }
        });
    }

    // Aplicar highlight de sección activa
    window.addEventListener('scroll', highlightActiveSection);

    // Inicializar tooltips para habilidades técnicas
    skillTags.forEach(tag => {
        tag.setAttribute('title', `Experiencia en ${tag.textContent}`);
    });

    // Console log para debug
    console.log('CV interactivo cargado correctamente');
    console.log('Funcionalidades activas: animaciones, efectos hover, impresión optimizada');
});

// Función para cambiar tema (opcional)
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-theme');
    
    // Guardar preferencia en localStorage
    const isDark = body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

// Cargar tema guardado
function loadSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
    }
}

// Aplicar tema guardado al cargar la página
document.addEventListener('DOMContentLoaded', loadSavedTheme);