
import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    // Debounce function to limit resize event firing
    const debounce = (fn: Function, ms: number) => {
      let timeoutId: ReturnType<typeof setTimeout>;
      return function(...args: any[]) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), ms);
      };
    };

    // Initial check for mobile
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    
    // Handler with 100ms debounce for resize
    const debouncedHandler = debounce(() => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    }, 100);
    
    // Use matchMedia for better performance with addEventListener
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    
    // Modern event handler
    const handleChange = () => {
      setIsMobile(mql.matches);
    };
    
    // Add event listener for resize (with debounce) as fallback
    window.addEventListener('resize', debouncedHandler);
    
    // More efficient matchMedia event
    mql.addEventListener('change', handleChange);
    
    return () => {
      window.removeEventListener('resize', debouncedHandler);
      mql.removeEventListener('change', handleChange);
    };
  }, []);

  // Return the value or false as a default to prevent flicker
  return isMobile ?? false; 
}
