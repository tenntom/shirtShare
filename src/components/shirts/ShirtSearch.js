// This is a stretch goal. Will use final chapters of Kennels for reference.

import React, { useContext } from "react"
import { ShirtContext } from "./ShirtProvider"
import "./Shirts.css"

export const ShirtSearch = () => {
  const { setSearchTerms } = useContext(ShirtContext)

  return (
    <>
      <input type="text"
        className="input--wide"
        onKeyUp={(event) => setSearchTerms(event.target.value)}
        placeholder="Keyword Search" />
    </>
  )
}