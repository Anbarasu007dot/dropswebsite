import { useEffect, useState } from 'react';

export const Chatbot = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    // Product list for availability checking
    const productList = [
      // Agro & Aquaculture Chemicals
      "Ammonium Polyphosphate", "Ammonium Chloride", "Ammonium Sulphate", "Biofertilizer", "Boran", "Boric Acid", 
      "Calcium Carbonate", "Calcium Chloride", "Calcium Sulphate", "Calcium Nitrate", "Copper Sulphate", 
      "Di Calcium Phosphate", "Ferric Chloride", "Ferrous Sulphate", "Fumaric Acid", "Humic Acid", 
      "Hydrochloric Acid", "Hydrogen Peroxide", "Lime Powder", "Magnesium Phosphate", "Malic Acid", 
      "Manganese Chloride", "Manganese Sulphate", "Magnesium Chloride", "Magnesium Sulphate", "Micronutrients", 
      "Mixed Fertilizer", "Mono Ammonium Phosphate", "Mono Calcium Phosphate", "NPK Fertilizers", "Organix", 
      "Phosphoric Acid", "Potassium Chloride", "Potassium Humate", "Potassium Hydroxide", "Potassium Nitrate", 
      "Potassium Sulphate", "Silver Hydrogen Peroxide", "Sodium Chloride", "Sodium Hydroxide", "Sodium Nitrate", 
      "Urea", "Zinc Sulphate", "Iron Chelate", "Calcium Ammonium Nitrate", "Seaweed Extract", "Amino Acid Fertilizer",
      
      // Water Treatment Chemicals
      "Alum", "Bioculture", "Bleaching Powder", "Calcium Hypochlorite", "Caustic Soda", "Citric Acid", 
      "Decolorant", "EDTA", "Hydrated Lime Powder", "Hydrazine Hydrate", "Liquid Ammonia", "Microbes and Enzymes", 
      "Nitric Acid", "Oxygen Scavengers", "Poly Aluminium Chloride", "Poly Electrolyte", "Soda Ash", 
      "Sodium Hypochlorite", "Sodium Meta Bi Sulphate", "Sodium Sulphate", "RO Antiscalant", "pH Booster", 
      "Sodium Bicarbonate", "Scale Remover", "TCCA 90", "Chlorine", "Chlorine Dioxide", "Ozone", 
      "UV Disinfection Chemicals", "Corrosion Inhibitors", "Biocides", "Flocculants", "Coagulants",
      
      // Food Chemicals
      "Acetic Acid", "Ammonium Bicarbonate", "Ascorbic Acid", "Calcium Propionate", "Final Gel", 
      "Liquid Glucose", "Potassium Citrate", "Potassium Sorbate", "Sodium Aluminium Sulphate", 
      "Sodium Benzoate", "Sodium Citrate", "Sorbic Acid", "Sorbitol", "Xanthan Gum", "Agar Agar", 
      "Carrageenan", "Pectin", "Gellan Gum", "Guar Gum", "Locust Bean Gum", "Food Colors", 
      "Natural Flavors", "Artificial Flavors", "Vanilla Extract", "Lactic Acid", "Tartaric Acid",
      
      // Hygiene Raw Materials & Detergents
      "Acid Slurry", "Acid Thickener", "Alphox", "AOS", "BKC", "Baking Soda", "Butyl Acetate", 
      "Cetyl Acetate", "CAPB", "CDEA", "EGMS", "Enzyme", "Fatty Acids", "Fatty Alcohols", 
      "Filler Salt", "Ginasul", "Ginol", "Gum Resin", "Glycerine", "IPA", "Isopropyl Myristate", 
      "Lauramide DEA", "Liquid Paraffin", "Lauric Acid", "Muristic", "MEC", "Non-Ionic Surfactant", 
      "Olic Acid", "Optical Brightener", "Oxytech", "Petroleum Jelly", "Phynoil Compound", "Pine Oil", 
      "Silicon Oil", "Silky", "SLES", "Soap Noodles", "SLS Powder", "Sodium Carboxy Methyl Cellulose", 
      "Sodium Percarbonate", "Sodium Meta Silicate", "Sodium Tripolyphosphate", "Synthetic Thickener", 
      "Soft Soap", "Tri Sodium Phosphate", "Tinopal", "Washing Soda", "Surfactants", "Emulsifiers", 
      "Preservatives", "Chelating Agents", "pH Adjusters",
      
      // Basic Industrial Chemicals
      "Sulfuric Acid", "Benzene", "Toluene", "Xylene", "Acetone", "Ethanol", "Methanol", 
      "Isopropanol", "Butanol", "Ethyl Acetate", "Methyl Acetate", "Aluminum Oxide", "Silicon Dioxide", 
      "Titanium Dioxide", "Iron Oxide", "Zinc Oxide", "Copper Oxide", "Lead Oxide", "Chromium Oxide",
      
      // Pharmaceutical Raw Materials
      "Lactose Monohydrate", "Microcrystalline Cellulose", "Starch", "Mannitol", "Magnesium Stearate", 
      "Talc", "Polyethylene Glycol", "Propylene Glycol", "Glycerin"
    ];

    // Enhanced bot responses with product availability checking
    const botResponses = {
      hello: "Hello! I'm ChemLyn, your chemical solutions assistant. How can I help you today?",
      hi: "Hi there! I'm ChemLyn from Drops Chemicals. How can I assist you?",
      hey: "Hey! I'm ChemLyn, ready to help with your chemical needs. What can I do for you?",
      help: "I'm ChemLyn, here to help! You can ask me about our products, services, availability, or any general questions about chemical solutions.",
      product: "We offer a comprehensive range of chemical products including water treatment chemicals, agricultural chemicals, food grade chemicals, hygiene raw materials, basic industrial chemicals, and pharmaceutical raw materials. Would you like more specific information about any category?",
      products: "We offer a comprehensive range of chemical products including water treatment chemicals, agricultural chemicals, food grade chemicals, hygiene raw materials, basic industrial chemicals, and pharmaceutical raw materials. Would you like more specific information about any category?",
      service: "Our services include chemical consultation, custom formulations, quality testing, technical support, and reliable supply chain management. What specific service are you interested in?",
      services: "Our services include chemical consultation, custom formulations, quality testing, technical support, and reliable supply chain management. What specific service are you interested in?",
      price: "Our pricing varies depending on the product and quantity. Can you specify which chemical product you're interested in? I can help check availability and guide you to get a quote.",
      pricing: "Our pricing varies depending on the product and quantity. Can you specify which chemical product you're interested in? I can help check availability and guide you to get a quote.",
      contact: "📞 Phone: <a href='tel:+919677522201'>+91 96775 22201</a>\n📧 Email: <a href='mailto:info@dropschemicals.com'>info@dropschemicals.com</a>\n\nWould you like me to provide direct links to contact us?",
      hours: "Our business hours are Monday to Saturday, 9:00 AM to 8:00 PM. Sunday: Closed. We also provide 24/7 technical support for urgent queries.",
      location: "🏢 Corporate Office: 3rd floor, No.76, East Power House Road, Gandhipuram, Coimbatore - 641012, Tamil Nadu, India\n🏭 Manufacturing Unit: 7/8-5, Main Rd, Athikadavu, Keeranatham, Tamil Nadu 641035",
      address: "🏢 Corporate Office: 3rd floor, No.76, East Power House Road, Gandhipuram, Coimbatore - 641012, Tamil Nadu, India\n🏭 Manufacturing Unit: 7/8-5, Main Rd, Athikadavu, Keeranatham, Tamil Nadu 641035",
      thanks: "You're welcome! Is there anything else I can help you with today?",
      "thank you": "You're welcome! Feel free to ask if you need more assistance with chemical solutions.",
      bye: "Goodbye! Feel free to chat again if you have more questions about our chemical products and services.",
      goodbye: "Goodbye! Have a great day, and remember we're here 24/7 for technical support!",
      water: "We offer comprehensive water treatment chemicals including coagulants, flocculants, disinfectants, pH adjusters, RO antiscalants, and biocides. Would you like to see our complete water treatment product range?",
      agriculture: "Our agricultural chemicals include fertilizers, micronutrients, soil conditioners, and crop protection products. We focus on sustainable and eco-friendly solutions. What specific agricultural solution do you need?",
      food: "We provide food-grade chemicals that meet stringent safety standards for food processing and preservation. Our range includes preservatives, emulsifiers, and processing aids. What food application are you looking for?",
      industrial: "We supply basic industrial chemicals for various manufacturing processes including acids, bases, solvents, and specialty compounds. What industrial application do you need chemicals for?",
      pharmaceutical: "We offer high-purity pharmaceutical raw materials meeting strict quality standards including excipients, APIs, and processing aids. What pharmaceutical ingredient are you looking for?",
      hygiene: "We provide raw materials for hygiene and detergent manufacturing including surfactants, cleaning agents, and specialty additives. What hygiene product are you developing?",
      quote: "For quotes and pricing, please contact our sales team:\n📱 WhatsApp: https://wa.me/919677522201\n📧 Email: <a href='mailto:sales@dropschemicals.com'>sales@dropschemicals.com</a>\n📞 Phone: <a href='tel:+919677522201'>+91 96775 22201</a>",
      msds: "For Material Safety Data Sheets (MSDS), please contact us at <a href='mailto:info@dropschemicals.com'>info@dropschemicals.com</a> with the specific product name, or call <a href='tel:+919677522201'>+91 96775 22201</a> for immediate assistance.",
      quality: "We maintain strict quality standards with comprehensive testing and certifications. All our products meet international quality requirements and undergo rigorous quality control processes.",
      delivery: "We offer fast local delivery within 24-48 hours across Tamil Nadu. For other locations, delivery time may vary. We ensure safe packaging and reliable logistics.",
      experience: "Drops Chemicals has over 22 years of experience in chemical manufacturing and supply, serving diverse industries since 2004. We're your trusted partner for reliable chemical solutions.",
      availability: "I can check product availability for you! Please tell me the specific chemical product name, and I'll let you know if we have it in stock.",
      support: "We provide 24/7 technical support for all our clients. Our expert team is always ready to assist with technical queries, product guidance, and emergency support."
    };

    // Default response when no keyword matches
    const defaultResponse = "I'm ChemLyn, your chemical solutions assistant. Could you rephrase your question or ask about our chemical products, services, contact information, or business hours? I'm here to help!";

    // Function to check product availability
    function checkProductAvailability(userMessage) {
      const message = userMessage.toLowerCase();
      
      // Check if user is asking about a specific product
      for (const product of productList) {
        if (message.includes(product.toLowerCase())) {
          return `✅ Great news! We have ${product} available. For current pricing and quantities, please contact our sales team at +91 96775 22201 or visit our products page.`;
        }
      }
      
      // Check for general availability queries
      if (message.includes('available') || message.includes('stock') || message.includes('have')) {
        return "To confirm availability of specific products, please contact our sales team at +91 96775 22201. I can also help you find products if you tell me the specific chemical name you're looking for.";
      }
      
      return null;
    }

    // DOM Elements
    const chatToggle = document.getElementById("chatToggle");
    const chatBox = document.getElementById("chatBox");
    const closeChat = document.getElementById("closeChat");
    const chatForm = document.getElementById("chatForm");
    const userInput = document.getElementById("userInput");
    const chatMessages = document.getElementById("chatMessages");
    const chatIcon = document.querySelector(".chat-icon");
    const closeIcon = document.querySelector(".close-icon");

    // Toggle chat box visibility
    function toggleChat() {
      if (chatBox) {
        chatBox.classList.toggle("active");
        setIsChatOpen(chatBox.classList.contains("active"));

        // Toggle icons
        if (chatBox.classList.contains("active")) {
          if (chatIcon) (chatIcon as HTMLElement).style.display = "none";
          if (closeIcon) (closeIcon as HTMLElement).style.display = "block";
        } else {
          if (chatIcon) (chatIcon as HTMLElement).style.display = "block";
          if (closeIcon) (closeIcon as HTMLElement).style.display = "none";
        }
      }
    }

    // Add a message to the chat
    function addMessage(message, isUser = false) {
      if (!chatMessages) return;

      const messageDiv = document.createElement("div");
      messageDiv.classList.add("message");
      messageDiv.classList.add(isUser ? "user-message" : "bot-message");

      const messageContent = document.createElement("div");
      messageContent.classList.add("message-content");
      
      // Handle links in bot messages
      if (!isUser && (message.includes('http') || message.includes('www'))) {
        messageContent.innerHTML = message.replace(
          /(https?:\/\/[^\s]+)/g, 
          '<a href="$1" target="_blank" style="color: #4299e1; text-decoration: underline;">$1</a>'
        );
      } else {
        messageContent.textContent = message;
      }

      messageDiv.appendChild(messageContent);
      chatMessages.appendChild(messageDiv);

      // Scroll to the bottom of the chat
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Add quick reply buttons
    function addQuickReplyButtons() {
      if (!chatMessages) return;

      const quickReplyDiv = document.createElement("div");
      quickReplyDiv.classList.add("quick-reply-container");

      const buttons = [
        { text: "Contact Us", action: "contact" },
        { text: "Our Products", action: "products" },
        { text: "Check Availability", action: "availability" },
        { text: "Request Quote", action: "quote" }
      ];

      buttons.forEach(button => {
        const btn = document.createElement("button");
        btn.classList.add("quick-reply-btn");
        btn.textContent = button.text;
        btn.onclick = () => handleQuickReply(button.action);
        quickReplyDiv.appendChild(btn);
      });

      chatMessages.appendChild(quickReplyDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Handle quick reply button clicks
    function handleQuickReply(action) {
      let response = "";
      let includeLinks = false;
      
      switch (action) {
        case "contact":
          response = "📞 Phone: <a href='tel:+919677522201'>+91 96775 22201</a>\n📧 Email: <a href='mailto:info@dropschemicals.com'>info@dropschemicals.com</a>\n\nWould you like me to provide direct links to contact us?";
          includeLinks = true;
          break;
        case "products":
          response = "🧪 Our Product Categories:\n- Agro & Aquaculture Chemicals\n- Water Treatment Chemicals\n- Food Grade Chemicals\n- Hygiene Raw Materials & Detergents\n- Basic Industrial Chemicals\n- Pharmaceutical Raw Materials\n\n🔗 View All Products: " + window.location.origin + "/products";
          includeLinks = true;
          break;
        case "availability":
          response = "I can help check product availability! Please tell me the specific chemical product name, and I'll verify if we have it in stock. You can also contact our sales team directly at +91 96775 22201 for real-time inventory updates.";
          break;
        case "quote":
          response = "📋 Get Your Quote:\n🔗 Contact Form: " + window.location.origin + "/contact\n💬 WhatsApp: https://wa.me/919677522201\n📞 Call: <a href='tel:+919677522201'>+91 96775 22201</a>\n📧 Email: <a href='mailto:sales@dropschemicals.com'>sales@dropschemicals.com</a>";
          includeLinks = true;
          break;
      }

      // Remove quick reply buttons
      const quickReplyContainer = document.querySelector(".quick-reply-container");
      if (quickReplyContainer) {
        quickReplyContainer.remove();
      }

      // Add user message (button text)
      const buttonTexts = {
        "contact": "Contact Us",
        "products": "Our Products", 
        "availability": "Check Availability",
        "quote": "Request Quote"
      };
      addMessage(buttonTexts[action], true);

      // Add bot response with links
      setTimeout(() => {
        if (includeLinks) {
          addMessageWithLinks(response);
        } else {
          addMessage(response);
        }
      }, 500);
    }

    // Add message with clickable links
    function addMessageWithLinks(message) {
      if (!chatMessages) return;

      const messageDiv = document.createElement("div");
      messageDiv.classList.add("message", "bot-message");

      const messageContent = document.createElement("div");
      messageContent.classList.add("message-content");
      
      // Convert URLs to clickable links and preserve existing HTML links
      let messageWithLinks = message;
      
      // Handle regular URLs (http/https)
      messageWithLinks = messageWithLinks.replace(
        /(https?:\/\/[^\s]+)/g, 
        '<a href="$1" target="_blank" style="color: #4299e1; text-decoration: underline; font-weight: 600;">$1</a>'
      );
      
      // Handle mailto and tel links that are already in HTML format
      messageWithLinks = messageWithLinks.replace(
        /<a href='(mailto:[^']+)'>([^<]+)<\/a>/g,
        '<a href="$1" style="color: #4299e1; text-decoration: underline; font-weight: 600;">$2</a>'
      );
      
      messageWithLinks = messageWithLinks.replace(
        /<a href='(tel:[^']+)'>([^<]+)<\/a>/g,
        '<a href="$1" style="color: #4299e1; text-decoration: underline; font-weight: 600;">$2</a>'
      );
      
      messageContent.innerHTML = messageWithLinks;
      messageDiv.appendChild(messageContent);
      chatMessages.appendChild(messageDiv);

      // Scroll to the bottom of the chat
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Get bot response based on user input
    function getBotResponse(userMessage) {
      const message = userMessage.toLowerCase();

      // First check for product availability
      const availabilityResponse = checkProductAvailability(userMessage);
      if (availabilityResponse) {
        return availabilityResponse;
      }

      // Check for keyword matches
      for (const keyword in botResponses) {
        if (message.includes(keyword)) {
          return botResponses[keyword];
        }
      }

      // Return default response if no match
      return defaultResponse;
    }

    // Handle user message submission
    function handleUserMessage(e) {
      e.preventDefault();

      if (!userInput) return;
      const message = (userInput as HTMLInputElement).value.trim();
      if (!message) return;

      // Add user message to chat
      addMessage(message, true);
      (userInput as HTMLInputElement).value = "";

      // Simulate bot thinking with a slight delay
      setTimeout(() => {
        const botResponse = getBotResponse(message);
        
        // Check if response contains links
        if (botResponse.includes('http') || botResponse.includes('www')) {
          addMessageWithLinks(botResponse);
        } else {
          addMessage(botResponse);
        }
      }, 500);
    }

    // Event Listeners
    if (chatToggle) chatToggle.addEventListener("click", toggleChat);
    if (closeChat) closeChat.addEventListener("click", toggleChat);
    if (chatForm) chatForm.addEventListener("submit", handleUserMessage);

    // Add welcome message and quick reply buttons when component mounts
    setTimeout(() => {
      addMessage("Hi! I'm ChemLyn, your chemical solutions assistant from Drops Chemicals. How can I help you today?");
      addQuickReplyButtons();
    }, 1000);

    // Cleanup function
    return () => {
      if (chatToggle) chatToggle.removeEventListener("click", toggleChat);
      if (closeChat) closeChat.removeEventListener("click", toggleChat);
      if (chatForm) chatForm.removeEventListener("submit", handleUserMessage);
    };
  }, []);

  return (
    <>
      {/* Enhanced Chat Toggle Button with Tooltip */}
      <div 
        id="chatToggle" 
        className="chat-toggle"
      >
        {/* Tooltip */}
        {!isChatOpen && (
          <div className="chat-tooltip">
            <div className="tooltip-content">
              <div className="tooltip-header">
                <div className="tooltip-text">
                  <h4>Hello! How can I help you?</h4>
                </div>
              </div>
              <div className="tooltip-arrow"></div>
            </div>
          </div>
        )}

        {/* Chat Icon - Simple Message Icon */}
        <div className="chat-icon">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 9h8M8 13h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Close Icon - Enhanced Style */}
        <div className="close-icon" style={{ display: 'none' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <path d="M15 9L9 15M9 9L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Pulsing Ring Animation */}
        <div className="chat-pulse-ring"></div>
      </div>

      {/* Enhanced Chat Box with Glassmorphism */}
      <div id="chatBox" className="chat-box">
        <div className="chat-header">
          <div className="chat-header-info">
            <div className="bot-avatar">
              {/* Improved Robot Icon */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Main robot head */}
                <rect x="4" y="6" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="2"/>
                
                {/* Eyes */}
                <rect x="7" y="9" width="2" height="2" fill="currentColor"/>
                <rect x="15" y="9" width="2" height="2" fill="currentColor"/>
                
                {/* Eye glow effect */}
                <rect x="7" y="9" width="2" height="2" fill="currentColor" opacity="0.3"/>
                <rect x="15" y="9" width="2" height="2" fill="currentColor" opacity="0.3"/>
                
                {/* Mouth */}
                <line x1="9" y1="14" x2="15" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                
                {/* Antenna */}
                <line x1="12" y1="6" x2="12" y2="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="12" cy="3" r="1" fill="currentColor"/>
                
                {/* Circuit lines */}
                <line x1="6" y1="8" x2="8" y2="8" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
                <line x1="16" y1="8" x2="18" y2="8" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
                <line x1="6" y1="16" x2="8" y2="16" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
                <line x1="16" y1="16" x2="18" y2="16" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
                
                {/* Status indicator */}
                <circle cx="20" cy="8" r="1" fill="currentColor" opacity="0.8"/>
              </svg>
            </div>
            <div>
              <h4>ChemLyn</h4>
              <span className="status">Online • AI Chemical Solutions Assistant</span>
            </div>
          </div>
          <button id="closeChat" className="close-chat-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        
        <div id="chatMessages" className="chat-messages">
          {/* Messages will be added here dynamically */}
        </div>
        
        <form id="chatForm" className="chat-form">
          <input
            type="text"
            id="userInput"
            placeholder="Ask about products, availability, or services..."
            autoComplete="off"
          />
          <button type="submit" className="send-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </form>
      </div>
    </>
  );
};