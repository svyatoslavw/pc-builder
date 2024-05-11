import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { ShareSystem } from "@/features/ShareSystem"

describe("ShareSystem", () => {
  const build = {
    id: "123",
    name: "Test System",
    components: {
      processor: {
        id: "1",
        name: "Test Processor",
        price: 1000,
        image_url: "test-image-url",
        rating: 4.5,
        in_stock: true,
        cores: "6",
        threads: "12",
        ghz: 3.5
      },
      motherboard: {
        id: "2",
        name: "Test Motherboard",
        price: 2000,
        image_url: "test-image-url",
        rating: 4.5,
        in_stock: true,
        sockets: "AM4",
        chipset: "Intel",
        compatible_ram: "DDR4"
      },
      memory: {
        id: "3",
        name: "Test Memory",
        price: 3000,
        image_url: "test-image-url",
        rating: 4.5,
        in_stock: true,
        size: 16,
        type: "DDR4",
        ghz: 3.5
      },
      graphics_card: {
        id: "4",
        name: "Test Graphics Card",
        price: 4000,
        image_url: "test-image-url",
        rating: 4.5,
        in_stock: true,
        cooling: "Water",
        memory_size: "16",
        memory_type: "DDR4"
      },
      case: {
        id: "5",
        name: "Test Case",
        price: 5000,
        image_url: "test-image-url",
        rating: 4.5,
        in_stock: true,
        form_factor: "ATX"
      }
    },
    total: 5000,
    is_public: true
  }

  test("renders ShareSystem component", () => {
    render(<ShareSystem build={build} />)
    const shareButton = screen.getByText("Share")
    expect(shareButton).toBeInTheDocument()
  })

  test("opens dialog when Share button is clicked", async () => {
    render(<ShareSystem build={build} />)
    const shareButton = screen.getByText("Share")

    fireEvent.click(shareButton)

    await waitFor(() => {
      const dialogTitle = screen.getByText("Share link")
      expect(dialogTitle).toBeInTheDocument()
    })
  })

  test("copies link when copy button is clicked", async () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn(() => Promise.resolve())
      }
    })

    render(<ShareSystem build={build} />)
    const shareButton = screen.getByText("Share")

    userEvent.click(shareButton)

    await waitFor(() => {
      const copyButton = screen.getByText("Copy")
      userEvent.click(copyButton)
    })

    expect(navigator.clipboard.writeText).toEqual(`${window.location.origin}/i/systems/${build.id}`)
  })

  test("closes dialog when Close button is clicked", async () => {
    render(<ShareSystem build={build} />)
    const shareButton = screen.getByText("Share")

    userEvent.click(shareButton)

    await waitFor(() => {
      const closeButton = screen.getByText("Close")
      userEvent.click(closeButton)
    })

    await waitFor(() => {
      const dialogTitle = screen.queryByText("Share link")
      expect(dialogTitle).not.toBeInTheDocument()
    })
  })
})
