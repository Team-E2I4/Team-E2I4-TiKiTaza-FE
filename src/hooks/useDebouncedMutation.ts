import {
  DefaultError,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query';
import { useRef } from 'react';

type DebouncedMutateType<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown,
> = (
  variables: TVariables,
  debounceMs?: number,
  options?: UseMutationOptions<TData, TError, TVariables, TContext>
) => void;

type UseDebouncedMutationReturnType<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown,
> = Omit<
  UseMutationResult<TData, TError, TVariables, TContext>,
  'data' | 'mutate'
> & {
  debouncedMutate: DebouncedMutateType<TData, TError, TVariables, TContext>;
};

export function useDebouncedMutation<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown,
>(
  options: UseMutationOptions<TData, TError, TVariables, TContext>
): UseDebouncedMutationReturnType<TData, TError, TVariables, TContext> {
  const { mutate, ...mutation } = useMutation<
    TData,
    TError,
    TVariables,
    TContext
  >(options);

  const timer = useRef<ReturnType<typeof setTimeout>>();

  const debouncedMutate: DebouncedMutateType<
    TData,
    TError,
    TVariables,
    TContext
  > = (variables, debounceMs = 200, options) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      mutate(variables, options);
    }, debounceMs);
  };
  return { debouncedMutate, ...mutation };
}
