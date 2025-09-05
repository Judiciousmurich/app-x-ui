'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Meal, Plan } from '@/types';

interface CartItem {
  meal: Meal;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  selectedPlan: Plan | null;
  totalItems: number;
  totalPrice: number;
}

interface CartContextType {
  state: CartState;
  addMeal: (meal: Meal) => void;
  removeMeal: (mealId: string) => void;
  selectPlan: (plan: Plan) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartAction = 
  | { type: 'ADD_MEAL'; payload: Meal }
  | { type: 'REMOVE_MEAL'; payload: string }
  | { type: 'SELECT_PLAN'; payload: Plan }
  | { type: 'CLEAR_CART' };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_MEAL':
      const existingItem = state.items.find(item => item.meal.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.meal.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + action.payload.price,
        };
      } else {
        return {
          ...state,
          items: [...state.items, { meal: action.payload, quantity: 1 }],
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + action.payload.price,
        };
      }
    
    case 'REMOVE_MEAL':
      const itemToRemove = state.items.find(item => item.meal.id === action.payload);
      if (!itemToRemove) return state;
      
      if (itemToRemove.quantity > 1) {
        return {
          ...state,
          items: state.items.map(item =>
            item.meal.id === action.payload
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
          totalItems: state.totalItems - 1,
          totalPrice: state.totalPrice - itemToRemove.meal.price,
        };
      } else {
        return {
          ...state,
          items: state.items.filter(item => item.meal.id !== action.payload),
          totalItems: state.totalItems - 1,
          totalPrice: state.totalPrice - itemToRemove.meal.price,
        };
      }
    
    case 'SELECT_PLAN':
      return {
        ...state,
        selectedPlan: action.payload,
      };
    
    case 'CLEAR_CART':
      return {
        items: [],
        selectedPlan: null,
        totalItems: 0,
        totalPrice: 0,
      };
    
    default:
      return state;
  }
};

const initialState: CartState = {
  items: [],
  selectedPlan: null,
  totalItems: 0,
  totalPrice: 0,
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addMeal = (meal: Meal) => {
    dispatch({ type: 'ADD_MEAL', payload: meal });
  };

  const removeMeal = (mealId: string) => {
    dispatch({ type: 'REMOVE_MEAL', payload: mealId });
  };

  const selectPlan = (plan: Plan) => {
    dispatch({ type: 'SELECT_PLAN', payload: plan });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{ state, addMeal, removeMeal, selectPlan, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};