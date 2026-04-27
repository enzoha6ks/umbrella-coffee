import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const formData = await req.formData()
  const file = formData.get('file')

  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'No image file provided' }, { status: 400 })
  }

  if (!file.type.startsWith('image/')) {
    return NextResponse.json({ error: 'Only image uploads are allowed' }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const extension = path.extname(file.name) || '.png'
  const baseName = path.basename(file.name, extension).replace(/[^a-z0-9-]+/gi, '-').toLowerCase()
  const fileName = `${baseName}-${crypto.randomUUID()}${extension}`
  const uploadDir = path.join(process.cwd(), 'public', 'images', 'uploads')
  const uploadPath = path.join(uploadDir, fileName)

  await mkdir(uploadDir, { recursive: true })
  await writeFile(uploadPath, buffer)

  return NextResponse.json({ url: `/images/uploads/${fileName}` }, { status: 201 })
}
