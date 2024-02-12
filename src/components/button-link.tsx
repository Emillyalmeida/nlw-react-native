import { Link, LinkProps } from "expo-router";

type buttonLinkProps = LinkProps<string> & {
    title: string
}

export function ButtonLink({title, ...rest}: buttonLinkProps) {
    return (
        <Link className="text-slate-300 text-center text-base font-body" {...rest}>
            { title }
        </Link>
    )
}