# Balance UX/UI Specification

_Generated on 2025-10-23 by Рашит_

## Executive Summary

## Резюме проекта

AETHA Fin - это инструмент для стратегического управления финансами предпринимателей и профессионалов. Проект решает проблему хаоса в личных и бизнес-финансах, предоставляя интеграцию, AI-анализ, прогнозы и визуализации потоков денег.

### Основные цели:
- 10 000 активных пользователей за первый год
- ARPU 500 ₽/мес
- Конверсия free-to-paid 20%
- Сокращение времени на финансовый учет на 50%
- Частота использования AI-симуляций >3 раз/нед
- NPS >70

### Фон:
Рост финтех-рынка на 20-30% в год, спрос на AI среди 40-50% предпринимателей. Конкуренты фокусируются на бухгалтерии, AETHA Fin - на стратегическом управлении.

### Основные функции:
- Безопасный доступ к финансовым данным
- Видимость доходов и расходов
- Финансовый баланс
- Категоризация транзакций
- Поиск транзакций
- Обзоры финансового положения
- Визуализация потоков денег
- AI-инсайты и рекомендации
- Предупреждения о проблемах
- Бюджетирование и планирование
- Финансовые цели
- AI-симуляции "что если"
- Консультации с экспертами
- Командная работа

### Пользовательские маршруты:
- Ежедневное управление финансами
- Стратегическое планирование
- Решение кризисных ситуаций

### UX принципы:
- Математическая прозрачность
- Эмоциональная безопасность
- Временная эффективность
- Адаптивная сложность
- Сенсорная ясность
- Устойчивость к неудачам
- Инклюзивное обучение
- Системная связность

### UI цели:
- Иерархия доверия
- Контекстный коллапс
- Предиктивная адаптация
- Минималистичный максимализм
- Кросс-платформенная консистентность
- Резилиентность данных
- Мультимодальный доступ
- Модульная архитектура

### Платформа:
- Web PWA для MVP
- Нет native мобильных приложений

### Уровень проекта:
3 (comprehensive product)

### Сложность UX:
---

## 1. UX Goals and Principles

## 1. UX Goals and Principles

### 1.1 Target User Personas

**Primary Persona: Предприниматель (Entrepreneur)**

- **Описание:** Владелец малого бизнеса (например, кафе или онлайн-магазин), управляет личными и бизнес-финансами. Возраст 30-50 лет, технически грамотный, но не эксперт в финансах. Мотивация: быстрые результаты без глубокого изучения.

- **Цели:** Увеличить прибыль на 20%, оптимизировать расходы, принимать стратегические решения на основе данных. Ежедневное управление финансами с минимальными усилиями (менее 10 мин/день).

- **Болевые точки:** Хаос в данных (несколько банковских счетов, cash flow неясен), отсутствие интеграции личных и бизнес-финансов, стресс от неясности "куда уходят деньги", неэффективные решения без прогнозов. Боязнь ошибок в финансах (риск потерять бизнес).

- **What If Insight:** Добавить для premium tier; expand market.

### 1.2 Usability Goals

- **Легкость обучения (Learnability):** Новички могут начать без обучения, с guided onboarding (5-min setup). Эксперты получают shortcuts и power user features. Метрика: Time to first value < 5 min.

- **Эффективность для опытных (Efficiency):** Продвинутые функции доступны для экспертов, с keyboard shortcuts, advanced filters, batch operations. Метрика: Task completion time 50% faster than manual methods.

- **Предотвращение ошибок (Error Prevention):** Система validates input, shows warnings, provides undo. Safe experimentation in simulations. Метрика: Error rate < 2% for critical operations.

- **What If Insight:** Если без collaboration, limited to solo users; add as core feature.

### 1.3 Design Principles

1. **Математическая прозрачность:** Каждый элемент объясняет логику и источник данных (например, "Этот прогноз основан на ваших транзакциях за последние 6 месяцев"). AI показывает reasoning chain для рекомендаций.

2. **Эмоциональная безопасность:** Интерфейс снижает тревогу через предсказуемость (consistent layouts), positive feedback (progress indicators), safety nets (undo, confirmations).

3. **Временная эффективность:** Критические инсайты <3 сек (dashboard load), progressive loading for deep analysis (simulations load in stages).

4. **What If Insight:** Если игнорировать scalability, stuck at SMB; design for growth.
4. **Адаптивная сложность:** Интерфейс масштабируется от simple mode (novice: basic dashboard) к expert features (professional: custom models). Personalization based on usage patterns.

5. **Системная связность:** Все компоненты образуют coherent ecosystem с shared state (data flows between modules), consistent patterns (same buttons for "simulate"), cross-feature integration (budget links to goals).

6. **Вовлеченность через сотрудничество:** Поддержка командной работы с clear roles (owner edits, viewer comments), conflict resolution (merge changes), shared goals (team objectives visible).

7. **What If Insight:** Если игнорировать scalability, stuck at SMB; design for growth.

---

## 2. Information Architecture

### 2.1 Site Map

```
AETHA Fin App
├── Главная (Dashboard)
│   ├── Обзор финансов (Financial Overview)
│   ├── Ключевые метрики (Key Metrics)
│   └── AI-инсайты (AI Insights)
├── Транзакции (Transactions)
│   ├── Список транзакций (Transaction List)
│   ├── Добавить транзакцию (Add Transaction)
│   ├── Категории (Categories)
│   └── Поиск (Search)
├── Анализ (Analysis)
│   ├── Тренды (Trends)
│   ├── Симуляции "что если" (Simulations)
│   ├── Отчеты (Reports)
│   └── AI-анализ (AI Analysis)
├── Планирование (Planning)
│   ├── Бюджет (Budget)
│   ├── Цели (Goals)
│   └── Прогнозы (Forecasts)
├── Сотрудничество (Collaboration)
│   ├── Командная работа (Team)
│   ├── Совместные сценарии (Shared Scenarios)
│   └── Консультации (Consultations)
└── Настройки (Settings)
    ├── Профиль (Profile)
    ├── Безопасность (Security)
    └── Интеграции (Integrations)
```

### 2.2 Navigation Structure

**Основная навигация:**
- Dashboard
- Transactions
- Analysis
- Planning
- Collaboration (для премиум/команд)

**Вторичная навигация:**
- Для каждой основной секции: боковое меню или dropdown с подразделами

**Мобильная навигация:**
- Нижняя навигационная панель с иконками для основных разделов (Dashboard, Transactions, Analysis, Planning)
- Гамбургер-меню для дополнительных опций

**Breadcrumb структура:**
- Домашняя > Раздел > Подраздел (например: Домашняя > Транзакции > Категории)

---

## 3. User Flows

### Ежедневное управление финансами

**Цель пользователя:** Быстро получить обзор финансового состояния и выполнить рутинные задачи управления финансами.

**Точки входа:** Авторизация в приложении, push-уведомление о новых транзакциях, ежедневное напоминание.

**Пошаговый поток с точками решений:**

1. Пользователь входит в систему (логин/биометрия, persona-based dashboard)
2. Просмотр дашборда: ключевые метрики (баланс, доход/расход за период, alerts)
   - Решение: Если есть alerts → перейти к анализу проблемы (collaborative для команд)
3. Просмотр списка транзакций
   - Категоризация новых транзакций (AI предлагает, пользователь подтверждает/корректирует; guided для novices)
4. Получение AI-инсайтов: тренды, рекомендации по оптимизации (explainable для trust)
   - Решение: Принять рекомендацию или игнорировать (team approval for shared accounts)
5. Принятие решений: корректировка расходов, перенос средств (simulations for safety)
6. Планирование бюджета на следующий период
   - Установка/обновление целей (milestones for tracking)
7. Завершение сессии (feedback loop for learning)

**Критерии успеха:** Задачи выполнены за <10 мин, пользователь принимает хотя бы одну рекомендацию, бюджет обновлен.

**Состояния ошибок:**
- Недоступность данных: показать cached данные с предупреждением (persona-specific fallbacks)
- Неверная AI-категоризация: возможность ручной корректировки (expert override)
- Сбой AI: fallback на базовые инсайты (guided manual process)

**Граничные случаи:**
- Новые пользователи: guided tutorial (onboarding flow)
- Отсутствие транзакций: показать onboarding (empty state design)
- Multiple аккаунты: переключение между личными/бизнес (tabbed interface)
- Команды: shared views с comments (collaboration mode)

**Persona-specific enhancements:**
- Novice: Tooltips, simplified language, safe mode
- Expert: Advanced filters, bulk actions, custom alerts
- Team: Role permissions, shared goals, audit trails

```mermaid
flowchart TD
    A[Вход в систему] --> B[Persona-based Dashboard: метрики и alerts]
    B --> C{Есть alerts?}
    C -->|Да| D[Анализ проблемы (collaborative)]
    C -->|Нет| E[Просмотр транзакций]
    E --> F[Категоризация транзакций (guided AI)]
    F --> G[AI-инсайты и рекомендации (explainable)]
    G --> H[Принятие решений (with simulations)]
    H --> I[Планирование бюджета/целей (milestones)]
    I --> J[Завершение (feedback)]
    D --> E
```

### Стратегическое планирование

**Цель пользователя:** Анализировать долгосрочные тренды, моделировать сценарии и создавать финансовый план.

**Точки входа:** Из дашборда (кнопка "Анализ"), из бюджета (кнопка "Симуляции"), или запланированное напоминание.

**Пошаговый поток с точками решений:**

1. Доступ к разделу анализа (persona-tailored entry)
2. Просмотр исторических трендов (графики доходов/расходов, customizable periods)
   - Решение: Выбрать период анализа (месяц/квартал/год; expert: custom ranges)
3. Запуск симуляций "что если" (изменение переменных: доход, расходы, инвестиции; safe experimentation)
   - Решение: Выбрать тип симуляции (оптимизация, риск, рост; team: shared scenarios)
4. Исследование инвестиционных возможностей (ROI calculators, risk models)
   - Оценка рисков через AI-модели (explainable probabilities)
5. Консультация с экспертами (в app или external; integrated chat)
   - Решение: Запросить консультацию или продолжить самостоятельно (novice: auto-suggestions)
6. Создание долгосрочного плана (бюджет + цели + прогнозы; collaborative editing)
7. Отслеживание прогресса (dashboard с milestones, alerts for deviations)

**Критерии успеха:** Пользователь создает план, симулирует >=3 сценария, получает >=1 рекомендацию.

**Состояния ошибок:**
- Недостаточно данных для симуляции: показать минимальные требования (guided data entry)
- AI-модель не converged: объяснить ограничения (fallback to simple models)
- External консультант недоступен: показать cached советы (persona-matched)

**Граничные случаи:**
- Эксперты: глубокие настройки, custom модели (advanced builder)
- Новички: simplified симуляции с примерами (tutorial mode)
- Команды: collaborative planning с shared симуляциями (version control, approvals)

**Persona-specific enhancements:**
- Novice: Step-by-step wizards, example scenarios
- Expert: API integrations, custom variables, advanced analytics
- Team: Shared workspaces, comment threads, approval workflows

```mermaid
flowchart TD
    A[Раздел анализа (persona-tailored)] --> B[Просмотр трендов (customizable)]
    B --> C{Выбрать период?}
    C --> D[Анализ выбранного периода]
    D --> E[Запуск симуляций "что если" (safe)]
    E --> F{Тип симуляции}
    F --> G[Оптимизация]
    F --> H[Риск-анализ (explainable)]
    F --> I[Рост-моделирование (team-shared)]
    G --> J[Исследование инвестиций (ROI calc)]
    H --> J
    I --> J
    J --> K[Оценка рисков]
    K --> L{Нужна консультация?}
    L -->|Да| M[Запрос эксперта (integrated)]
    L -->|Нет| N[Создание плана (collaborative)]
    M --> N
    N --> O[Отслеживание прогресса (milestones)]
```

### Решение кризисных ситуаций

**Цель пользователя:** Быстро идентифицировать и разрешить финансовые проблемы.

**Точки входа:** Push-уведомление о проблеме, alert на дашборде, или ручной доступ к alerts.

**Пошаговый поток с точками решений:**

1. Получение предупреждения (уведомление или dashboard alert; prioritized by persona)
2. Просмотр деталей проблемы (баланс ниже порога, overspending; context-aware)
   - Решение: Подтвердить проблему или игнорировать (with feedback)
3. Анализ причин (тренды, категории расходов; AI-assisted root cause)
   - Просмотр альтернативных сценариев (AI-симуляции корректировок; safe mode)
4. Принятие корректирующих мер (сокращение расходов, перенос средств; guided actions)
   - Решение: Выбрать действие (автоматическое или ручное; team consensus for shared)
5. Мониторинг результатов (обновление дашборда, follow-up alerts; progress tracking)
6. Извлечение уроков (обновление правил, целей; learning recommendations)

**Критерии успеха:** Проблема разрешена, пользователь принимает меры, система адаптируется (personalized alerts).

**Состояния ошибок:**
- False positive alert: возможность dismiss с feedback (improves AI)
- Недостаточно данных: объяснить и предложить manual input (guided)
- Действие не помогает: показать alternative решения (scenario comparison)

**Граничные случаи:**
- Множественные проблемы: prioritized alerts (severity-based)
- Команды: shared crisis management (assigned roles, communication)
- Новички: simplified explanations и guided actions (safe defaults)

**Persona-specific enhancements:**
- Novice: Clear language, step-by-step guidance, reassurance
- Expert: Detailed analytics, custom thresholds, integration options
- Team: Escalation protocols, shared dashboards, audit logs

```mermaid
flowchart TD
    A[Получение предупреждения (prioritized)] --> B[Просмотр деталей проблемы (context-aware)]
    B --> C{Подтвердить проблему?}
    C -->|Да| D[Анализ причин (AI-assisted)]
    C -->|Нет| E[Dismiss alert (with feedback)]
    D --> F[Просмотр сценариев корректировок (safe)]
    F --> G[Принятие мер (guided)]
    G --> H{Действие выбрано (team consensus)}
    H --> I[Мониторинг результатов (progress)]
    I --> J{Проблема решена?}
    J -->|Да| K[Извлечение уроков (learning)]
    J -->|Нет| L[Alternative решения (comparison)]
    L --> G
    K --> M[Завершение]
    E --> M
```

{{user_flow_4}}

{{user_flow_5}}

---

## 4. Component Library and Design System

### 4.1 Design System Approach

Модульная дизайн-система, ориентированная на масштабируемость и персонализацию. Основана на принципах математической прозрачности, эмоциональной безопасности и адаптивной сложности.

**Ключевые принципы:**
- **Consistency:** Единые паттерны для всех компонентов
- **Scalability:** Легкое добавление новых компонентов и вариаций
- **Accessibility:** WCAG 2.1 AA compliance встроена в систему
- **Performance:** Оптимизированные компоненты для быстродействия
- **Personalization:** Компоненты адаптируются под персоны (novice/expert modes)

**Технологический стек:**
- Базовые компоненты на HTML/CSS/JS для PWA
- Переиспользуемые tokens для colors, typography, spacing
- Component library с variants для разных контекстов

**Организация:**
- Atomic design: atoms → molecules → organisms
- Theme system для light/dark modes и persona adaptations
- Documentation: Storybook-style для разработчиков

### 4.2 Core Components

**Form Elements:**
- Button (variants: primary, secondary, danger, disabled; states: hover, active, loading)
- Input Field (text, number, password; with validation states and icons)
- Select/Dropdown (single/multi-select, searchable)
- Checkbox/Radio (grouped, with labels)
- Textarea (auto-resize, character counter)

**Data Visualization:**
- Chart Components (line, bar, pie; interactive tooltips)
- Data Table (sortable, filterable, paginated)
- KPI Card (metric display with trend indicators)
- Progress Indicators (linear, circular)

**Navigation Elements:**
- Tab Navigation (horizontal/vertical)
- Breadcrumb (with links)
- Pagination Controls
- Search Bar (with filters)

**Feedback Elements:**
- Tooltip (hover/click, positioned)
- Notification/Toast (success, warning, error)
- Modal/Dialog (confirm, form, info)
- Loading Spinner/Skeleton

**Layout Components:**
- Card (content container, variants)
- Grid/Flex layouts
- Sidebar/Panel (collapsible)
- Header/Footer

**Financial-specific:**
- Transaction Item (list view)
- Budget Progress (visual bars)
- Simulation Slider (for "what if" inputs)
- Alert Banner (warnings, successes)

---

## 5. Visual Design Foundation

### 5.1 Color Palette

{{color_palette}}

### 5.2 Typography

**Font Families:**
{{font_families}}

**Type Scale:**
{{type_scale}}

### 5.3 Spacing and Layout

{{spacing_layout}}

---

## 6. Responsive Design

### 6.1 Breakpoints

{{breakpoints}}

### 6.2 Adaptation Patterns

{{adaptation_patterns}}

---

## 7. Accessibility

### 7.1 Compliance Target

{{compliance_target}}

### 7.2 Key Requirements

{{accessibility_requirements}}

---

## 8. Interaction and Motion

### 8.1 Motion Principles

{{motion_principles}}

### 8.2 Key Animations

{{key_animations}}

---

## 9. Design Files and Wireframes

### 9.1 Design Files

{{design_files}}

### 9.2 Key Screen Layouts

{{screen_layout_1}}

{{screen_layout_2}}

{{screen_layout_3}}

---

## 10. Next Steps

### 10.1 Immediate Actions

{{immediate_actions}}

### 10.2 Design Handoff Checklist

{{design_handoff_checklist}}

---

## Appendix

### Related Documents

- PRD: `docs/PRD.md`
- Epics: 
- Tech Spec: 
- Architecture: `docs/architecture.md`

### Version History

| Date     | Version | Changes               | Author        |
| -------- | ------- | --------------------- | ------------- |
| 2025-10-23 | 1.0     | Initial specification | Рашит |
