/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsdoc/require-jsdoc */
/* eslint-disable no-unused-expressions */
import React, { useRef, useEffect, useContext } from 'react';
import { CSSTransition as ReactCSSTransition } from 'react-transition-group';

interface TransitionContextProps {

  /**
   * The parent context object.
   */
  parent: {
    show?: boolean;
    isInitialRender?: boolean;
    appear?: boolean;
  };
}

/**
 * Props for the CSSTransition component.
 */
interface CSSTransitionProps {

  /**
   * A boolean indicating whether to show the component.
   */
  show?: boolean;

  /**
   * The CSS classes to add when the component is entering.
   */
  enter?: string;

  /**
   * The CSS classes to add at the start of the entering animation.
   */
  enterStart?: string;

  /**
   * The CSS classes to add at the end of the entering animation.
   */
  enterEnd?: string;

  /**
   * The CSS classes to add when the component is leaving.
   */
  leave?: string;

  /**
   * The CSS classes to add at the start of the leaving animation.
   */
  leaveStart?: string;

  /**
   * The CSS classes to add at the end of the leaving animation.
   */
  leaveEnd?: string;

  /**
   * A boolean indicating whether to show the component on the first render.
   */
  appear?: boolean;

  /**
   * A boolean indicating whether to unmount the component when it leaves.
   */
  unmountOnExit?: boolean;

  /**
   * The HTML tag to use for the component.
   */
  tag?: string;

  /**
   * The children to render inside the component.
   */
  children?: React.ReactNode;

  /**
   * Additional props to pass to the component.
   */
  [key: string]: React.ReactNode | boolean | string | undefined;
}

const TransitionContext = React.createContext<TransitionContextProps>({
  /**
   * The parent context object.
   */
  parent: {},
});

/**
 * A hook that returns a boolean indicating whether the component is being rendered for the first time.
 * @returns A boolean indicating whether the component is being rendered for the first time.
 */
function useIsInitialRender() {
  const isInitialRender = useRef(true);
  useEffect(() => {
    isInitialRender.current = false;
  }, []);
  return isInitialRender.current;
}

const CSSTransition = ({
  show,
  enter = '',
  enterStart = '',
  enterEnd = '',
  leave = '',
  leaveStart = '',
  leaveEnd = '',
  appear,
  unmountOnExit,
  tag = 'div',
  children,
  ...rest
}: CSSTransitionProps) => {
  const enterClasses = enter.split(' ').filter(s => s.length);
  const enterStartClasses = enterStart.split(' ').filter(s => s.length);
  const enterEndClasses = enterEnd.split(' ').filter(s => s.length);
  const leaveClasses = leave.split(' ').filter(s => s.length);
  const leaveStartClasses = leaveStart.split(' ').filter(s => s.length);
  const leaveEndClasses = leaveEnd.split(' ').filter(s => s.length);
  const removeFromDom = unmountOnExit;

  /**
   * Adds the specified classes to the given DOM node's class list.
   *
   * @param node - The DOM node to add classes to.
   * @param classes - An array of classes to add to the node's class list.
   */
  function addClasses(node: HTMLElement | null, classes: string[]): void {
    classes.length && node && node.classList.add(...classes);
  }

  /**
   * Removes the specified classes from the given DOM node.
   *
   * @param node - The DOM node to remove classes from.
   * @param classes - The classes to remove from the DOM node.
   */
  function removeClasses(node: HTMLElement | null, classes: string[]): void {
    classes.length && node && node.classList.remove(...classes);
  }

  const nodeRef = React.useRef<HTMLDivElement>(null);

  // const Component = tag as keyof JSX.IntrinsicElements;

  return (
    <ReactCSSTransition
      appear={appear}
      nodeRef={nodeRef}
      unmountOnExit={removeFromDom}
      in={show}
      addEndListener={(done: EventListenerOrEventListenerObject): void => {
        if (nodeRef.current) {
          nodeRef.current.addEventListener('transitionend', done, false);
        }
      }}
      onEnter={() => {
        if (nodeRef.current) {
          if (!removeFromDom) {
            nodeRef.current.style.display = '';
          }
          addClasses(nodeRef.current, [...enterClasses, ...enterStartClasses]);
        }
      }}
      onEntering={() => {
        if (nodeRef.current) {
          removeClasses(nodeRef.current, enterStartClasses);
          addClasses(nodeRef.current, enterEndClasses);
        }
      }}
      onEntered={() => {
        removeClasses(nodeRef.current, [...enterEndClasses, ...enterClasses]);
      }}
      onExit={() => {
        addClasses(nodeRef.current, [...leaveClasses, ...leaveStartClasses]);
      }}
      onExiting={() => {
        removeClasses(nodeRef.current, leaveStartClasses);
        addClasses(nodeRef.current, leaveEndClasses);
      }}
      onExited={() => {
        removeClasses(nodeRef.current, [...leaveEndClasses, ...leaveClasses]);
        if (!removeFromDom) {
          if (nodeRef.current) {
            nodeRef.current.style.display = 'none';
          }
          }
}
      }
    >
      <div ref={nodeRef} style={{ display: !removeFromDom ? 'none' : undefined }}>
        {children}
      </div>
    </ReactCSSTransition>
  );
};

interface TransitionProps {
  show?: boolean;
  appear?: boolean;
}

export const Transition = ({ show, appear, ...rest }: TransitionProps) => {
  const { parent } = useContext(TransitionContext);
  const isInitialRender = useIsInitialRender();
  const isChild = show === undefined;

  if (isChild) {
    return (
      <CSSTransition
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        appear={parent.appear || !parent.isInitialRender}
        show={parent.show}
        {...rest}
      />
    );
  }

  return (
    <TransitionContext.Provider
      value={{
        parent: {
          show,
          isInitialRender,
          appear,
        },
      }}
    >
      <CSSTransition appear={appear} show={show} {...rest} />
    </TransitionContext.Provider>
  );
};
