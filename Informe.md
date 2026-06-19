## **Universidad Peruana de Ciencias Aplicadas** 

## **INFORME DE LA TB3** 

CURSO REDES Y PROTOCOLOS DE COMUNICACIÓN 

Carrera de Ciencias de la Computación 

Sección: 17828 

|Sección: 17828<br>~~i~~|Sección: 17828<br>~~i~~|
|---|---|
|Alumnos:<br>~~i~~||
|Código<br>~~i~~|Nombres y apellidos<br>~~i~~|
|U202311021<br>~~i~~|Sergio Andres Saavedra Cervera<br>~~i~~|
|U201520327<br>~~i~~|Ballon Villar,DiegoEduardo<br>~~i~~|
|U202224501<br>~~i~~|Alessandro Daniel Bravo Castillo<br>~~i~~|
|U202423825<br>~~i~~|Peter Smith Pacherres Muñoz<br>~~i~~|



2026 

||**ÍNDICE**||
|---|---|---|
|1. RESUMEN||3|
|2. OBJETIVO||3|
|2.1. Objetivo General||3|
|2.2. Objetivos Específicos||4|
|3. DEFINICIÓN DE CASO DE ESTUDIO||4|
|4. ANÁLISIS||5|
|4.1. Usuarios Potenciales y Concurrentes||5|
|4.2. Transacciones y Volumen de Datos (Cobertura del servicio)||6|
|5. DIAGRAMA Y CUADROS COMPARATIVOS||7|
|5.1. COMPARATIVO DE SERVIDORES CLOUD:||7|
|5.2. INFORME TÉCNICO Y ECONÓMICO:||10|
|5.2.1. INFORME TÉCNICO:||10|
|5.2.2. INFORME ECONÓMICO:||16|
|5.3. CÁLCULOS||19|
|5.3.1. Transacciones por sensores||19|
|5.3.2. Calculo de Transmisión por Dispositivo||19|
|5.3.3. Volumen Transaccional de la Red||20|
|5.4. RED DE DATOS||21|
|5.5. CUMPLIMIENTO DE LA NORMATIVA EN|PERÚ|25|
|5.5.1. Espectro y Telecomunicaciones (MTC / OSIPTEL)||25|
|5.5.2. Gestión de Recursos Hídricos (ANA)||25|
|5.5.3. Protección de Datos Personales (Ley N.º 29733)||26|
|5.5.4. Seguridad y Ciberprotección (ISO|27001)|26|
|5.6. CONFIGURACIÓN EN CISCO PACKET TRACER||26|
|5.7. ARQUITECTURA DE LA RED.||37|
|5.7.1. Software||37|
|5.7.1.1. Sistemas Operativos||37|
|5.7.2. Motores de Bases de datos||39|
|5.7.2.1. Gestores de bases de datos||41|
|5.7.3. Contenedores:||43|
|5.7.4. Estimación del tamaño de transacción:||45|
|5.7.5. Estimación de costos de capa de datos||51|
|6. CONCLUSIONES||53|
|7. MEJORAS CONTINUAS:||54|
|8. REFERENCIAS BIBLIOGRÁFICAS||54|



## **1. RESUMEN** 

El presente estudio se centra en la evaluación, diseño y análisis comparativo de una arquitectura de infraestructura de red que integra el Internet de las Cosas (IoT) y servicios de cloud computing para optimizar el sector agroexportador en Ica, Perú. La elección de esta región responde a su posicionamiento como líder nacional en la exportación de uva de mesa, habiendo concentrado el 51% de las ventas totales del país durante la campaña 2025-2026, con envíos superiores a los 43 millones de cajas hacia mercados internacionales (Andina, 2026). No obstante, este dinamismo se ve condicionado por el desafío crítico de la escasez hídrica, lo que vuelve imperativa la implementación de soluciones tecnológicas que garanticen un ahorro del recurso hídrico de hasta el 35% mediante sistemas de riego inteligente basados en IoT (Mentado, 2021). 

La arquitectura propuesta contempla la integración de una red de sensores de campo destinados a la monitorización de la humedad del suelo, conductividad eléctrica y variables meteorológicas. La transmisión de datos en tiempo real se gestiona a través de protocolos de baja potencia como LoRaWAN y conectividad celular NB-IoT (Farmex, 2025; APIHA, 2026). Esta información es procesada en infraestructuras de nube para el desarrollo de modelos predictivos de riego y sistemas de alertas tempranas orientados a la toma de decisiones agrícola. El análisis técnico realizado evalúa a los proveedores de nube dominantes: Amazon Web Services, Microsoft Azure, Google Cloud Platform y Alibaba Cloud, examinando su cobertura regional y la disponibilidad de zonas de baja latencia en Sudamérica. 

Se ha priorizado el estudio de la latencia de red desde Lima y las zonas agrícolas de Ica hacia los centros de datos regionales. Los resultados obtenidos confirman que la operatividad de zonas locales en Lima ha reducido los tiempos de respuesta a niveles inferiores a los 30 ms (WonderNetwork, 2026; Holori, 2026). Finalmente, el informe presenta un análisis de rentabilidad que sustenta la viabilidad económica del proyecto, demostrando que la inversión es recuperable en periodos cortos gracias a la reducción sustancial de costos operativos en energía y recurso hídrico (APIHA, 2026). 

## **2. OBJETIVO** 

## **2.1. Objetivo General** 

El objetivo primordial de esta investigación técnica consiste en determinar la arquitectura de red y el proveedor de servicios de computación en la nube más adecuado para soportar un sistema de gestión hídrica inteligente en la región de Ica. Este sistema debe garantizar una disponibilidad de servicio del 99.9% (24x7) para proteger cultivos de alto valor económico cuya degradación fisiológica puede ocurrir en pocas horas ante fallas en el suministro de agua. 

## **2.2. Objetivos Específicos** 

Para alcanzar este fin, se establecen los siguientes objetivos específicos: 

- Diseñar una arquitectura de red IoT que permita la recolección, transmisión y procesamiento de datos en tiempo real, garantizando eficiencia energética, escalabilidad y cobertura en zonas agrícolas 

- Evaluar la capacidad de los proveedores Cloud (Amazon Web Services, Microsoft Azure, Google Cloud Platform, Alibaba Cloud y Oracle Cloud Infrastructure) para el procesamiento, almacenamiento y análisis de datos IoT, considerando latencia, disponibilidad, seguridad y costos. 

- Evaluar el impacto económico del sistema propuesto mediante un análisis costo-beneficio, considerando la reducción en el consumo de agua, energía y pérdidas productivas. 

- Analizar el impacto del sistema en la eficiencia del uso del recurso hídrico, estableciendo indicadores de desempeño como la reducción del consumo de agua y la mejora en la calidad del cultivo. 

## **3. DEFINICIÓN DE CASO DE ESTUDIO** 

La agricultura moderna en Ica ha dejado de ser una actividad tradicional para convertirse en un proceso industrializado de alta precisión. Con un PBI regional donde el agro representa el 15%, y un segmento moderno que emplea a más de la mitad de los trabajadores formales, la estabilidad de este sector es un pilar de la economía nacional (IPE, 2025). El caso de estudio se centra en la implementación de un sistema de monitoreo hídrico para fundos de uva de mesa de gran escala, donde la precisión del riego es el factor determinante para la calidad exportable del producto (FreshPlaza, 2024; Gridia, s. f.). 

El negocio propuesto se encuadra en el sector de servicios tecnológicos para la agroexportación. Se enfoca en solucionar la ineficiencia en el uso del agua subterránea, cuya extracción mediante pozos profundos conlleva altos costos energéticos (Gridia, s. f.). En Ica, la uva de mesa es el cultivo líder con más de 22,000 hectáreas sembradas, teniendo sus picos de exportación en los meses de diciembre y enero (FreshPlaza, 2024). Durante este periodo crítico, cualquier desviación en el riego puede causar estrés abiótico que afecte el color, tamaño y firmeza de la baya, comprometiendo contratos de exportación valorados en millones de dólares (Yara, s. f.). 

Las empresas que lideran este sector, como Sociedad Agrícola Rapel (9,453 toneladas exportadas en la última campaña) y Ecosac Agrícola, requieren sistemas que no solo recolecten datos, sino que ofrezcan inteligencia procesable para el personal de campo (Fluctuante, 2024). La transición hacia una agricultura 4.0 implica que el riego ya no se decida por calendarios fijos, 

sino por el estado hídrico real medido por sensores de humedad de suelo colocados a diferentes profundidades (30, 60 y 90 cm) para entender el movimiento del agua en el perfil del suelo (Farmex, 2025). 

## **Cobertura del servicio:** 

El servicio consiste en una plataforma integral de monitoreo y control automático. El alcance geográfico inicial cubre las provincias de Pisco, Chincha e Ica, específicamente en zonas de alta densidad agrícola como Villacurí y Salas Guadalupe (Andina, 2026; Agraria, 2026). 

|**Componente**|**Descripción Técnica**|
|---|---|
|Monitoreo de Campo|Sensores<br>de<br>humedad,<br>temperatura,<br>conductividad y radiación solar.|
|Control de Riego|Actuadores para apertura/cierre de válvulas<br>solenoides y control de variadores de<br>frecuencia en bombas de pozo.|
|Plataforma Cloud|Backend para procesamiento de datos, base<br>de datos de series temporales y modelos de<br>IA para predicción de evapotranspiración.|
|Interfaces de Usuario|Aplicación móvil para agrónomos y tablero<br>web<br>(Dashboard)<br>para<br>gerencia<br>de<br>producción.|



La solución cloud debe operar 24x7, dado que el riego suele realizarse en turnos nocturnos para optimizar costos eléctricos. Se estima una base de 400 usuarios concurrentes pertenecientes al staff agrícola de las empresas participantes y 50 usuarios de entidades reguladoras como Senasa (Senasa, 2025). El sistema debe gestionar la conexión de 2,500 dispositivos IoT, generando aproximadamente 7.2 millones de mensajes mensuales (APIHA, 2026). 

## **4. ANÁLISIS** 

## **4.1. Usuarios Potenciales y Concurrentes** 

El ecosistema de usuarios para un despliegue regional en Ica se estima de la siguiente manera: 

**Usuarios Directos (Staff Agrícola):** Se estima que cada gran agroexportadora tiene un equipo de 10 a 15 agrónomos de riego y 5 gerentes de operaciones. Con aproximadamente 20 grandes 

empresas participando, se proyecta una base de **400 usuarios concurrentes** en periodos de toma de decisiones (06:00 - 09:00 AM). 

**Usuarios Indirectos (Stakeholders):** Entidades como el SENASA y la ANA (Autoridad Nacional del Agua) podrían acceder a reportes agregados para la gestión de la cuenca hídrica, sumando unos **50 usuarios adicionales.** 

Dispositivos (IoT): Para una cobertura de 5,000 hectáreas iniciales, con una densidad de un nodo cada 2 hectáreas, el sistema debe gestionar la conexión de 3,750 dispositivos enviando datos cada 15 minutos. 

## **4.2. Transacciones y Volumen de Datos (Cobertura del servicio)** 

El diseño de la red debe soportar un flujo constante de mensajes MQTT (Message Queuing Telemetry Transport). 

|**Variable**|**Valor**|
|---|---|
|Dispositivos iniciales|3,750|
|Frecuencia de envío|4 veces por hora (cada 15 min)|
|Mensajes totales por día|3,750 x 4 x 24 = 360,000|
|Tamaño de carga (Payload)|512 bytes por mensaje|
|Volumen de datos diario|122.88 MB|
|Volumen de datos mensual|8.75 GB|



Aunque el volumen de datos no es masivo en términos de almacenamiento tradicional, la naturaleza de "series temporales" requiere bases de datos optimizadas para lecturas y escrituras rápidas, así como sistemas de ingestión capaces de manejar ráfagas de conexión si múltiples gateways reinician simultáneamente. 

La competencia entre hiperescaladores se ha intensificado, convirtiendo a Sudamérica en un mercado estratégico para servicios de baja latencia (S&P Global, 2026). 

- AWS: Destaca por su Local Zone en Lima, que permite latencias de un solo dígito para usuarios locales, extendiendo servicios de cómputo directamente al territorio peruano (Holori, 2026). 

- Microsoft Azure: Ha consolidado su presencia con la región Chile Central en Santiago, operativa desde 2025, ofreciendo una ruta geográfica óptima para Ica (Microsoft, 2025; López, 2026). 

- Google Cloud: Opera la región southamerica-west1 en Santiago, beneficiándose de cables submarinos propios como Curie para garantizar estabilidad (López, 2026; Google Cloud, 2026). 

- Alibaba Cloud: Lanzó su región en México (Querétaro) y planea su expansión a Brasil en 2026, ofreciendo precios altamente competitivos para el sector agrícola (Alibaba Cloud, 2025). 

## **5. DIAGRAMA Y CUADROS COMPARATIVOS** 

En esta sección se sintetizan los indicadores de gestión técnicos y económicos para facilitar la selección del proveedor cloud. 

## **5.1. COMPARATIVO DE SERVIDORES CLOUD:** 

|Tabla N°1: Latencias y Desempeño Cloud (Origen: Lima/Ica)|Tabla N°1: Latencias y Desempeño Cloud (Origen: Lima/Ica)|Tabla N°1: Latencias y Desempeño Cloud (Origen: Lima/Ica)|Tabla N°1: Latencias y Desempeño Cloud (Origen: Lima/Ica)|
|---|---|---|---|
|**Proveedor**|**Región / Zona**<br>**Local**|**Latencia**<br>**Promedio**<br>**(ms)**|**Calidad de Servicio e Impacto en el Fundo**|
|**Amazon**<br>**Web**<br>**Services**<br>**(AWS)**|Local Zone<br>Lima<br>(us-east-1-lim-<br>1a)|<10 ms|Excelente (Control Real-Time): Único que<br>permite control instantáneo de variadores de<br>bombas y cierre de válvulas ante fugas críticas.|
|**Microsoft**<br>**Azure**|Chile Central<br>(Santiago)|29 - 30 ms|Muy Buena (Alertas Críticas): Ideal para<br>procesar alertas de estrés hídrico y telemetría<br>de alta frecuencia sin retardos perceptibles .|
|**Google**<br>**Cloud**<br>**(GCP)**|southamerica-<br>west1<br>(Santiago)|29 - 30 ms|Muy Buena (Analítica Rápida): Excelente para el<br>procesamiento de modelos de inteligencia<br>artificial que requieren respuestas rápidas para<br>dashboards operativos.|



|**Alibaba**<br>**Cloud**|Querétaro<br>(México)|112 - 130 ms|Regular (Asíncrono): Solo se recomienda para<br>análisis de datos históricos a largo plazo o<br>tareas que no requieran interactividad<br>instantánea.|
|---|---|---|---|



Decisión: De estos 4 servicios se optó por usar AWS, porque tiene la menor latencia con < 10ms, además de tener una Zona Local en Lima para el Perú. 

|Tabla N°2: Comparativa Técnica de Servicios Específicos|Tabla N°2: Comparativa Técnica de Servicios Específicos|Tabla N°2: Comparativa Técnica de Servicios Específicos|Tabla N°2: Comparativa Técnica de Servicios Específicos|Tabla N°2: Comparativa Técnica de Servicios Específicos|Tabla N°2: Comparativa Técnica de Servicios Específicos|
|---|---|---|---|---|---|
|**Criterio**|**AWS**|**Microsoft**<br>**Azure**|**Google Cloud**|**Alibaba Cloud**|**Oracle Cloud**|
|**Región de**<br>**Baja Latencia**|Local Zone<br>Lima / São<br>Paulo|Chile Central|Santiago<br>(Chile)|Querétaro<br>(México)|São Paulo<br>(Brasil)|
|**Servicio de**<br>**Ingestión**|AWS IoT Core|Azure IoT<br>Hub|Pub/Sub (IoT<br>Core<br>deprecado)|IoT Platform|OCI Streaming /<br>IoT Service|
|**Seguridad**|IAM / AWS<br>Shield|Active<br>Directory /<br>Defender|IAM / Cloud<br>Armour|Resource<br>Access<br>Management|IAM / Cloud<br>Guard|
|**Análisis de**<br>**Datos**|Redshift /<br>Kinesis|Synapse /<br>Stream<br>Analytics|BigQuery /<br>Dataflow|MaxCompute /<br>DataHub|<br>Autonomous<br>Data<br>Warehouse /<br>Data Flow|
|**SLA del**<br>**Servicio IoT**|99.9%|99.9%|N/A<br>(Ecosistema)|99.9%|99.9%|



|Tabla N°2: Comparativa Técnica de Servicios Específicos|Tabla N°2: Comparativa Técnica de Servicios Específicos|Tabla N°2: Comparativa Técnica de Servicios Específicos|Tabla N°2: Comparativa Técnica de Servicios Específicos|Tabla N°2: Comparativa Técnica de Servicios Específicos|Tabla N°2: Comparativa Técnica de Servicios Específicos|
|---|---|---|---|---|---|
|**Protocolos**<br>**soportados**|MQTT, HTTP,<br>LoRaWAN|MQTT, AMQP,<br>HTTP|MQTT, HTTP|MQTT, HTTP|MQTT, HTTP|
|**Capacidad de**<br>**Edge**|AWS IoT<br>Greengrass|Azure IoT<br>Edge|Google<br>Anthos|Link IoT Edge|Link IoT Edge|
|**Integración**<br>**ERP/BI**|Alta<br>(SAP/QuickSig<br>ht)|Muy Alta<br>(Excel/Power<br>BI)|Alta (Looker)|Media (DataV)|Media (DataV)|
|**Soporte Local**<br>**en Perú**|5 de 5|5 de 5|4 de 5|2 de 5|3 de 5|



Decisión: Se puede observar como los servicios de nube AWS y Microsoft Azure son más convenientes de usar por su gran soporte que hay en el Perú. 

La comparación económica se basa en modelos de "Pago por Uso" (On-Demand) y "Compromiso de Uso" (CUD/RI) para el año 2026. 

|Tabla N°3: Comparativa Económica de Cómputo (Instancias 2 vCPU,<br>4-8 GB RAM)|Tabla N°3: Comparativa Económica de Cómputo (Instancias 2 vCPU,<br>4-8 GB RAM)|Tabla N°3: Comparativa Económica de Cómputo (Instancias 2 vCPU,<br>4-8 GB RAM)|Tabla N°3: Comparativa Económica de Cómputo (Instancias 2 vCPU,<br>4-8 GB RAM)|
|---|---|---|---|
|**Modelo de Instancia**|**Precio por Hora**<br>**(On-Demand)**|**Precio Mensual**<br>**(Estimado)**|**Ahorro con Reserva**<br>**(1-3 años)**|
|**AWS t3.medium**|0.0672$|48.38$|37% - 57%|
|**Azure D2s v5**|0.0960$|70.08$|33% - 62%|
|**GCP n2-standard-2**|0.0971$|69.91$|37% - 60%|
|**Alibaba g8a.large**|0.0400$|28.80$|Hasta 35%|
|**Oracle**<br>**VM.Standard.E3.Flex**|0.0500$|36.00$|30% - 50%|



Decisión: Los precios de AWS corresponden a la región de Sao Paulo; el uso de Local Zones en Lima puede conllevar un premium del 10-20% sobre el precio base. 

Considerando un despliegue de 3,7500 sensores enviando 360,000 mensajes diarios (17.1 millones de mensajes al mes). 

|Tabla N°4: Cálculo de Costo de Mensajería IoT|Tabla N°4: Cálculo de Costo de Mensajería IoT|Tabla N°4: Cálculo de Costo de Mensajería IoT|Tabla N°4: Cálculo de Costo de Mensajería IoT|
|---|---|---|---|
|**Proveedor**|**Tarifa por 1M**<br>**mensajes**|**Costo Mensual**<br>**Ingestión**|**Beneficios Incluidos**|
|**AWS IoT Core**|1.00$|7.20$|Capa gratuita de 500k<br>mensajes/mes por 12<br>meses.|
|**Azure IoT Hub**|0.80$ (prom.)|5.76$|Edición gratuita hasta<br>8,000 mensajes/día.|
|**Alibaba Cloud IoT**|0.80$|4.96$|El primer millón de<br>mensajes es gratis<br>cada mes.|
|**Google Cloud**<br>**(Pub/Sub)**|0.45$|3.24$|Tarifa por 1M de<br>mensajes|



Decisión: De estos tres servicios se optó por usar AWS, porque tiene un gran soporte para el Perú y los precios que ofrecen por su uso, ayudan a reducir los gastos a largo plazo. 

## **5.2. INFORME TÉCNICO Y ECONÓMICO:** 

## **5.2.1. INFORME TÉCNICO:** 

- **Sensores IoT de Campo:** Dispositivos de precisión instalados en los fundos de Ica para medir humedad del suelo (a profundidades de 30, 60 y 90 cm), conductividad eléctrica, temperatura y radiación solar (Farmex, 2025). Estos nodos están diseñados para operar con bajo consumo de energía en entornos agrícolas exigentes. 

|Tabla N°5: Especificaciones Técnicas de Sensores IoT Recomendados|Tabla N°5: Especificaciones Técnicas de Sensores IoT Recomendados|Tabla N°5: Especificaciones Técnicas de Sensores IoT Recomendados|Tabla N°5: Especificaciones Técnicas de Sensores IoT Recomendados|Tabla N°5: Especificaciones Técnicas de Sensores IoT Recomendados|Tabla N°5: Especificaciones Técnicas de Sensores IoT Recomendados|
|---|---|---|---|---|---|
|**Tipo de Sensor**|**Modelo**|**Tecnología**|**Precisión**<br>**/**<br>**Rango**|**Protocolo**<br>**/ Interfaz**|**Costo**<br>**(USD)**|



Decisión: El sensor SoilVue 10 utiliza tecnología TDR para medir el perfil de humedad a profundidades de hasta 1 metro con un solo dispositivo, minimizando el impacto de la instalación. Por otro lado, el sensor Truebner SMT100, basado en TDT, opera a frecuencias superiores a 150 MHz, lo que lo hace virtualmente inmune a las fluctuaciones de salinidad del suelo comunes tras el fertirriego. Para el cálculo de la evapotranspiración de referencia ($ETo$), es indispensable medir la radiación solar neta. El piranómetro de termopila digital CS320 ofrece una respuesta espectral plana (385 a 2105 nm), garantizando precisión incluso en días con neblina, fenómeno común en la costa iqueña. La integración de sensores de temperatura y 

humedad de la serie Sensirion SHT45 proporciona datos con una precisión térmica de ±0.1°C, fundamental para calcular el Déficit de Presión de Vapor (VPD) 

- **Componentes Periféricos y de soporte:** Elementos adicionales críticos para la operatividad y mantenimiento del sistema en el entorno desértico de Ica. 

|Tabla N°6: Componentes Periféricos y de soporte|Tabla N°6: Componentes Periféricos y de soporte|Tabla N°6: Componentes Periféricos y de soporte|Tabla N°6: Componentes Periféricos y de soporte|
|---|---|---|---|
|**Componente**|**Tipo / Modelo**|**Función Clave**|**Precio Est. (USD)**|
|**Actuador (Válvula)**|Electroválvula Hunter<br>PGV|Control<br>físico<br>del<br>riego por sectores.|$16 - $36 (S_S10)|
|**Energía Solar**|Kit Fotovoltaico 10W|Autonomía<br>para<br>sensores en zonas sin<br>red.|~$35 (S_S4)|
|**Protección RF**|Lightning Arrester|Protege el Gateway<br>contra rayos.|$60 - $200 (S_S16)|
|**Infraestructura**|Rack de Montaje TDR|Estructura para fijar<br>sensores<br>a<br>profundidad.|$120 - $130|
|**Conectividad**|Antena<br>Fibra<br>de<br>Vidrio|Mejora la señal en<br>terrenos extensos.|$40 - $60 (S_S16)|
|**Accesorios**|Cable Joiners 3M|Empalmes resistentes<br>a la humedad (IP68).|$3.95 (S_S9)|



- **Gateway Local:** Estación base encargada de recolectar los datos de los sensores distribuidos en el campo. Dada la extensión de los fundos en Ica, la topología de red recomendada es una Red de Área Amplia de Baja Potencia (LPWAN) utilizando el protocolo LoRaWAN (frecuencia 915 MHz en Perú) para cubrir grandes extensiones sin depender de señal celular en cada punto, o NB-IoT en zonas con cobertura de operadores (APIHA, 2026). Envía la información a la nube mediante MQTT, optimizando el uso de datos. 

|Tabla N°7: Comparativa Técnica de Gateways Locales (LoRaWAN 915<br>MHz)|Tabla N°7: Comparativa Técnica de Gateways Locales (LoRaWAN 915<br>MHz)|Tabla N°7: Comparativa Técnica de Gateways Locales (LoRaWAN 915<br>MHz)|Tabla N°7: Comparativa Técnica de Gateways Locales (LoRaWAN 915<br>MHz)|Tabla N°7: Comparativa Técnica de Gateways Locales (LoRaWAN 915<br>MHz)|
|---|---|---|---|---|
|**Característica**|**Milesight UG67**<br>**(Industrial)**|**Dragino DLOS8N**<br>**(Open Source)**|**RAK**<br>**WisGate**<br>**Edge**<br>**Pro**<br>**(Carrier-Grade)**|**Cisco**<br>**IXM-LPWA-900**<br>**(Enterprise)**|
|**Alcance**<br>**(Campo)**|Hasta 15 km|Hasta 20 km|15 - 20 km|15 km+|
|**Protección (IP)**|IP67<br>(Sumergible/Pol<br>vo)|IP65<br>(Lluvia<br>fuerte)|IP67|IP67|
|**Capacidad**<br>**de**<br>**Nodos**|><br>2,000<br>dispositivos|~500<br>-<br>1,000<br>dispositivos|><br>2,000<br>dispositivos|><br>5,000<br>dispositivos|
|**Canales LoRa**|8 (Full-duplex)|8 (SX1302 chip)|8 o 16 canales|16 canales|
|**Conectividad**<br>**Cloud**|MQTT,<br>HTTP,<br>Python SDK|MQTT,<br>HTTP,<br>Packet<br>Forwarder|MQTT,<br>HTTP,<br>AWS Bridge|MQTT, Common<br>Packet<br>Forwarder|
|**Backhaul**<br>**(Salida)**|Ethernet, Wi-Fi,<br>4G LTE|Ethernet, Wi-Fi,<br>4G opcional|Ethernet, Wi-Fi,<br>4G LTE|Ethernet,<br>Cellular module|
|**Precio**<br>**Est.**<br>**(USD)**|$769 - $1,320|$380 - $482|$372 - $525|$2,938 (Lista)|



Decisión: Para el despliegue de 2,500 sensores en Ica, el modelo Milesight UG67 o el RAK WisGate Edge Pro ofrecen el mejor equilibrio entre robustez industrial (IP67) y costo. Su capacidad de procesamiento en el borde (Edge Computing) permite filtrar mensajes redundantes antes de enviarlos a la nube mediante MQTT, lo que reduce significativamente el consumo de datos y la latencia en las alertas de riesgo crítico. Por lo que por costo se usará el RAK WisGate 

- **Red de Internet:** Conexión troncal desde el Gateway hacia el proveedor Cloud a través de un ISP local o mediante enlaces satelitales/móviles (4G/5G) instalados en la caseta de bombeo. 

## **● Plataforma Cloud:** 

   - Ingesta de datos IoT: Servicio gestionado para recibir millones de mensajes mensuales de forma segura (AWS IoT Core). 

   - Procesamiento en tiempo real: Motores de reglas y funciones serverless que procesan las lecturas de humedad y activan alertas si se detecta estrés hídrico. 

   - Almacenamiento: Bases de datos de series temporales (DynamoDB, BigQuery o InfluxDB) para guardar el histórico de riego y comportamiento del acuífero. 

   - Analítica y Machine Learning: Modelos predictivos para calcular la evapotranspiración (ETc) y programar turnos de riego automáticos basados en la demanda real de la planta. 

   - Dashboards y APIs: Interfaz web y aplicación móvil para que los agrónomos y gerentes de operaciones visualicen el estado de los cultivos y controlen las válvulas de forma remota. 

- **Unidad de Control (Edge Computing):** Actuadores conectados a las electroválvulas y variadores de frecuencia de las bombas de pozo profundo, que ejecutan las órdenes de riego procesadas en la nube con mínima latencia (Microsoft, 2025). 

|Tabla N°8: Unidades de Control|Tabla N°8: Unidades de Control|Tabla N°8: Unidades de Control|Tabla N°8: Unidades de Control|Tabla N°8: Unidades de Control|
|---|---|---|---|---|
|**Componente**|**Modelo**|**Función**<br>**Principal**|**Interfaz**<br>**de**<br>**Control**|**Precio**<br>**Est.**<br>**(USD)**|
|**Controlador**<br>**Edge**|**Milesight UC511**|Control<br>de<br>válvulas<br>e<br>ingesta local.|LoRaWAN<br>/<br>Milesight D2D|$299|
|**Gateway**<br>**Industrial**|**Advantech**<br>**ECU-1251**|Gestión de VFDs<br>y<br>bombas<br>de<br>pozo.|RS-485 Modbus<br>/ 4G LTE|$425|
|**Actuador**<br>**de**<br>**Potencia**|**Delta**<br>**MS300**<br>**VFD**|Control<br>de<br>velocidad<br>en<br>bombas 3PH.|RS-485<br>/<br>Modbus RTU|$173|
|**Módulo**<br>**de**<br>**Válvulas**|**Linovision**<br>**IOT-C512**|Apertura/Cierre<br>remoto de riego.|LoRaWAN Class<br>A/B/C|$159|



## Decisión: 

## Unidad de Control Principal: Advantech ECU-1251 

Se elige este dispositivo como el cerebro local de la estación de bombeo (Caseta de Bombeo). Sustentación: Es un gateway industrial de arquitectura RISC (TI Cortex A8/A9) diseñado para operar en entornos hostiles de -40°C a 70°C. Su principal ventaja es la integración nativa con Azure IoT Edge, lo que permite ejecutar reglas de control de riego y algoritmos de analítica localmente, garantizando una operación 24/7 incluso si se pierde la conexión a la nube (Microsoft, 2025). Posee 4 puertos seriales aislados, ideales para gestionar los variadores de frecuencia Delta MS300 de las bombas mediante el protocolo Modbus RS-485. 

## Unidad de Control Distribuida: Milesight UC511 

Este dispositivo se elige para el control directo de las válvulas en el campo. Es un controlador de válvulas solenoide de grado industrial (IP68) con conectividad LoRaWAN, lo que le permite recibir órdenes de la unidad principal desde distancias de hasta 15 km en el campo. Cuenta con alimentación solar integrada, eliminando la necesidad de cableado eléctrico hacia los sectores de riego, lo cual reduce drásticamente el costo de instalación (Milesight, s. f.). 

## **RESUMEN:** 

|Tabla N°9: Dimensionamiento de Hardware para 5,000 Hectáreas|Tabla N°9: Dimensionamiento de Hardware para 5,000 Hectáreas|Tabla N°9: Dimensionamiento de Hardware para 5,000 Hectáreas|Tabla N°9: Dimensionamiento de Hardware para 5,000 Hectáreas|
|---|---|---|---|
|**Componente**|**Modelo Sugerido**|**Cantidad**|**Función Clave**|
|**Nodos Sensores**|SoilVue 10 (TDR)<br>/ SMT100|2,500|Monitoreo de humedad del suelo<br>inmune a salinidad (Campbell, 2026;<br>Truebner, s. f.).|
|**Gateways**<br>**LoRaWAN**|Milesight UG67|5|Estación base de largo alcance (15 km)<br>con backhaul 4G/LTE (Milesight, s. f.).|
|**Edge Maestro**|Advantech<br>ECU-1251|10|Unidad de control local en casetas de<br>bombeo<br>integrada<br>con<br>la<br>nube<br>(Advantech, 2026).|
|**Edge de Campo**|Milesight UC511|1,250|Controlador de válvulas solenoide con<br>alimentación solar (Milesight, s. f.).|



|Tabla N°9: Dimensionamiento de Hardware para 5,000 Hectáreas|Tabla N°9: Dimensionamiento de Hardware para 5,000 Hectáreas|Tabla N°9: Dimensionamiento de Hardware para 5,000 Hectáreas|Tabla N°9: Dimensionamiento de Hardware para 5,000 Hectáreas|
|---|---|---|---|
|**Electroválvulas**|Hunter PGV 1"|2,500|Actuadores físicos para la apertura de<br>riego por sectores.|
|**Piranómetros**|Campbell CS320|10|Medición de radiación solar para<br>cálculo de evapotranspiración real<br>(Campbell, 2026).|
|**VFD (Variadores)**|Delta MS300|10|Control de velocidad en bombas de<br>pozo profundo de 3 fases.|
|**Kits Solares**|Kit<br>Fotovoltaico<br>10W|1,300|Autonomía<br>energética<br>para<br>controladores<br>y<br>sensores<br>microclimáticos.|
|**Protección RF**|Lightning<br>Arrester<br>(Pararrayo)|5|Protección contra rayos para equipos<br>en campo|
|**Antenas**|Antena Fibra<br>Vidrio 8 dBi|5|Antena para recepción de señal.|



## **5.2.2. INFORME ECONÓMICO:** 

Para soportar esta escala regional, se requiere hardware de grado industrial (IP67/IP68) con redundancia distribuida. Los precios reflejan valores de mercado para compras corporativas masivas. 

|Tabla N°10: Presupuesto Regional de Infraestructura (5,000 Hectáreas)|Tabla N°10: Presupuesto Regional de Infraestructura (5,000 Hectáreas)|Tabla N°10: Presupuesto Regional de Infraestructura (5,000 Hectáreas)|Tabla N°10: Presupuesto Regional de Infraestructura (5,000 Hectáreas)|Tabla N°10: Presupuesto Regional de Infraestructura (5,000 Hectáreas)|
|---|---|---|---|---|
|**Componente**|**Modelo Sugerido**|**Cantidad**|**Costo Unit.**<br>**(USD)**|**Subtotal (USD)**|
|**Nodos de Suelo**|SMT100<br>(Humedad/Temp)|2,500|$235.00|$587,500.00|
|**Edge de Campo**|Milesight UC511<br>(Válvulas)|1,250|$299.00|$373,750.00|
|**Electroválvulas**|Hunter PGV 1"|2,500|$36.00|$90,000.00|
|**Kits Solares**|Kit Fotovoltaico 10W|1,300|$35.00|$45,500.00|



|Tabla N°10: Presupuesto Regional de Infraestructura (5,000 Hectáreas)|Tabla N°10: Presupuesto Regional de Infraestructura (5,000 Hectáreas)|Tabla N°10: Presupuesto Regional de Infraestructura (5,000 Hectáreas)|Tabla N°10: Presupuesto Regional de Infraestructura (5,000 Hectáreas)|Tabla N°10: Presupuesto Regional de Infraestructura (5,000 Hectáreas)|
|---|---|---|---|---|
|**Gateways LoRa**|Milesight UG67|5|$1,320.00|$6,600.00|
|**Edge Maestro**|Advantech ECU-1251<br>(Pozo)|10|$425.00|$4,250.00|
|**Piranómetros**|Campbell CS320<br>(Radiación)|10|$390.00|$3,900.00|
|**Variadores VFD**|Delta MS300 (Bombas)|10|$173.00|$1,730.00|
|**Protección RF**|Lightning Arrester<br>(Pararrayo)|5|$200.00|$1,000.00|
|**Antenas**|Antena Fibra Vidrio 8 dBi|5|$60.00|$300.00|
|**TOTAL CAPEX**||7,595|$5,774.00|$1,115,205.00|



## **Costo de transacciones** 

Cálculo para AWS: (7. 2 𝑀) 𝑥 1. 0$ = 7. 20$ 

Análisis de Rentabilidad y Cálculos de Ahorro 

La viabilidad del proyecto se sustenta en el ahorro de recursos. Se presenta un ejemplo de cálculo basado en un fundo de uva de mesa de 100 hectáreas en el valle de Ica. 

## **Escenario Base:** 

Consumo de agua: 12,000  m[3] por hectárea al año. 

Costo de bombeo (energía eléctrica): 0.50 por m[3] .[1] 

Costo anual de agua/energía: 

**==> picture [255 x 25] intentionally omitted <==**

## **Escenario con IoT y Cloud (Optimización del 35%):** 

3 Ahorro de agua: 12, 000 𝑋 0. 35 = 4, 200 𝑚 𝑝𝑜𝑟 ℎ𝑒𝑐𝑡á𝑟𝑒𝑎. 

3 $ Ahorro económico anual: 5, 000 ℎ𝑎 𝑥 4, 200[𝑚] ℎ𝑎 𝑥 0. 50 𝑚3 = $10, 500, 000 

## **Costo de la Solución (OpEx Anual):** 

Instancias Cloud (2 unidades): 2 𝑥 $48. 38 𝑥 12 = $1, 162 

Servicios de IoT y Almacenamiento: $2, 000 

Mantenimiento de conectividad: $1, 200 

Total OpEx Anual: $4, 362 

## **Tiempo de Retorno de Inversión (ROI):** 

**==> picture [312 x 20] intentionally omitted <==**

Resultado: La inversión se recupera en 1.3 meses (aprox. 39 días). 

_1(Nota: El valor de 0.50 $ por m³ utilizado para el cálculo del costo de bombeo y energía eléctrica proviene del análisis de retorno de inversión (ROI) documentado por la asociación APIHA (2026))_ 

Proyección A 5 Años (2026 - 2030) 

|**Año**|**Hectáreas**|**Total Nodos**|**Mensajes Anuales**|**Ahorro Acumulado (USD)**|
|---|---|---|---|---|
|**2026**|5,000|3,750|205,200,000|$10.5 M|
|**2027**|5,750|4,312|235,980,000|$22.6 M|
|**2028**|6,612|4,959|271,377,000|$36.5 M|
|**2029**|7,604|5,703|312,083,000|$52.4 M|
|**2030**|8,745|6,558|358,895,000|$70.8 M|



## **5.3. CÁLCULOS** 

## **5.3.1. Transacciones por sensores** 

La arquitectura se basa en una topología de estrella masiva (LoRaWAN) conectada a la nube. Se define el Nodo de Telemetría como la unidad física de transmisión, la cual integra múltiples sensores para capturar el perfil hídrico y ambiental completo. 

- Nodos de Telemetría (2,500 unidades): Equipados con 1 Transmisor LoRaWAN, 6 Sensores de Suelo (Humedad/Temp a 30, 60, 90 cm) y 1 Sensor Ambiental (Humedad/Temp aire) (Sensirion, 2025; Truebner, s. f.). 

   - _Total puntos de datos:_ 2,500 x 7 = 17,500 mediciones. 

- Nodos de Control (1,250 unidades): Controladores Milesight UC511 que gestionan 2 electroválvulas cada uno para cubrir los 2,500 sectores de riego (Milesight, s. f.). 

- Gateways LoRaWAN (5 unidades): Estaciones base Milesight UG67 con capacidad para 2,000 dispositivos cada una, distribuidas para garantizar redundancia y solapamiento de señal. 

## **5.3.2. Calculo de Transmisión por Dispositivo** 

El cálculo de tráfico considera diferentes estados operativos del fundo. Un paquete estándar (Payload) tiene un tamaño de 512 bytes, optimizado para MQTT. 

|**Tipo de Lectura**|**Frecuencia**<br>**Definida**|**Mensajes/Día**|**Justificación Técnica**|
|---|---|---|---|
|Normal|4 msg/h (Cada 15<br>min)|96|Monitoreo estándar del acuífero y<br>suelo.|
|Alerta (Riego)|12 msg/h (Cada 5<br>min)|24|Activada durante el turno de riego<br>(2h promedio).|
|Emergencia|60 msg/h (Cada 1<br>min)|30|Disparada ante fugas o heladas (30<br>min promedio).|
|Gestión|2 msg/día|2|Ajuste remoto de parámetros y<br>configuración .|
|TOTAL DIARIO||152|Transmisiones totales por nodo<br>cada 24 horas.|



## **5.3.3. Volumen Transaccional de la Red** 

|**Nivel de Escala**|**Mensajes Diarios**|**Mensajes Mensuales**|**Volumen**<br>**Datos**<br>**(GB/mes)**|
|---|---|---|---|
|Por Nodo|152|4,560|0.0023 GB|
|Red<br>Total<br>(3,750<br>Nodos)|570,000|17,100,000|8.75 GB|



## **Cálculo De Consumo De Ancho De Banda** 

El consumo de ancho de banda BW para la red regional se calcula considerando el flujo agregado de mensajes MQTT hacia AWS IoT Core. 

1. Cálculo de Tasa de Bits por Nodo ( 𝑅 ): 𝑏 

**==> picture [213 x 62] intentionally omitted <==**

2. Cálculo de Ancho de Banda Total de la Red ( 𝐵𝑊 ): 𝑡𝑜𝑡𝑎𝑙 

**==> picture [115 x 15] intentionally omitted <==**

**==> picture [282 x 15] intentionally omitted <==**

Aunque el ancho de banda requerido es bajo (27 kbps), la robustez del sistema depende de la capacidad del Gateway Milesight UG67 para gestionar colisiones en la banda de 915 MHz, por lo que se distribuyen 5 unidades para manejar los 17.1 millones de mensajes mensuales de forma eficiente . 

## **Proyección De Crecimiento A 5 Años** 

Basado en el crecimiento anual esperado del 15% para el sector agroexportador en Ica y la expansión de nuevas variedades de uva (Fluctuante, 2024; FreshPlaza, 2024). 

## **Proyección de Escala y Datos (2026 - 2030)** 

|**Año**|**Hectáreas**|**Cantidad Nodos**|**Mensajes**<br>**Anuales**|**Almacenamient**<br>**o SSD (GB)**|
|---|---|---|---|---|



|**2026**|5,000|3,750|205,200,000|105 GB|
|---|---|---|---|---|
|**2027**|5,750|4,312|235,980,000|121 GB|
|**2028**|6,612|4,959|271,377,000|139 GB|
|**2029**|7,604|5,703|312,083,000|160 GB|
|**2030**|8,745|6,558|358,895,000|184 GB|



## **5.4. RED DE DATOS** 

Siguiendo las convenciones de red establecidas, se define el esquema de direccionamiento para los dispositivos de comunicación y gestión. Se reservan los segmentos conforme a la normativa de seguridad y terminales. 

## **Convenciones de Direccionamiento IP para el Proyecto IcaSmart-Water** 

|**Rango IP**|**Uso asignado**|**Explicación técnica**|
|---|---|---|
|X.X.X.0|Dirección de red|Identifica la subred lógica del fundo (ej. 192.168.10.0).<br>Es la base sobre la cual se enrutan los datos de los 3,750<br>nodos hacia AWS.|
|X.X.X.1|Gateway / Puerta<br>de Enlace|Punto de salida hacia internet (4G LTE / Starlink). Se<br>asigna al Router Principal que interconecta la red local<br>con la Local Zone de AWS en Lima.|
|X.X.X.255|Dirección<br>de<br>broadcast|Reservada para difusión masiva de paquetes. Se utiliza<br>para enviar comandos de reinicio o alertas generales a<br>todos los equipos IP del fundo.|
|X.X.X.2 – 10|Actividades<br>de<br>Control y Seguridad|Rango reservado para el Firewall Industrial y los Edge<br>Maestros (Advantech ECU-1251). Mantenerlos aquí<br>facilita la auditoría de seguridad de los controladores de<br>bombas.|
|X.X.X.11<br>–<br>250|Gateways LoRaWAN<br>y Terminales|Aquí se ubican los Milesight UG67 y las tablets de<br>campo. Los sensores finales no llevan IP, pero se<br>gestionan a través de los Gateways en este rango.|



## **Listado General de Subredes** 

Al ser redes privadas de Clase C, la máscara más común es 255.255.255.0 (/24), pero esta solo permite un máximo de 254 hosts utilizables. Como el proyecto requiere conectar 3,750 dispositivos (2,500 sensores + 1,250 actuadores), una red /24 resulta totalmente insuficiente. 

## **Cálculo de capacidad (VLSM)** 

Para determinar la máscara adecuada, buscamos la potencia de 2 que sea inmediatamente superior al número total de dispositivos (3,750): 

- 10 

- ● Máscara /22 ($255.255.252.0): Ofrece 2 - 2 = 1,022 hosts. (Insuficiente). 

- 11 

- ● Máscara /21 ($255.255.248.0): Ofrece 2 - 2 = 2,046 hosts. (Insuficiente). 

- 12 

- ● Máscara /20 ($255.255.240.0): Ofrece 2 - 2 = 4,094 hosts utilizables. 

Al utilizar la máscara de .240, el sistema puede direccionar los 3,750 nodos actuales y deja un remanente de 344 direcciones IP libres para terminales móviles de agrónomos, gateways adicionales o servidores de seguridad en el campo. 

## **Listado General** 

|**Sucursal /**<br>**Segmento**|**SubNet**|**Máscara**<br>**de**<br>**Sub Red**|**Puerta**<br>**de**<br>**Enlace (GW)**|**DNS**<br>**Primario**|**DNS**<br>**Secundario**|
|---|---|---|---|---|---|
|Ica - Fundo<br>Villacurí|192.168.10.X|255.255.240.0|192.168.10.1|10.0.0.251|10.0.0.252|
|Centro<br>de<br>Control<br>/<br>DC|192.168.100.X|255.255.255.0|192.168.100.1|10.0.0.251|10.0.0.252|
|Gestión<br>Cloud AWS|10.0.0.X|255.255.240.0|10.0.0.1|8.8.8.8|8.8.4.4|



## **A. Segmento Ica - Fundo Villacurí (5,000 ha)** 

Este segmento integra los 3,750 nodos industriales bajo una máscara /20 para garantizar capacidad y escalabilidad (Osita, 2022). 

## **Cuadro de Terminales - Ica** 

|**N°**|**Equipos**|**Tipo**|**Número IP / Rango**|**Máscara de Sub**<br>**Red**|**DNS**|
|---|---|---|---|---|---|
|1|Edge<br>Maestros<br>(10)|Control (VFD)|192.168.0.3 -.12|255.255.240.0|10.0.0.251|
|2|Gateways<br>LoRaWAN (5)|Estación Base|192.168.0.22 -.26|255.255.240.0|10.0.0.251|
|3|Nodos<br>Telemetría|Sensores IoT||||
|4|Nodos Control|Actuadores<br>IoT|192.168.0.13<br>-.04.238|255.255.240.0|10.0.0.251|
|5|Tablets<br>Agrónomos|Terminal<br>Móvil|192.168.1.1<br>-<br>10.204|255.255.240.0|10.0.0.251|



**Cuadro de Comunicación - Ica** 

|**N°**|**Equipos**|**Tipo**|**Numero IP**|**Máscara de Sub**<br>**Red**|**Tecnología de Red**|
|---|---|---|---|---|---|
|1|Router<br>Principal|Modelo<br>2911|192.168.0.1|255.255.240.0|GigabitEthernet<br>(LAN)|
|2|Router<br>Principal|Modelo<br>2911|192.169.0.1|255.255.255.0|Serial (WAN Link)|
|3|Firewall<br>Industrial|Seguridad|192.168.0.2|255.255.240.0|FastEthernet|



## **B. Segmento Centro de Control / DC** 

Red administrativa destinada al monitoreo y gestión de servidores locales. 

**Cuadro de Terminales - DC** 

|**N°**|**Equipos**|**Tipo**|**Numero IP**|**Máscara**<br>**de**<br>**Sub Red**|**Puerta**<br>**de**<br>**Enlace**|**DNS**|
|---|---|---|---|---|---|---|
|1|Computado<br>r|Monitore<br>o|192.168.100.11|255.255.255.0|192.168.100.1|10.0.0.251|
|2|App001|Servidor|192.168.100.12|255.255.255.0|192.168.100.1|10.0.0.251|



**Cuadro de Comunicación - DC** 

|**N°**|**Equipos**|**Tipo**|**Numero IP**|**Máscara**<br>**de**<br>**Sub Red**|**Puerta**<br>**de**<br>**Enlace**|**Tecnología de**<br>**Red**|
|---|---|---|---|---|---|---|
|1|Router<br>DC|Modelo<br>2911|192.168.100.1|255.255.255.0|200.60.14.77|FastEthernet<br>(LAN)|
|2|Router<br>DC|Modelo<br>2911|192.169.0.2|255.255.255.0||Serial<br>(WAN<br>Link)|



## **C. Segmento Gestión Cloud AWS (Local Zone Lima)** 

Infraestructura de nube para la ingesta masiva de mensajes MQTT. 

## **Cuadro de Terminales - Cloud** 

|**N°**|**Equipos**|**Tipo**|**Numero IP**|**Máscara de Sub**<br>**Red**|**Puerta**<br>**de**<br>**Enlace**|**DNS**|
|---|---|---|---|---|---|---|
|1|**AWS IoT Core**|Registro|10.0.0.10|255.255.240.0|10.0.0.1|8.8.8.8|



## **Cuadro de Comunicación - Cloud** 

|**N°**|**Equipos**|**Tipo**|**Numero IP**|**Máscara de Sub Red**|**Tecnología de Red**|
|---|---|---|---|---|---|
|1|Gateway Nube|Endpoint|10.0.0.1|255.255.240.0|Ethernet (Fiber)|



## **Resumen Terminales** 

|**Equipos**|**Tipo**|**Número IP /**<br>**Rango**|**Máscara**<br>**de**<br>**Sub Red**|**DNS**|**Tecnología**<br>**de Red**|
|---|---|---|---|---|---|
|Router<br>Principal|Puerta<br>de<br>Enlace|192.168.0.1|255.255.240.<br>0|10.0.0.251|4G<br>LTE<br>/<br>Starlink|
|Firewall<br>Industrial|Seguridad|192.168.0.2|255.255.240.<br>0|10.0.0.251|Ethernet|
|Edge<br>Maestros<br>(10)|Control (VFD)|192.168.0.3<br>-.12|255.255.240.<br>0|10.0.0.251|RS-485<br>/<br>Modbus|
|Gateways<br>LoRaWAN (5)|Estación Base|192.168.0.22<br>-.26|255.255.240.<br>0|10.0.0.251|LoRaWAN<br>/<br>Ethernet|



|Nodos<br>Telemetría<br>(2,500)|Sensores IoT||||LoRa / MQTT<br>Bridge|
|---|---|---|---|---|---|
|Nodos<br>Control<br>(1,250)|Actuadores<br>IoT|192.168.0.13<br>-.04.238|255.255.240.<br>0|10.0.0.251|LoRa / MQTT<br>Bridge|
|Tablets<br>Agrónomos|Terminal<br>Móvil|192.168.1.1 -<br>192.168.10.2<br>04|255.255.240.<br>0|10.0.0.251|Wi-Fi<br>(802.11ax)|



Nota: Los 3,750 nodos finales LoRaWAN operan en la capa de enlace sin dirección IP individual, siendo gestionados por los Gateways. 

## **5.5. CUMPLIMIENTO DE LA NORMATIVA EN PERÚ** 

El despliegue de la infraestructura IoT para el sector agroexportador iqueño cumple con el marco legal vigente en telecomunicaciones, gestión de recursos hídricos y seguridad de la información. 

## **5.5.1. Espectro y Telecomunicaciones (MTC / OSIPTEL)** 

El sistema opera en la banda de 915–928 MHz (AU915) para LoRaWAN, calificada como banda no licenciada según la Resolución Ministerial N° 1685-2023-MTC/01.03. 

- Uso Libre: No requiere concesión de servicio público siempre que los Gateways Milesight UG67 estén debidamente homologados ante el MTC. 

- Parámetros Técnicos: Se respetan los límites de potencia efectiva irradiada (PIRE) de hasta 1W para garantizar la no interferencia con servicios públicos adyacentes. 

## **5.5.2. Gestión de Recursos Hídricos (ANA)** 

La telemetría de pozos de agua subterránea se alinea con las directrices de la Autoridad Nacional del Agua (ANA) para la modernización del monitoreo de caudales. 

|**Entidad**|**Norma Aplicable**|**Obligación del Proyecto**|
|---|---|---|
|**ANA**|R.J. N° 0092-2026-ANA|Reporte telemétrico del uso de agua subterránea en Ica.|
|**ANA**|R.J. N° 0010-2025-ANA|Acreditación de equipos para la licencia de uso de agua.|



|**MTC**|Ley N° 29022|Régimen especial para la expansión de infraestructura<br>rural.|
|---|---|---|



## **5.5.3. Protección de Datos Personales (Ley N.º 29733)** 

Con la entrada en vigencia del Nuevo Reglamento de la Ley de Protección de Datos Personales el 29 de marzo de 2025, el backend en AWS implementa: 

- Notificación de Incidentes: Protocolo de alerta a la ANPDP dentro de las 48 horas ante cualquier brecha de seguridad. 

- Oficial de Datos (ODP): Designación obligatoria para el tratamiento masivo de datos de los 400 usuarios concurrentes (agrónomos y staff). 

- Seguridad por Diseño: Cifrado extremo a extremo (AES-128) y anonimización de registros operativos. 

## **5.5.4. Seguridad y Ciberprotección (ISO 27001)** 

El sistema implementa un SGSI (Sistema de Gestión de Seguridad de la Información) bajo la NTP-ISO/IEC 27001:2022, asegurando: 

- Confidencialidad: Gestión de identidad (IAM) basada en roles para el acceso a las válvulas. 

- Integridad: Protección contra manipulaciones malintencionadas en los variadores de frecuencia. 

- Disponibilidad: Arquitectura con redundancia regional en la nube para operación 24x7. 

## **5.6. CONFIGURACIÓN EN CISCO PACKET TRACER** 

## **Dispositivos a desplegar:** 

- Capa Cloud: Un Server-PT (representando la Local Zone de AWS en Lima). 

- Capa Backbone: Un Router-PT (Gateway 4G/Starlink) y un Switch 2960. 

- Capa Inalámbrica: 5 Home Gateway (configurados como puentes LoRaWAN). 

- Capa Edge: MCU-PT (Microcontroladores) para los Edge Maestros y de Campo. 

- Capa de Sensores: Humidity Sensor, Photo Sensor (Radiación) y Water Sprinkler (Electroválvulas). 

## **Cableado :** 

- Ethernet (Copper Straight-Through) 

   - Server AWS → Router (Interf. Gig0/1) 

   - Router (Interf. Gig0/0) → Switch 2960 

   - Switch 2960 → Puertos Ethernet de los 5 Gateways 

   - Gateways → MCU-PT Maestros (Casetas de bombeo) 

- IoT Custom Cable (Cable para componentes) 

   - MCU-PT (Pin A0) → Humidity Sensor (Pin A0) 

   - MCU-PT (Pin A1) → Photo Sensor (Pin A0) 

   - MCU-PT (Pin D0) → Water Sprinkler (Pin D0) 

- Wireless (LoRaWAN Simulado) 

## **Configuración de la Red Core y Direccionamiento IP** 

Configuraremos la subred única de gran capacidad para el fundo. 

## **● Router Principal:** 

   - Interfaz Gig0/0 (Hacia el Switch): IP 192.168.0.1, Máscara 255.255.240.0. 

   - Servicio DHCP: Configurar el pool para iniciar desde 192.168.1.1 hasta 192.168.15.254. 

- **Servidor AWS (Local Zone Lima):** 

   - Configuración IP: Estática 10.0.0.10, Máscara 255.255.240.0. 

   - Servicios: Activar el servicio IoT en la pestaña Services y crear un usuario admin/admin para el registro de los 3,750 dispositivos. 

## **Configuración de los Gateways LoRaWAN** 

Cada uno de los 5 Gateways actuará como el punto de agregación para los nodos en el campo. 

Configuración de Red: Pestaña Config -> Internet: Seleccionar DHCP (obtendrá una IP en el rango 192.168.0.13 -.17). 

Configuración Inalámbrica: Pestaña Config -> Wireless: 

- SSID: LoRaWAN_Ica_01 (hasta 05). 

- Autenticación: WPA2-PSK con clave industrial. 

Servidor IoT: Seleccionar Remote Server e ingresar la IP de AWS: 10.0.0.10. 

## **Resumen de conexiones troncal:** 

|**Segmento**<br>**de Red**|**Dispositivo de Origen**<br>**(Puerto)**|**Dispositivo de Destino**<br>**(Puerto)**|**Función Técnica**|
|---|---|---|---|
|**Capa Cloud**|Server-PT<br>(FastEthernet0)|Router-PT<br>2911<br>(GigabitEthernet0/1)|Enlace troncal hacia AWS<br>IoT<br>Core<br>[updated_report_v11].|



|**Backbone**<br>**Local**|Router-PT<br>2911<br>(GigabitEthernet0/0)|Switch<br>2960<br>(GigabitEthernet0/1)|Salida de datos del fundo<br>hacia el Gateway.|
|---|---|---|---|
|**Gateways**<br>**(1-5)**|Switch 2960 (Fa0/1 a<br>Fa0/5)|Home<br>Gateway<br>(Internet)|Conexión<br>WAN de las<br>estaciones<br>LoRaWAN<br>industriales.|
|**Edge**<br>**Maestro A**|Home<br>Gateway<br>(Ethernet 1)|MCU-PT<br>Maestro<br>A<br>(FastEthernet0)|Control de bombas en<br>caseta (Maestro 1).|
|**Edge**<br>**Maestro B**|Home<br>Gateway<br>(Ethernet 2)|MCU-PT<br>Maestro<br>B<br>(FastEthernet0)|Control de redundancia de<br>bombas (Maestro 2).|



## **Resumen de conexión cable IoT** 

|**Dispositivo de Campo**|**Puerto del Sensor**|**Puerto del MCU-PT**|**Tipo de Cable**|
|---|---|---|---|
|**Humidity Sensor**|A0 (Analógico)|A0|IoT Custom Cable|
|**Photo Sensor**|A0 (Analógico)|A1|IoT Custom Cable|
|**Water Sprinkler**|D0 (Digital)|D0|IoT Custom Cable|



Se le asigna al IoT Core AWS la ip 10.0.0.1 en el apartado de Default Gateway. 

También se le asigna una dirección iPv4 de 10.0.0.10  y una máscara Subnet de 255.255.240.0 

Al Router Gateway 4G/Starlink se le asigna una dirección iPv4 de 192.168.0.1 al puerto GigabitEthernet 0/0 y una iPv4 de 10.0.0.1 al GigabitEthernet 0/1, también se escribe una máscara Subnet de 255.255.240.0. Este router servirá para interconectar la red local con la zona local donde se encontraría el servidor AWS. 

Se crea un switch con el nombre Backbone Local el cual se encargará de la salida de datos del fundo hacia el gateway. 

All Milesight UG67 se le asigna una dirección iPv4 de 192.168.0.13, se asigna una máscara subnet de 255.255.240.0, tiene una default Gateway a la ip 192.168.01 y la ip de su servidor DNS es 10.0.0.10. 

A estos dispositivos se le asignarán nombres  SSID como Ica_LoRa_01 y una contraseña con nombre Clavelca2026 lo cual servirá para que se conecte y reciba los datos de los múltiples y diferentes sensores que hay. 

Se crea un componente llamado Advantech ECU-1251 1 que tendrá una dirección iPv4 192.168.25.125 con una máscara subnet de 255.255.255.0, una ip de 192.167.25.1 como Default Gateway y una ip de 10.0.0.10 para el servidor DNS. 

Este componente analiza los datos de los sensores de humedad y ópticos, los cuales determinan el nivel del caudal y la presión de pozo, para darle indicaciones a la bomba principal y secundaria. Por ejemplo en caso que se detecte un caudal con un valor menor a 30, se activarán las bombas principales secundarias, pero si el caudal es mayor a 70, sucederá lo contrario. 

Se crea un componente llamado Milesight UC511 que tendrá una dirección iPv4 de 192.168.25.130 con una Máscara Subnet 255.255.255.0 con una ip 192.168.25.1 para el Default Gateway y una ip de 10.0.0.10 para el servidor DNS. 

Este componente se hará cargo de tomar acciones dependiendo de los valores que se obtengan de sensores como de humedad y radiación que se obtengan mediante los dispositivos a los que está conectado. 

Una vez que ya se tiene configurado todos los sensores y cómo funcionará cada uno, se puede revisar el estado de cada uno mediante una Tablet que estará conectada de manera inalámbrica a uno de los MileSight. 

## **Evidencia de las conexiones:** 

- Conexión entre el Servidor IotCore Lima Local Zone con los MCU-PT Advantech ECU: 

- Conexión entre el Servidor IotCore Lima Local Zone con el Gateway 4G Starline 

- Conexión entre el Servidor IotCore Lima Local Zone con el MCU-PT Milesight UC511(3) 

## **Topología de la red en Cisco Packet Tracer** 

**5.7. ARQUITECTURA DE LA RED.** 

## **Capa de Datos:** 

## **5.7.1. Software** 

## **5.7.1.1. Sistemas Operativos** 

|**5.7.1.**|**5.7.1. Software**<br>**5.7.1.1.**<br>**Sistemas Operativos**|**5.7.1. Software**<br>**5.7.1.1.**<br>**Sistemas Operativos**|**5.7.1. Software**<br>**5.7.1.1.**<br>**Sistemas Operativos**|**5.7.1. Software**<br>**5.7.1.1.**<br>**Sistemas Operativos**|**5.7.1. Software**<br>**5.7.1.1.**<br>**Sistemas Operativos**|
|---|---|---|---|---|---|
|**Criterios**|**Sistema Operativo**|||||
||**Windows**<br>**Server 2019**|**Ubuntu 24.04**<br>**LTS)**<br>=<br>ofA|**Red Hat RHEL 9**|**Oracle Solaris**<br>**11.3**<br>ORACLE:<br>SOLARIS|**Debian 12.6**<br>(0<br>debian|
|**Núcleo**|Windows NT<br>10.0|Kernel de Linux|Kernel de Linux|Solaris (Base<br>UNIX)|Kernel de Linux|
|**Personalizació**<br>**n**|3/5|5/5|4/5|4/5|5/5|
|**Seguridad**|A<br>través<br>del<br>Windows<br>Defender<br>Exploit Guard,<br>se<br>ofrecen<br>características<br>como<br>la<br>reducción de la<br>superficie<br>de<br>ataque,<br>el<br>acceso<br>controlado<br>a<br>carpetas y la<br>protección anti<br>- exploits.|Gracias a una<br>amplia serie de<br>mejoras<br>que<br>abarcan<br>la<br>seguridad<br>del<br>núcleo,<br>esta<br>nueva versión<br>LTS ofrece una<br>gran protección<br>contra<br>las<br>amenazas<br>emergentes.|Proporciona, a<br>través<br>de<br>SELinux,<br>parches en vivo<br>del<br>kernel,<br>gestión<br>centralizada de<br>políticas<br>de<br>seguridad,<br>y<br>herramientas<br>de análisis y<br>monitoreo<br>de<br>seguridad.|“Security<br>Compliance”<br>permite a los<br>administradore<br>s del sistema<br>modificar<br>los<br>puntos<br>de<br>referencia<br>de<br>las políticas de<br>seguridad<br>de<br>acuerdo con los<br>estándares de<br>seguridad de su<br>empresa.|Es<br>extremadamen<br>te<br>seguro<br>debido<br>a<br>su<br>enfoque en la<br>estabilidad,  la<br>revisión<br>exhaustiva<br>y<br>continua<br>del<br>software y la<br>rápida<br>implementació<br>n de parches<br>de seguridad.|
|**Soporte**<br>**técnico**|**Fin de vida útil**<br>**(EOSL):**<br>9/1/2024<br>**Fecha**<br>**extendida:**<br>9/1/2029|**Fin de vida útil**<br>**de la versión**<br>**estándar:**<br>abril de 2029<br>**Versión**<br>**pro:**<br>abril de 2034|**Fin de vida útil**<br>**(EOSL):**<br>31/5/2027<br>**Fecha**<br>**extendida:**<br>31/5/2035|**Fin de vida útil**<br>**(EOSL):**<br>1/1/2021<br>**Fecha**<br>**extendida:**<br>1/1/2027|**Fin de vida útil**<br>**(EOSL):**<br>10/6/2026<br>**Fecha**<br>**extendida:**<br>10/6/2028|
|**Comunidad**|Cuenta con la<br>mayor cantidad|Es<br>de<br>las<br>distribuciones|Está compuesta<br>mayoritariame|Debido<br>a<br>su<br>uso mayoritario|Es<br>de<br>las<br>distribuciones|



||de usuarios a<br>nivel<br>mundial<br>con un 70% de<br>los usuarios a<br>nivel global.<br>**Tamaño:**Muy<br>grande<br>más populares<br>de<br>Linux<br>y<br>cuenta<br>con<br>foros oficiales<br>llenos<br>de<br>documentos.<br>**Tamaño:**<br>Grande<br>nte<br>por<br>empresas<br>y<br>desarrolladores<br>,<br>y<br>no<br>por<br>usuarios<br>de<br>escritorio.<br>**Tamaño:**<br>Mediana<br>en<br>empresas,<br>no cuenta con<br>muchos<br>usuarios.<br>**Tamaño:**<br>Pequeña<br>más<br>antiguas<br>de Linux y  es<br>usado<br>en<br>servidores<br>tanto como en<br>computadoras<br>de escritorio.<br>**Tamaño:**<br>Mediana<br>**Interfaz**<br>Presenta<br>una<br>gran<br>interfaz<br>gráfica<br>de<br>usuario (GUI) y<br>también<br>una<br>Línea<br>de<br>Comandos<br>(CLI).<br>Presenta<br>una<br>gran<br>interfaz<br>gráfica<br>de<br>usuario (GUI) y<br>una<br>potente<br>Línea<br>de<br>Comandos<br>(CLI).<br>Presenta<br>una<br>interfaz gráfica<br>de<br>usuario<br>(GUI)<br>y<br>una<br>potente<br>Línea<br>de<br>Comandos<br>(CLI).<br>Se centra en la<br>Línea<br>de<br>Comandos, con<br>una<br>GUI<br>opcional<br>no<br>muy usada en<br>empresas.<br>Presenta<br>una<br>gran<br>interfaz<br>gráfica<br>de<br>usuario (GUI) y<br>una<br>potente<br>Línea<br>de<br>Comandos<br>(CLI).<br>**Aplicaciones**<br>Ofrece<br>aplicaciones<br>diseñadas para<br>ser robustas y<br>escalables,<br>priorizando<br>la<br>seguridad<br>y<br>compatibilidad.<br>Ofrece<br>gran<br>diversidad<br>de<br>aplicaciones en<br>los sectores de<br>desarrollo<br>y<br>servidores,<br>como para los<br>usuarios finales<br>Contiene<br>múltiples<br>aplicaciones<br>dirigidas<br>a<br>entornos<br>empresariales,<br>mas no muchas<br>para el uso en<br>hogares.<br>Posee<br>aplicaciones<br>dirigidas<br>a<br>entornos<br>empresariales<br>enfocadas<br>a<br>manejos<br>de<br>bases de datos.<br>Proporciona un<br>amplio<br>catálogo<br>de<br>aplicaciones<br>tanto para el<br>uso en hogares<br>como para el<br>desarrollo<br>y<br>servidores.<br>**Compatibilidad**<br>**Hardware:**5/5<br>**Software:**5/5<br>**Hardware:**4/5<br>**Software:**5/5<br>**Hardware:**4/5<br>**Software:**5/5<br>**Hardware:**3/3<br>**Software:**4/5<br>**Hardware:**5/5<br>**Software:**5/5<br>**Estabilidad**<br>Proporciona<br>una muy buena<br>estabilidad<br>junto con una<br>gran<br>documentación<br>de soporte.<br>Ofrece<br>gran<br>estabilidad<br>además de sus<br>frecuentes<br>actualizaciones<br>sin<br>interrupciones<br>muy extensas.<br>Destaca por su<br>gran<br>estabilidad<br>debido a sus<br>actualizaciones<br>controladas<br>y<br>un<br>kernel<br>optimizado<br>Gran<br>estabilidad<br>frente a cargas<br>de<br>trabajo<br>intensas<br>y<br>resistencia<br>a<br>fallos.<br>Ofrece un gran<br>rendimiento<br>tanto<br>en<br>servidores<br>como<br>en<br>computadoras<br>de escritorio.<br>**Costo**<br>Desde los 501<br>hasta los 6155<br>USD<br>Desde los 500 a<br>3400 USD<br>Desde los 383<br>hasta<br>los<br>3171.70 USD<br>Costo<br>por<br>unidad<br>de<br>procesamiento<br>en Solaris 27<br>500 USD .<br>Gratuito|
|---|---|



**Conclusión:** A través de un exhaustivo análisis de las características principales de estos 5 diferentes sistemas operativos, se ha optado por utilizar el brindado por **Ubuntu 24.04 LTS** . Entre las ventajas más importantes de usar este sistema operativo, podemos encontrar a su amplia comunidad de usuarios a nivel global  y rendimiento. 

**5.7.2. Motores de Bases de datos** 

|**5**||**.7.2. Motores de Bases de datos**|**.7.2. Motores de Bases de datos**|**.7.2. Motores de Bases de datos**|**.7.2. Motores de Bases de datos**|**.7.2. Motores de Bases de datos**|
|---|---|---|---|---|---|---|
|**Criterios**||**Bases de datos**|||||
|||**MySQL 8.0**|**MariaDB**<br>**10.11.9 (LTS)**|**Oracle**<br>**Database 19c**|**PostgreSQL 15**|**Microsoft SQL**<br>**Server 2022**|
|**Versión Estable**||8.0|10.11.9 (LTS)|19c|15.0|SQL Server<br>2022|
|**Tipo de Base**<br>**de Datos**||Relacional<br>(SQL)|Relacional<br>(SQL)|Relacional/Obj<br>eto-relacional<br>(SQL)|Relacional<br>(RDBMS) y<br>Objetos<br>(ORDBMS)|Relacional<br>(RDBMS)|
|**Fecha de**<br>**Lanzamiento**||Abril 2018|Febrero 2023|Febrero 2019|Octubre 2022|Noviembre<br>2022|
|**Soporte de**<br>**Concurrencia**||4/4, con<br>bloqueos a<br>nivel de fila y<br>transacciones<br>ACID.|4/4, similar a<br>MySQL, con<br>mejoras en<br>replicación.|5/5, con<br>múltiples<br>opciones de<br>aislamiento de<br>transacciones.|MVCC<br>(Multi-Version<br>Concurrency<br>Control)|MVCC<br>(Multi-Version<br>Concurrency<br>Control)|
|**Escalabilidad**||Escalabilidad<br>vertical;<br>escalado<br>horizontal<br>limitado.|Mejora sobre<br>MySQL en<br>escalabilidad<br>vertical.|Escalabilidad<br>tanto vertical<br>como<br>horizontal.|Alta<br>escalabilidad<br>horizontal y<br>vertical, con<br>soporte para<br>clustering|Alta<br>escalabilidad<br>vertical y<br>horizontal;<br>soporta<br>sharding y<br>clustering|
|**Rendimiento**||Optimizado<br>para lectura y<br>escritura en<br>entornos OLTP.|Mejoras en<br>rendimiento<br>para cargas de<br>trabajo mixtas.|Rendimiento<br>superior en<br>entornos de<br>alto volumen<br>de<br>transacciones.|Rendimiento<br>excelente en<br>operaciones<br>complejas y<br>consultas<br>avanzadas;<br>tuning<br>necesario para<br>cargas muy<br>altas|Alto<br>rendimiento<br>optimizado<br>para grandes<br>volúmenes de<br>transacciones y<br>análisis de<br>datos|
|**Manejo de**||Soporte|Similar a|Completo|Soporte nativo|Soporte|



||**Datos**<br>completo para<br>transacciones,<br>integridad<br>referencial, y<br>normalización.<br>MySQL, con<br>soporte<br>adicional para<br>temporal tables<br>y JSON.<br>manejo de<br>datos<br>complejos,<br>incluidos datos<br>espaciales y<br>XML.<br>para JSON,<br>XML, y tipos de<br>datos<br>geoespaciales;<br>manejo<br>avanzado de<br>índices y<br>particionamien<br>to<br>completo para<br>JSON, XML,<br>datos<br>espaciales, y<br>analítica<br>avanzada;<br>funcionalidade<br>s extendidas<br>con integración<br>a servicios de<br>BI<br>**Licencia**<br>**MySQL**<br>**Community**<br>**Edition**: Gratis<br>(open-source).<br>**MySQL**<br>**Enterprise**<br>**Edition**:<br>●Aproxi<br>madam<br>ente<br>$5,000<br>por<br>servido<br>r al<br>año,<br>depend<br>iendo<br>del<br>nivel<br>de<br>soport<br>e y<br>caracte<br>rísticas<br>adicion<br>ales<br>requeri<br>das.<br>**MySQL**<br>**Standard**<br>**Edition**: Desde<br>$2,000 por<br>servidor al año.<br>**MariaDB**<br>**Community**<br>**Server**: Gratis<br>(open-source).<br>**MariaDB**<br>**Enterprise**<br>**Server**:<br>●Desde<br>$4,000<br>por<br>servido<br>r al<br>año,<br>depend<br>iendo<br>del<br>nivel<br>de<br>soport<br>e y<br>caracte<br>rísticas<br>adicion<br>ales.<br>**Oracle**<br>**Database**<br>**Standard**<br>**Edition 2**:<br>Aproximadame<br>nte $17,500<br>por procesador<br>(licencia<br>perpetua) o<br>$350 por<br>usuario.<br>**Oracle**<br>**Database**<br>**Enterprise**<br>**Edition**:<br>Aproximadame<br>nte $47,500<br>por procesador<br>(licencia<br>perpetua) o<br>$950 por<br>usuario.<br>**Soporte**<br>**técnico anual**:<br>22% del costo<br>de la licencia.<br>**PostgreSQL**:<br>Gratis<br>(open-source).<br>Opcionalmente<br>, se pueden<br>contratar<br>servicios de<br>soporte y<br>consultoría a<br>través de<br>terceros, cuyos<br>costos varían<br>ampliamente.<br>**SQL Server**<br>**Express**<br>**Edition**: Gratis<br>(con<br>limitaciones).<br>**SQL Server**<br>**Standard**<br>**Edition**:<br>Aproximadame<br>nte $3,586 por<br>núcleo.<br>**SQL Server**<br>**Enterprise**<br>**Edition**:<br>Aproximadame<br>nte $13,748<br>por núcleo.<br>**SQL Server**<br>**Developer**<br>**Edition**: Gratis,<br>pero solo para<br>desarrollo y<br>pruebas.|
|---|---|



**Conclusión:** Utilizar MySQL 8.0 como base de datos para la web, es una decisión estratégica clave, su modelo de código abierto y sus características avanzadas de rendimiento y seguridad. MySQL 8.0 puede manejar eficientemente las cargas de trabajo y adaptarse a las necesidades específicas de la web, garantizando una gestión segura y escalable de los datos. Esta elección no solo asegura una base de datos fiable para el manejo de transacciones y datos críticos, sino que también facilita una experiencia de usuario fluida y eficiente. 

## **5.7.2.1. Gestores de bases de datos** 

|**Criterios**|**Gestores de bases de datos**|**Gestores de bases de datos**|**Gestores de bases de datos**|**Gestores de bases de datos**|**Gestores de bases de datos**|
|---|---|---|---|---|---|
||**MySQL**<br>**Workbench**<br>.|**HeidiSQL**|**Oracle SQL**<br>**Developer**|**pgAdmin**<br>pgAdmin|**SQL Server**<br>**Management**<br>**Studio (SSMS)**<br>ra<br>SOL Server<br>Management|
|**Soporte**|Oficial de<br>MySQL, con<br>documentación<br>y comunidad.|Comunidad y<br>soporte de<br>terceros.|Soporte oficial<br>de Oracle.|Comunidad,<br>soporte de<br>terceros.|Soporte oficial<br>de Microsoft.|
|**Seguridad**|Alta, con<br>autenticación,<br>encriptación.|Básica,<br>depende del<br>motor<br>subyacente.|Muy alta,<br>integra con<br>políticas de<br>Oracle.|Alta, depende<br>de PostgreSQL.|Muy alta,<br>integra con<br>políticas de<br>Windows y SQL<br>Server.|
|**Costo**|Gratis|Gratis|Gratis|Gratis|Gratis|
|**Sistema**<br>**Operativo**<br>**Compatible**|Windows,<br>macOS, Linux|Windows,<br>(Wine para<br>macOS/Linux)|Windows,<br>macOS, Linux|Windows,<br>macOS, Linux|Windows|
|**Lenguaje de**<br>**programación**|SQL, Python,<br>Lua|SQL|SQL, PL/SQL|SQL, PL/pgSQL|T-SQL|
|**Escalabilidad**|4/5, según la<br>capacidad del<br>motor MySQL.|4/5, depende<br>del motor<br>subyacente.|5/5, con<br>soporte para<br>grandes bases<br>de datos.|4/5, según la<br>capacidad de<br>PostgreSQL.|5/5, soporte<br>para grandes<br>entornos<br>empresariales.|
|**Rendimiento**|Óptimo para<br>MySQL|Bueno, ligero y<br>rápido.|Optimizado<br>para Oracle,<br>alto<br>rendimiento.|Bueno,<br>depende del<br>rendimiento de<br>PostgreSQL.|Óptimo para<br>SQL Server.|



|**Modelo de**<br>**Datos**|Relacional|Relacional|Relacional|Relacional|Relacional|
|---|---|---|---|---|---|
|**Facilidad de**<br>**Uso**|Intuitivo, con<br>interfaz gráfica<br>completa.|Fácil, pero más<br>técnico.|Complejo,<br>diseñado para<br>profesionales.|Intuitivo pero<br>puede ser<br>técnico.|Intuitivo, con<br>muchas<br>herramientas<br>integradas.|
|**Comunidad**|Amplia y activa|Amplia y activa<br>Amplia, con<br>buena<br>documentación<br>.|Amplia, pero<br>más técnica.|Muy activa,<br>especialmente<br>en entornos<br>open-source.|Amplia, con<br>gran soporte<br>corporativo.|
|**Casos de Uso**<br>**Comunes**|Desarrollo y<br>administración<br>de bases de<br>datos MySQL.|Administrar<br>bases de datos<br>MariaDB,<br>MySQL.|Administración<br>avanzada de<br>bases de datos<br>Oracle.|Administración<br>de bases de<br>datos<br>PostgreSQL.|Administración<br>de SQL Server<br>en entornos<br>corporativos.|



**Conclusión:** Optar por MySQL Workbench como gestor de bases de datos para la web, ofrece una solución eficiente y económica, gracias a su modelo de código abierto. MySQL Workbench proporciona un rendimiento robusto y escalable, ideal para manejar grandes volúmenes de datos y transacciones críticas, mientras que sus avanzadas características de seguridad garantizan la protección de la información. Esta combinación de compatibilidad, costo accesible y capacidades avanzadas convierte a MySQL Workbench en una elección óptima para apoyar la web en la conexión de dueños de mascotas con proveedores de servicios, asegurando una experiencia fluida y confiable para todos los usuarios. 

## **5.7.3. Contenedores:** 

|**Criterios**|**Contenedores de software**|**Contenedores de software**|**Contenedores de software**|
|---|---|---|---|
||**Docker**|**Podman**|**LXC**|
|**Versión Estable**|29.5.0|5.8.2|5.0|
|**Costo de Licencia**|Gratuito (open-source),<br>Docker Enterprise con<br>costo adicional|Gratuito (open-source)<br>~~ef~~|Gratuito (open-source)<br>~~ef~~|



|**Costo de**<br>**Mantenimiento**|Bajo (actualizaciones<br>frecuentes, amplia<br>comunidad)|Bajo (comunidad activa)|Bajo-moderado<br>(requiere experiencia<br>técnica avanzada)|
|---|---|---|---|
|**Rendimiento**|Alto|Alto, ligeramente<br>superior por<br>arquitectura sin<br>daemon|Muy alto, cerca del<br>rendimiento nativo|
|**Modelo de**<br>**Arquitectura**|Cliente-Servidor<br>(Daemon)|Sin Daemon|Virtualización ligera<br>(sistema operativo<br>completo)|
|**Soporte y Comunidad**|Muy amplia, soporte<br>comercial disponible<br>(Mirantis)|Creciendo rápidamente,<br>comunidad activa y<br>soporte Red Hat|Moderado, soporte<br>principalmente<br>comunitario|
|**Seguridad**|Alta (aislamiento<br>robusto con<br>namespaces y cgroups)|Alta, seguridad<br>mejorada al no tener<br>daemon centralizado|Muy alta (máximo<br>aislamiento,<br>virtualización ligera)|
|**Plataformas**<br>**Compatibles**|Linux, Windows, macOS|Principalmente Linux,<br>también<br>Windows/macOS<br>(experimental)|Linux (solamente)|
|**Facilidad de uso**|Muy alta (interfaz CLI<br>sencilla, curva<br>aprendizaje rápida)|Alta (similar a Docker,<br>sin daemon)|Moderada (requiere<br>conocimiento avanzado<br>de Linux)|
|**Escalabilidad**|Muy alta (orquestación<br>con Kubernetes y<br>Docker Swarm)|Alta (compatible<br>Kubernetes)|Alta, pero menos<br>orientado a<br>orquestación cloud|
|**Uso de Recursos**|Moderado (eficiente<br>pero depende del<br>daemon)|Moderado-bajo (sin<br>daemon, menor<br>consumo de recursos)|Bajo (mínima<br>sobrecarga)|
|**Casos de Uso Comunes**|Desarrollo rápido,<br>CI/CD, despliegues<br>cloud, aplicaciones web|Entornos seguros,<br>despliegues<br>empresariales,<br>desarrollo, CI/CD|Virtualización ligera,<br>aislamiento de sistemas<br>completos, entornos<br>dedicados|



**Conclusión:** Usaremos Docker para la arquitectura tecnológica gracias a su flexibilidad y escalabilidad, lo cual facilita significativamente el desarrollo, pruebas y despliegue rápido de aplicaciones. Su integración sencilla con bases de datos como My SQL, además de su extensa 

comunidad y soporte oficial, reduce costos operativos y asegura la consistencia de los ambientes, optimizando el rendimiento general del proyecto. 

## **5.7.4. Estimación del tamaño de transacción:** 

La base de datos agroexpor está compuesta por 6 tablas relacionales en MySQL 8.0. A continuación se detalla el peso estimado por fila de cada tabla, calculado con el tamaño máximo declarado de cada tipo de dato más el overhead de InnoDB (~25 Bytes por fila). 

## **Controlador:** 

|**Nombre de la columna**|**Tipo de dato**|**Peso**|
|---|---|---|
|id_controlador (PK)|INT|4 Bytes|
|id_gateway (FK)|INT|4 Bytes|
|nombre|VARCHAR(255)|255 Bytes|
|modelo|VARCHAR(150)|150 Bytes|
|ubicacion|VARCHAR(255)|255 Bytes|
|Overhead InnoDB|—|25 Bytes|
|**TOTAL por fila**||**693 Bytes**|



## **Fundo:** 

|**Nombre de la columna**|**Tipo de dato**|**Peso**|
|---|---|---|
|id_fundo (PK)|INT|4 Bytes|
|nombre|VARCHAR(255)|255 Bytes|
|ubicacion|VARCHAR(255)|255 Bytes|
|hectareas|DECIMAL|9 Bytes|
|Overhead InnoDB|—|25 Bytes|
|**TOTAL por fila**||**548 Bytes**|



## **Gateway:** 

|**Nombre de la columna**|**Tipo de dato**|**Peso**|
|---|---|---|
|id_fundo (FK)|INT|4 Bytes|
|id_gateway (PK)|INT|4 Bytes|
|modelo|VARCHAR(100)|100 Bytes|



|ip_gateway|VARCHAR(20)|20 Bytes|
|---|---|---|
|estado|VARCHAR(100)|100 Bytes|
|ubicacion|VARCHAR(255)|255 Bytes|
|Overhead InnoDB|—|25 Bytes|
|**TOTAL por fila**||**508 Bytes**|



## **Lectura_sensor:** 

|**Nombre de la columna**|**Tipo de dato**|**Peso**|
|---|---|---|
|id_lectura (PK)|BIGINT|8 Bytes|
|id_controlador (FK)|INT|4 Bytes|
|humedad|DECIMAL|9 Bytes|
|radiacion|DECIMAL|9 Bytes|
|valvula|BOOLEAN|1 Byte|
|fecha_hora|DATETIME|8 Bytes|
|Overhead InnoDB|—|25 Bytes|
|**TOTAL por fila**||**64 Bytes**|



## **Usuario:** 

|**Nombre de la columna**|**Tipo de dato**|**Peso**|
|---|---|---|
|id_usuario (PK)|INT|4 Bytes|
|nombres|VARCHAR(255)|255 Bytes|
|correo (UNIQUE)|VARCHAR(150)|150 Bytes|
|contraseña|VARCHAR(255)|255 Bytes|
|rol|VARCHAR(10)|10 Bytes|
|Overhead InnoDB|—|25 Bytes|
|**TOTAL por fila**||**699 Bytes**|



## **Usuario_fundo:** 

|**Nombre de la columna**|**Tipo de dato**|**Peso**|
|---|---|---|
|id_fundo (PK/FK)|INT|4 Bytes|
|id_usuario (PK/FK)|INT|4 Bytes|



|fecha_asignacion|DATE|3 Bytes|
|---|---|---|
|Overhead InnoDB|—|25 Bytes|
|**TOTAL por fila**||**36 Bytes**|



## **Peso por transacción** 

En el sistema agroexpor, cada ciclo de telemetría constituye una transacción de negocio que involucra las siguientes tablas: 

|**Tabla involucrada**|**Operación**|**Peso de fila**|
|---|---|---|
|lectura_sensor (INSERT)|INSERT|64 Bytes|
|controlador (SELECT/READ)|SELECT|693 Bytes|
|gateway (SELECT/READ)|SELECT|508 Bytes|
|usuario_fundo<br>(SELECT/READ)|SELECT|36 Bytes|
|**TOTAL por transacción**|**INSERT + 3 SELECTs**|**1301 Bytes**|



Esto significa que cada transacción tiene un peso de: 

Por cada 1,000 transacciones se requieren: 

El sistema gestiona 3,750 sensores enviando 4 mensajes por hora (cada 15 minutos). Eso equivale a 360,000 transacciones por día: 

El volumen de datos generado por día es: 

Suponiendo que esa cantidad de transacciones se realiza todos los días, en un año tendríamos: 

## **Datos de configuración almacenados (tablas estáticas)** 

Adicionalmente, el sistema almacena información de configuración en las tablas maestras. Sumando la información almacenada de todas las entidades del sistema: 

|**Tabla**|**N° Registros**|**Bytes/fila**|**Subtotal**|
|---|---|---|---|
|controlador|3,750|693 Bytes|2,598,750 Bytes|
|fundo|5|548 Bytes|2,740 Bytes|
|gateway|5|508 Bytes|2,540 Bytes|
|usuario|450|699 Bytes|314,550 Bytes|
|usuario_fundo|2,250|36 Bytes|81,000 Bytes|
|**TOTAL**<br>**datos**<br>**estáticos**|**—**|**—**|**2,999,580 Bytes≈**<br>**3.00 MB**|



## **Cálculo de consumo de CPU por transacción** 

Dado que cada transacción involucra un INSERT en lectura_sensor y tres SELECT en tablas relacionadas, se estima que cada transacción tarda 10 ms de procesamiento en el servidor MySQL: 

Número de transacciones por día = 360,000 

Con un servidor físico de 4 núcleos, la carga de trabajo de CPU se distribuye entre todos ellos: 

Cálculo por hora: 

Si un núcleo tiene capacidad de procesamiento al 100% durante toda una hora, su capacidad es de 3,600 segundos. El consumo de CPU en porcentaje es: 

Esto demuestra que la carga transaccional de los sensores IoT es relativamente baja en condiciones normales. El sistema tiene amplio margen para los picos de la mañana (06:00–09:00 AM) cuando el personal agrónomo accede al dashboard simultáneamente. 

Cuadro resumen — Estimación de núcleos físicos requeridos: 

|**Variable**|**Cálculo**|**Resultado**|
|---|---|---|
|Transacciones por día|3,750 × 4 × 24|360,000 tx/día|
|Tiempo CPU por transacción|Estimado<br>(INSERT<br>+<br>3<br>SELECTs)|10 ms|
|Tiempo CPU total por día|360,000 × 10 ms|3600 segundos|
|Tiempo CPU por hora|3600 s ÷ 24|150.00 s/hora|
|Tiempo CPU por núcleo/hora|150.00 s ÷ 4 núcleos|37.50 s|
|Consumo de CPU por núcleo<br>(%)|(37.50 ÷ 3,600) × 100|1.042%|
|**Consumo hora pico (usuarios**<br>**concurrentes)**|**450 × 0.1%**|**45 núcleos lógicos**|



Asumiendo que bajo condiciones de pico cada usuario concurrente consume en promedio 0.1% de un núcleo lógico, y el número de usuarios concurrentes en hora pico es 450: 

En hora pico, la plataforma consumiría aproximadamente 45 núcleos lógicos. Un procesador de 8 núcleos físicos con Hyper-Threading (16 hilos) cubre este requerimiento con margen. 

## **Estimación de memoria RAM** 

Si en hora pico se requieren 45 núcleos lógicos procesando simultáneamente, eso implica que los 450 usuarios están activos al mismo tiempo. Cada sesión activa de MySQL ocupa memoria real para sus buffers internos de trabajo: 

**Buffer MySQL por sesión Tamaño Descripción** 

|sort_buffer_size|256 KB|Ordenamiento de resultados<br>(ORDER BY)|
|---|---|---|
|join_buffer_size|256 KB|Joins sin índice entre tablas|
|read_buffer_size|128 KB|Lectura secuencial de tablas|
|read_rnd_buffer_size|128 KB|Lecturas aleatorias tras<br>ordenamiento|
|tmp_table_size|512 KB|Tablas temporales en<br>memoria (GROUP BY)|
|Thread stack + red|~8 MB|Stack del hilo + buffers de red|
|**TOTAL por sesión**|**≈ 10 MB**|**Por cada usuario**<br>**concurrente activo**|



Con 450 usuarios concurrentes, la memoria total de sesiones es: 

InnoDB Buffer Pool (datos calientes en memoria para consultas rápidas): 

Ubuntu Server 24.04 LTS con servicios activos (SSH, cron, Docker daemon, syslog): 

Servidor de aplicación (Docker + API IoT): 

Sumando todos los componentes: 

|**Componente de RAM**|**Cálculo**|**Resultado**|
|---|---|---|
|Sesiones MySQL (450<br>usuarios × 10 MB)|450 × 10 MB|4,500 MB = 4.39 GB|
|InnoDB Buffer Pool (datos<br>calientes)|Mínimo práctico productivo|2 GB|
|Sistema Operativo (Ubuntu<br>Server 24.04)|512 MB base + margen|1 GB|
|Servidor de aplicación<br>(Docker + API)|Reserva fija|1 GB|
|**TOTAL RAM requerida**|**4.39+2+1+1 GB**|**8.39 GB→ Se recomiendan**<br>**16 GB DDR4 ECC**|



## **Estimación de almacenamiento en disco (proyección 5 años)** 

El almacenamiento físico debe cubrir el crecimiento de datos durante el horizonte del proyecto. Se asume un crecimiento del 20% anual en la cantidad de sensores y transacciones: 

|**Año**|**Sensores**|**Transacciones/a**<br>**ño**|**Vol. datos (GB)**|**Acumulado (GB)**|
|---|---|---|---|---|
|Año 1|3,750|131,400,000|170.95 GB|170.95 GB|



|Año 2|4,500|157,680,000|205.14 GB|205.14 GB|
|---|---|---|---|---|
|Año 3|5,400|189,216,000|246.17 GB|246.17 GB|
|Año 4|6,480|227,059,200|295.40 GB|295.40 GB|
|**Año 5**|**7,776**|**272,471,040**|**354.48 GB**|**354.48 GB**|



|**Componente**<br>**de**<br>**almacenamiento**|**Componente**<br>**de**<br>**almacenamiento**|**Cálculo**|**Cálculo**|**GB**|**GB**|
|---|---|---|---|---|---|
|Datos transaccionales (Año 5)||Vol. Año 1 × 1.20⁴||354.48 GB||
|Índices MySQL (+30%)||354.48 × 0.30||106.34 GB||
|Datos<br>de<br>configuración<br>(tablas estáticas)||3.00 MB||0.003 GB||
|SO + MySQL + backups<br>locales||Fijo estimado||60 GB||
|Margen de expansión (+25%)||Subtotal × 0.25||130.21 GB||
|**TOTAL requerido**||**Suma de componentes**||**652 GB→ 2 × 1000 GB HDD**<br>**(RAID 1)**||
|Se recomienda configuración RAID 1 (espejo) para tolerancia a fallos: el disco espejo duplica e<br>almacenamiento físico requerido pero garantiza continuidad del servicio ante falla de disco.<br>**Cuadro resumen — Especificaciones de hardware físico recomendadas**<br>A continuación se consolidan los componentes de hardware físico local necesarios para soportar<br>el sistema agroexpor con 3,750 sensores IoT y 450 usuarios concurrentes, con proyección de<br>crecimiento al 20% anual durante 5 años.||||||
|**Componente**|**Mínimo calculado**||**Recomendado**||**Sustento**|
|**Procesador (CPU)**|48 núcleos lógicos||Intel Xeon E-2300 /<br>AMD<br>Ryzen<br>9(8<br>núcleos físicos, 16<br>hilos)||CPU: 45 hilos pico|
|**Memoria RAM**|8 GB DDR4||16 GB DDR4 ECC||AM: usuarios+SO+BD|
|**Almacenamiento BD**|652 GB||2 × 1000 GB HDD<br>(RAID 1)||Storage: 5 años+25%|
|**Almacenamiento SO**|60 GB SSD||1 × 120 GB SSD<br>(unidad raíz)||SO+MySQL+backups|



Se recomienda configuración RAID 1 (espejo) para tolerancia a fallos: el disco espejo duplica el almacenamiento físico requerido pero garantiza continuidad del servicio ante falla de disco. 

A continuación se consolidan los componentes de hardware físico local necesarios para soportar el sistema agroexpor con 3,750 sensores IoT y 450 usuarios concurrentes, con proyección de crecimiento al 20% anual durante 5 años. 

|**RAID**|RAID<br>0<br>(sin<br>redundancia)|RAID 1 (espejo) —<br>obligatorio|Alta<br>disponibilidad<br>24×7|
|---|---|---|---|
|**Red (NIC)**|100 Mbps|1<br>×<br>NIC<br>Gigabit<br>Ethernet (1 Gbps)|Red: 10 Mbps pico|
|**Fuente de poder**|400 W|Dual<br>PSU 650 W<br>redundante|Disponibilidad 24×7|
|**SO**|Ubuntu Server 22.04|Ubuntu Server 24.04<br>LTS|SO informe|
|**BD Engine**|MySQL<br>8.0<br>Community|MySQL<br>8.0<br>(instalación local)|Motores BD informe|
|**Gestor BD**|MySQL<br>Workbench<br>8.0|MySQL<br>Workbench<br>8.0.40|Gestores BD informe|
|**Contenedor**|Docker CE|Docker CE 29.5.0 +<br>Compose|Contenedores<br>informe|
|**SERVIDOR FÍSICO RECOMENDADO**||**Dell PowerEdge T150 / HPE ProLiant ML110**<br>**|  8 núcleos  |  16 GB RAM ECC  |  2 × 1000**<br>**GB HDD (RAID 1)**||



## **5.7.5. Estimación de costos de capa de datos** 

A continuación se presenta el cuadro de costos de adquisición de hardware físico y mantenimiento anual para el servidor local del sistema agroexpor, con precios referenciales del mercado peruano (Lima, 2026). Los precios incluyen IGV (18%). 

## **Adquisición de hardware físico** 

|**N°**|**Categoría**|**Componente / Especificación**|**Cant.**|**P. Unit.(S/)**|**Total(S/)**|
|---|---|---|---|---|---|
|**Servidor**||||||
|1|Servidor|Dell PowerEdge T150 / HPE<br>ProLiant<br>ML110<br>Gen10+Xeon<br>E-2334 (4C/8T, 3.4 GHz), 16 MB<br>caché|1|S/ 6,800.00|S/ 6,800.00|
|**Memoria RAM**||||||
|2|Memoria<br>RAM|Kingston / Samsung 16 GB DDR4<br>3200 MHz ECCCompatible con<br>Xeon E-2300 series|1|S/ 480.00|S/ 480.00|
|**Almacenamiento**||||||
|3|Almacenam<br>iento|Seagate IronWolf 500 GB SATA 6<br>Gb/s,<br>7200<br>RPMNAS/Server<br>grade, MTBF 1,000,000 h|2|S/ 220.00|S/ 440.00|



||4<br>Almacenam<br>iento<br>Kingston A400 120 GB SATA<br>SSDLectura 500 MB/s — para SO<br>+ servicios<br>1<br>S/ 90.00<br>S/ 90.00<br>**Controladora**<br>5<br>Controlado<br>ra<br>LSI MegaRAID / HPE Smart Array<br>E208i-aSoporte RAID 0/1/5/10,<br>cache 4 GB<br>1<br>S/ 750.00<br>S/ 750.00<br>**Red**<br>6<br>Red<br>TP-Link TL-SG108E 8 puertos<br>GigabitVLAN, QoS, control de<br>ancho de banda<br>1<br>S/ 160.00<br>S/ 160.00<br>7<br>Red<br>Nexxt / Belden Cat 6A FTP<br>blindadoPara<br>cableado<br>estructurado del servidor<br>1<br>S/ 280.00<br>S/ 280.00<br>8<br>Red<br>Patch panel 24 puertos + 24<br>conectoresInstalación<br>rack<br>estándar 1U<br>1<br>S/ 120.00<br>S/ 120.00<br>**Energía**<br>9<br>Energía<br>APC Smart-UPS 1500VA / Eaton<br>5P 1150Autonomía≥30 min,<br>protección contra picos<br>1<br>S/ 1,200.00<br>S/ 1,200.00<br>**Infraestructura**<br>10<br>Infraestruct<br>ura<br>Rack abierto 12U o gabinete<br>cerrado<br>12UCon<br>bandejas,<br>ventiladores y paneles<br>1<br>S/ 650.00<br>S/ 650.00<br>**Accesorios**<br>11<br>Accesorios<br>Canaletas, bridas, terminales,<br>etiquetasTornillos<br>rack,<br>organizadores de cable<br>1<br>S/ 80.00<br>S/ 80.00<br>**Subtotal (sin IGV)**<br>**S/ 11,050.00**<br>**IGV (18%)**<br>**S/ 1,989.00**<br>**TOTAL con IGV**<br>**S/ 13,039.00**|
|---|---|



## **Evidencias de la Configuración de la Base de Datos:** 

- Diagrama de la base de datos que representa gráficamente la estructura y relaciones entre las tablas 

- Script SQL de creación que implementa la estructura mostrada en el diagrama mediante instrucciones de definición de datos 

## - Se creó un contenedor Docker donde correrá el sistema operativo Ubuntu server. 

- Se creó la base de datos agroexpor y se les asignaron sus tablas correspondientes. 

- Se creó un usuario para que se pueda acceder a la base de datos. 

- Comprobamos esto al intentar ingresar a la base de datos por el puerto 3307. 

## **6. CONCLUSIONES** 

- Se diseñó una arquitectura de red basada en el protocolo LoRaWAN (915 MHz) que permite la recolección y transmisión de datos en tiempo real en los fundos de Ica. La red gestiona 3,750 dispositivos, incluyendo sensores de humedad de suelo a diferentes profundidades y actuadores para el control de válvulas. El uso de Edge Computing con el dispositivo Advantech ECU-1251 garantiza que el sistema de riego siga operando localmente aunque se pierda la conexión a internet, controlando los variadores de frecuencia de las bombas de pozo de manera autónoma. 

- La evaluación técnica determinó que Amazon Web Services (AWS) es el proveedor más apto debido a su Local Zone en Lima, la cual ofrece latencias menores a 10 ms. Esta velocidad de respuesta es necesaria para ejecutar órdenes de apertura y cierre de válvulas sin retrasos perceptibles. Además, la elección se justifica por el soporte técnico disponible en Perú y la capacidad de AWS IoT Core para procesar los 17.1 millones de mensajes mensuales proyectados para el sistema. 

- El análisis financiero indica que el proyecto requiere una inversión inicial de $1,115,205.00 para cubrir 5,000 hectáreas. Al optimizar el uso del recurso hídrico en un 35%, se genera un ahorro anual de $10,500,000 en costos de energía y agua. Estos indicadores económicos sitúan el retorno de inversión (ROI) en aproximadamente 39 días, lo que confirma la rentabilidad de implementar tecnología de monitoreo hídrico en el sector agroexportador. 

- Se diseñó una arquitectura de red IoT basada en el protocolo LoRaWAN (915 MHz) capaz de gestionar 3,750 dispositivos distribuidos en 5,000 hectáreas de fundos en Ica, con una tasa de transmisión de 360,000 mensajes diarios. El uso de Edge Computing mediante el dispositivo Advantech ECU-1251 garantiza la operación autónoma del sistema de riego incluso ante pérdida de conectividad a internet, controlando localmente los variadores de frecuencia de las bombas de pozo. 

- El análisis comparativo de proveedores cloud determinó que Amazon Web Services es la opción más adecuada para el proyecto, gracias a su Local Zone en Lima que ofrece latencias menores a 10 ms — condición indispensable para el control en tiempo real de válvulas y bombas. Esta ventaja supera ampliamente a las alternativas en Santiago (29–30 ms) y Querétaro (112–130 ms), que no permiten respuesta instantánea ante eventos críticos como fugas o estrés hídrico. 

- La estimación del tamaño de transacción reveló que la tabla lectura_sensor concentra el 99.9% del volumen de escritura del sistema, con un peso de 64 bytes por fila y 131.4 millones de inserciones anuales. Este análisis permitió orientar el dimensionamiento de hardware exclusivamente hacia el crecimiento de esta tabla, evitando sobredimensionar los recursos para las tablas de configuración, cuyo volumen total no supera los 3 MB. 

- El dimensionamiento de hardware físico local determinó que el servidor requiere 8 núcleos físicos con Hyper-Threading, 16 GB de RAM DDR4 ECC y almacenamiento en RAID 1 con dos discos de 500 GB. Se comprobó que los 16 GB de RAM son coherentes con los 45 núcleos lógicos requeridos en hora pico, ya que cada una de las 450 sesiones MySQL activas simultáneamente consume aproximadamente 10 MB en buffers internos de trabajo. 

## **7. MEJORAS CONTINUAS:** 

- Se añadió un análisis comparativo de los tiempos de respuesta de los principales proveedores de nube, identificando que la Local Zone de AWS en Lima ofrece latencias inferiores a 10 ms. Esto permite el control en tiempo real de los variadores de frecuencia y válvulas, superando a opciones en Santiago o Querétaro que presentan latencias de 30 ms a 130 ms. 

- Se integró el dispositivo Advantech ECU-1251 para procesar datos en el borde, lo que reduce la dependencia total de la latencia de la nube para tareas críticas. Esta mejora permite que las reglas de riego se ejecuten localmente en la caseta de bombeo, garantizando una operación 24/7 incluso ante fluctuaciones en la red troncal. 

- Se rediseñó la frecuencia de mensajes según el estado del fundo, estableciendo un modo de "Emergencia" con envíos cada 1 minuto ante fugas o heladas. Esta priorización asegura que los paquetes de datos más importantes se gestionen con la mínima latencia posible, optimizando el uso de la banda de 915 MHz y evitando colisiones en el gateway. 

## **8. REFERENCIAS BIBLIOGRÁFICAS** 

Alexandre. (2026, 24 de febrero). _List of all AWS regions and Availability Zones_ . Holori. https://holori.com/list-of-all-aws-regions-and-availability-zones/ 

Alibaba Cloud. (2025, 24 de septiembre). Alibaba Cloud Announces International Expansion Plans to Power the Next-Generation AI Innovations. Alibaba Cloud Community. https://www.alibabacloud.com/blog/alibaba-cloud-announces-international-expansion-plans-to -power-the-next-generation-ai-innovations_602561 

Alibaba Cloud. (s. f.). Global Locations. https://www.alibabacloud.com/en/global-locations 

Amazon Web Services. (2025). AWS Availability Zones. https://docs.aws.amazon.com/global-infrastructure/latest/regions/aws-availability-zones.html Amazon Web Services. (2026). On-Demand Pricing. - https://aws.amazon.com/ec2/pricing/on demand/ 

Andina. (2026, 24 de marzo). Ica se consolida como líder de las exportaciones de uva de mesa al aportar 51 % de ventas. Agencia Peruana de Noticias Andina. https://andina.pe/agencia/noticia-ica-se-consolida-como-lider-las-exportaciones-uva-mesa-al-a portar-51-ventas-1068204.aspx 

APIHA. (2026, 30 de enero). Sensores IoT y monitoreo en tiempo real para redes de agua potable. https://www.apiha.org.pe/sensores-iot-y-monitoreo-en-tiempo-real-para-redes-de-agua-potabl e/ 

Agraria. (2026, 9 de enero). En la campaña 2024-2025, Ica exportó más de 328 mil toneladas de uva. https://agraria.pe/noticias/en-la-campana-2024-2025-ica-exporto-mas-de-328-mil-toneladas-41 450 

Economize. (2026, 5 de abril). t3.medium pricing: $30.3680 monthly - AWS EC2. https://www.economize.cloud/resources/aws/pricing/ec2/t3.medium/ 

EdgeUno. (s. f.). Latency Table. https://edgeuno.com/latency/ 

Farmex. (2025, 12 de junio). Recomendaciones clave para la campaña de uva de mesa 2025-2026. https://www.farmex.com.pe/blog/recomendaciones-clave-para-la-campana-de-uva-de-mesa-20 25-2026/ 

Fluctuante. (2024, 21 de noviembre). Top 10 empresas en exportación de uva peruana campaña 2024/2025. 

https://fluctuante.lat/agroexportaciones-peruanas/2024/11/21/top-10-empresas-en-exportacio n-de-uva-peruana-campana-2024-2025/ 

FreshPlaza. (2024). Perú espera un crecimiento del 10% en las agroexportaciones en 2025. https://www.freshplaza.es/spain/article/9785648/peru-espera-un-crecimiento-del-10-en-las-agr oexportaciones-en-2025/ 

GCloud Compute. (2026). Costs (Pricing) for n2-standard-2. https://gcloud-compute.com/n2-standard-2.html 

Gridia. (s. f.). Optimización del consumo de agua en la agricultura mediante IoT. https://www.gridia.io/post/optimizaci%C3%B3n-del-consumo-de-agua-en-la-agricultura-median te-iot 

Holori. (2026, 24 de febrero). List of all AWS regions and Availability Zones. https://holori.com/list-of-all-aws-regions-and-availability-zones/ 

IPE. (2025, 16 de abril). Ica: Estados Unidos es el principal destino de agroexportaciones. INCORE. 

https://incoreperu.pe/noticias/ica-estados-unidos-es-el-principal-destino-de-agroexportaciones 

López, E. (2026, 11 de marzo). A new data center in Latin America. Google Cloud Blog. https://blog.google/company-news/inside-google/around-the-globe/google-latin-america/a-ne w-data-center-in-latin-america/ 

Mentado, P. (2021, 25 de noviembre). IoT en campo permite ahorrar hasta un 35% en el consumo de agua de riego. Factor Energético. https://factorenergetico.mx/iot-en-campo-permite-ahorrar-hasta-un-35-en-el-consumo-de-agu a-de-riego/ 

Microsoft. (2025). Azure regions. https://datacenters.microsoft.com/globe/explore/ 

QServices. (s. f.). Azure IoT vs AWS IoT vs Google IoT pricing. https://www.qservicesit.com/azure-iot-vs-aws-iot-vs-google-iot-pricing 

Senasa. (2025, 31 de marzo). Perú se consolida como líder mundial en la exportación de uva de mesa. Gob.pe. https://www.gob.pe/institucion/senasa/noticias/1136994-peru-se-consolida-como-lider-mundi al-en-la-exportacion-de-uva-de-mesa 

Vantage. (2026). D2s v5 pricing and specs. https://instances.vantage.sh/azure/vm/d2s-v5 

WonderNetwork. (2026). Global Ping Statistics: Lima to Santiago/Sao Paulo. https://wondernetwork.com/pings/Lima 

Yara. (s. f.). Gestión del agua y salinidad en uva de mesa. https://www.yara.com.pe/nutricion-vegetal/uva-de-mesa/gestion-del-agua-y-salinidad/ 

