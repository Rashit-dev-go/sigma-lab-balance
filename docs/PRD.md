# AETHA Fin Product Requirements Document (PRD)

**Author:** Рашит
**Date:** 2025-10-23
**Project Level:** 3
**Target Scale:** comprehensive product

---

## Goals and Background Context

### Goals

### Goals

- Достижение 10 000 активных пользователей в первый год
- ARPU 500 ₽/мес
- Конверсия free-to-paid 20%
- Сокращение времени на финансовый учёт на 50%
- Частота использования AI-симуляций >3 раз/нед
- NPS >70

### Background Context

### Background Context

AETHA Fin решает проблему хаоса и отсутствия стратегического видения в финансах предпринимателей и профессионалов. В условиях, когда личные и бизнес-финансы не интегрированы, пользователи испытывают стресс от неясности "куда уходит прибыль" и упущенных возможностей. Существующие инструменты вроде Excel или 1C не предоставляют аналитику в реальном времени и прогнозы, что приводит к неэффективным решениям.

Проект актуален сейчас из-за роста финтех-рынка на 20-30% в год и спроса на AI-инструменты среди 40-50% предпринимателей. Конкуренты сосредоточены на бухгалтерском учёте, в то время как AETHA Fin фокусируется на стратегическом управлении финансами с AI-анализом, симуляциями "что если" и визуализацией потоков денег, без международных рисков и обучения AI на пользовательских данных.

---
### Functional Requirements

### Functional Requirements

FR019: [Основа] Данные пользователя защищены и конфиденциальны (доверие как фундамент)
FR001: [Основа] Пользователь может безопасно получить доступ к своим финансовым данным (доступ к данным)
FR002: [Видимость] Пользователь может видеть все свои доходы и расходы в одном месте (ясность данных)
FR003: [Видимость] Пользователь может видеть все свои доходы и расходы в одном месте (ясность данных)
FR004: [Видимость] Пользователь может видеть все свои доходы и расходы в одном месте (ясность данных)
FR005: [Видимость] Пользователь может видеть все свои доходы и расходы в одном месте (ясность данных)
FR006: [Видимость] Пользователь может видеть свой финансовый баланс (понимание баланса)
FR015: [Организация] Пользователь может организовать свои транзакции по категориям (структурирование)
FR018: [Доступность] Пользователь может найти нужную транзакцию быстро (быстрый доступ)
FR007: [Обзор] Пользователь получает простой обзор своего финансового положения (сводка)
FR008: [Понимание] Пользователь видит, как деньги движутся между личными и бизнес-сферами (потоки)
FR009: [Insights] Система показывает простые insights о финансовом здоровье (анализ)
FR010: [Предупреждения] Система предупреждает о потенциальных проблемах (проактивность)
FR013: [Рекомендации] Система предлагает простые действия для улучшения финансов (действия)
FR021: [Доверие] Система объясняет советы понятно (прозрачность)
FR011: [Эксперименты] Пользователь может "поиграть" с разными сценариями для понимания последствий (обучение)
FR012: [Визуализация] Симуляции показывают возможные outcomes простыми графиками (будущее)
FR016: [Планирование] Пользователь может планировать свои расходы (контроль)
FR017: [Поддержка] Система напоминает о важных финансовых моментах (помощь)
FR020: [Мотивация] Пользователь может ставить финансовые цели (цели)
FR014: [Расширение] Пользователь может поделиться своими финансами с консультантом (экспертиза)
FR022: [Экспертиза] Консультанты могут видеть анонимизированные данные клиентов (помощь)
FR023: [Коллаборация] Команды могут совместно управлять бизнес-финансами (командная работа)
FR024: [Улучшение] Система учится улучшать опыт пользователей (эволюция)

**Core Trust Foundations (Non-Negotiable for Financial Systems):**
NFR001: Финансовые данные всегда защищены и доступны пользователю (фундаментальный принцип доверия; validated through user access logging)
NFR002: Данные шифруются с использованием проверенных стандартов безопасности (основа для всех операций; no exceptions for any data type)

**Essential User Access (Core Financial Need):**
NFR003: Пользователь получает мгновенный доступ к финансовой информации (менее 3 секунд для critical operations; fundamental user expectation)
NFR005: Система работает когда пользователю это нужно (99%+ effective availability; trust depends on reliability)

**Progressive Enhancement (Built on Core Foundations):**
NFR006: Система соответствует базовым требованиям финансовой отчетности (auditable transactions; regulatory minimum)
NFR007: В случае сбоя данные могут быть восстановлены (within business day; fundamental data protection)
NFR008: Система масштабируется по мере роста пользовательской базы (elastic capacity; business sustainability)

**Quality Validation (Ensuring Core Principles):**
NFR004: Интерфейс не мешает принятию финансовых решений (intuitive within first use; fundamental usability)
NFR009: Система доказывает свою надежность через consistent operation (measured user trust metrics; validation of core principles)
NFR010: Безопасность регулярно проверяется и подтверждается (quarterly validation; fundamental security assurance)

---
## User Journeys

**Основной маршрут: Ежедневное управление финансами**

1. Пользователь входит в систему → Видит дашборд с ключевыми метриками
2. Просматривает транзакции → Категоризирует новые расходы
3. Получает AI-инсайты → Принимает решения по оптимизации
4. Планирует бюджет на следующий период → Устанавливает цели

**Расширенный маршрут: Стратегическое планирование**

1. Пользователь анализирует тренды → Запускает симуляции "что если"
2. Исследует инвестиционные возможности → Оценивает риски
3. Консультируется с экспертами → Получает персонализированные рекомендации
4. Создает долгосрочный финансовый план → Отслеживает прогресс

**Критический маршрут: Решение кризисных ситуаций**

1. Система обнаруживает проблему → Отправляет предупреждение
2. Пользователь анализирует причины → Просматривает альтернативные сценарии
3. Принимает корректирующие меры → Мониторит результаты
4. Учит опыт → Улучшает будущие решения

**Карта зависимостей маршрутов:**

**Последовательные зависимости:**
- A1 → A2 → A3 → A4 (основной поток)
- B1 → B2 → B3 → B4 (стратегический поток)
- C1 → C2 → C3 → C4 (кризисный поток)

**Межмаршрутные связи:**
- Дашборд (A1) используется для анализа трендов (B1)
- Просмотр транзакций (A2) помогает анализировать причины проблем (C2)
- AI-инсайты (A3) могут запускать симуляции (B2)
- Бюджетное планирование (A4) влияет на долгосрочное планирование (B4)

**Ключевые технические зависимости:**
- Надежная аутентификация для всех точек входа
- AI-модели зависят от качества данных транзакций
- Симуляции требуют математических моделей
- Обнаружение проблем нуждается в мониторинге реального времени

**Анализ сценариев "что если":**

**Устойчивость к ошибкам:** Маршруты должны иметь fallback-пути при сбоях AI или недоступности экспертов
**Адаптивность сложности:** Интерфейс масштабируется от простого режима для новичков до продвинутого для экспертов
**Прозрачность AI:** Показывать confidence score для рекомендаций и предупреждать об ограничениях
**Мотивационная поддержка:** Даже негативные сценарии предлагают конструктивные решения
**Резилиентность:** Критические функции работают offline и не зависят от внешних сервисов

**Анализ рисков (pre-mortem):**

**Профилактика потери доверия:** Начинать с небольших verifiable побед в каждом маршруте
**Прогрессивная сложность:** Вводить продвинутые функции только после доказанной ценности
**Восстановление после ошибок:** Каждый маршрут имеет "undo" и "помощь" опции
**Мотивационные циклы:** Создавать положительную обратную связь для поддержания вовлеченности
**Устойчивость к сбоям:** Подготовка к техническим проблемам, ошибкам данных, пользовательским промахам

**Расширенная структура маршрутов (skeleton of thought):**

**Основной маршрут - Ежедневное управление:**
- **Onboarding:** Быстрая настройка, импорт данных, guided tutorial
- **Routine:** Smart notifications, автоматическая категоризация, daily summaries
- **Advanced:** Custom dashboards, advanced filtering, API access

**Стратегический маршрут - Долгосрочное планирование:**
- **Analysis:** Historical patterns, seasonal adjustments, comparative analysis
- **Simulation:** What-if modeling, scenario comparison, risk assessment
- **Consultation:** AI recommendations, expert matching, knowledge base

**Кризисный маршрут - Решение проблем:**
- **Detection:** Real-time monitoring, predictive alerts, anomaly detection
- **Analysis:** Root cause tools, impact assessment, decision support
- **Resolution:** Action templates, progress tracking, recovery monitoring

---
## UX Design Principles

1. **Математическая прозрачность** - Каждый элемент объясняет свою логику и источник данных через layered explanations
2. **Эмоциональная безопасность** - Интерфейс снижает тревогу через предсказуемость, контроль и positive reinforcement
3. **Временная эффективность** - Критические инсайты доступны <3 сек, глубокий анализ - progressive loading
4. **Адаптивная сложность** - ML-driven personalization адаптирует интерфейс от simple mode к expert features
5. **Сенсорная ясность** - Визуальные (charts), текстовые (labels), интерактивные (tooltips) сигналы работают синхронно
6. **Устойчивость к неудачам** - Graceful degradation: цвет → форма → текст → звук при loss of modalities
7. **Инклюзивное обучение** - От onboardinga новичка до advanced mentoring экспертов через contextual help
8. **Системная связность** - Все компоненты образуют coherent ecosystem с shared state и consistent patterns

---
## User Interface Design Goals

1. **Иерархия доверия** - Visual weight system: colors (confidence), icons (status), text (explanations) на каждом элементе
2. **Контекстный коллапс** - Progressive disclosure с state preservation и breadcrumb navigation
3. **Предиктивная адаптация** - AI-driven interface evolution based on user behavior patterns
4. **Минималистичный максимализм** - Maximum information density через data visualization и micro-interactions
5. **Кросс-платформенная консистентность** - Unified experience через design system с platform-specific adaptations
6. **Резилиентность данных** - Offline-first architecture с optimistic updates и conflict resolution
7. **Мультимодальный доступ** - Voice commands, gesture controls, haptic feedback для comprehensive accessibility
8. **Модульная архитектура** - Component composition с clear interfaces для maintainability и scalability

---
## Epic List

- **Epic 1: Trust & Traction Foundation** - Deploy MVP with secure data pipeline, accurate AI categorization, basic compliance framework, and user acquisition features to establish product-market fit and data foundation
- **Epic 2: Revenue Intelligence Core** - Build confidence-building AI recommendations, premium monetization features, conversion optimization, and revenue validation to prove business model
- **Epic 3: Growth Analytics Platform** - Advanced scenario simulations, predictive analytics, expert consultation integration, and collaboration tools to drive user expansion and retention
- **Epic 4: Enterprise Scale & Resilience** - Full regulatory compliance suite, enterprise-grade security, performance optimization, crisis response capabilities, and scaling infrastructure for market leadership

> **Note:** Detailed epic breakdown with full story specifications is available in [epics.md](./epics.md)

---

## Out of Scope

- Integrations with banks and CRM systems for automatic data import/export
- Training AI models on individual user data for personalized learning
- Support for international currencies and multi-currency financial scenarios
- Advanced enterprise features like multi-user access and comprehensive audit trails
- Native mobile applications (web PWA only for MVP)
- Full offline functionality beyond basic transaction caching
- Advanced reporting and export capabilities beyond basic dashboards
- Third-party integrations and API access for external systems
- Custom AI model training and advanced machine learning features
- International expansion features and localization beyond Russian market
