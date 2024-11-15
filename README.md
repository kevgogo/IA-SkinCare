
# Proyecto de Inteligencia Artificial para la Clasificación de Problemas de Piel

## Descripción

Este proyecto utiliza redes neuronales convolucionales (CNN) para clasificar imágenes de diferentes tipos de lesiones de piel. Con un enfoque en la detección temprana de condiciones graves como el melanoma, el modelo puede ayudar a los médicos a priorizar y clasificar lesiones sospechosas, agilizando el proceso de triaje y derivación.

## Creado Por
- Kevin Camilo Gómez González

## Planteamiento del Problema

En 2022, se reportaron más de 1.5 millones de nuevos casos de cáncer de piel a nivel mundial, de los cuales 324,635 fueron melanoma maligno, resultando en 57,043 muertes. En Colombia, el Instituto Nacional de Cancerología reportó 1,062 nuevos casos de cáncer de piel, afectando especialmente a regiones como Bogotá, Cundinamarca, Boyacá, Tolima y Meta.

## Objetivo

El objetivo principal del proyecto es desarrollar un modelo CNN que clasifique imágenes de lesiones de piel en 9 categorías dermatológicas mediante técnicas de augmentación de datos, balanceo de clases y transfer learning, mejorando la precisión en la clasificación de condiciones dermatológicas.

## Objetivos Específicos

1. Aplicar **transfer learning** en modelos preentrenados para la clasificación de imágenes dermatológicas.
2. Implementar **augmentación y balanceo de datos** para mejorar la representatividad de cada clase.
3. Evaluar el rendimiento del modelo en un conjunto de datos de prueba.

## Dataset

El dataset utilizado es el "Skin Cancer 9 Classes (ISIC)" de Kaggle:
- **Descripción:** Imágenes de lesiones cutáneas en 9 categorías dermatológicas.
- **Cantidad de Imágenes:** Aproximadamente 23,000 imágenes.
- **Desafíos:** Desbalance de clases y variabilidad en la calidad de las imágenes.

## Metodología

### Preparación del Dataset
1. División de los datos en conjuntos de entrenamiento, validación y prueba.
2. Flujo de datos generado a partir de carpetas de imágenes.

### Entrenamiento del Modelo
- Modelo base: ResNet50 preentrenado, adaptado mediante transfer learning.
- Preprocesamiento de imágenes: redimensionado a 224x224 píxeles y augmentación de datos (rotación, zoom, volteo).
- Balanceo de clases mediante la creación de datos sintéticos usando la librería Augmentor.

### Entrenamiento y Evaluación
- Entrenamiento con optimización Adam y función de pérdida de entropía cruzada categórica.
- Validación en cada época para monitorear rendimiento.
- Uso de dropout y augmentación adicional para reducir sobreajuste.
- Evaluación final en datos de prueba para medir precisión y pérdida.

## Resultados

Incluye gráficos de precisión y pérdida a lo largo de las épocas de entrenamiento y validación, así como un análisis de rendimiento del modelo en cada clase.

## Referencias

- [American Cancer Society: Skin Cancer Risk Factors](https://www.cancer.org/cancer/skin-cancer/prevention-and-early-detection/risk-factors.html)
- [Kaggle - Skin Cancer ISIC Dataset](https://www.kaggle.com/datasets/nodoubttome/skin-cancer9-classesisic)
- Barrera-Valencia, C., & Perea-Flórez, E. X. (2024). Telemedicine and e-Health, 30(7), e2087-e2095. [DOI](https://doi.org/10.1089/tmj.2023.0369)
- Instituto Nacional de Cancerología (INC), Bogotá, D.C.: Anuario estadístico 2022.
