import { debounce, formatDate } from "@/shared/lib/utils"

jest.useFakeTimers()

describe("debounce", () => {
  let func: jest.Mock
  let debouncedFunc: Function

  beforeEach(() => {
    func = jest.fn()
    debouncedFunc = debounce(func, 200)
  })

  test("should not call the function immediately", () => {
    debouncedFunc()
    expect(func).not.toHaveBeenCalled()
  })

  test("should call the function after the wait time", () => {
    debouncedFunc()
    jest.advanceTimersByTime(200)
    expect(func).toHaveBeenCalled()
  })

  test("should call the function only once if called multiple times within the wait time", () => {
    debouncedFunc()
    debouncedFunc()
    debouncedFunc()

    jest.advanceTimersByTime(200)
    expect(func).toHaveBeenCalledTimes(1)
  })

  test("should call the function with the correct context and arguments", () => {
    const context = { value: 42 }
    const debouncedFuncWithContext = debounce(function (this: any, ...args: any[]) {
      return func.apply(this, args)
    }, 200)

    debouncedFuncWithContext.call(context, "arg1", "arg2")
    jest.advanceTimersByTime(200)

    expect(func).toHaveBeenCalledWith("arg1", "arg2")
    expect(func).toHaveBeenCalledTimes(1)
  })

  test("should reset the timer if called again within the wait time", () => {
    debouncedFunc()
    jest.advanceTimersByTime(100)
    debouncedFunc()
    jest.advanceTimersByTime(100)
    expect(func).not.toHaveBeenCalled()

    jest.advanceTimersByTime(100)
    expect(func).toHaveBeenCalled()
  })
})

describe("formatDate", () => {
  expect(formatDate("2024-05-12 12:07:12.103179+00")).toBe("2024-05-12")
  expect(formatDate("2024-05-14 09:54:06.241943+00")).toBe("2024-05-14")
  expect(formatDate("2024-05-14 23:02:46.717959+00")).toBe("2024-05-15")

  test("should handle invalid date string gracefully", () => {
    expect(formatDate("invalid-date")).toBe("NaN-aN-aN")
  })
})
