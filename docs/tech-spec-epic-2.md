# Technical Specification: Revenue Intelligence Core

Date: 2025-10-24
Author: Рашит
Epic ID: 2
Status: Draft

---

## Overview

This technical specification details the implementation of Epic 2: Revenue Intelligence Core, which transforms the AETHA Fin MVP into a viable business by implementing confidence-building AI recommendations, premium monetization features, free-to-paid conversion optimization, and revenue validation capabilities. This epic builds on the secure data foundation established in Epic 1 to prove the business model through measurable revenue generation.

## Objectives and Scope

### In Scope
- Basic AI financial insights for free tier users (3 insights/week)
- Premium AI recommendations engine with confidence scores
- Subscription management system with payment processing
- Free trial conversion optimization (14-day trial)
- Revenue analytics dashboard with key metrics
- AI confidence building features (accuracy tracking, social proof)
- Premium feature gating and access control

### Out of Scope
- Advanced scenario simulations (Epic 3)
- Expert consultation integration (Epic 3)
- Enterprise compliance features (Epic 4)
- Multi-tenant architecture (Epic 4)

## System Architecture Alignment

The Epic 2 implementation aligns with the established Next.js 14 + Yandex Cloud architecture. Key alignment points:
- REST API endpoints extend existing /pages/api structure
- PostgreSQL schema extensions for subscription and recommendation data
- YandexGPT integration for enhanced AI recommendation capabilities
- NextAuth.js authentication foundation supports premium user management
- Yandex Pay integration for subscription processing

## Detailed Design

### Services and Modules

| Service/Module | Responsibilities | Inputs | Outputs | Owner |
|---------------|------------------|--------|---------|-------|
| AI Insights Engine | Generate weekly insights for free users | Transaction data, user profile | 3 categorized insights/week | AI Service |
| Premium Recommendations | Advanced AI recommendations with confidence scores | Transaction history, user goals | Personalized recommendations | AI Service |
| Subscription Manager | Handle subscription lifecycle | Payment data, user actions | Subscription status, billing | Payment Service |
| Trial Optimizer | Manage free trials and conversion | User engagement metrics | Conversion prompts, trial status | User Service |
| Revenue Analytics | Calculate and display revenue metrics | Subscription data, user events | ARPU, conversion rates, dashboards | Analytics Service |
| Confidence Builder | Track AI accuracy and build trust | AI predictions vs. user actions | Accuracy metrics, trust signals | AI Service |
| Feature Gate | Control access to premium features | Subscription status, user permissions | Feature availability | Auth Service |

### Data Models and Contracts

#### Core Data Models
```typescript
interface UserSubscription {
  userId: string;
  plan: 'free' | 'premium';
  status: 'trial' | 'active' | 'cancelled' | 'expired';
  startDate: Date;
  endDate?: Date;
  paymentMethodId: string;
  autoRenew: boolean;
}

interface AIRecommendation {
  id: string;
  userId: string;
  type: 'budget' | 'savings' | 'investment';
  title: string;
  description: string;
  confidence: number; // 0-100
  actions: RecommendationAction[];
  createdAt: Date;
  appliedAt?: Date;
}

interface RevenueMetrics {
  period: string;
  arpu: number;
  conversionRate: number;
  churnRate: number;
  totalRevenue: number;
  activeSubscriptions: number;
}
```

### APIs and Interfaces

#### REST API Endpoints
- `GET /api/insights/free` - Get weekly AI insights (free tier)
- `GET /api/recommendations` - Get premium AI recommendations
- `POST /api/subscriptions` - Create/manage subscriptions
- `GET /api/analytics/revenue` - Get revenue metrics dashboard
- `GET /api/trials/status` - Check trial status and conversion eligibility
- `POST /api/feedback/recommendation` - Submit recommendation feedback

#### Request/Response Examples
```typescript
// GET /api/recommendations
Response: {
  success: true,
  data: {
    recommendations: [
      {
        id: "rec_123",
        type: "budget",
        title: "Reduce dining expenses",
        confidence: 85,
        actions: [...]
      }
    ]
  }
}
```

### Workflows and Sequencing

1. **Free User Flow**: Dashboard → AI generates insights → Display 3 insights/week → Show upgrade prompts
2. **Premium Onboarding**: Trial activation → AI recommendations unlocked → Confidence building features
3. **Subscription Management**: Payment processing → Feature unlocking → Revenue tracking
4. **Trial Conversion**: Trial expiration → Conversion prompts → Seamless upgrade

## Non-Functional Requirements

### Performance
- AI insights generation: <5 seconds for free tier, <10 seconds for premium
- Recommendation confidence calculation: <3 seconds
- Subscription status checks: <1 second
- Revenue dashboard loading: <3 seconds

### Security
- Premium data encryption using AES-256
- Subscription payment data PCI DSS compliant
- AI recommendation data anonymized for privacy
- Rate limiting on premium API endpoints (100 req/min per user)

### Reliability/Availability
- AI services: 99.5% uptime with fallback to basic insights
- Payment processing: 99.9% uptime with transaction logging
- Subscription management: 99.9% availability with state consistency
- Trial system: 99.9% availability with automatic renewal handling

### Observability
- AI recommendation success rates logged and monitored
- Subscription conversion funnel tracked with analytics
- Revenue metrics updated in real-time with alerting
- User engagement with premium features measured

## Dependencies and Integrations

### External Dependencies
- YandexGPT API (v1.0+) - AI recommendations and insights
- Yandex Pay SDK - Subscription payment processing
- PostgreSQL extensions - JSON support for recommendation metadata
- Redis (optional) - Caching for premium user sessions

### Internal Integrations
- Epic 1 transaction data and categorization
- Authentication system for premium user verification
- Email service for trial notifications and receipts

## Acceptance Criteria (Authoritative)

1. Free tier users receive exactly 3 AI insights per week, displayed prominently on dashboard
2. Premium recommendations include confidence scores between 0-100% with clear explanations
3. Subscription system processes payments securely with immediate feature unlocking
4. Free trial lasts exactly 14 days with automatic conversion prompts at expiration
5. Revenue analytics dashboard shows real-time ARPU, conversion rates, and churn metrics
6. AI confidence tracking displays historical accuracy rates and user feedback
7. Premium feature gating prevents free users from accessing paid functionality
8. All subscription changes trigger immediate email notifications to users

## Traceability Mapping

| AC ID | Spec Section | Component/API | Test Case | Priority |
|-------|-------------|---------------|-----------|----------|
| AC 2.1 | AI Insights Engine | GET /api/insights/free | Free user receives 3 insights/week | High |
| AC 2.2 | Premium Recommendations | GET /api/recommendations | Confidence scores 0-100% | High |
| AC 2.3 | Subscription Manager | POST /api/subscriptions | Secure payment processing | Critical |
| AC 2.4 | Trial Optimizer | GET /api/trials/status | 14-day trial enforcement | High |
| AC 2.5 | Revenue Analytics | GET /api/analytics/revenue | Real-time metrics display | Medium |
| AC 2.6 | Confidence Builder | AI Service | Accuracy tracking >80% | Medium |
| AC 2.7 | Feature Gate | Auth Service | Premium access control | Critical |

## Risks, Assumptions, Open Questions

**Risks:**
- YandexGPT API rate limits could impact recommendation generation during peak usage
- Payment processing failures could erode user trust in premium features
- AI recommendation accuracy below 70% could reduce conversion rates
- Complex subscription state management could lead to billing disputes

**Assumptions:**
- YandexGPT maintains current performance and cost structure
- Yandex Pay handles Russian market payment methods reliably
- Users accept AI confidence scores as decision-making input
- Free tier provides sufficient value to drive trial conversions

**Open Questions:**
- How to handle AI recommendation accuracy below acceptable thresholds?
- What metrics define successful premium feature adoption?
- How to optimize trial-to-paid conversion messaging?

## Test Strategy Summary

**Unit Testing:** All AI recommendation logic, subscription state transitions, revenue calculations
**Integration Testing:** Payment processing flows, YandexGPT API integration, email notifications
**E2E Testing:** Complete free-to-premium conversion flows, trial expiration handling
**Performance Testing:** AI generation under load, concurrent subscription operations
**Security Testing:** Payment data handling, premium feature access control
