export const landingPageSections = [
  {
    id: "kycVerification",
    heading: 'Seamless KYC <span class="text-blue-600">verification</span>',
    imagePath: "/kycVerification.png",
    imagePosition: "left", // 0 for left
    features: [
      {
        title: "Seamless Tourist Onboarding",
        description:
          "Tourists register at airport/hotel/check-post by providing KYC (passport/Aadhaar) + trip details. Backend KYC service instantly verifies authenticity.",
      },
      {
        title: "Blockchain-Powered Digital ID",
        description:
          "A non-transferable ERC-721 soulbound NFT is minted post-verification. Holds Tourist ID, trip duration, emergency contacts, and encrypted KYC/itinerary stored on IPFS/Arweave",
      },
      {
        title: "TCustodial Wallet & QR Access",
        description:
          "Tourists don’t need MetaMask. NFT is linked to a custodial wallet or Web3Auth login. The app generates a QR code for easy scanning by authorities",
      },
      {
        title: "Real-Time Verification for Authorities",
        description:
          "Police/tourism officers scan the QR → fetch NFT from blockchain. Instantly checks: authenticity (NFT minted), validity (trip active), and identity (KYC hash match).",
      },
    ],
  },
  {
    id: "safetyMonitoring",
    heading:
      'Advanced <span class="text-blue-600">Safety</span> & <span class="text-blue-600">Monitoring</span> Suite',
    imagePath: "/bodyMiddle3.jpg",
    imagePosition: "right", // 1 for right
    features: [
      {
        title: "Geo-Fencing Protection",
        description:
          "Alerts tourists with real-time warnings when entering high-risk zones, ensuring safety with smart boundary monitoring",
      },
      {
        title: "Instant Panic Response",
        description:
          "One-tap panic button sends live location to police and emergency contacts for immediate assistance.",
      },
      {
        title: "Real-Time Family Tracking",
        description:
          "Optional feature allows families or law enforcement to monitor tourist locations in real-time for added security",
      },
      {
        title: "AI Distress Detection",
        description:
          " AI identifies unusual patterns, route deviations, or inactivity to flag potential distress and trigger alerts",
      },
    ],
  },
  {
    id: "adminSupport",
    heading:
      'Enhanced <span class="text-blue-600">Admin</span> & Support Ecosystem',
    imagePath: "/bodyMiddle4.jpg",
    imagePosition: "left", // 0 for left
    features: [
      {
        title: "Police & Tourism Command Center",
        description:
          "Dashboard with heatmaps, alerts, digital ID access, and automated E-FIR generation for efficient management.",
      },
      {
        title: "Multilingual Accessibility Hub",
        description:
          "App supports 10+ Indian languages with voice/text assistance for elderly and disabled travelers",
      },
      {
        title: "Unbreakable Privacy Vault",
        description:
          "End-to-end encryption and blockchain ensure tamper-proof travel and identity records",
      },
      {
        title: "Real-Time Verification for Authorities",
        description:
          " Auto-generated safety score based on travel patterns for enhanced security insights.",
      },
    ],
  },
];
