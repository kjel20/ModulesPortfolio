// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/educational_modules', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
  initializeModules();
});

// Module Schema
const moduleSchema = new mongoose.Schema({
  moduleNumber: Number,
  title: String,
  topics: [{
    number: Number,
    title: String,
    description: String
  }]
});

const Module = mongoose.model('Module', moduleSchema);

// Initialize modules with content
async function initializeModules() {
  const count = await Module.countDocuments();
  if (count === 0) {
    const modules = [
      {
        moduleNumber: 1,
        title: "Module 1: Software Testing Fundamentals",
        topics: [
          {
            number: 1,
            title: "Software Development Life Cycle and the deliverables for each stage",
            description: "The SDLC is a structured process for planning, creating, testing, and deploying software systems. Each stage produces specific deliverables such as requirement documents, design specifications, code, test plans, and deployment documentation."
          },
          {
            number: 2,
            title: "Testing Levels",
            description: "Testing levels include unit testing, integration testing, system testing, and acceptance testing, each focusing on different aspects of software quality. These levels ensure that individual components work correctly and integrate properly into the complete system."
          },
          {
            number: 3,
            title: "Development Models (Waterfall, Agile, etc)",
            description: "Development models are structured approaches to software creation, with Waterfall following a sequential phase-by-phase approach and Agile emphasizing iterative development with frequent customer feedback. Each model has distinct advantages depending on project requirements and team structure."
          },
          {
            number: 4,
            title: "Testing Types and Techniques (Black, White, Grey, Performance)",
            description: "Black box testing focuses on functionality without knowing internal code, white box testing examines internal logic and structure, and grey box combines both approaches. Performance testing evaluates system speed, scalability, and stability under various conditions."
          },
          {
            number: 5,
            title: "Jira",
            description: "Jira is a project management and issue tracking tool widely used in software development teams for tracking bugs, managing sprints, and organizing workflows. It provides customizable boards, reporting features, and integration capabilities for comprehensive project oversight."
          }
        ]
      },
      {
        moduleNumber: 2,
        title: "Module 2: Software Engineering Principles",
        topics: [
          {
            number: 1,
            title: "Importance of Software Engineering",
            description: "Software engineering applies systematic, disciplined approaches to software development, ensuring reliability, maintainability, and scalability of complex systems. It reduces costs, improves quality, and enables teams to manage large-scale projects effectively."
          },
          {
            number: 2,
            title: "Software Engineering Techniques and Methods",
            description: "These include various methodologies like structured programming, object-oriented design, design patterns, and code refactoring techniques. They provide proven solutions to common development challenges and promote code quality and reusability."
          },
          {
            number: 3,
            title: "Software Engineering Ethics",
            description: "Ethics in software engineering encompasses professional responsibility, privacy protection, security considerations, and honest representation of capabilities and limitations. Engineers must balance stakeholder interests while maintaining integrity and public welfare."
          },
          {
            number: 4,
            title: "Scrum (including ceremonies)",
            description: "Scrum is an Agile framework featuring iterative sprints, cross-functional teams, and defined roles including Scrum Master, Product Owner, and Development Team. Ceremonies include sprint planning, daily standups, sprint reviews, and retrospectives to maintain transparency and continuous improvement."
          }
        ]
      },
      {
        moduleNumber: 3,
        title: "Module 3: Project Management and Agile Practices",
        topics: [
          {
            number: 1,
            title: "Project Management Tools",
            description: "These tools help teams plan, track, and collaborate on projects, including platforms like Jira, Trello, Asana, and Microsoft Project. They provide features for task assignment, timeline visualization, resource allocation, and progress monitoring."
          },
          {
            number: 2,
            title: "Reports and Charts",
            description: "Project reports include burndown charts, velocity charts, cumulative flow diagrams, and Gantt charts that visualize project progress and team performance. These visual tools help stakeholders understand project status and make data-driven decisions."
          },
          {
            number: 3,
            title: "Agile Manifesto",
            description: "The Agile Manifesto emphasizes individuals and interactions over processes, working software over documentation, customer collaboration over contract negotiation, and responding to change over following a plan. It represents the foundational values that guide Agile methodologies."
          },
          {
            number: 4,
            title: "Scrum Values",
            description: "The five Scrum values are commitment, courage, focus, openness, and respect, which guide team behavior and decision-making. These values create an environment of trust and collaboration essential for successful Scrum implementation."
          },
          {
            number: 5,
            title: "Test Scenarios and Cases",
            description: "Test scenarios describe high-level testing conditions or user workflows, while test cases provide detailed step-by-step instructions with expected results. Together they ensure comprehensive test coverage and reproducible testing processes."
          }
        ]
      },
      {
        moduleNumber: 4,
        title: "Module 4: Design and Defect Management",
        topics: [
          {
            number: 1,
            title: "Object Oriented Analysis and Design",
            description: "OOAD involves identifying objects, classes, and their relationships to model real-world problems in software systems using principles like encapsulation, inheritance, and polymorphism. This approach promotes modularity, reusability, and easier maintenance of complex systems."
          },
          {
            number: 2,
            title: "Types of Diagrams",
            description: "UML diagrams include use case diagrams, class diagrams, sequence diagrams, activity diagrams, and state diagrams that visualize different aspects of system architecture and behavior. These diagrams facilitate communication among stakeholders and serve as blueprints for implementation."
          },
          {
            number: 3,
            title: "Defect Life Cycle",
            description: "The defect life cycle tracks a bug from discovery through resolution, including states like New, Assigned, Open, Fixed, Retest, Verified, and Closed. Understanding this cycle helps teams manage and prioritize bug fixes efficiently."
          },
          {
            number: 4,
            title: "Bug Testing",
            description: "Bug testing involves systematically identifying, documenting, and verifying software defects through various testing techniques and tools. Effective bug testing includes clear reproduction steps, severity classification, and thorough verification after fixes."
          },
          {
            number: 5,
            title: "Smoke and Sanity Testing",
            description: "Smoke testing is a preliminary test to check if critical functionalities work before detailed testing begins, acting as a build verification test. Sanity testing is a narrow, focused test on specific functionality after bug fixes or minor changes to ensure the issue is resolved."
          }
        ]
      },
      {
        moduleNumber: 5,
        title: "Module 5: Advanced Methodologies and Emerging Technologies",
        topics: [
          {
            number: 1,
            title: "Kanban and its Core Principles",
            description: "Kanban is a visual workflow management method that uses boards and cards to represent work items, focusing on continuous delivery without overloading team members. Core principles include visualizing work, limiting work in progress, managing flow, making policies explicit, and continuous improvement."
          },
          {
            number: 2,
            title: "Scrumban",
            description: "Scrumban combines Scrum's structured sprints and roles with Kanban's visual workflow and flow-based approach, offering flexibility for teams transitioning between methodologies. It maintains Scrum ceremonies while incorporating Kanban's continuous flow and WIP limits."
          },
          {
            number: 3,
            title: "Levels of Maintenance",
            description: "Software maintenance includes corrective (fixing bugs), adaptive (adjusting to environment changes), perfective (improving performance or features), and preventive (preventing future issues) maintenance. These levels ensure software remains functional, efficient, and relevant throughout its lifecycle."
          },
          {
            number: 4,
            title: "AI and its importance and drawbacks",
            description: "AI transforms software development through automated testing, code generation, predictive analytics, and intelligent debugging tools that increase efficiency and accuracy. However, drawbacks include potential bias in algorithms, dependency on quality training data, ethical concerns, job displacement fears, and the need for significant computational resources."
          }
        ]
      }
    ];

    await Module.insertMany(modules);
    console.log('Modules initialized successfully');
  }
}

// API Routes
app.get('/api/modules', async (req, res) => {
  try {
    const modules = await Module.find().sort({ moduleNumber: 1 });
    res.json(modules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/modules/:number', async (req, res) => {
  try {
    const module = await Module.findOne({ moduleNumber: req.params.number });
    if (!module) {
      return res.status(404).json({ error: 'Module not found' });
    }
    res.json(module);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});