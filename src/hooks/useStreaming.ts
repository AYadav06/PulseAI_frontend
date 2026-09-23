import type { ChatMessage } from "@/lib/types"
import { useState, useRef, useCallback } from "react"
import { getStoredToken } from "@/lib/api"

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000/api/v1"

interface UseStreamingReturn {
  messages: ChatMessage[]
  setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>
  isGenerating: boolean
  error: string | null
  sendMessage: (
    prompt: string,
    model?: string,
    conversationId?: string
  ) => Promise<string | undefined>
  stopGeneration: () => void
}

export const useStreaming = (): UseStreamingReturn => {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isGenerating, setIsGenerating] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // Create an AbortController ref to allow users to cancel active generations
  const abortControllerRef = useRef<AbortController | null>(null)

  const stopGeneration = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      setIsGenerating(false)
    }
  }, [])

  /**
   * Send a message and stream the response.
   * Returns the conversationId from the backend (useful for new chats).
   */
  const sendMessage = useCallback(
    async (
      prompt: string,
      selectedModel: string = "gemini-2.0-flash",
      conversationId?: string
    ): Promise<string | undefined> => {
      if (!prompt.trim()) return undefined

      setIsGenerating(true)
      setError(null)

      // 1. Instantly append User message + assistant placeholder to UI state
      const userMessage: ChatMessage = { role: "user", content: prompt }
      const assistantMessagePlaceholder: ChatMessage = {
        role: "assistant",
        content: "",
        streaming: true,
      }

      setMessages((prev) => [...prev, userMessage, assistantMessagePlaceholder])

      // Setup AbortController for cancelable requests
      const controller = new AbortController()
      abortControllerRef.current = controller

      let returnedConversationId: string | undefined

      try {
        // 2. Dispatch fetch request to /chat endpoint
        const token = getStoredToken()
        const authHeaders: Record<string, string> = {}
        if (token) {
          authHeaders["Authorization"] = `Bearer ${token}`
        }

        const response = await fetch(`${API_BASE}/chat`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...authHeaders,
          },
          credentials: "include",
          body: JSON.stringify({
            message: prompt,
            model: selectedModel,
            ...(conversationId ? { conversationId } : {}),
          }),
          signal: controller.signal,
        })

        if (!response.ok) {
          const body = await response.json().catch(() => ({}))
          throw new Error(
            body.message || `Server returned error: ${response.statusText}`
          )
        }

        if (!response.body) {
          throw new Error("No response body received from stream.")
        }

        // 3. Initialize Reader and Decoder
        const reader = response.body.getReader()
        const decoder = new TextDecoder("utf-8")
        let streamBuffer = ""

        // 4. Processing Loop
        while (true) {
          const { value, done } = await reader.read()
          if (done) break

          // Decode binary stream chunks to utf-8 strings
          streamBuffer += decoder.decode(value, { stream: true })

          // SSE messages are separated by double newlines
          const lines = streamBuffer.split("\n\n")

          // Keep the last partial line in the buffer
          streamBuffer = lines.pop() || ""

          for (const line of lines) {
            const cleanedLine = line.trim()
            if (!cleanedLine) continue

            // Process SSE data payloads
            if (cleanedLine.startsWith("data:")) {
              const rawData = cleanedLine.replace(/^data:\s*/, "").trim()

              // End signal check
              if (rawData === "[DONE]") {
                // Clear streaming flag on the last assistant message
                setMessages((prev) => {
                  const updated = [...prev]
                  const lastIdx = updated.length - 1
                  if (lastIdx >= 0 && updated[lastIdx].role === "assistant") {
                    updated[lastIdx] = { ...updated[lastIdx], streaming: false }
                  }
                  return updated
                })
                setIsGenerating(false)
                return returnedConversationId
              }

              try {
                const parsed = JSON.parse(rawData)

                // Check if this is the conversationId metadata event
                if (parsed.conversationId && !parsed.text && !parsed.content) {
                  returnedConversationId = parsed.conversationId
                  continue
                }

                const textChunk = parsed.text || parsed.content || ""

                // Dynamically update only the final assistant message content
                if (textChunk) {
                  setMessages((prev) => {
                    const updated = [...prev]
                    const lastIdx = updated.length - 1
                    if (lastIdx >= 0 && updated[lastIdx].role === "assistant") {
                      updated[lastIdx] = {
                        ...updated[lastIdx],
                        content: updated[lastIdx].content + textChunk,
                      }
                    }
                    return updated
                  })
                }
              } catch {
                // Ignore partial JSON blocks split across stream chunks
                console.warn("Skipped partial chunk evaluation:", rawData)
              }
            }
          }
        }
      } catch (err: any) {
        if (err.name === "AbortError") {
          console.log("Generation cycle explicitly aborted by user.")
          // Clear streaming flag on abort so the partial response is still usable
          setMessages((prev) => {
            const updated = [...prev]
            const lastIdx = updated.length - 1
            if (lastIdx >= 0 && updated[lastIdx].role === "assistant") {
              updated[lastIdx] = { ...updated[lastIdx], streaming: false }
            }
            return updated
          })
        } else {
          setError(
            err.message || "An unexpected error occurred during generation."
          )
          // Mark the last assistant message as errored, remove if empty
          setMessages((prev) => {
            const updated = [...prev]
            const lastIdx = updated.length - 1
            if (lastIdx >= 0 && updated[lastIdx].role === "assistant") {
              if (updated[lastIdx].content === "") {
                return updated.slice(0, -1)
              }
              updated[lastIdx] = {
                ...updated[lastIdx],
                streaming: false,
                error: true,
              }
            }
            return updated
          })
        }
      } finally {
        setIsGenerating(false)
        abortControllerRef.current = null
      }

      return returnedConversationId
    },
    []
  )

  return {
    messages,
    setMessages,
    isGenerating,
    error,
    sendMessage,
    stopGeneration,
  }
}
