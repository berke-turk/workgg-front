export default interface Paper {
    id: string,
    title?: string,
    seo?: string,
    description?: string,
    keywords?: string,
    volume?: string,
    sub_volume?: string,
    read_count?: string,
    image?: string,
    file_url?: string,
    status: 'active' | "passive", // active - passive
    created_at?: string,
    updated_at?: string
}

// GET -> api/paper?id={id}
// GET -> api/paper?seo={seo}
// PUT -> api/paper?id={id}
// POST -> api/paper
// DELETE -> api/paper?id={id}