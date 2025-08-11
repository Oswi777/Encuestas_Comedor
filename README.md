# Encuestas_Comedor
Propuesta Técnica – Sistema de Kiosco de Opinión con Encuestas Adaptativas
1. Introducción
El presente documento detalla la propuesta técnica para el desarrollo e implementación de un sistema de kiosco de opinión en el comedor de la empresa. Este sistema estará diseñado para recabar de forma eficiente la retroalimentación de los empleados mediante encuestas dinámicas y adaptativas, permitiendo obtener información más específica según la calificación seleccionada.
2. Objetivos del Sistema
- Implementar un sistema rápido, intuitivo y de fácil uso para los empleados.
- Capturar datos de satisfacción general y motivos específicos de la calificación.
- Optimizar el análisis de retroalimentación para tomar decisiones basadas en datos reales.
- Mantener un registro histórico de métricas de satisfacción y sus causas.
3. Flujo de Interacción del Usuario
El kiosco seguirá una lógica adaptativa, de la siguiente manera:
1. Pantalla inicial: pregunta principal con botones grandes (Excelente, Bueno, Regular, Malo).
2. Si el usuario selecciona 'Malo' o 'Regular': mostrar opciones como 'Comida fría', 'Cruda', 'Mal sabor', 'Poca variedad', 'Tardanza en servir', 'Otro'.
3. Si el usuario selecciona 'Bueno' o 'Excelente': mostrar opciones como 'Sabor', 'Variedad', 'Atención', 'Ambiente', 'Raciones adecuadas', 'Otro'.
4. Pantalla de agradecimiento y retorno automático a la pantalla inicial.

4. Componentes Técnicos
4.1 Hardware
- Pantalla táctil de 10'' a 15'' o tablet con soporte tipo kiosco.
- MiniPC o Raspberry Pi para ejecutar la aplicación.
- Conexión a internet (Wi-Fi o cable) para envío de datos.
- Fuente de alimentación constante.
- Carcasa robusta y de fácil limpieza.
4.2 Software
- Interfaz desarrollada en HTML/CSS/JavaScript o Flutter para modo kiosco.
- Base de datos MySQL o PostgreSQL para almacenamiento de respuestas.
- Lógica adaptativa para mostrar preguntas según la respuesta inicial.
- Panel de administración web para consultar métricas y exportar datos.
- Sistema de reportes con filtros por fecha, tipo de respuesta y motivo.
5. Plan de Implementación
Fase 1 – Análisis y Diseño
Recolección de requisitos, definición de métricas y diseño de la interfaz. Duración estimada: 
Fase 2 – Desarrollo del Prototipo
Programación de la aplicación, integración de la lógica adaptativa y diseño físico del kiosco. Duración estimada:
Fase 3 – Pruebas Piloto
Instalación del prototipo en el comedor y pruebas durante 2 semanas para validar su funcionamiento y usabilidad.
Fase 4 – Implementación Final
Fabricación e instalación del kiosco definitivo con todos los ajustes realizados. Duración estimada: 2 semanas.
Fase 5 – Seguimiento y Mantenimiento
Monitoreo de métricas, mantenimiento preventivo y mejoras de software según feedback.
6. Beneficios del Sistema
- Mayor precisión en la retroalimentación gracias a la encuesta adaptativa.
- Aumento en la participación de los empleados al ser un sistema rápido y fácil de usar.
- Información más detallada para identificar áreas específicas de mejora.
- Reducción del sesgo en las respuestas al capturar datos en el momento de la experiencia.
7. Conclusión
La implementación del kiosco de opinión con encuestas adaptativas representa una solución tecnológica eficaz y escalable para mejorar el servicio de comedor. Este sistema permitirá a la empresa contar con información precisa y en tiempo real, fomentando una cultura de mejora continua y satisfacción del empleado.
