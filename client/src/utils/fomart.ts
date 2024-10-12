
export function formatDateTime(date: string) {
    const d = new Date(date);
    return `${d.getHours()}:${d.getMinutes()} - ${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
}