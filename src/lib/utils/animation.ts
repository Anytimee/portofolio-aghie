/**
 * Scroll Animation Observer Utility
 * Adds sophisticated scroll-triggered animations to elements
 * Includes mysterious/premium animation types
 */

export interface AnimationOptions {
  /** Animation type: fade, slide-up, slide-down, slide-left, slide-right, scale, blur */
  type?: 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'scale' | 'blur' | 'shadow-reveal' | 'mysterious-fade' | 'stagger-reveal' | 'timeline-fade' | 'form-reveal' | 'vignette-reveal';
  /** Animation duration in ms */
  duration?: number;
  /** Delay between staggered items in ms */
  stagger?: number;
  /** Offset from the viewport to trigger animation (e.g., '0px 0px -50px 0px') */
  viewportOffset?: string;
  /** Whether to only animate once */
  once?: boolean;
  /** Custom easing function */
  easing?: string;
}

const defaultOptions: AnimationOptions = {
  type: 'fade',
  duration: 800,
  stagger: 100,
  viewportOffset: '0px 0px -50px 0px',
  once: false,
  easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
};

/**
 * Creates a scroll animation observer for an element
 */
export function createScrollObserver(
  node: HTMLElement,
  options: AnimationOptions = {}
): { destroy: () => void } {
  const config = { ...defaultOptions, ...options };
  
  // Get animation values based on type
  const getAnimationValues = (): { 
    transform?: string; 
    finalTransform?: string;
    filter?: string;
    finalFilter?: string;
    opacity?: string;
    finalOpacity?: string;
  } => {
    switch (config.type) {
      case 'slide-up':
        return { transform: 'translateY(30px)', finalTransform: 'translateY(0)' };
      case 'slide-down':
        return { transform: 'translateY(-30px)', finalTransform: 'translateY(0)' };
      case 'slide-left':
        return { transform: 'translateX(30px)', finalTransform: 'translateX(0)' };
      case 'slide-right':
        return { transform: 'translateX(-30px)', finalTransform: 'translateX(0)' };
      case 'scale':
        return { transform: 'scale(0.95)', finalTransform: 'scale(1)' };
      case 'blur':
        return { filter: 'blur(10px)', finalFilter: 'blur(0)' };
      // Mysterious animation types
      case 'shadow-reveal':
        return { 
          transform: 'translateY(60px) scale(0.98)', 
          finalTransform: 'translateY(0) scale(1)',
          filter: 'blur(12px) brightness(0.8)', 
          finalFilter: 'blur(0) brightness(1)',
          opacity: '0',
          finalOpacity: '1'
        };
      case 'mysterious-fade':
        return { 
          filter: 'blur(8px)', 
          finalFilter: 'blur(0)',
          opacity: '0',
          finalOpacity: '1'
        };
      case 'stagger-reveal':
        return { 
          transform: 'translateY(50px)', 
          finalTransform: 'translateY(0)',
          filter: 'blur(10px)', 
          finalFilter: 'blur(0)',
          opacity: '0',
          finalOpacity: '1'
        };
      case 'timeline-fade':
        return { 
          transform: 'translateX(-20px)', 
          finalTransform: 'translateX(0)',
          filter: 'blur(6px)', 
          finalFilter: 'blur(0)',
          opacity: '0',
          finalOpacity: '1'
        };
      case 'form-reveal':
        return { 
          transform: 'translateY(30px)', 
          finalTransform: 'translateY(0)',
          filter: 'blur(15px)', 
          finalFilter: 'blur(0)',
          opacity: '0',
          finalOpacity: '1'
        };
      case 'vignette-reveal':
        return { 
          transform: 'scale(1.1)', 
          finalTransform: 'scale(1)',
          filter: 'blur(20px) brightness(0.5)', 
          finalFilter: 'blur(0) brightness(1)',
          opacity: '0',
          finalOpacity: '1'
        };
      default:
        return { opacity: '0', finalOpacity: '1' };
    }
  };

  const animValues = getAnimationValues();
  
  // Apply initial styles
  if (animValues.opacity) node.style.opacity = animValues.opacity;
  node.style.transition = `all ${config.duration}ms ${config.easing}`;
  
  if (animValues.transform) {
    node.style.transform = animValues.transform;
  }
  if (animValues.filter) {
    node.style.filter = animValues.filter;
  }

  // Check if element is already visible
  const isVisible = (): boolean => {
    const rect = node.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    
    const offsets = (config.viewportOffset || '0px').split(' ').map(v => parseInt(v) || 0);
    const [topOffset = 0, rightOffset = 0, bottomOffset = 0, leftOffset = 0] = offsets;
    
    return (
      rect.top < windowHeight - bottomOffset &&
      rect.bottom > topOffset &&
      rect.left < windowWidth - rightOffset &&
      rect.right > leftOffset
    );
  };

  // Animate the element
  const animate = () => {
    if (animValues.finalOpacity) node.style.opacity = animValues.finalOpacity;
    if (animValues.finalTransform) node.style.transform = animValues.finalTransform;
    if (animValues.finalFilter) node.style.filter = animValues.finalFilter;
  };

  // Create Intersection Observer
  let observer: IntersectionObserver | null = null;
  let hasAnimated = false;
  
  if (typeof IntersectionObserver !== 'undefined') {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate when entering viewport (from any direction)
            animate();
            hasAnimated = true;
          } else if (hasAnimated || !config.once) {
            // Reset animation when leaving viewport for replay
            if (animValues.opacity) node.style.opacity = animValues.opacity;
            if (animValues.transform) node.style.transform = animValues.transform;
            if (animValues.filter) node.style.filter = animValues.filter;
            hasAnimated = false;
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: config.viewportOffset
      }
    );
    
    observer.observe(node);
  } else {
    // Fallback for browsers without IntersectionObserver
    animate();
  }

  return {
    destroy() {
      if (observer) {
        observer.unobserve(node);
      }
    }
  };
}

/**
 * Svelte action for scroll animations with stagger support
 */
export function scrollAnimate(
  node: HTMLElement,
  options: AnimationOptions & { index?: number } = {}
): { destroy: () => void } {
  const { index = 0, stagger = 100, ...animOptions } = options;
  
  // Apply staggered delay with timeout
  const timer = setTimeout(() => {
    return createScrollObserver(node, animOptions);
  }, index * stagger);

  return {
    destroy() {
      clearTimeout(timer);
    }
  };
}

/**
 * Svelte action for mysterious scroll animations
 * Uses CSS classes for premium animations
 */
export function mysteriousReveal(
  node: HTMLElement,
  options: { 
    type?: 'shadow-reveal' | 'mysterious-fade' | 'stagger-reveal' | 'timeline-fade' | 'form-reveal' | 'vignette-reveal';
    delay?: number;
    duration?: number;
    stagger?: number;
    index?: number;
  } = {}
): { destroy: () => void } {
  const { 
    type = 'shadow-reveal', 
    delay = 0, 
    duration = 1200,
    stagger = 100,
    index = 0
  } = options;

  // Set initial hidden state
  node.style.opacity = '0';
  node.style.willChange = 'opacity, filter, transform';
  
  // Apply CSS animation
  const animationClass = `animate-${type === 'shadow-reveal' ? 'shadow-reveal' : type}`;
  node.classList.add(animationClass);
  
  // Calculate delay with stagger
  const totalDelay = delay + (index * stagger);
  node.style.animationDelay = `${totalDelay}ms`;
  node.style.animationDuration = `${duration}ms`;

  // Create Intersection Observer
  let observer: IntersectionObserver | null = null;
  let hasAnimated = false;
  
  if (typeof IntersectionObserver !== 'undefined') {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Trigger animation by adding visible state and scroll-trigger class
            node.style.opacity = '1';
            node.classList.add('scroll-trigger');
            hasAnimated = true;
          } else if (hasAnimated) {
            // Reset when leaving viewport for replay
            node.style.opacity = '0';
            node.classList.remove('scroll-trigger');
            node.classList.remove(animationClass);
            hasAnimated = false;
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );
    
    observer.observe(node);
  }

  return {
    destroy() {
      if (observer) {
        observer.unobserve(node);
      }
    }
  };
}

/**
 * Creates a staggered animation group with mysterious reveals
 */
export function createMysteriousStagger(
  nodes: HTMLElement[],
  options: {
    type?: 'shadow-reveal' | 'mysterious-fade' | 'stagger-reveal' | 'timeline-fade' | 'form-reveal';
    staggerDelay?: number;
    baseDelay?: number;
  } = {}
): { destroy: () => void } {
  const { type = 'shadow-reveal', staggerDelay = 120, baseDelay = 0 } = options;
  
  const cleanups: Array<() => void> = [];
  
  nodes.forEach((node, index) => {
    const observer = mysteriousReveal(node, {
      type,
      delay: baseDelay,
      index
    });
    cleanups.push(observer.destroy);
  });

  return {
    destroy() {
      cleanups.forEach(cleanup => cleanup());
    }
  };
}

/**
 * Creates a staggered animation group
 */
export function createStaggerGroup(
  nodes: HTMLElement[],
  options: AnimationOptions = {}
): { destroy: () => void } {
  const { stagger = 100, ...animOptions } = options;
  
  const cleanups: Array<() => void> = [];
  
  nodes.forEach((node, index) => {
    const observer = createScrollObserver(node, {
      ...animOptions,
      duration: animOptions.duration || 800,
      stagger: 0
    });
    cleanups.push(observer.destroy);
    
    // Apply staggered delay
    node.style.transitionDelay = `${index * stagger}ms`;
  });

  return {
    destroy() {
      cleanups.forEach(cleanup => cleanup());
    }
  };
}

// ============================================
// SCROLL DIRECTION UTILITIES
// ============================================

export type ScrollDirection = 'up' | 'down' | 'none';

interface ScrollDirectionState {
  direction: ScrollDirection;
  lastScrollY: number;
}

// Global scroll direction state
let scrollDirectionState: ScrollDirectionState = {
  direction: 'none',
  lastScrollY: 0
};

// Listeners for scroll direction changes
type DirectionCallback = (direction: ScrollDirection) => void;
const directionListeners: Set<DirectionCallback> = new Set();

// Throttle scroll events for performance
let scrollTimeout: ReturnType<typeof setTimeout> | null = null;
const SCROLL_THROTTLE = 10; // ms

/**
 * Initialize scroll direction tracking
 * Should be called once on page load
 */
export function initScrollDirection(): void {
  if (typeof window === 'undefined') return;
  
  const handleScroll = () => {
    if (scrollTimeout) return;
    
    scrollTimeout = setTimeout(() => {
      scrollTimeout = null;
      
      const currentScrollY = window.scrollY;
      const { lastScrollY } = scrollDirectionState;
      
      // Determine scroll direction
      let newDirection: ScrollDirection = 'none';
      
      if (currentScrollY > lastScrollY + 5) {
        newDirection = 'down';
      } else if (currentScrollY < lastScrollY - 5) {
        newDirection = 'up';
      }
      
      // Update state and notify listeners only if direction changed
      if (newDirection !== scrollDirectionState.direction && newDirection !== 'none') {
        scrollDirectionState.direction = newDirection;
        scrollDirectionState.lastScrollY = currentScrollY;
        
        // Notify all listeners
        directionListeners.forEach(callback => callback(newDirection));
      } else if (newDirection !== 'none') {
        // Update last scroll Y even if direction didn't change
        scrollDirectionState.lastScrollY = currentScrollY;
      }
    }, SCROLL_THROTTLE);
  };
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  // Set initial scroll position
  scrollDirectionState.lastScrollY = window.scrollY;
}

/**
 * Get current scroll direction
 */
export function getScrollDirection(): ScrollDirection {
  return scrollDirectionState.direction;
}

/**
 * Subscribe to scroll direction changes
 * @returns unsubscribe function
 */
export function onScrollDirection(callback: DirectionCallback): () => void {
  directionListeners.add(callback);
  return () => directionListeners.delete(callback);
}

// ============================================
// SCROLL DIRECTION ANIMATION TYPES
// ============================================

type DirectionAnimationType = 
  | 'fade' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' 
  | 'scale' | 'blur' | 'shadow-reveal' | 'mysterious-fade' 
  | 'stagger-reveal' | 'timeline-fade' | 'form-reveal' | 'vignette-reveal';

/**
 * Get the CSS class for forward animation (scroll down - reveal)
 */
const getForwardClass = (type: DirectionAnimationType): string => {
  switch (type) {
    case 'slide-up': return 'animate-slide-up';
    case 'slide-down': return 'animate-slide-down';
    case 'slide-left': return 'animate-slide-left';
    case 'slide-right': return 'animate-slide-right';
    case 'scale': return 'animate-scale';
    case 'blur': return 'animate-blur';
    case 'shadow-reveal': return 'animate-shadow-reveal';
    case 'mysterious-fade': return 'animate-mysterious-fade';
    case 'stagger-reveal': return 'animate-stagger-reveal';
    case 'timeline-fade': return 'animate-timeline-fade';
    case 'form-reveal': return 'animate-form-reveal';
    case 'vignette-reveal': return 'animate-vignette-reveal';
    default: return 'animate-fade';
  }
};

/**
 * Get the CSS class for reverse animation (scroll up - hide)
 */
const getReverseClass = (type: DirectionAnimationType): string => {
  switch (type) {
    case 'slide-up': return 'animate-slide-up-reverse';
    case 'slide-down': return 'animate-slide-down-reverse';
    case 'slide-left': return 'animate-slide-left-reverse';
    case 'slide-right': return 'animate-slide-right-reverse';
    case 'scale': return 'animate-scale-reverse';
    case 'blur': return 'animate-blur-reverse';
    case 'shadow-reveal': return 'animate-shadow-reveal-reverse';
    case 'mysterious-fade': return 'animate-mysterious-fade-reverse';
    case 'stagger-reveal': return 'animate-stagger-reveal-reverse';
    case 'timeline-fade': return 'animate-timeline-fade-reverse';
    case 'form-reveal': return 'animate-form-reveal-reverse';
    case 'vignette-reveal': return 'animate-vignette-reveal-reverse';
    default: return 'animate-fade-reverse';
  }
};

/**
 * Get initial hidden state styles for animation type
 */
const getInitialStyles = (type: DirectionAnimationType): Record<string, string> => {
  switch (type) {
    case 'slide-up':
      return { opacity: '0', transform: 'translateY(30px)' };
    case 'slide-down':
      return { opacity: '0', transform: 'translateY(-30px)' };
    case 'slide-left':
      return { opacity: '0', transform: 'translateX(30px)' };
    case 'slide-right':
      return { opacity: '0', transform: 'translateX(-30px)' };
    case 'scale':
      return { opacity: '0', transform: 'scale(0.95)' };
    case 'blur':
      return { opacity: '0', filter: 'blur(10px)' };
    case 'shadow-reveal':
      return { opacity: '0', filter: 'blur(12px) brightness(0.8)', transform: 'translateY(60px) scale(0.98)' };
    case 'mysterious-fade':
      return { opacity: '0', filter: 'blur(8px)' };
    case 'stagger-reveal':
      return { opacity: '0', filter: 'blur(10px)', transform: 'translateY(50px)' };
    case 'timeline-fade':
      return { opacity: '0', filter: 'blur(6px)', transform: 'translateX(-20px)' };
    case 'form-reveal':
      return { opacity: '0', filter: 'blur(15px)', transform: 'translateY(30px)' };
    case 'vignette-reveal':
      return { opacity: '0', filter: 'blur(20px) brightness(0.5)', transform: 'scale(1.1)' };
    default:
      return { opacity: '0' };
  }
};

interface DirectionAnimationOptions {
  /** Animation type */
  type?: DirectionAnimationType;
  /** Animation duration in ms */
  duration?: number;
  /** Delay before animation starts */
  delay?: number;
  /** Stagger delay for multiple elements */
  stagger?: number;
  /** Index for stagger effect */
  index?: number;
  /** Threshold for intersection (0-1) */
  threshold?: number;
  /** Offset from viewport */
  viewportOffset?: string;
}

/**
 * Creates a scroll-direction-based animation
 * - When scrolling DOWN: animate forward (reveal)
 * - When scrolling UP: animate reverse (hide)
 */
export function createScrollDirectionObserver(
  node: HTMLElement,
  options: DirectionAnimationOptions = {}
): { destroy: () => void } {
  const {
    type = 'fade',
    duration = 800,
    delay = 0,
    stagger = 100,
    index = 0,
    threshold = 0.1,
    viewportOffset = '0px 0px -50px 0px'
  } = options;

  const forwardClass = getForwardClass(type);
  const reverseClass = getReverseClass(type);
  const initialStyles = getInitialStyles(type);
  
  // Apply initial hidden state
  Object.entries(initialStyles).forEach(([prop, value]) => {
    (node.style as any)[prop] = value;
  });
  node.style.willChange = 'opacity, filter, transform';
  node.style.animationDuration = `${duration}ms`;
  node.style.animationDelay = `${delay + (index * stagger)}ms`;
  
  // State tracking
  let isVisible = false;
  let isAnimating = false;
  let observer: IntersectionObserver | null = null;
  let unsubscribeDirection: (() => void) | null = null;

  // Apply forward animation (reveal)
  const animateForward = () => {
    if (isAnimating || isVisible) return;
    isAnimating = true;
    
    // Remove reverse class, add forward class
    node.classList.remove(reverseClass);
    node.classList.remove('scroll-trigger-reverse');
    
    // Force reflow to restart animation
    void node.offsetWidth;
    
    node.classList.add(forwardClass);
    node.classList.add('scroll-trigger');
    
    // Reset styles for forward animation
    Object.entries(initialStyles).forEach(([prop, value]) => {
      (node.style as any)[prop] = value;
    });
    
    // Mark as visible after animation completes
    setTimeout(() => {
      isVisible = true;
      isAnimating = false;
    }, duration);
  };

  // Apply reverse animation (hide)
  const animateReverse = () => {
    if (isAnimating || !isVisible) return;
    isAnimating = true;
    
    // Remove forward class, add reverse class
    node.classList.remove(forwardClass);
    node.classList.remove('scroll-trigger');
    
    // Force reflow to restart animation
    void node.offsetWidth;
    
    node.classList.add(reverseClass);
    node.classList.add('scroll-trigger-reverse');
    
    // Clear inline styles to let animation take over
    node.style.opacity = '';
    node.style.filter = '';
    node.style.transform = '';
    
    // Mark as hidden after animation completes
    setTimeout(() => {
      isVisible = false;
      isAnimating = false;
    }, duration);
  };

  // Handle intersection changes
  const handleIntersection = (entry: IntersectionObserverEntry) => {
    const direction = getScrollDirection();
    
    if (entry.isIntersecting) {
      // Element entered viewport
      if (direction === 'down') {
        // Scrolling down - reveal element
        animateForward();
      }
      // Note: If scrolling up and element enters, we don't animate yet
      // It will animate when it leaves viewport
    } else {
      // Element left viewport
      if (direction === 'up' && isVisible) {
        // Scrolling up and element was visible - hide it
        animateReverse();
      }
    }
  };

  // Create intersection observer
  if (typeof IntersectionObserver !== 'undefined') {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(handleIntersection);
      },
      {
        threshold,
        rootMargin: viewportOffset
      }
    );
    
    observer.observe(node);
  }

  // Listen for scroll direction changes
  unsubscribeDirection = onScrollDirection((direction) => {
    if (!observer) return;
    
    const rect = node.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    const isInViewport = rect.top < windowHeight && rect.bottom > 0;
    
    if (direction === 'down') {
      // Scrolling down - reveal if in viewport
      if (isInViewport && !isVisible) {
        animateForward();
      }
    } else if (direction === 'up') {
      // Scrolling up - hide if was visible
      if (isVisible) {
        animateReverse();
      }
    }
  });

  return {
    destroy() {
      if (observer) {
        observer.unobserve(node);
      }
      if (unsubscribeDirection) {
        unsubscribeDirection();
      }
    }
  };
}

/**
 * Svelte action for scroll-direction-based animations
 * Use this in Svelte components for automatic cleanup
 */
export function scrollDirectionAnimate(
  node: HTMLElement,
  options: DirectionAnimationOptions = {}
): { destroy: () => void } {
  return createScrollDirectionObserver(node, options);
}

/**
 * Creates a group of staggered scroll-direction animations
 */
export function createScrollDirectionStagger(
  nodes: HTMLElement[],
  options: Omit<DirectionAnimationOptions, 'index'> = {}
): { destroy: () => void } {
  const cleanups: Array<() => void> = [];
  
  nodes.forEach((node, index) => {
    const observer = createScrollDirectionObserver(node, {
      ...options,
      index
    });
    cleanups.push(observer.destroy);
  });

  return {
    destroy() {
      cleanups.forEach(cleanup => cleanup());
    }
  };
}

/**
 * Scroll-based typing animation
 * Types out text when scrolling down, untypes when scrolling up
 * Uses a wrapper element with clip-path to reveal characters progressively
 */
export interface ScrollTypingOptions {
  /** The text to type out */
  text: string;
  /** Character typing duration in ms */
  charDuration?: number;
  /** Easing function */
  easing?: string;
  /** Viewport offset for triggering */
  viewportOffset?: string;
  /** Whether to loop the animation */
  loop?: boolean;
}

export function scrollTyping(
  node: HTMLElement,
  options: ScrollTypingOptions
): { destroy: () => void } {
  const {
    text,
    charDuration = 80,
    easing = 'cubic-bezier(0.22, 1, 0.36, 1)',
    viewportOffset = '0px 0px -80% 0px',
    loop = false
  } = options;

  // Create wrapper for clipping
  const wrapper = document.createElement('span');
  wrapper.style.display = 'inline-block';
  wrapper.style.overflow = 'hidden';
  wrapper.style.whiteSpace = 'nowrap';
  
  // Create cursor element
  const cursor = document.createElement('span');
  cursor.className = 'typing-cursor';
  cursor.style.display = 'inline-block';
  cursor.style.width = '2px';
  cursor.style.height = '1.2em';
  cursor.style.marginLeft = '2px';
  cursor.style.backgroundColor = 'currentColor';
  cursor.style.verticalAlign = 'text-bottom';
  cursor.style.animation = 'typing-cursor-blink 1s infinite';
  
  // Get the original text content
  const fullText = text || node.textContent || '';
  node.textContent = '';
  
  // Add wrapper and cursor to node
  node.appendChild(wrapper);
  node.appendChild(cursor);
  
  // State
  let currentCharIndex = 0;
  let targetCharIndex = 0;
  let animationFrame: number | null = null;
  let observer: IntersectionObserver | null = null;
  
  // Calculate typing progress based on element's position in viewport
  const calculateProgress = (): number => {
    const rect = node.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const elementHeight = rect.height;
    
    // Get viewport offset values
    const offsets = viewportOffset.split(' ').map(v => parseInt(v) || 0);
    const bottomOffset = offsets[2] || windowHeight * 0.8;
    
    // Calculate how far the element has scrolled through the viewport
    const startPos = windowHeight; // Start when element enters from bottom
    const endPos = -elementHeight; // End when element leaves from top
    const totalDistance = startPos - endPos;
    
    // Current position of element's top edge
    const currentPos = rect.top;
    
    // Calculate progress (0 to 1)
    let progress = (startPos - currentPos) / totalDistance;
    progress = Math.max(0, Math.min(1, progress));
    
    return progress;
  };
  
  // Update displayed characters based on progress
  const updateTyping = () => {
    const progress = calculateProgress();
    targetCharIndex = Math.floor(progress * fullText.length);
    
    // Smoothly interpolate current index to target
    if (currentCharIndex < targetCharIndex) {
      // Typing forward
      currentCharIndex = Math.min(currentCharIndex + 1, targetCharIndex);
    } else if (currentCharIndex > targetCharIndex) {
      // Untyping (scrolling up)
      currentCharIndex = Math.max(currentCharIndex - 1, targetCharIndex);
    }
    
    // Update wrapper content
    wrapper.textContent = fullText.substring(0, currentCharIndex);
    
    // Add blinking cursor animation class if not already added
    if (!document.getElementById('typing-cursor-style')) {
      const style = document.createElement('style');
      style.id = 'typing-cursor-style';
      style.textContent = `
        @keyframes typing-cursor-blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
  };
  
  // Animation loop
  const animate = () => {
    updateTyping();
    animationFrame = requestAnimationFrame(animate);
  };
  
  // Start animation
  animate();
  
  // Create intersection observer to track visibility
  if (typeof IntersectionObserver !== 'undefined') {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && loop) {
            // Reset when out of view if looping
            currentCharIndex = 0;
          }
        });
      },
      {
        threshold: 0,
        rootMargin: viewportOffset
      }
    );
    observer.observe(node);
  }
  
  return {
    destroy() {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      if (observer) {
        observer.unobserve(node);
      }
    }
  };
}
