import { useLoaderData } from "react-router"

export async function loader() {
    return fetch("https://jsonplaceholder.typicode.com/users").then((r) =>
        r.json()
    )
}

export default function RemixPage() {
    const users = useLoaderData()
    return (
        <div className="p-10 font-sans bg-blue-50 min-h-screen">
            <h1 className="text-3xl font-bold text-blue-800">
                Remix Data Explorer
            </h1>
            <ul className="mt-5 space-y-2">
                {users.map((u: any) => (
                    <li key={u.id} className="p-2 bg-black shadow rounded">
                        {u.company.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}
