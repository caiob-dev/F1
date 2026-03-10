export function Main({children, ...props}) {
    return (
        <main {...props}>
            {children}
        </main>
    )
}