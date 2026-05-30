# Informe de Uso de Inteligencia Artificial

[cite_start]Este documento detalla el uso ético y limitado de herramientas de Inteligencia Artificial durante el desarrollo del proyecto "Sylvaria - Jardín de Hadas", cumpliendo con los requisitos de la consigna[cite: 211, 212]. Como desarrolladora única del proyecto, utilicé la IA como un asistente creativo para aspectos estéticos, reservando la totalidad de la arquitectura del código fuente y la lógica algorítmica para mi propio desarrollo manual.

[cite_start]A continuación, se responden las preguntas solicitadas para el informe[cite: 218]:

### [cite_start]1. ¿Qué herramientas de IA utilizaron? [cite: 219]
Utilicé exclusivamente Gemini como herramienta de procesamiento de lenguaje natural y asistencia creativa.

### [cite_start]2. ¿Para qué las utilizaron? [cite: 221]
La IA fue empleada como herramienta de apoyo visual y conceptualización. Específicamente para la curaduría visual, la generación de la paleta de colores desaturados (para el efecto de marchitamiento) y para la lluvia de ideas en la creación de mecánicas de gamificación.

### [cite_start]3. ¿Qué partes del proyecto fueron asistidas por IA? [cite: 223]
Fui asistida en el diseño conceptual del filtro CSS `grayscale` para el deterioro del hada, la redacción de prompts descriptivos para generar las imágenes de los avatares (Hada, Guerrero, Orco, Hechicera), y en estructurar teóricamente los umbrales de experiencia (XP). Ninguna parte del código fuente estructural (HTML, CSS, JavaScript) fue delegada a la herramienta.

### [cite_start]4. ¿Qué prompts o consultas les resultaron más útiles? [cite: 225]
* "Actúa como un diseñador UI y dame una paleta de colores hexadecimales que representen un bosque mágico que pierde su energía."
* "Dame descripciones detalladas para generar imágenes de avatares de fantasía en 3 niveles distintos de evolución."
* "¿Qué nombres de niveles de experiencia suenan bien para un nicho de gamificación y productividad?"

### [cite_start]5. ¿Qué respuestas de la IA tuvieron que corregir? [cite: 227]
La IA frecuentemente sugería implementar lógicas complejas de estado utilizando frameworks modernos (como React) o dependencias externas. Tuve que corregir y limitar constantemente estas directivas para mantener el proyecto de forma estricta en JavaScript Vanilla, respetando la consigna del módulo.

### [cite_start]6. ¿Qué problemas tuvieron al trabajar con IA? [cite: 229]
El mayor desafío fue evitar que la IA intentara escribir funciones lógicas en mi lugar. Tuve que ser sumamente restrictiva en las instrucciones para lograr que se limitara a proporcionarme ideas de diseño estético, sin interferir con mi manipulación del DOM ni con mis algoritmos de almacenamiento local.

### [cite_start]7. ¿Qué aprendieron durante el proceso? [cite: 231]
Aprendí a integrar la Inteligencia Artificial como un *moodboard* dinámico y asistente de *copywriting* en lugar de un motor de código. Esto reafirmó que el control de la persistencia de datos y la arquitectura del software deben depender completamente del criterio de la desarrolladora.

### [cite_start]8. ¿Qué partes del código puede explicar cada integrante? [cite: 232]
Al haber trabajado como desarrolladora única y autónoma en este proyecto, puedo explicar y fundamentar el 100% del código fuente. Esto incluye la inyección dinámica de tarjetas de misión, la lógica matemática del enfriamiento de la poción, la manipulación de clases CSS desde JS, y el funcionamiento del acumulador histórico de corrupción.

### [cite_start]9. ¿Qué decisiones tomó el grupo sin depender de la IA? [cite: 233]
Decidí de forma independiente toda la arquitectura de carpetas, el flujo de navegación entre los 3 documentos HTML y la validación matemática de los plazos de vencimiento (Date.now). Diseñé la estructura de los objetos del almacenamiento local aplicando estrictos controles para asegurar que los datos no se corrompieran, y tracé la curva de progresión del usuario manualmente, estructurando los niveles narrativos paso a paso con el mismo detalle que se emplea al desarrollar una escaleta de capítulos de un libro. 

### 10. ¿Hubo código sugerido por IA que descartaron? [cite_start]¿Por qué? [cite: 234]
Sí. En una fase temprana, la IA sugirió reestructurar el `localStorage` creando múltiples claves separadas en la memoria del navegador para cada misión individual. Descarté por completo ese código porque era altamente ineficiente y difícil de escalar. En su lugar, decidí de forma manual guardar todas las misiones empaquetadas en un único Array de objetos (`sylvaria_misiones`) para optimizar el rendimiento y facilitar el renderizado mediante bucles `forEach`.