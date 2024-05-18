import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Toaster } from "react-hot-toast"

import { ShareSystem } from "@/features/ShareSystem"
import { EnumCategory, IBuild } from "@/shared/lib/types"
import { getPrevFromLS, setPrevToLS } from "@/shared/lib/utils"

describe("ShareSystem", () => {
  const build: IBuild = {
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
      },
      hard_drive: {
        id: "6",
        name: "Test HarDrive",
        price: 5000,
        image_url: "test-image-url",
        rating: 4.5,
        in_stock: true,
        drive_size: "1 TB"
      },
      os: {
        id: "7",
        name: "Test OS",
        price: 5000,
        image_url: "test-image-url",
        rating: 5.5,
        in_stock: true,
        windows: "Windows 11"
      },
      power_supply: {
        id: "8",
        name: "Test Power Supply",
        price: 5000,
        image_url: "test-image-url",
        rating: 5.5,
        in_stock: true,
        watt: "750W"
      },
      ssd: {
        id: "9",
        name: "Test Power Supply",
        price: 5000,
        image_url: "test-image-url",
        rating: 5.5,
        in_stock: true,
        ssd_size: "1 TB"
      }
    },
    total: 5000,
    success: true
  }

  beforeAll(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn()
      }
    })
  })

  test("renders ShareSystem component", () => {
    render(<ShareSystem build={build} />)
    const shareButton = screen.getByTitle("Share")
    expect(shareButton).toBeInTheDocument()
  })

  test("opens dialog when Share button is clicked", async () => {
    render(<ShareSystem build={build} />)
    const shareButton = screen.getByTitle("Share")

    userEvent.click(shareButton)

    await waitFor(() => {
      const dialogTitle = screen.getByText("Share link")
      expect(dialogTitle).toBeInTheDocument()
    })
  })

  test("displays the correct link in the input field", async () => {
    render(<ShareSystem build={build} />)
    const shareButton = screen.getByTitle("Share")

    userEvent.click(shareButton)

    await waitFor(() => {
      const linkInput = screen.getByRole("textbox")
      expect(linkInput).toHaveValue(window.location.origin + "/i/systems/" + build.id)
    })
  })

  test("copies link to clipboard and shows success toast when Copy button is clicked", async () => {
    render(
      <>
        <ShareSystem build={build} />
        <Toaster />
      </>
    )
    const shareButton = screen.getByTitle("Share")
    userEvent.click(shareButton)

    await waitFor(() => {
      const copyButton = screen.getByTitle("Copy")
      userEvent.click(copyButton)
    })

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(window.location.origin + "/i/systems/" + build.id)
      const toastMessage = screen.getByText("Link copied!")
      expect(toastMessage).toBeInTheDocument()
    })
  })

  test("closes the dialog when Close button is clicked", async () => {
    render(<ShareSystem build={build} />)
    const shareButton = screen.getByTitle("Share")

    userEvent.click(shareButton)

    await waitFor(() => {
      const closeButton = screen.getByTitle("Close")
      userEvent.click(closeButton)
    })

    await waitFor(() => {
      const dialogTitle = screen.queryByText("Share link")
      expect(dialogTitle).not.toBeInTheDocument()
    })
  })
})

const localStorageMock = (() => {
  let store: Record<string, string> = {}

  return {
    getItem: jest.fn((key: string) => store[key]),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value.toString()
    }),
    clear: jest.fn(() => {
      store = {}
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key]
    })
  }
})()

Object.defineProperty(window, "localStorage", {
  value: localStorageMock
})

describe("localStorage functions", () => {
  afterEach(() => {
    localStorage.clear()
  })

  test("setPrevToLS should set state to local storage", () => {
    const state = EnumCategory.PROCESSOR
    setPrevToLS(state)
    expect(localStorage.setItem).toHaveBeenCalledWith("filter_prev_state", JSON.stringify(state))
  })

  test("getPrevFromLS should retrieve state from local storage", () => {
    const state = "example_state"
    localStorage.setItem("filter_prev_state", JSON.stringify(state))
    expect(getPrevFromLS()).toBe(state)
  })

  test("getPrevFromLS should return null if no state is stored", () => {
    expect(getPrevFromLS()).toBeNull()
  })
})
