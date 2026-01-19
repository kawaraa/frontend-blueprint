"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";

const PullToRefresh = ({ threshold = 80, maxPull = 150, longPressDuration = 300 }) => {
  const [pullDistance, setPullDistance] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const startYRef = useRef(0);
  const isPullingRef = useRef(false);
  const isLongPressRef = useRef(false);
  const longPressTimerRef = useRef(null);
  const currentScrollYRef = useRef(0);

  const handleStart = useCallback(
    (clientY, clientX) => {
      if (isPullingRef.current || refreshing) return false;

      // Store initial position
      startYRef.current = clientY;
      currentScrollYRef.current = window.scrollY;
      isLongPressRef.current = false;

      // Clear any existing timer
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current);
      }

      // Start long press timer
      longPressTimerRef.current = setTimeout(() => {
        // Only activate pull-to-refresh if we're at the top of the page
        if (window.scrollY <= 5) {
          isLongPressRef.current = true;
          isPullingRef.current = true;
        }
      }, longPressDuration);

      return true;
    },
    [refreshing, longPressDuration],
  );

  const handleMove = useCallback(
    (clientY) => {
      // Only respond to movement if we're in long-press mode AND at top of page
      if (!isLongPressRef.current || window.scrollY > 5) {
        return false;
      }

      const distance = Math.max(0, clientY - startYRef.current);

      if (distance > 0) {
        const clampedDistance = Math.min(distance, maxPull);
        setPullDistance(clampedDistance);
        return true;
      }
      return false;
    },
    [maxPull],
  );

  const handleEnd = useCallback(async () => {
    // Clear long press timer
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }

    if (!isPullingRef.current) return;

    isPullingRef.current = false;
    isLongPressRef.current = false;

    if (pullDistance >= threshold) {
      setRefreshing(true);

      try {
        window.location.reload();
      } catch (error) {
        console.error("Refresh failed:", error);
      } finally {
        setTimeout(() => {
          setRefreshing(false);
          setPullDistance(0);
        }, 500);
      }
    } else {
      setPullDistance(0);
    }
  }, [pullDistance, threshold]);

  // Cancel long press if user scrolls before timer completes
  useEffect(() => {
    const handleScroll = () => {
      if (longPressTimerRef.current && !isLongPressRef.current) {
        // If user scrolled significantly before long press completed, cancel
        if (Math.abs(window.scrollY - currentScrollYRef.current) > 10) {
          clearTimeout(longPressTimerRef.current);
          longPressTimerRef.current = null;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Global event listeners
  useEffect(() => {
    const handleTouchStart = (e) => {
      if (e.touches.length !== 1) return;

      const touch = e.touches[0];
      handleStart(touch.clientY, touch.clientX);
    };

    const handleTouchMove = (e) => {
      if (!isLongPressRef.current) return;

      const touch = e.touches[0];
      const isPulling = handleMove(touch.clientY);

      if (isPulling && e.cancelable && pullDistance > 20) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = () => {
      handleEnd();
    };

    const handleMouseDown = (e) => {
      if (e.button !== 0) return;
      handleStart(e.clientY, e.clientX);
    };

    const handleMouseMove = (e) => {
      if (!isLongPressRef.current) return;
      handleMove(e.clientY);
    };

    const handleMouseUp = () => {
      handleEnd();
    };

    // Add cancel handlers for mouse/touch leaving
    const handleCancel = () => {
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current);
        longPressTimerRef.current = null;
      }
      if (!isPullingRef.current) {
        isLongPressRef.current = false;
      }
    };

    const options = { passive: false };
    const passiveOptions = { passive: true };

    document.addEventListener("touchstart", handleTouchStart, passiveOptions);
    document.addEventListener("touchmove", handleTouchMove, options);
    document.addEventListener("touchend", handleTouchEnd, passiveOptions);
    document.addEventListener("touchcancel", handleCancel, passiveOptions);

    document.addEventListener("mousedown", handleMouseDown, passiveOptions);
    document.addEventListener("mousemove", handleMouseMove, passiveOptions);
    document.addEventListener("mouseup", handleMouseUp, passiveOptions);
    document.addEventListener("mouseleave", handleCancel, passiveOptions);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("touchcancel", handleCancel);

      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleCancel);

      // Clean up timer on unmount
      if (longPressTimerRef.current) {
        clearTimeout(longPressTimerRef.current);
      }
    };
  }, [handleStart, handleMove, handleEnd, pullDistance]);

  const progress = Math.min(pullDistance / threshold, 1);
  const rotation = progress * -180;

  /* Indicator shows when pulling anywhere on page */
  return (
    pullDistance > 0 && (
      <div
        className={`fixed top-0 left-0 right-0 z-[10] flex flex-col items-center justify-center`}
        style={{ height: `${pullDistance}px`, opacity: progress }}
      >
        <span
          className={`text-5xl w-8 h-8`}
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: "transform 0.15s ease-out",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="pointer-events-none w-full"
            aria-hidden="true"
          >
            <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
            <path d="M21 3v5h-5" />
          </svg>
        </span>
      </div>
    )
  );
};

export default PullToRefresh;

/** Usages:
  <PullToRefresh />
*/
