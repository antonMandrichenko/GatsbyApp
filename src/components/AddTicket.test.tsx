import React from "react"
import { render, fireEvent } from "@testing-library/react"
import AddTicket from "./AddTicket"


describe("<AddTicket />", () => {
  test("should display text-field", async () => {
    const { getByTestId } = render(<AddTicket />)
    const button = await getByTestId("button-first")
    expect(button).toBeTruthy()
    fireEvent.click(button)
    const textField = await getByTestId("text")
    expect(textField).toBeTruthy()
  })

  test("changes view of button", async () => {
    const { getByTestId } = render(<AddTicket />)
    const button = await getByTestId("button-first")
    expect(button).toBeTruthy()
    fireEvent.click(button)
    const secondButton = await getByTestId("button-second")
    expect(secondButton).toBeTruthy()
    fireEvent.click(secondButton)
  })

  test("cgetSnapshot", async () => {
    const { asFragment } = render(<AddTicket />)
    expect(asFragment()).toMatchSnapshot()
  })
})
