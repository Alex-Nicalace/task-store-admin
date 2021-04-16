import React from "react";

const StoreServiceContext = React.createContext();

const {
    Provider : StoreServiceProvide,
    Consumer : StoreServiceConsumer} = StoreServiceContext;

export {StoreServiceProvide, StoreServiceConsumer, StoreServiceContext};