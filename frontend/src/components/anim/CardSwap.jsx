import React, { Children, cloneElement, forwardRef, isValidElement, useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';

// REMOVED: import './CardSwap.css';  <-- This was causing the error

export const Card = forwardRef(({ customClass, ...rest }, ref) => (
  <div ref={ref} {...rest} className={`swap-card ${customClass ?? ''} ${rest.className ?? ''}`.trim()} />
));
Card.displayName = 'Card';

const makeSlot = (i, distX, distY, total) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i
});

const placeNow = (el, slot, skew) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true
  });

const CardSwap = ({
  width = '100%',
  height = '100%',
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  skewAmount = 6,
  children
}) => {
  const childArr = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(() => childArr.map(() => React.createRef()), [childArr.length]);
  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));
  const container = useRef(null);
  const intervalRef = useRef();

  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) => placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount));

    const swap = () => {
      if (order.current.length < 2) return;
      const [front, ...rest] = order.current;
      const elFront = refs[front].current;
      const tl = gsap.timeline();

      tl.to(elFront, { y: '+=500', duration: 0.8, ease: 'power1.inOut' });

      rest.forEach((idx, i) => {
        const el = refs[idx].current;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
        tl.to(el, { x: slot.x, y: slot.y, z: slot.z, zIndex: slot.zIndex, duration: 0.8, ease: 'power1.inOut' }, "-=0.6");
      });

      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
      tl.set(elFront, { zIndex: backSlot.zIndex });
      tl.to(elFront, { x: backSlot.x, y: backSlot.y, z: backSlot.z, duration: 0.8, ease: 'power1.inOut' });

      tl.call(() => { order.current = [...rest, front]; });
    };

    intervalRef.current = setInterval(swap, delay);
    return () => clearInterval(intervalRef.current);
  }, [cardDistance, verticalDistance, delay, skewAmount]);

  const rendered = childArr.map((child, i) =>
    isValidElement(child) ? cloneElement(child, { key: i, ref: refs[i] }) : child
  );

  return (
    <div ref={container} className="card-swap-container" style={{ width, height, position: 'relative' }}>
      {rendered}
    </div>
  );
};

export default CardSwap;