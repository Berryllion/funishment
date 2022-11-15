import { MutableRefObject, useEffect, useState } from "react";
import { debounce } from "lodash";

export const useMousePosition = () => {
  const windowDimensions = getWindowResize();
  const [mousePos, setMousePos] = useState({ x: (windowDimensions.width ?? 0) / 2, y: (windowDimensions.height ?? 0) / 2 });

  const hasWindow = typeof window !== 'undefined';

  useEffect(() => {
    if (hasWindow) {
      const handleMouseMove = debounce((e) => {
        if (e.touches && e.touches.length) {
          setMousePos({
            x: e.touches[0].pageX,
            y: e.touches[0].pageY,
          });
        } else {
          setMousePos({
            x: e.pageX,
            y: e.pageY,
          });
        }
      }, 100, { maxWait: 100 });
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('touchmove', handleMouseMove);
      }
    }
  }, []);
  useEffect(() => {
    setMousePos({ x: (windowDimensions.width ?? 0) / 2, y: (windowDimensions.height ?? 0) / 2 });
  }, [windowDimensions])

  return mousePos;
}

export const useClickOutside = (ref: MutableRefObject<any>, onClickOutside: Function) => {
  useEffect(() => {
    function handleClickOutside(event:MouseEvent) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}

export const getWindowResize = () => {
  const hasWindow = typeof window !== 'undefined';

  const getWindowDimensions = () => {
    const width = hasWindow ? window.innerWidth : null;
    const height = hasWindow ? window.innerHeight : null;

    return {
      width,
      height,
    };
  }

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    if (hasWindow) {
      const handleResize = debounce(() => {
        setWindowDimensions(getWindowDimensions());
      }, 100);

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [hasWindow]);

  return windowDimensions;

}
