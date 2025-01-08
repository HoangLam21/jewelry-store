"use client";
import React, { createContext, useContext, useReducer, useEffect } from "react";

type BuyNowItem = {
  _id: string;
  name: string;
  images: string;
  cost: number;
  quantity: number;
  vouchers: any[];
  variants: any[];
  selectedMaterial: string;
  selectedSize: string;
};

type BuyNowState = {
  items: BuyNowItem[];
};

type BuyNowAction = { type: "BUY_NOW"; payload: BuyNowItem };

const BuyNowContext = createContext<{
  stateBuyNow: BuyNowState;
  dispatchBuyNow: React.Dispatch<BuyNowAction>;
}>({
  stateBuyNow: { items: [] },
  dispatchBuyNow: () => null
});

const BuyNowReducer = (
  stateBuyNow: BuyNowState,
  action: BuyNowAction
): BuyNowState => {
  switch (action.type) {
    case "BUY_NOW": {
      return { items: [...stateBuyNow.items, { ...action.payload }] };
    }
    default:
      return stateBuyNow;
  }
};

export const BuyNowProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [stateBuyNow, dispatchBuyNow] = useReducer(BuyNowReducer, {
    items: []
  });

  return (
    <BuyNowContext.Provider value={{ stateBuyNow, dispatchBuyNow }}>
      {children}
    </BuyNowContext.Provider>
  );
};

export const useBuyNow = () => useContext(BuyNowContext);
