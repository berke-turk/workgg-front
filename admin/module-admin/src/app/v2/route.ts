import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    // GET isteği işleme
    const users = [
        { id: 1, name: 'Ali' },
        { id: 2, name: 'Ayşe' },
    ]
    return NextResponse.json(users)
}

export async function POST(request: NextRequest) {
    // POST isteği işleme
    const body = await request.json()

    // Yeni kullanıcı ekleme işlemi simülasyonu
    console.log('Yeni kullanıcı:', body)

    return NextResponse.json({ message: 'Kullanıcı başarıyla eklendi' }, { status: 201 })
}