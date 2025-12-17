export interface NavItem {
  label: string;
  href: string;
  type: "section" | "page";
}

export interface HeroStat {
  label: string;
  value: string;
  caption: string;
}

export interface SiteMetadataContent {
  title: string;
  description: string;
  language: string;
}

export interface HeroContent {
  headline: string;
  subheadline: string;
  ctaText: string;
  backgroundContext: string;
}

export interface ProblemCard {
  id: string;
  title: string;
  description: string;
}

export interface SolutionFeature {
  component: string;
  type: string;
  description: string;
  key_features?: string[];
  capabilities?: string[];
}

export interface HardwareSpec {
  device: string;
  microcontroller: string;
  sensors: string[];
}

export interface ProtocolSpec {
  protocol: string;
  function: string;
}

export interface ArchitectureLayer {
  layer_name: string;
  role: string;
  hardware_specs?: HardwareSpec[];
  protocols?: ProtocolSpec[];
  tech_stack?: string[];
}

export interface BusinessGoals {
  title: string;
  objectives: string[];
}

export interface TeamMember {
  name: string;
  role: string;
}

export interface BomItem {
  part: string;
  spec: string;
  qty: number | string;
  price: string;
  totalCost: string;
}

export interface BillOfMaterials {
  title: string;
  currency: string;
  items: BomItem[];
  totalEstimatedBudget: string;
}

export const navigation: NavItem[] = [
  { label: "Overview", href: "overview", type: "section" },
  { label: "Problem", href: "problem", type: "section" },
  { label: "Solution", href: "solution", type: "section" },
  { label: "Architecture", href: "architecture", type: "section" },
  { label: "Goals", href: "goals", type: "section" },
  { label: "Team", href: "/team", type: "page" },
  { label: "BOM", href: "/bom", type: "page" },
];

export const siteMetadataContent: SiteMetadataContent = {
  title: "Hush | IIoT Digital Nursery ",
  description:
    "Next-level caring for Neonatal Intensive Care Units using AI-powered crying analytics and medical-grade sensors.",
  language: "en",
};

export const heroContent: HeroContent = {
  headline: "Next-Level Caring for Neonatal Intensive Care ",
  subheadline:
    "A 24/7 IoT Based Monitoring System ensuring critical medical monitoring and intervention for newborns.",
  ctaText: "Discover the Solution ",
  backgroundContext:
    "Neonatal Intensive Care Units need critical 24/7 medical monitoring and intervention for the 10-15% of newborns who suffer from serious health complications.",
};

export const heroStats: HeroStat[] = [
  {
    label: "Continuous Monitoring",
    value: "24/7",
    caption: "IoT-based coverage for critical newborn intervention",
  },
  {
    label: "High-Risk Infants",
    value: "10-15%",
    caption: "Newborns requiring NICU-grade intervention",
  },
  {
    label: "System Layers",
    value: "4",
    caption: "Perception to application architecture",
  },
];

export const problemSectionTitle = "Current Problems in NICU ";

export const problemCards: ProblemCard[] = [
  {
    id: "noise",
    title: "NICU Noisy Environment ",
    description: "High noise levels create a stressful environment for infants and staff.",
  },
  {
    id: "manual",
    title: "Manual Assessments ",
    description: "Reliance on periodic checks rather than continuous automated monitoring.",
  },
  {
    id: "tracking",
    title: "Only Track Vital Sign ",
    description:
      "Current systems often lack contextual data, tracking only basic vitals without environmental or audio context.",
  },
  {
    id: "interpretation",
    title: "Misinterpreted Infant Cry ",
    description: "Difficulty in accurately understanding the specific needs behind an infant's cry.",
  },
];

export const solutionSectionTitle = " The Hush Ecosystem ";

export const solutionFeatures: SolutionFeature[] = [
  {
    component: "Hush Smart Bracelet ",
    type: "Wearable ",
    description: "A medical-grade sensor device worn by the infant.",
    key_features: [
      "Next-level caring mascot design ",
      "Swappable Charm ",
      "Low Power Consumption ",
      "All-day battery life ",
    ],
  },
  {
    component: "Hush Baby Box ",
    type: "Edge Device ",
    description: "Responsible for detecting baby box temperature, humidity, and monitoring baby sound and voice.",
  },
];

export const architectureTitle = "System Architecture & Technology ";

export const architectureLayers: ArchitectureLayer[] = [
  {
    layer_name: "Perception Layer ",
    role: "Responsible for detecting and collecting physical data from the baby's environment.",
    hardware_specs: [
      {
        device: "Smart Bracelet",
        microcontroller: "ESP 32 DevKit ",
        sensors: ["MAX30102 (Heart Rate, Blood Oxygen) "],
      },
      {
        device: "Baby Box",
        microcontroller: "Arduino Nano ",
        sensors: [
          "Temperature ",
          "Humidity ",
          "Audio/Microphone ",
        ],
      },
    ],
  },
  {
    layer_name: "Network Layer ",
    role: "Ensures super reliable connection and data transfer.",
    protocols: [
      {
        protocol: "BLE (Bluetooth Low Energy) ",
        function: "Transfers data from wearable sensors to the fog node ",
      },
      {
        protocol: "MQTT ",
        function: "Sends processed data from the fog node to the cloud backend ",
      },
    ],
  },
  {
    layer_name: "Middleware Layer (Fog Service) ",
    role: "Performs Edge AI inference and anomaly detection.",
    tech_stack: [
      "Fog Service Architecture ",
      "Structured Payload {JSON} ",
      "Realtime Classifier Model: TFLite ",
    ],
  },
  {
    layer_name: "Application Layer (Cloud Service) ",
    role: "Data storage, deployment, and user interface.",
    tech_stack: [
      "NextJS ",
      "NestJS ",
      "Redis ",
      "PostgreSQL ",
      "InfluxDB ",
      "Cloud Backend with containerized microservices ",
    ],
  },
];

export const businessGoals: BusinessGoals = {
  title: "Business Goals ",
  objectives: [
    "Enhance infant safety through automated monitoring.",
    "Reduce nurse workload via smart alerts and analytics.",
    "Enable centralized neonatal care and long-term data tracking.",
  ],
};

export const teamSectionTitle = "People behind this works ";

export const teamMembers: TeamMember[] = [
  { name: "Gerald", role: "AI Engineer " },
  { name: "Satya", role: "Hardware Specialist " },
  { name: "Jade", role: "System Analyst " },
  { name: "Ari", role: "Software Engineer " },
];

export const billOfMaterials: BillOfMaterials = {
  title: "Bill of Material ",
  currency: "NT$",
  items: [
    {
      part: "Arduino Nano 33 BLE Sense",
      spec: "BLE + built-in sensors, 3.3V logic",
      qty: 1,
      price: "1500",
      totalCost: "1500 ",
    },
    {
      part: "ESP32 Devkit V1",
      spec: "ESP32 development board",
      qty: 1,
      price: "400",
      totalCost: "400 ",
    },
    {
      part: "MAX30102 Sensor",
      spec: "Heart rate + SpO2 sensor",
      qty: 1,
      price: "100",
      totalCost: "100 ",
    },
    {
      part: "Battery 200mAh (Li-po)",
      spec: "3.7 V 200mAh",
      qty: 1,
      price: "100",
      totalCost: "100 ",
    },
    {
      part: "ESP-01s",
      spec: "WiFi module (ESP8266), 1 MB flash",
      qty: 1,
      price: "80",
      totalCost: "80 ",
    },
    {
      part: "Current Regulator AMS1117 3.3v",
      spec: "Linear regulator 5V → 3.3V",
      qty: 1,
      price: "50",
      totalCost: "50 ",
    },
    {
      part: "TP4056 Charging Module",
      spec: "1 A Li-ion charger module",
      qty: 1,
      price: "40",
      totalCost: "40 ",
    },
    {
      part: "USB Breakout Board / Electrolytic Capacitor",
      spec: "USB to 4 pins / 100µF 16V",
      qty: 1,
      price: "40 / 10",
      totalCost: "50 ",
    },
    {
      part: "Switch",
      spec: "",
      qty: 1,
      price: "20",
      totalCost: "20 ",
    },
    {
      part: "Ceramic Capacitor / LED / Resistor",
      spec: "Misc components",
      qty: "Various",
      price: "Misc",
      totalCost: "15 ",
    },
  ],
  totalEstimatedBudget: "NT$2355 ",
};

export const heroPosterSrc =
  "https://images.unsplash.com/photo-1562408590-e32931084e23?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070";
