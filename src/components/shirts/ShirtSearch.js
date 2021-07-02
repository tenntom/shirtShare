import React, { useContext } from "react"
import { ShirtContext } from "./ShirtProvider"
import "./Shirts.css"

export const ShirtSearch = () => {
  const { setSearchTerms } = useContext(ShirtContext)

  return (
    <>
      <input type="text"
        className="input--wide"
        onKeyUp={(event) => setSearchTerms(event.target.value.toLowerCase())}
        placeholder="Keyword Search" />
    </>
  )
}