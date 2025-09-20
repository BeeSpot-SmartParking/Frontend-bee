"use client"

import { useEffect, useRef } from "react"

interface QRCodeDisplayProps {
  value: string
  size?: number
  className?: string
}

export function QRCodeDisplay({ value, size = 200, className = "" }: QRCodeDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Simple QR code placeholder - in real app, use a QR code library like 'qrcode'
    const cellSize = size / 25
    canvas.width = size
    canvas.height = size

    // Clear canvas
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, size, size)

    // Generate a simple pattern based on the value
    ctx.fillStyle = "#000000"
    const pattern = generatePattern(value)

    for (let row = 0; row < 25; row++) {
      for (let col = 0; col < 25; col++) {
        if (pattern[row][col]) {
          ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize)
        }
      }
    }

    // Add corner squares (QR code positioning markers)
    drawCornerSquare(ctx, 0, 0, cellSize)
    drawCornerSquare(ctx, 18 * cellSize, 0, cellSize)
    drawCornerSquare(ctx, 0, 18 * cellSize, cellSize)
  }, [value, size])

  const generatePattern = (text: string): boolean[][] => {
    const pattern: boolean[][] = Array(25)
      .fill(null)
      .map(() => Array(25).fill(false))

    // Simple hash-based pattern generation
    let hash = 0
    for (let i = 0; i < text.length; i++) {
      hash = ((hash << 5) - hash + text.charCodeAt(i)) & 0xffffffff
    }

    for (let row = 3; row < 22; row++) {
      for (let col = 3; col < 22; col++) {
        // Skip corner areas
        if ((row < 9 && col < 9) || (row < 9 && col > 15) || (row > 15 && col < 9)) continue

        const cellHash = (hash + row * 25 + col) & 0xffffffff
        pattern[row][col] = cellHash % 3 === 0
      }
    }

    return pattern
  }

  const drawCornerSquare = (ctx: CanvasRenderingContext2D, x: number, y: number, cellSize: number) => {
    // Outer square
    ctx.fillRect(x, y, cellSize * 7, cellSize * 7)
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(x + cellSize, y + cellSize, cellSize * 5, cellSize * 5)
    ctx.fillStyle = "#000000"
    ctx.fillRect(x + cellSize * 2, y + cellSize * 2, cellSize * 3, cellSize * 3)
  }

  return (
    <div className={`inline-block p-4 bg-gray-500 rounded-lg ${className}`}>
      <canvas ref={canvasRef} className="border border-gray-200 rounded" style={{ maxWidth: "100%", height: "auto" }} />
    </div>
  )
}
