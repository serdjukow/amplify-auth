"use client"

import React, { useState } from "react"
import { useLayoutContext, usePersistedState, useSearchContext } from "hooks"
import { useDebounce } from "react-use"
import { Customer, Employee, Order } from "types"
import { SearchInputField } from "core"
import SearchFilter from "modules/workflow/search/SearchFilter"
import { searchRequest } from "modules/workflow/search/api"
import SearchResults from "modules/workflow/search/searchResults/SearchResults"

const HeaderSearchBar: React.FC = () => {
    const { notify } = useLayoutContext()

    const { searchCustomers, isLoadingCustomers, searchEmployees, isLoadingEmployees, searchOrders, isLoadingOrders } = useSearchContext()

    const [searchInput, setSearchInput] = useState<string>("")
    const [isLoadingSearch, setIsLoadingSearch] = useState<boolean>(false)
    const [searchResultsOpen, setSearchResultsOpen] = useState<boolean>(false)
    const [searchFilterOpen, setSearchFilterOpen] = useState<boolean>(false)

    const [customerList, setCustomerList] = useState<Customer[]>([])

    const [includeCustomers, setIncludeCustomers] = usePersistedState<boolean>("headersearch_includeCustomers", true, "create")

    const [employeeList, setEmployeeList] = useState<Employee[]>([])

    const [includeEmployees, setIncludeEmployees] = usePersistedState<boolean>("headersearch_includeEmployees", true, "create")

    const [orderList, setOrderList] = useState<Order[]>([])

    const [includeOrders, setIncludeOrders] = usePersistedState<boolean>("headersearch_includeOrders", true, "create")

    const searchHandler = async () => {
        if (searchInput.length < 3) {
            return
        }

        if (isLoadingCustomers) {
            notify("Die Kundennamen werden für die Suche indexiert. Bitte warte einen Moment.")
            setSearchInput("")
            return
        }

        setIsLoadingSearch(true)

        const { customers, employees, orders } = await searchRequest(
            searchInput,
            includeCustomers,
            searchCustomers,
            includeEmployees,
            searchEmployees,
            includeOrders,
            searchOrders
        )
        setCustomerList(customers)
        setEmployeeList(employees)
        setOrderList(orders)

        setIsLoadingSearch(false)
        setSearchResultsOpen(true)
    }

    const [,] = useDebounce(() => searchHandler(), 999, [searchInput])

    return (
        <>
            <SearchInputField
                value={searchInput}
                onChange={(value) => {
                    setSearchInput(value)
                }}
                isLoadingSearch={isLoadingSearch || isLoadingCustomers || isLoadingEmployees || isLoadingOrders}
                onClickSettings={() => setSearchFilterOpen(true)}
                placeholder={isLoadingCustomers || isLoadingEmployees || isLoadingOrders ? "Wird geladen..." : "Suche..."}
            />
            <SearchFilter
                setIsOpen={setSearchFilterOpen}
                isOpen={searchFilterOpen}
                includeCustomers={includeCustomers}
                setIncludeCustomers={setIncludeCustomers}
                includeEmployees={includeEmployees}
                setIncludeEmployees={setIncludeEmployees}
                includeOrders={includeOrders}
                setIncludeOrders={setIncludeOrders}
            />
            <SearchResults
                isOpen={searchResultsOpen}
                setIsOpen={setSearchResultsOpen}
                customerList={customerList}
                employeeList={employeeList}
                orderList={orderList}
                searchInput={searchInput}
            />
        </>
    )
}

export default HeaderSearchBar
