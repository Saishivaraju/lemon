const pptxgen = require('pptxgenjs');
const path = require('path');

let pres = new pptxgen();

pres.author = 'Zorvo Systems';
pres.company = 'Zorvo';
pres.revision = '1';
pres.subject = 'Zorvo CRM System Guide';
pres.title = 'Zorvo CRM Full System Guide';

// Set layout to 16:9
pres.layout = 'LAYOUT_16x9';

// Define master slide
pres.defineSlideMaster({
    title: 'MASTER_SLIDE',
    background: { color: '1A1D24' },
    objects: [
        { rect: { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: 'F5A623' } } },
        { text: { text: 'Zorvo CRM Guide', options: { x: 0.5, y: 0.2, w: 4, h: 0.4, color: 'FFFFFF', fontSize: 16, bold: true } } }
    ]
});

const slidesData = [
    {
        title: "Analytics Dashboard",
        image: "analytics-dashboard.jpeg",
        fallback: "media__1780843805174.jpg",
        content: [
            { t: "👨‍💼 How it helps the Agent", p: "Provides a bird's-eye view of pipeline health. Agents can instantly identify bottlenecks in their sales funnel and adjust their strategy to maximize commission." },
            { t: "🤖 AI Calling Rules", p: "The analytics engine actively tracks the ROI of AI campaigns. It measures how many AI-initiated calls result in a 'HOT' status compared to manual calls." },
            { t: "🔄 Follow-up System", p: "Metrics automatically flag aging deals. If a lead sits in 'Contacted' for more than 48 hours without progress, the system alerts the agent." }
        ]
    },
    {
        title: "Lead Management & AI",
        image: "media__1780843805331.jpg",
        content: [
            { t: "👨‍💼 How it helps the Agent", p: "Serves as the central command center. Agents select a batch of leads, hit 'Start Campaign', and let the AI do the heavy lifting of qualifying prospects." },
            { t: "🤖 AI Calling Rules", p: "The AI uses natural language to ask pre-defined qualifying questions (Budget, Location, Timeline). It analyzes sentiment and assigns a Lead Score automatically." },
            { t: "🔄 Follow-up System", p: "Smart Retry Logic: If a lead does not answer, the AI places them in a retry queue. If they ask to be called tomorrow, it schedules an exact follow-up task." }
        ]
    },
    {
        title: "CRM Pipeline",
        image: "crm-pipeline.jpeg",
        fallback: "media__1780843805214.jpg",
        content: [
            { t: "👨‍💼 How it helps the Agent", p: "A visual Kanban board that prevents deals from slipping through the cracks. Dragging and dropping cards makes updating CRM status frictionless." },
            { t: "🤖 AI Calling Rules", p: "When an AI successfully qualifies a 'New' lead and books an appointment, the system automatically creates a Deal Card in the Pipeline." },
            { t: "🔄 Follow-up System", p: "Column-based automations: Dragging a card to 'Negotiation' can trigger a drip email campaign. Moving to 'Closed' stops all automated follow-ups." }
        ]
    },
    {
        title: "Property Listings",
        image: "property-listings.jpeg",
        content: [
            { t: "👨‍💼 How it helps the Agent", p: "Acts as a centralized inventory manager. Agents can quickly search properties to match with client requirements during live calls." },
            { t: "🤖 AI Calling Rules", p: "Knowledge Base Integration: The AI Voice Agent has direct read-access to listings. If a client asks 'Does the villa have a pool?', the AI answers accurately." },
            { t: "🔄 Follow-up System", p: "If a property drops in price, the system can identify leads whose budget matches and prompt the agent to initiate a targeted campaign." }
        ]
    },
    {
        title: "Alert Center",
        image: "alert-center.jpeg",
        content: [
            { t: "👨‍💼 How it helps the Agent", p: "Aggregates critical events across the platform so the agent doesn't have to constantly refresh different pages. Prioritizes urgent tasks." },
            { t: "🤖 AI Calling Rules", p: "Escalation Protocol: If the AI is on a call and the client is extremely motivated, the AI can flag the call and send an urgent push notification here." },
            { t: "🔄 Follow-up System", p: "Consolidates all missed AI follow-ups, upcoming scheduled tours, and new website registrations into a single actionable checklist." }
        ]
    },
    {
        title: "Map View",
        image: "media__1780843805174.jpg",
        content: [
            { t: "👨‍💼 How it helps the Agent", p: "Allows agents to spatially visualize their deals. Agents can quickly see if other hot leads or properties are nearby to maximize their time." },
            { t: "🤖 AI Calling Rules", p: "The AI uses geographic data from this map. When talking to a client interested in a specific area, the AI knows which pins exist in that radius." },
            { t: "🔄 Follow-up System", p: "Can trigger location-based alerts when new properties are added in a lead's desired geographic zone." }
        ]
    },
    {
        title: "Visit Scheduling",
        image: "visit-scheduling.jpeg",
        fallback: "media__1780843805194.jpg",
        content: [
            { t: "👨‍💼 How it helps the Agent", p: "A unified calendar that prevents double-booking. Keeps the agent's daily itinerary organized and synchronized across devices." },
            { t: "🤖 AI Calling Rules", p: "AI Booking Agent: The AI has access to the agent's free slots. During a call, it can say 'I have an opening on Thursday' and book it directly." },
            { t: "🔄 Follow-up System", p: "Automatically dispatches SMS/email calendar invites to the client upon booking, and sends 24-hour reminders to reduce no-shows." }
        ]
    },
    {
        title: "Team Management & Logs",
        image: "media__1780843805298.jpg",
        content: [
            { t: "👨‍💼 How it helps the Agent / Manager", p: "Managers can view live workload capacity to distribute leads fairly. Prevents burnout by ensuring no single agent is overwhelmed." },
            { t: "🤖 AI Calling Rules & Transcripts", p: "Every AI call is recorded and fully transcribed. Managers can read the exact conversation to audit AI performance and adjust prompts." },
            { t: "🔄 Follow-up System", p: "Identifies patterns in transcripts (e.g., common objections) to trigger automated training alerts for the team." }
        ]
    },
    {
        title: "Settings & Profile",
        image: "settings-profile.jpeg",
        content: [
            { t: "👨‍💼 How it helps the Agent", p: "Personalizes the CRM experience and ensures all automated emails and public sites display the correct agent branding and contact info." },
            { t: "🤖 AI Calling Rules", p: "Agents can define 'Do Not Call' hours here (e.g., no AI calls after 8 PM) to remain compliant with local telemarketing laws." },
            { t: "🔄 Follow-up System", p: "Customizes the exact timing and frequency of automated follow-up sequences on a per-agent basis." }
        ]
    },
    {
        title: "Public Website",
        image: "public-website.png",
        content: [
            { t: "👨‍💼 How it helps the Agent", p: "An auto-generated, highly optimized landing page that captures inbound traffic. Eliminates the need for a separate website builder." },
            { t: "🤖 AI Calling Rules", p: "Instant Lead Response: When a user fills out a form, it triggers a webhook. The AI can be configured to call this new lead within 5 minutes." },
            { t: "🔄 Follow-up System", p: "Data entered here instantly creates a Lead Profile in the CRM and populates the Visit Schedule calendar if they selected a tour time." }
        ]
    }
];

const fs = require('fs');

slidesData.forEach(slideData => {
    let slide = pres.addSlide({ masterName: 'MASTER_SLIDE' });
    
    // Add Slide Title
    slide.addText(slideData.title, { x: 0.5, y: 1.0, w: 9, h: 0.5, fontSize: 24, color: 'F5A623', bold: true });

    // Determine the image path
    let imagePath = path.join(__dirname, 'assets', slideData.image);
    if (!fs.existsSync(imagePath) && slideData.fallback) {
        imagePath = path.join(__dirname, 'assets', slideData.fallback);
    }
    
    // Add Image to the left side
    if (fs.existsSync(imagePath)) {
        slide.addImage({ path: imagePath, x: 0.5, y: 1.6, w: 5.5, h: 3.5, sizing: { type: 'contain', w: 5.5, h: 3.5 } });
    } else {
        slide.addText("Image not found", { x: 0.5, y: 1.6, w: 5.5, h: 3.5, color: 'FF0000' });
    }

    // Add Content to the right side
    let contentY = 1.6;
    slideData.content.forEach(c => {
        // Heading
        slide.addText(c.t, { x: 6.2, y: contentY, w: 3.5, h: 0.3, fontSize: 14, color: 'F5A623', bold: true });
        contentY += 0.35;
        // Paragraph
        slide.addText(c.p, { x: 6.2, y: contentY, w: 3.5, h: 0.8, fontSize: 12, color: 'FFFFFF', align: 'left', valign: 'top' });
        contentY += 0.9;
    });
});

// Title Slide
let titleSlide = pres.addSlide({ masterName: 'MASTER_SLIDE' });
titleSlide.addText('Zorvo CRM System Guide', { x: 1, y: 2, w: 8, h: 1, fontSize: 36, color: 'F5A623', bold: true, align: 'center' });
titleSlide.addText('Comprehensive Agent Workflow & AI Integration', { x: 1, y: 3, w: 8, h: 0.5, fontSize: 20, color: 'FFFFFF', align: 'center' });

// Move title slide to front
let slides = pres.slides;
let ts = slides.pop();
slides.unshift(ts);

pres.writeFile({ fileName: 'Zorvo_System_Guide.pptx' })
    .then(fileName => {
        console.log(`created file: ${fileName}`);
    })
    .catch(err => {
        console.log(`error: ${err}`);
    });
