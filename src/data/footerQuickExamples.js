// Quick examples of how to modify footer content
// Copy these examples into footerData.js to see changes

export const quickExamples = {
  // Example 1: Change company name and colors
  changeCompany: {
    company: {
      name: "CAR RENTAL PRO",  // Changed from "MORENT"
      description: "Your trusted car rental partner since 2020.",
      logoColor: "#FF6B35",    // Changed to orange
      fontSize: "36px",        // Made bigger
      fontWeight: "bold"
    }
  },

  // Example 2: Add new menu items
  addNewItems: {
    sections: [
      {
        title: "About",
        titleColor: "#1A202C",
        titleSize: "20px",
        titleWeight: "semibold",
        items: [
          {
            text: "How it works",
            href: "/how-it-works",
            color: "#131313",
            opacity: "100%",
            hoverColor: "#3563E9"
          },
          {
            text: "Featured",
            href: "/featured",
            color: "#131313",
            opacity: "100%",
            hoverColor: "#3563E9"
          },
          {
            text: "Partnership",
            href: "/partnership",
            color: "#131313",
            opacity: "60%",
            hoverColor: "#3563E9"
          },
          {
            text: "Business Relation",
            href: "/business-relation",
            color: "#131313",
            opacity: "100%",
            hoverColor: "#3563E9"
          },
          // NEW ITEMS ADDED:
          {
            text: "Careers",
            href: "/careers",
            color: "#131313",
            opacity: "100%",
            hoverColor: "#3563E9"
          },
          {
            text: "Press",
            href: "/press",
            color: "#131313",
            opacity: "100%",
            hoverColor: "#3563E9"
          }
        ]
      }
    ]
  },

  // Example 3: Change to different color scheme
  changeColors: {
    company: {
      name: "MORENT",
      description: "Our vision is to provide convenience and help increase your sales business.",
      logoColor: "#10B981",  // Changed to green
      fontSize: "32px",
      fontWeight: "bold"
    },
    sections: [
      {
        title: "About",
        titleColor: "#065F46",  // Dark green titles
        titleSize: "20px",
        titleWeight: "semibold",
        items: [
          {
            text: "How it works",
            href: "/how-it-works",
            color: "#374151",     // Gray text
            opacity: "100%",
            hoverColor: "#10B981" // Green hover
          }
        ]
      }
    ]
  },

  // Example 4: Minimal footer
  minimalFooter: {
    company: {
      name: "MORENT",
      description: "Car rental made simple.",
      logoColor: "#3563E9",
      fontSize: "28px",
      fontWeight: "bold"
    },
    sections: [
      {
        title: "Quick Links",
        titleColor: "#1A202C",
        titleSize: "18px",
        titleWeight: "semibold",
        items: [
          {
            text: "Cars",
            href: "/cars",
            color: "#131313",
            opacity: "100%",
            hoverColor: "#3563E9"
          },
          {
            text: "About",
            href: "/about",
            color: "#131313",
            opacity: "100%",
            hoverColor: "#3563E9"
          },
          {
            text: "Contact",
            href: "/contact",
            color: "#131313",
            opacity: "100%",
            hoverColor: "#3563E9"
          }
        ]
      }
    ],
    bottom: {
      copyright: "©2022 MORENT. All rights reserved",
      copyrightColor: "#131313",
      legalLinks: [
        {
          text: "Privacy Policy",
          href: "/privacy",
          color: "#131313",
          hoverColor: "#3563E9"
        }
      ]
    }
  }
};
