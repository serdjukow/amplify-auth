"use client"

import React, { useCallback, useEffect } from "react"
import { useParams } from "next/navigation"
import { useDataContext } from "hooks"
import { getCustomer } from "modules/customermanagement/customers/api"

// import { getOrder } from "modules/orders/api";

type StateContainerProps = {
    children: React.ReactNode
}

type StateContainerParamsType = {
    customerID: string
    orderID: string
}

const StateContainer: React.FC<StateContainerProps> = ({ children }) => {
    const dataContext = useDataContext()

    const { customerID, orderID } = useParams<StateContainerParamsType>()

    const loadStateEntities = useCallback(async () => {
        if (!customerID && !orderID) {
            return
        }

        dataContext.setIsLoadingStateEntities(true)

        if (customerID && !dataContext.customer) {
            console.log("Loading customer with ID: ", customerID)
            const customer = await getCustomer(customerID)
            dataContext.setCustomer(customer)
        }

        if (orderID && !dataContext.order) {
            console.log("Loading order with ID: ", orderID)
            // const order = await getOrder(orderID);
            // dataContext.setOrder(order);
        }

        dataContext.setIsLoadingStateEntities(false)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [customerID, orderID])

    useEffect(() => {
        loadStateEntities()
    }, [loadStateEntities])

    return <>{children}</>
}

export default StateContainer
