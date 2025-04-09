
import { useState, useEffect } from "react";
import { LtiAndOAuthManager } from "./LtiAndOAuthManager";

export function LtiOAuthWrapper() {
  // This component acts as a compatibility layer to ensure proper type handling
  
  const handleLtiFormSubmit = (data: any) => {
    // Make sure redirect_uris is always an array before passing to the LTI manager
    if (data.redirect_uris && typeof data.redirect_uris === 'string') {
      data.redirect_uris = data.redirect_uris.split("\n").filter(Boolean);
    }
    
    // Now the data should have the correct typing
    console.log("Processed LTI form data:", data);
    
    // Additional handling can be added here as needed
  };

  return (
    <LtiAndOAuthManager
      onLtiFormSubmit={handleLtiFormSubmit}
    />
  );
}
