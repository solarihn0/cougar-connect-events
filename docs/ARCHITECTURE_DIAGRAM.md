# Charleston Tickets App - Architecture Documentation
## CSCI 360 Assignment 6

---

## System Architecture Overview

<lov-mermaid>
graph TB
    subgraph "Frontend - React + TypeScript"
        UI[User Interface Components]
        Pages[Page Routes]
        Context[State Management]
        Utils[Utility Functions]
    end
    
    subgraph "State Management Layer"
        TicketContext[Ticket Context]
        LocalStorage[Local Storage]
    end
    
    subgraph "Component Architecture"
        EventCard[Event Card]
        TDArena[TD Arena Map]
        SeatingMap[Seating Map]
        GAComponent[General Admission]
        TicketIcon[Ticket Icon]
        PaymentDialog[Payment Dialog]
    end
    
    subgraph "Core Utilities"
        DateHelpers[Date Helpers]
        PaymentStorage[Payment Storage]
        EventsLib[Events Library]
        LayoutLib[Layout Library]
    end
    
    UI --> Pages
    Pages --> Context
    Pages --> Component Architecture
    Component Architecture --> Utils
    Context --> TicketContext
    TicketContext --> LocalStorage
    Utils --> Core Utilities
    
    style TicketContext fill:#90EE90
    style TDArena fill:#FFD700
    style PaymentStorage fill:#87CEEB
</lov-mermaid>

---

## Component Hierarchy

<lov-mermaid>
graph TD
    App[App.tsx]
    App --> Index[Index Page]
    App --> EventDetail[Event Detail Page]
    App --> MyTickets[My Tickets Page]
    App --> Settings[Settings Page]
    App --> PaymentSettings[Payment Settings Page]
    
    Index --> EventCard1[Event Card]
    Index --> DatePriceFilter[Date/Price Filter]
    Index --> CategoryFilter[Category Filter]
    
    EventDetail --> TDArenaMap[TD Arena Map]
    EventDetail --> SeatingMap[Seating Map]
    EventDetail --> GeneralAdmission[General Admission]
    EventDetail --> CapacityDisplay[Capacity Display]
    
    MyTickets --> TicketIcon[Ticket Icon]
    
    PaymentSettings --> PaymentMethodDialog[Payment Method Dialog]
    
    style TDArenaMap fill:#FFD700
    style SeatingMap fill:#FFD700
    style TicketIcon fill:#90EE90
    style PaymentMethodDialog fill:#87CEEB
</lov-mermaid>

---

## User Flow Diagram

<lov-mermaid>
sequenceDiagram
    actor User
    participant Index as Index Page
    participant EventDetail as Event Detail
    participant Map as Seating Map
    participant Context as Ticket Context
    participant Storage as Local Storage
    
    User->>Index: Browse events
    User->>Index: Apply filters (date/price)
    Index->>User: Show filtered events
    
    User->>EventDetail: Click "Get Tickets"
    EventDetail->>Map: Load seating/capacity
    
    alt Big Arena Event
        Map->>User: Show TD Arena map
        User->>Map: Select section
        Map->>User: Show individual seats
        User->>Map: Select seats
    else Max Capacity Event
        Map->>User: Show quantity selector
        User->>Map: Choose quantity
    end
    
    User->>EventDetail: Confirm selection
    EventDetail->>Context: Add tickets
    Context->>Storage: Persist to localStorage
    Storage-->>User: Tickets saved
    
    User->>MyTickets: View My Tickets
    MyTickets->>Storage: Retrieve tickets
    Storage-->>MyTickets: Return ticket data
    MyTickets->>User: Display with icons
</lov-mermaid>

---

## Data Flow Architecture

<lov-mermaid>
graph LR
    subgraph "Data Sources"
        EventsData[events.ts]
        LayoutData[venueLayouts.ts]
        TDArenaData[tdArenaLayout.ts]
    end
    
    subgraph "State Management"
        TicketContext[Ticket Context]
        LocalStorage[(Local Storage)]
    end
    
    subgraph "Components"
        EventList[Event List]
        Maps[Seating Maps]
        MyTickets[My Tickets]
    end
    
    EventsData --> EventList
    LayoutData --> Maps
    TDArenaData --> Maps
    
    Maps --> TicketContext
    TicketContext <--> LocalStorage
    LocalStorage --> MyTickets
    
    style TicketContext fill:#90EE90
    style LocalStorage fill:#FFB6C1
</lov-mermaid>

---

## Testing Architecture

<lov-mermaid>
graph TB
    subgraph "Test Types"
        Unit[Unit Tests]
        Component[Component Tests]
        Integration[Integration Tests]
    end
    
    subgraph "Test Framework"
        Vitest[Vitest]
        RTL[React Testing Library]
    end
    
    subgraph "CI/CD"
        GitHub[GitHub Actions]
        Coverage[Coverage Reports]
    end
    
    Unit --> Vitest
    Component --> RTL
    Integration --> RTL
    
    Vitest --> GitHub
    RTL --> GitHub
    GitHub --> Coverage
    
    style Vitest fill:#90EE90
    style GitHub fill:#87CEEB
</lov-mermaid>

---

## Event Category State Machine

<lov-mermaid>
stateDiagram-v2
    [*] --> EventList
    EventList --> BigArena: Select Big Arena Event
    EventList --> SelectedSeats: Select Selected Seats Event
    EventList --> MaxCapacity: Select Max Capacity Event
    
    BigArena --> SectionView: Click Section
    SectionView --> SeatSelection: View Seats
    SeatSelection --> CheckoutBA: Select Seats
    
    SelectedSeats --> SectionViewSS: Click Section
    SectionViewSS --> SeatSelectionSS: View Seats
    SeatSelectionSS --> CheckoutSS: Select Seats
    
    MaxCapacity --> QuantitySelector: Choose Quantity
    QuantitySelector --> CheckoutGA: Confirm
    
    CheckoutBA --> Purchased: Complete Payment
    CheckoutSS --> Purchased: Complete Payment
    CheckoutGA --> Purchased: Complete Payment
    
    Purchased --> MyTickets: View Tickets
    MyTickets --> [*]
</lov-mermaid>

---

## Payment Method Workflow

<lov-mermaid>
sequenceDiagram
    actor User
    participant Settings as Settings Page
    participant Dialog as Payment Dialog
    participant Storage as Payment Storage
    participant LS as Local Storage
    
    User->>Settings: Navigate to Payment Settings
    Settings->>User: Show saved cards
    
    User->>Settings: Click "Add Payment Method"
    Settings->>Dialog: Open dialog
    
    User->>Dialog: Enter card details
    Dialog->>Dialog: Validate inputs
    
    alt Valid Card
        Dialog->>Storage: savePaymentMethod()
        Storage->>LS: Store encrypted data
        LS-->>Settings: Update UI
        Settings->>User: Show new card
    else Invalid Card
        Dialog->>User: Show error message
    end
    
    User->>Settings: Set as default
    Settings->>Storage: setDefaultPaymentMethod()
    Storage->>LS: Update default flag
</lov-mermaid>

---

## Ticket Icon State Logic

<lov-mermaid>
stateDiagram-v2
    [*] --> CheckCategory
    
    CheckCategory --> MaxCapacity: eventCategory === 'Max Capacity'
    CheckCategory --> AssignedSeating: eventCategory === 'Big Arena' | 'Selected Seats'
    
    MaxCapacity --> CheckStatus_GA
    AssignedSeating --> CheckStatus_Assigned
    
    CheckStatus_GA --> Selected_GA: status === 'selected'
    CheckStatus_GA --> Purchased_GA: status === 'purchased'
    CheckStatus_GA --> Refunded_GA: status === 'refunded'
    
    CheckStatus_Assigned --> Selected_Seat: status === 'selected'
    CheckStatus_Assigned --> Purchased_Seat: status === 'purchased'
    CheckStatus_Assigned --> Refunded_Seat: status === 'refunded'
    
    Selected_GA --> RenderYellowGA: Yellow badge + quantity
    Purchased_GA --> RenderGreenGA: Green badge + quantity
    Refunded_GA --> RenderGreyGA: Grey badge + quantity
    
    Selected_Seat --> RenderYellowSeat: Yellow seat icon + section/row/seat
    Purchased_Seat --> RenderGreenSeat: Green seat icon + section/row/seat
    Refunded_Seat --> RenderGreySeat: Grey seat icon + section/row/seat
    
    RenderYellowGA --> [*]
    RenderGreenGA --> [*]
    RenderGreyGA --> [*]
    RenderYellowSeat --> [*]
    RenderGreenSeat --> [*]
    RenderGreySeat --> [*]
</lov-mermaid>

---

## Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend Framework** | React 18 | Component-based UI |
| **Language** | TypeScript | Type safety |
| **Build Tool** | Vite | Fast development & bundling |
| **Styling** | Tailwind CSS | Utility-first CSS |
| **UI Components** | shadcn/ui | Pre-built accessible components |
| **State Management** | React Context | Global ticket state |
| **Routing** | React Router v6 | Client-side routing |
| **Icons** | Lucide React | Icon library |
| **Testing** | Vitest + RTL | Unit & component tests |
| **CI/CD** | GitHub Actions | Automated testing pipeline |
| **Storage** | localStorage | Client-side persistence |

---

## File Structure

```
src/
├── components/
│   ├── __tests__/           # Component tests
│   ├── ui/                  # shadcn UI components
│   ├── TDArenaMap.tsx       # TD Arena seating map
│   ├── SeatingMap.tsx       # Generic seating map
│   ├── GeneralAdmission.tsx # GA ticket selector
│   ├── TicketIcon.tsx       # Ticket status icon
│   └── ...
├── context/
│   ├── __tests__/           # Context tests
│   └── TicketContext.tsx    # Global ticket state
├── lib/
│   ├── __tests__/           # Utility tests
│   ├── utils.ts             # Helper functions
│   ├── events.ts            # Event data
│   ├── paymentStorage.ts    # Payment methods
│   ├── dateHelpers.ts       # Date utilities
│   ├── venueLayouts.ts      # Venue configurations
│   └── tdArenaLayout.ts     # TD Arena layout
├── pages/
│   ├── Index.tsx            # Event listing
│   ├── EventDetail.tsx      # Event details & booking
│   ├── MyTickets.tsx        # User tickets
│   ├── Settings.tsx         # User settings
│   └── PaymentSettings.tsx  # Payment management
└── test/
    └── setup.ts             # Test configuration
```

---

## Key Features & Components

### 1. TD Arena Interactive Map
- **File:** `src/components/TDArenaMap.tsx`
- **Purpose:** Ticketmaster-style seating selection for basketball/volleyball events
- **Features:**
  - Section-level overview with price pins
  - Zoom into individual seats
  - Real-time availability
  - Price filtering
  - Court visualization with CofC branding

### 2. Ticket Context System
- **File:** `src/context/TicketContext.tsx`
- **Purpose:** Centralized ticket state management
- **Features:**
  - Add/remove tickets
  - Filter by event
  - localStorage persistence
  - Type-safe ticket interface

### 3. Payment Storage
- **File:** `src/lib/paymentStorage.ts`
- **Purpose:** Secure payment method management
- **Features:**
  - Save multiple cards
  - Set default payment method
  - Card brand detection
  - Last 4 digits masking

### 4. Dynamic Ticket Icons
- **File:** `src/components/TicketIcon.tsx`
- **Purpose:** Visual ticket representation
- **Features:**
  - Category-specific icons (seat vs GA)
  - Status-based coloring
  - Section/row/seat display
  - Quantity badges for GA

---

## Security Considerations

1. **Payment Data**
   - Never store full card numbers
   - Use masked display (**** **** **** 1234)
   - Encrypt sensitive data before localStorage
   - PCI-DSS awareness

2. **Input Validation**
   - Sanitize all user inputs
   - Validate card expiry dates
   - Check capacity limits
   - Prevent negative quantities

3. **State Integrity**
   - Validate ticket purchases against availability
   - Prevent duplicate bookings
   - Ensure price accuracy

---

## Performance Optimizations

1. **Component Rendering**
   - Use React.memo for expensive components
   - Lazy load large seating maps
   - Debounce filter inputs

2. **Data Management**
   - Cache event data
   - Minimize localStorage writes
   - Batch state updates

3. **Asset Loading**
   - Lazy load venue SVGs
   - Optimize image sizes
   - Use CDN for static assets (future)

---

## Accessibility Features

- Semantic HTML elements
- ARIA labels for interactive maps
- Keyboard navigation support
- Screen reader announcements for seat selection
- High contrast mode compatibility
- Focus management in dialogs

---

## Future Enhancements

1. **Backend Integration**
   - Real-time availability via WebSocket
   - Server-side payment processing
   - User authentication
   - Order history sync

2. **Advanced Features**
   - Virtual venue tours (360°)
   - Seat view photos
   - Group booking
   - Waitlist functionality

3. **Mobile App**
   - Native iOS/Android apps
   - Digital ticket wallet
   - Push notifications
   - Offline mode

---

**Document Version:** 1.0  
**Last Updated:** November 3, 2025  
**Authors:** CSCI 360 Team  
**Course:** Software Architecture, Testing, and Security
