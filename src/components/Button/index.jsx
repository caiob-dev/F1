export function Button ({children, href, ...props }) {
    return(
        <a {...props} href={href}> {children}</a>
    )
}