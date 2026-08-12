type PaginationItem = { type: 'page', value: number}
| {type: 'ellipsis'}

export function pagination(currentPage : number, totalPages : number, maxVisible = 5) : PaginationItem[] {
    if (totalPages <= 0) return []

    if (totalPages <= maxVisible){
        return Array.from({length: totalPages}, (_, i) => ({
            type: 'page',
            value: i + 1
        }))
    }

    const items : PaginationItem[] = []

    const half = Math.floor(maxVisible / 2)

    let start = Math.max(2, currentPage - half)
    let end = Math.min(totalPages - 1, currentPage + half)

    if (currentPage <= half + 1){
        start = 2
        end = maxVisible
    }

    if (currentPage >= totalPages - half){
        start = totalPages - maxVisible + 1
        end = totalPages - 1
    }

    items.push({
        type: 'page',
        value: 1
    })

    if (start > 2){
        items.push({
            type: 'ellipsis'
        })
    }

    for (let page = start; page <= end; page++){
        items.push({
            type: 'page',
            value: page
        })
    }

    if (end < totalPages - 1){
        items.push({
            type: 'ellipsis'
        })
    }

    if (totalPages > 1){
        items.push({
            type: 'page',
            value: totalPages
        })
    }

    return items
}