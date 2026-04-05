"use client"

import React, { memo, ComponentType, PropsWithChildren } from "react"

/**
 * Higher-order component to memoize a component with custom comparison
 */
export function withMemo<P extends object>(
  Component: ComponentType<P>,
  arePropsEqual?: (prevProps: P, nextProps: P) => boolean
): React.MemoExoticComponent<ComponentType<P>> {
  return memo(Component, arePropsEqual)
}

/**
 * Utility to compare prop objects for shallow equality
 */
export function shallowEqual(obj1: Record<string, unknown>, obj2: Record<string, unknown>): boolean {
  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)

  if (keys1.length !== keys2.length) {
    return false
  }

  for (const key of keys1) {
    if (obj1[key] !== obj2[key]) {
      return false
    }
  }

  return true
}

/**
 * Use this hook in components to memoize expensive computations
 */
export function useMemoValue<T>(
  value: T,
  dependencies: React.DependencyList
): T {
  const [memoized, setMemoized] = React.useState(value)

  React.useEffect(() => {
    setMemoized(value)
  }, dependencies)

  return memoized
}
