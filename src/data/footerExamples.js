// Example configurations for different footer styles
// You can copy these and modify the main footerData.js

export const footerExamples = {
  // Example 1: Dark Theme Footer
  darkTheme: {
    company: {
      name: "MORENT",
      description: "Our vision is to provide convenience and help increase your sales business.",
      logoColor: "#FFFFFF",
      fontSize: "32px",
      fontWeight: "bold",
      descriptionColor: "#E5E7EB"
    },
    sections: [
      {
        title: "About",
        titleColor: "#FFFFFF",
        titleSize: "20px",
        titleWeight: "semibold",
        items: [
          {
            text: "How it works",
            href: "/how-it-works",
            color: "#D1D5DB",
            opacity: "100%",
            hoverColor: "#60A5FA"
          },
          {
            text: "Featured",
            href: "/featured",
            color: "#D1D5DB",
            opacity: "100%",
            hoverColor: "#60A5FA"
          }
        ]
      }
    ],
    bottom: {
      copyright: "©2022 MORENT. All rights reserved",
      copyrightColor: "#D1D5DB",
      legalLinks: [
        {
          text: "Privacy & Policy",
          href: "/privacy",
          color: "#D1D5DB",
          hoverColor: "#60A5FA"
        }
      ]
    }
  },

  // Example 2: Minimal Footer
  minimal: {
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
          }
        ]
      }
    ],
    bottom: {
      copyright: "©2022 MORENT. All rights reserved",
      copyrightColor: "#131313",
      legalLinks: []
    }
  },

  // Example 3: Multi-language Footer
  multiLanguage: {
    company: {
      name: "MORENT",
      description: "Our vision is to provide convenience and help increase your sales business.",
      logoColor: "#3563E9",
      fontSize: "32px",
      fontWeight: "bold"
    },
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
          }
        ]
      },
      {
        title: "Community",
        titleColor: "#1A202C",
        titleSize: "20px",
        titleWeight: "semibold",
        items: [
          {
            text: "Events",
            href: "/events",
            color: "#131313",
            opacity: "100%",
            hoverColor: "#3563E9"
          },
          {
            text: "Blog",
            href: "/blog",
            color: "#131313",
            opacity: "100%",
            hoverColor: "#3563E9"
          },
          {
            text: "Podcast",
            href: "/podcast",
            color: "#131313",
            opacity: "100%",
            hoverColor: "#3563E9"
          },
          {
            text: "Invite a friend",
            href: "/invite",
            color: "#131313",
            opacity: "100%",
            hoverColor: "#3563E9"
          }
        ]
      },
      {
        title: "Support",
        titleColor: "#1A202C",
        titleSize: "20px",
        titleWeight: "semibold",
        items: [
          {
            text: "Help Center",
            href: "/help",
            color: "#131313",
            opacity: "100%",
            hoverColor: "#3563E9"
          },
          {
            text: "Contact Us",
            href: "/contact",
            color: "#131313",
            opacity: "100%",
            hoverColor: "#3563E9"
          },
          {
            text: "FAQ",
            href: "/faq",
            color: "#131313",
            opacity: "100%",
            hoverColor: "#3563E9"
          }
        ]
      },
      {
        title: "Socials",
        titleColor: "#1A202C",
        titleSize: "20px",
        titleWeight: "semibold",
        items: [
          {
            text: "Discord",
            href: "https://discord.gg/morent",
            color: "#131313",
            opacity: "100%",
            hoverColor: "#3563E9",
            external: true
          },
          {
            text: "Instagram",
            href: "https://instagram.com/morent",
            color: "#131313",
            opacity: "100%",
            hoverColor: "#3563E9",
            external: true
          },
          {
            text: "Twitter",
            href: "https://twitter.com/morent",
            color: "#131313",
            opacity: "100%",
            hoverColor: "#3563E9",
            external: true
          },
          {
            text: "Facebook",
            href: "https://facebook.com/morent",
            color: "#131313",
            opacity: "100%",
            hoverColor: "#3563E9",
            external: true
          }
        ]
      }
    ],
    bottom: {
      copyright: "©2022 MORENT. All rights reserved",
      copyrightColor: "#131313",
      legalLinks: [
        {
          text: "Privacy & Policy",
          href: "/privacy",
          color: "#131313",
          hoverColor: "#3563E9"
        },
        {
          text: "Terms & Condition",
          href: "/terms",
          color: "#131313",
          hoverColor: "#3563E9"
        }
      ]
    }
  }
};
