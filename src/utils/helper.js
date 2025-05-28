export const convertCurrentcy = (price) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR"
      }).format(price)
}

export const getPaginationRange = (currentPage, totalPages, delta = 1) => {
  const range = []
  const left = Math.max(1, currentPage - delta)
  const right = Math.min(totalPages, currentPage + delta)

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= left && i <= right)) {
      range.push(i)
    } else if (
      (i === left - 1 && left > 2) || 
      (i === right + 1 && right < totalPages - 1)
    ) {
      range.push("...")
    }
  }

  return [...new Set(range)]
}

export const formatDate = (isoDate) => new Date(isoDate).toISOString().split('T')[0]