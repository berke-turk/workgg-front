'use client'

import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../lib/redux/store'
import { increment, incrementByAmount, decrement } from '../lib/redux/features/counterSlice'

export default function Counter() {
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <div className="text-center">
      <p className="text-2xl mb-4">Counter: {count}</p>
      <button
        onClick={() => dispatch(incrementByAmount(2))}
        className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600"
      >
        Increment By Amount
      </button>
      <button
        onClick={() => dispatch(decrement())}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Decrement
      </button>
    </div>
  )
}